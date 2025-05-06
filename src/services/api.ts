import axios from 'axios';

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const SHOPIFY_AI_PROXY_URL = process.env.REACT_APP_SHOPIFY_AI_PROXY_URL || 'https://proxy.shopify.ai/v1/chat/completions';
const SHOPIFY_AI_PROXY_TOKEN = process.env.REACT_APP_SHOPIFY_AI_PROXY_TOKEN || '';

// Create axios instance for Shopify AI proxy
const aiProxy = axios.create({
  baseURL: SHOPIFY_AI_PROXY_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': SHOPIFY_AI_PROXY_TOKEN
  }
});

// Add request interceptor for logging
aiProxy.interceptors.request.use(
  (config) => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Environment Variables:');
      console.log('REACT_APP_SHOPIFY_AI_PROXY_URL:', SHOPIFY_AI_PROXY_URL);
      console.log('REACT_APP_SHOPIFY_AI_PROXY_TOKEN exists:', !!SHOPIFY_AI_PROXY_TOKEN);
      console.log('Token length:', SHOPIFY_AI_PROXY_TOKEN?.length);
      console.log('Token first 4 chars:', SHOPIFY_AI_PROXY_TOKEN?.substring(0, 4));
      console.log('Making request to:', config.url);
      console.log('Full headers:', {
        ...config.headers,
        Authorization: config.headers?.Authorization ? '[REDACTED]' : undefined
      });
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
aiProxy.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      throw new Error(error.response.data?.message || 'API request failed');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API No Response:', error.request);
      throw new Error('No response received from API');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Request Error:', error.message);
      throw new Error('Failed to make API request');
    }
  }
);

export const analyzeInterview = async (transcript: string, candidateOutput: string, assignment: string) => {
  try {
    const prompt = `
      AI Interview Analysis Prompt
      =======================

      Role: Expert Interviewer analyzing AI readiness for sales roles at Shopify

      Context:
      - Primary focus: Evaluate if and how candidates leverage AI tools in their sales process
      - Secondary focus: Quality of AI implementation and understanding
      - Must explicitly mention AI tools/usage to score above 4

      Scoring Guidelines:
      9-10: Exceptional AI Integration
         - Explicitly mentions using AI tools (e.g., GPT, Claude, other AI assistants)
         - Demonstrates deep understanding of AI capabilities
         - Shows innovative and creative use of AI in sales workflows
         - Provides specific examples of AI usage
         - Explains how AI improved their sales process
      
      7-8: Strong AI Usage
         - Clearly mentions using AI tools
         - Shows good understanding of AI capabilities
         - Provides examples of AI implementation
         - Explains AI usage in their process
         - Demonstrates consistent use of AI
      
      5-6: Basic AI Usage
         - Mentions AI tools but lacks depth
         - Basic implementation of AI
         - Limited explanation of AI usage
         - Some examples of AI application
         - Follows basic AI patterns
      
      3-4: Limited AI Usage
         - Minimal or vague mention of AI
         - No specific AI tools mentioned
         - Unclear how AI was used
         - Relies heavily on manual processes
         - Limited understanding of AI
      
      1-2: No AI Usage
         - No mention of AI tools or usage
         - Manual approach to all tasks
         - No AI implementation
         - No explanation of AI processes
         - Missed opportunities for AI automation

      Evaluation Criteria:
      1. AI Tool Usage (Weight: 0.5)
         - Explicit mention of AI tools
         - Specific examples of AI usage
         - Understanding of AI capabilities
         - Integration with sales workflow

      2. AI Implementation (Weight: 0.3)
         - Quality of AI usage
         - Efficiency in tool usage
         - AI-assisted outputs
         - Process improvement

      3. AI Understanding (Weight: 0.2)
         - Knowledge of AI capabilities
         - Understanding of AI limitations
         - Ability to explain AI usage
         - AI tool selection rationale

      Assignment: ${assignment}
      
      Interview Transcript: ${transcript}
      
      Candidate Output: ${candidateOutput}

      Format the response as a JSON object with the following structure:
      {
        "overallScore": {
          "score": number,
          "rationale": string,
          "scoringLevel": string,
          "justification": string,
          "aiUsage": "Yes/No"
        },
        "keyStrengths": [
          {
            "strength": string,
            "example": string,
            "impact": string,
            "scoringLevel": string
          }
        ],
        "areasForImprovement": [
          {
            "area": string,
            "currentState": string,
            "targetLevel": string,
            "recommendation": string,
            "tools": string
          }
        ],
        "aiUsagePatterns": [
          {
            "pattern": string,
            "example": string,
            "analysis": string,
            "scoringLevel": string
          }
        ],
        "detailedAnalysis": {
          "toolUsage": {
            "assessment": number,
            "scoringLevel": string,
            "evidence": string[],
            "impact": string
          },
          "implementation": {
            "assessment": number,
            "scoringLevel": string,
            "evidence": string[],
            "impact": string
          },
          "understanding": {
            "assessment": number,
            "scoringLevel": string,
            "evidence": string[],
            "impact": string
          }
        }
      }`;

    const response = await aiProxy.post<OpenAIResponse>('', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interviewer analyzing AI readiness for sales roles at Shopify. Your task is to evaluate how effectively candidates leverage AI tools in their sales process.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const aiResponse = response.data.choices[0].message.content;
    return JSON.parse(aiResponse);
  } catch (error) {
    console.error('Error analyzing interview:', error);
    throw error;
  }
};

// Add a test connection function
export const testApiConnection = async () => {
  try {
    console.log('Testing API connection with URL:', SHOPIFY_AI_PROXY_URL);
    console.log('Token available:', !!SHOPIFY_AI_PROXY_TOKEN);
    console.log('Token format:', SHOPIFY_AI_PROXY_TOKEN?.substring(0, 20) + '...');
    
    const response = await aiProxy.post<OpenAIResponse>('', {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Test connection at ${new Date().toISOString()}`
        }
      ]
    });
    
    console.log('API Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error testing API connection:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      console.error('Request headers:', error.config?.headers);
    }
    throw error;
  }
}; 