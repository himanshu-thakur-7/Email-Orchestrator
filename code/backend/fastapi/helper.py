import requests
import os
from dotenv import load_dotenv
import json

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

def upload_file_to_openai(file_path):
    """
    Uploads a file to OpenAI API for use with assistants.
    
    Args:
        file_path (str): Path to the file to upload
        
    Returns:
        dict: The API response containing file information
    """
    # Load environment variables to get the API key
    
    
    if not api_key:
        raise ValueError("OpenAI API key not found in environment variables")
    
    # API endpoint
    url = "https://api.openai.com/v1/files"
    
    # Headers with authorization
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    # Prepare the file for upload
    with open(file_path, "rb") as file:
        files = {
            "file": (os.path.basename(file_path), file),
        }
        
        # Form data
        data = {
            "purpose": "assistants"
        }
        
        # Make the POST request
        response = requests.post(url, headers=headers, files=files, data=data)
    
    # Check if the request was successful
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error uploading file: {response.status_code} - {response.text}")

def create_vector_store():
    """
    Creates a new vector store in OpenAI API.
    
    Returns:
        dict: The API response containing vector store information
    """
    
    
    if not api_key:
        raise ValueError("OpenAI API key not found in environment variables")
    
    # API endpoint
    url = "https://api.openai.com/v1/vector_stores"
    
    # Headers with authorization and beta flag
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
    }
    
    # Request body
    data = {
        "name": "Loan Emails Vector Store"
    }
    
    # Make the POST request
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    # Check if the request was successful
    if response.status_code in [200, 201]:
        return response.json()
    else:
        raise Exception(f"Error creating vector store: {response.status_code} - {response.text}")

def add_file_to_vector_store(vector_store_id, file_id):
    """
    Adds a file to an existing vector store in OpenAI API.
    
    Args:
        vector_store_id (str): The ID of the vector store
        file_id (str): The ID of the file to add to the vector store
        
    Returns:
        dict: The API response containing the operation result
    """
    
    if not api_key:
        raise ValueError("OpenAI API key not found in environment variables")
    
    # API endpoint
    url = f"https://api.openai.com/v1/vector_stores/{vector_store_id}/files"
    
    # Headers with authorization and beta flag
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
    }
    
    # Request body
    data = {
        "file_id": file_id
    }
    
    # Make the POST request
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    # Check if the request was successful
    if response.status_code in [200, 201]:
        return response.json()
    else:
        raise Exception(f"Error adding file to vector store: {response.status_code} - {response.text}")

def create_assistant_with_vector_store(file_path, prompt_text):
    """
    Creates a new assistant with a vector store in OpenAI API.
    
    Args:
        file_path (str): Path to the file to upload and use with the assistant
        prompt_text (str): Text to use as instructions for the assistant
        
    Returns:
        dict: The API response containing assistant information
    """
    
    if not api_key:
        raise ValueError("OpenAI API key not found in environment variables")
    
    # Step 1: Upload the file to OpenAI
    file_response = upload_file_to_openai(file_path)
    file_id = file_response["id"]
    print(f"File uploaded successfully with ID: {file_id}")
    
    # Step 2: Create a vector store
    vector_store_response = create_vector_store()
    vector_store_id = vector_store_response["id"]
    print(f"Vector store created successfully with ID: {vector_store_id}")
    
    # Step 3: Add the file to the vector store
    add_file_response = add_file_to_vector_store(vector_store_id, file_id)
    print(f"File added to vector store successfully")
    
    # Step 4: Create an assistant with the vector store
    # API endpoint
    url = "https://api.openai.com/v1/assistants"
    
    # Headers with authorization and beta flag
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
        "OpenAI-Beta": "assistants=v2"
    }
    
    # Request body
    data = {
        "name": "Loan Request Classifier",
        "instructions": prompt_text,  # Use the provided prompt text as instructions
        "model": "gpt-4-turbo",
        "tools": [{"type": "file_search"}],
        "tool_resources": {
            "file_search": {
                "vector_store_ids": [vector_store_id]
            }
        }
    }
    
    # Make the POST request
    response = requests.post(url, headers=headers, data=json.dumps(data))
    
    # Check if the request was successful
    if response.status_code in [200, 201]:
        assistant_response = response.json()
        print(f"Assistant created successfully with ID: {assistant_response.get('id')}")
        return assistant_response
    else:
        raise Exception(f"Error creating assistant: {response.status_code} - {response.text}")

