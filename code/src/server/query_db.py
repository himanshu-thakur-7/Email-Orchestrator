import os
import pymongo
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Specify your OpenAI API key and embedding model
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
model = os.getenv("OPENAI_MODEL", "text-embedding-3-small")
openai_client = OpenAI()

# Define a function to generate embeddings
def get_embedding(text):
   """Generates vector embeddings for the given text."""
   embedding = openai_client.embeddings.create(input=[text], model=model).data[0].embedding
   return embedding

# Connect to your Atlas cluster
mongo_client = pymongo.MongoClient(os.getenv("MONGO_CONNECTION_STRING"))
db = mongo_client[os.getenv("MONGO_DB_NAME", "dashboard")]
collection = db[os.getenv("MONGO_COLLECTION_NAME", "emails")]

# Generate embedding for the search query
query_embedding = get_embedding("Greetings,\n\nI am contacting you to discuss potential modifications concerning the ARM index and margin associated with my loan account number 987654321. Adjustments in these areas are essential for aligning my loan terms with prevailing market conditions, which have shifted since the origination of my loan.\n\nI believe that amending the ARM index and margin can provide a more favorable and realistic structure for my loan payments. This adjustment will not only help in reflecting accurate market conditions but also in ensuring the sustainability of my financial obligations. \n\nThank you for reviewing my request promptly. I am keen to adjust these parameters and continue my long-standing relationship with Wells Fargo.\n\nSincerely,\nTristan Harlow")

# Sample vector search pipeline
pipeline = [
   {
      "$vectorSearch": {
            "index": "vector_index",
            "queryVector": query_embedding,
            "path": "embedding",
            "exact": True,
            "limit": 5
      }
   }, 
   {
      "$project": {
         "_id": 0, 
         "email": 1,
         "score": {
            "$meta": "vectorSearchScore"
         }
      }
   }
]

# Execute the search
results = collection.aggregate(pipeline)

# Print results
for i in results:
   print(i)