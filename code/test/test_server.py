import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import sys
import os

# Add the parent directory to sys.path to make the 'src' module importable
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.server.index import app, fetch_latest_email, get_email_intent

client = TestClient(app)

# Mock Gmail response
mock_email_subject = "Test Email"
mock_email_body = "I need help with my order refund."

# Mock OpenAI response
mock_intent_response = "Customer Support - Refund Request"

def test_fetch_latest_email():
    """Test that fetch_latest_email returns email subject and body."""
    with patch("src.server.index.get_gmail_service") as mock_service:
        # Set up the mock to return the expected values
        mock_service.return_value.users.return_value.messages.return_value.list.return_value.execute.return_value = {
            "messages": [{"id": "123"}]
        }
        
        mock_message = {
            "payload": {
                "headers": [{"name": "Subject", "value": mock_email_subject}],
                "parts": [{"mimeType": "text/plain", "body": {"data": "SGVsbG8gV29ybGQ="}}]  # Base64 for "Hello World"
            }
        }
        mock_service.return_value.users.return_value.messages.return_value.get.return_value.execute.return_value = mock_message
        
        subject, body = fetch_latest_email()
        assert subject == mock_email_subject
        assert body is not None

def test_get_email_intent():
    """Test that get_email_intent returns the correct intent classification."""
    with patch("src.server.index.openai.ChatCompletion.create") as mock_openai:
        mock_openai.return_value = {"choices": [{"message": {"content": mock_intent_response}}]}
        
        # Alternatively, patch the entire function
        with patch("src.server.index.get_email_intent", return_value=mock_intent_response):
            intent = get_email_intent(mock_email_body)
            assert intent == mock_intent_response

def test_get_intent_api_success():
    """Test API endpoint /get-intent with mocked Gmail and OpenAI API."""
    with patch("src.server.index.fetch_latest_email", return_value=(mock_email_subject, mock_email_body)):
        with patch("src.server.index.get_email_intent", return_value=mock_intent_response):
            response = client.get("/get-intent")
            assert response.status_code == 200
            assert response.json() == {
                "subject": mock_email_subject,
                "intent": mock_intent_response
            }

def test_get_intent_api_no_email():
    """Test API when there are no unread emails."""
    with patch("src.server.index.fetch_latest_email", return_value=(None, None)):
        response = client.get("/get-intent")
        assert response.status_code == 404
        assert response.json() == {"detail": "No unread emails found."}
