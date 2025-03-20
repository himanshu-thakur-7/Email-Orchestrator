from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse
from google_auth_oauthlib.flow import Flow
import os
from google.oauth2.credentials import Credentials

router = APIRouter()

# Load credentials from JSON
CLIENT_SECRETS_FILE = "credentials.json"
SCOPES = ["https://www.googleapis.com/auth/gmail.readonly", 'https://www.googleapis.com/auth/gmail.modify']
REDIRECT_URI = "http://localhost:8000/auth/callback"

# OAuth Flow
flow = Flow.from_client_secrets_file(
    CLIENT_SECRETS_FILE,
    scopes=SCOPES,
    redirect_uri=REDIRECT_URI
)

# Step 1: Redirect user to Google's OAuth 2.0 consent screen
@router.get("/auth/login")
def login():
    print('login redirect')
    auth_url, _ = flow.authorization_url(prompt="consent")
    return RedirectResponse(auth_url)

# Step 2: Handle callback from Google and fetch credentials
@router.get("/auth/callback")
async def auth_callback(request: Request):

    code = request.query_params.get("code")
    flow.fetch_token(code=code)
    creds = flow.credentials
    
    # Print scopes to verify
    print("Authorized scopes:", creds.scopes)

    # Save credentials to a token file
    with open("server/token.json", "w") as token:
        token.write(creds.to_json())

    return {"message": "Authentication successful!"}
