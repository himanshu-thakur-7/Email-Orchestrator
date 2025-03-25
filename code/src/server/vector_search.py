import os
import time
import pymongo
from openai import OpenAI
from pymongo import UpdateOne
from pymongo.operations import SearchIndexModel
from dotenv import load_dotenv
from tqdm import tqdm

# Load environment variables from .env file
load_dotenv()

# Specify your OpenAI API key and embedding model
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
model = os.getenv("OPENAI_MODEL", "text-embedding-3-small")
openai_client = OpenAI()

# Define a function to generate embeddings
def get_embedding(text):
   """Generates vector embeddings for the given text."""

   embedding = openai_client.embeddings.create(input = [text], model=model).data[0].embedding
   return embedding

# Connect to your Atlas cluster
mongo_client = pymongo.MongoClient(os.getenv("MONGO_CONNECTION_STRING"))
db = mongo_client[os.getenv("MONGO_DB_NAME", "loan-servicing")]
collection = db[os.getenv("MONGO_COLLECTION_NAME", "emails")]

# Define a filter to exclude documents with null or empty 'summary' fields
filter = { 'email': { '$exists': True, "$nin": [ None, "" ] } }

# Get a subset of documents in the collection
documents = collection.find(filter, {'_id': 1, 'email': 1})

# Generate the list of bulk write operations
operations = []
for doc in tqdm(documents):
   summary = doc["email"]
   # Generate embeddings for this document
   embedding = get_embedding(summary)

   # Uncomment the following line to convert to BSON vectors
   # embedding = generate_bson_vector(embedding, BinaryVectorDtype.FLOAT32)

   # Add the update operation to the list
   operations.append(UpdateOne(
      {"_id": doc["_id"]},
      {"$set": {
         "embedding": embedding
      }}
   ))

# Execute the bulk write operation
if operations:
   result = collection.bulk_write(operations)
   updated_doc_count = result.modified_count

print(f"Updated {updated_doc_count} documents.")

# Create your index model, then create the search index
search_index_model = SearchIndexModel(
  definition = {
    "fields": [
      {
        "type": "vector",
        "path": "embedding",
        "similarity": "dotProduct",
        "numDimensions": 1536
      }
    ]
  },
  name="vector_index",
  type="vectorSearch"
)
result = collection.create_search_index(model=search_index_model)

# Wait for initial sync to complete
print("Polling to check if the index is ready. This may take up to a minute.")
predicate=None
if predicate is None:
  predicate = lambda index: index.get("queryable") is True

while True:
  indices = list(collection.list_search_indexes(result))
  if len(indices) and predicate(indices[0]):
    break
  time.sleep(5)
print(result + " is ready for querying.")