from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials
import openai
import base64
import json
from dotenv import load_dotenv
import os
from creds import router as auth_router,login

# load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Set OpenAI API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Load Gmail OAuth credentials
GMAIL_CREDENTIALS_FILE = "credentials.json"

app.include_router(auth_router)

# Load saved credentials
def get_credentials():
    if not os.path.exists("server/token.json"):
        return None
    with open("server/token.json", "r") as token_file:
        creds_data = json.load(token_file)
    return Credentials.from_authorized_user_info(creds_data)

# # API to fetch user's latest emails
# @app.get("/get-emails")
# def get_emails():
#     creds = get_credentials()
#     if not creds:
#         return {"error": "User not authenticated. Please login first."}

#     service = build("gmail", "v1", credentials=creds)
#     results = service.users().messages().list(userId="me", maxResults=1).execute()
    
#     messages = []
#     for msg in results.get("messages", []):
#         message = service.users().messages().get(userId="me", id=msg["id"]).execute()
#         payload = message["payload"]
#         headers = payload["headers"]

#         subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
#         body = ""
        
#         if "parts" in payload:
#             for part in payload["parts"]:
#                 if part["mimeType"] == "text/plain":
#                     body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
#                     break
#         else:
#             body = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8")

#         return subject, body
#         messages.append(msg_data["snippet"])

#     return {"emails": messages}

def get_gmail_service():
    """Authenticate and return a Gmail API service instance."""
    # creds = Credentials.from_authorized_user_file(GMAIL_CREDENTIALS_FILE)
    login()
    creds = get_credentials()
    print('creds',creds)
    service = build("gmail", "v1", credentials=creds)
    print(service)
    return service

def fetch_latest_email():
    """Fetch the latest unread email from Gmail."""
    try:
        service = get_gmail_service()
        results = service.users().messages().list(userId="me", labelIds=["INBOX"], maxResults=1).execute()
        messages = results.get("messages", [])

        if not messages:
            return None, None

        message = service.users().messages().get(userId="me", id=messages[0]["id"]).execute()
        payload = message["payload"]
        headers = payload["headers"]

        subject = next((h["value"] for h in headers if h["name"] == "Subject"), "No Subject")
        body = ""
        
        if "parts" in payload:
            for part in payload["parts"]:
                if part["mimeType"] == "text/plain":
                    body = base64.urlsafe_b64decode(part["body"]["data"]).decode("utf-8")
                    break
        else:
            body = base64.urlsafe_b64decode(payload["body"]["data"]).decode("utf-8")

        return subject, body

    except Exception as e:
        print("Error fetching email:", str(e))
        return None, None

def get_email_intent(email_body: str):
    """Use OpenAI GPT to classify intent of email."""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are an email assistant. Classify the intent of the email."},
                {"role": "user", "content": email_body}
            ],
            temperature=0.5
        )
        return response["choices"][0]["message"]["content"]
    except Exception as e:
        print("Error calling OpenAI:", str(e))
        return "Unknown"

# API Route to fetch email and classify intent
@app.get("/get-intent")
def process_email():
    subject, body = fetch_latest_email()
    
    if not body:
        raise HTTPException(status_code=404, detail="No unread emails found.")

    intent = get_email_intent(body)
    return {"subject": subject, "intent": intent}

# Root endpoint
@app.get("/")
def home():
    return {"message": "Email Intent Classifier API is running!"}

@app.get("/auth/callback")
def oauth2callback(code: str = None):
    # Process the OAuth callback and save the token
    # ...
    return {"message": "Authentication successful"}