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
    'Authorization': `Bearer ${SHOPIFY_AI_PROXY_TOKEN}`
  }
});

// Add response interceptor for error handling
aiProxy.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
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
      - Focus on evaluating how effectively candidates can leverage AI tools in their sales process
      - Consider Shopify's specific sales environment and tools
      - Emphasize practical applications in a sales context

      Scoring Guidelines:
      9-10: Exceptional AI Integration
         - Innovative and creative use of AI tools
         - Seamless integration into sales workflows
         - Clear and compelling explanation of AI usage
         - Demonstrated impact on sales performance
         - Proactive in identifying new AI opportunities
      
      7-8: Strong AI Usage
         - Effective implementation of AI tools
         - Good understanding of tool capabilities
         - Clear explanation of AI processes
         - Consistent use in relevant scenarios
         - Some innovation in application
      
      5-6: Basic AI Usage
         - Functional use of AI tools
         - Adequate implementation in key areas
         - Basic explanation of AI usage
         - Follows established patterns
         - Limited innovation
      
      3-4: Limited AI Usage
         - Minimal use of AI tools
         - Basic implementation only
         - Unclear or incomplete explanation
         - Relies heavily on manual processes
         - Limited understanding of AI capabilities
      
      1-2: No AI Usage
         - Manual approach to tasks
         - No AI tool implementation
         - No explanation of AI processes
         - Missed opportunities for automation
         - Resistance to AI adoption

      Evaluation Criteria:
      1. AI Tool Selection (Weight: 0.3)
         - Appropriate selection of AI tools for sales tasks
         - Understanding of tool capabilities and limitations
         - Integration with existing sales workflows

      2. AI Implementation (Weight: 0.3)
         - Effective use of AI in sales scenarios
         - Efficiency in tool usage
         - Quality of AI-assisted outputs

      3. AI Explanation (Weight: 0.2)
         - Clear communication of AI usage
         - Understanding of AI processes
         - Ability to explain AI decisions

      4. AI Innovation (Weight: 0.2)
         - Creative use of AI capabilities
         - Unique applications in sales context
         - Potential for process improvement

      Assignment: ${assignment}
      
      Interview Transcript: ${transcript}
      
      Candidate Output: ${candidateOutput}

      Format the response as a JSON object with the following structure:
      {
        "overallScore": {
          "score": number,
          "rationale": string,
          "scoringLevel": string,
          "justification": string
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
          "toolSelection": {
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
          "explanation": {
            "assessment": number,
            "scoringLevel": string,
            "evidence": string[],
            "impact": string
          },
          "innovation": {
            "assessment": number,
            "scoringLevel": string,
            "evidence": string[],
            "impact": string
          }
        }
      }

      Provide specific examples and quotes from the transcript to support your analysis.
      Consider the weighted importance of each criterion in the final score.
    `;

    const response = await aiProxy.post<OpenAIResponse>('', {
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing how candidates use AI tools in their work. Provide detailed, constructive feedback based on the provided scoring guidelines. Focus on practical applications in a sales context."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    // Parse the AI response
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
    
    const response = await aiProxy.post<OpenAIResponse>('', {
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: "Test connection"
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
    }
    throw error;
  }
}; 