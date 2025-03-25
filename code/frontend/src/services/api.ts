import axios from 'axios';

// Simulate API delay
const simulateDelay = (min: number = 1000, max: number = 2000): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Function to transform API response to EmailResponse type
const transformEmailData = (document: any): EmailResponse => {
  // Parse the email content to extract subject, sender, etc.
  const emailContent = document.email;
  
  // Extract subject from the email content
  const subjectMatch = emailContent.match(/Subject: (.*?)(?:\s{2,}|\n)/);
  const subject = subjectMatch ? subjectMatch[1].trim() : "No Subject";
  
  // Extract sender (in this case, we'll use the name at the end of the email)
  const senderMatch = emailContent.match(/Best regards,\s*\n(.*?)$/m);
  const sender = senderMatch ? senderMatch[1].trim() : "Unknown Sender";
  
  // Get the primary intent as the category
  const primaryIntent = document.classification.request_intents[0]?.intent || "Uncategorized";
  
  // Get the confidence score from the primary intent
  const confidence = document.classification.request_intents[0]?.confidence_score || 0;
  
  return {
    id: document.created_at, // Using timestamp as ID if no specific ID is provided
    subject,
    sender,
    category: primaryIntent.toLowerCase(), // Convert to lowercase to match category naming convention
    confidence,
    timestamp: document.created_at,
    processed: true,
    content: emailContent.trim()
  };
};
// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Category {
  id: string;
  name: string;
  label: string;
  icon: string;
}

export interface EmailResponse {
  id: string;
  subject: string;
  sender: string;
  category: string;
  confidence: number;
  timestamp: string;
  processed: boolean;
  content?: string;
}

export interface ProcessingResult {
  intents: Array<{
    name: string;
    confidence: number;
    reasoning: string;
  }>;
  features: Array<{
    name: string;
    reasoning: string;
  }>;
  similarEmails: Array<{
    id: string;
    subject: string;
    similarity: number;
    category: string;
    sender: string;
    content: string;
    timestamp: string;
  }>;
}

export const emailApi = {
  // Fetch categories
  fetchCategories: async (): Promise<Category[]> => {
    await simulateDelay();
    // Simulate API response with fallback data
    return [];
  },
  // Fetch all emails
  fetchEmails: async (): Promise<EmailResponse[]> => {
    try {
    const response = await api.get('/emails');
    if (response.data && response.data.documents) {
      return response.data.documents.map(transformEmailData);
    }
    return [];
    } catch (error) {
    console.error('Error fetching emails:', error);
    return [];
    };
  },

  // Upload email files
// Upload email files
uploadEmails: async (files: File[]): Promise<void> => {
  try {
    console.log('Uploading files:', files);
    const formData = new FormData();
    
    // Append each file to the form data
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });
    
    // Send the files to the processing endpoint
    await api.post('/process_email', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
  } catch (error) {
    console.error('Error uploading emails:', error);
    throw new Error('Failed to upload email files');
  }
},

  // Configure model
  configureModel: async (configFile: File, prompt: string): Promise<void> => {
    // Simulate configuration delay
    await simulateDelay(2000, 4000);
  },

  // Get email details with processing results
  getEmailDetails: async (emailId: string): Promise<ProcessingResult> => {
    // Simulate processing delay
    await simulateDelay(1500, 3000);
    throw new Error('API Error');
  },
};