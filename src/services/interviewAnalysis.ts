interface AnalysisResult {
  overallScore: {
    score: number;
    rationale: string;
    scoringLevel: string;
    justification: string;
  };
  keyStrengths: Array<{
    strength: string;
    example: string;
    impact: string;
    scoringLevel: string;
  }>;
  areasForImprovement: Array<{
    area: string;
    currentState: string;
    targetLevel: string;
    recommendation: string;
    tools: string;
  }>;
  aiUsagePatterns: Array<{
    pattern: string;
    example: string;
    analysis: string;
    scoringLevel: string;
  }>;
  detailedAnalysis: {
    toolUsage: {
      assessment: number;
      scoringLevel: string;
      evidence: string[];
      impact: string;
    };
    implementation: {
      assessment: number;
      scoringLevel: string;
      evidence: string[];
      impact: string;
    };
    understanding: {
      assessment: number;
      scoringLevel: string;
      evidence: string[];
      impact: string;
    };
  };
}

const getScoringLevel = (score: number): string => {
  if (score >= 9) return '9-10: Exceptional AI Integration';
  if (score >= 7) return '7-8: Strong AI Usage';
  if (score >= 5) return '5-6: Basic AI Usage';
  if (score >= 3) return '3-4: Limited AI Usage';
  return '1-2: No AI Usage';
};

const analyzeAIReadiness = (transcript: string, candidateOutput: string, assignment: string): AnalysisResult => {
  console.log('Analyzing transcript:', transcript);
  console.log('Analyzing candidate output:', candidateOutput);
  
  // Check for any AI mention first - using more precise matching
  const transcriptLower = transcript.toLowerCase();
  const hasExplicitAIMention = 
    (transcriptLower.includes(' ai ') || // Must have spaces around "ai"
     transcriptLower.includes('artificial intelligence') ||
     transcriptLower.includes('chatgpt') || 
     transcriptLower.includes('claude') ||
     transcriptLower.includes('prompt') ||
     transcriptLower.includes('gpt')) &&
    !transcriptLower.includes('ai as a service') && // Exclude common false positives
    !transcriptLower.includes('ai assistant') &&
    !transcriptLower.includes('ai tool');

  console.log('Has explicit AI mention:', hasExplicitAIMention);
  console.log('Transcript contains "ai":', transcriptLower.includes('ai'));
  console.log('Transcript contains "artificial intelligence":', transcriptLower.includes('artificial intelligence'));
  console.log('Transcript contains "chatgpt":', transcriptLower.includes('chatgpt'));
  console.log('Transcript contains "claude":', transcriptLower.includes('claude'));
  console.log('Transcript contains "prompt":', transcriptLower.includes('prompt'));
  console.log('Transcript contains "gpt":', transcriptLower.includes('gpt'));

  // If no AI mention, return minimum score
  if (!hasExplicitAIMention) {
    console.log('No AI mention found, returning score 2');
    return {
      overallScore: {
        score: 2,
        rationale: 'No AI usage demonstrated in the response',
        scoringLevel: '1-2: No AI Usage',
        justification: 'Candidate did not mention or demonstrate any AI usage'
      },
      keyStrengths: [],
      areasForImprovement: [
        {
          area: 'AI Tool Usage',
          currentState: 'No AI tool usage demonstrated',
          targetLevel: '7-8: Strong AI Usage',
          recommendation: 'Start incorporating AI tools into daily sales activities',
          tools: 'ChatGPT, Claude, Sales AI assistants'
        },
        {
          area: 'AI Implementation',
          currentState: 'No AI implementation demonstrated',
          targetLevel: '7-8: Strong AI Usage',
          recommendation: 'Develop structured approach to AI implementation',
          tools: 'AI workflow templates, automation tools'
        }
      ],
      aiUsagePatterns: [
        {
          pattern: 'AI Tool Usage',
          example: 'No explicit AI tool usage',
          analysis: 'No demonstration of AI awareness or application',
          scoringLevel: '1-2: No AI Usage'
        }
      ],
      detailedAnalysis: {
        toolUsage: {
          assessment: 0,
          scoringLevel: '1-2: No AI Usage',
          evidence: ['No AI usage demonstrated'],
          impact: 'Critical for effective AI integration in sales'
        },
        implementation: {
          assessment: 0,
          scoringLevel: '1-2: No AI Usage',
          evidence: ['No AI implementation demonstrated'],
          impact: 'Essential for successful AI adoption'
        },
        understanding: {
          assessment: 0,
          scoringLevel: '1-2: No AI Usage',
          evidence: ['No AI understanding demonstrated'],
          impact: 'Important for sustainable AI usage'
        }
      }
    };
  }

  // Initialize scores for AI users
  let toolUsageScore = 3; // Base score for mentioning AI
  let implementationScore = 0;
  let understandingScore = 0;

  const toolUsageEvidence = ['Explicitly mentioned using AI tools'];
  const implementationEvidence: string[] = [];
  const understandingEvidence: string[] = [];

  // Check for comprehensive AI usage - more stringent criteria
  const aiUsageCount = (
    (transcriptLower.match(/used ai for/g) || []).length +
    (transcriptLower.match(/used ai to/g) || []).length +
    (transcriptLower.match(/had ai create/g) || []).length
  );

  if (aiUsageCount >= 3) {
    toolUsageScore += 3; // Reduced from 4
    toolUsageEvidence.push('Demonstrated comprehensive AI usage across multiple tasks');
  } else if (aiUsageCount >= 2) {
    toolUsageScore += 2;
    toolUsageEvidence.push('Demonstrated multiple AI usage examples');
  }

  // Check for specific AI usage examples - more stringent
  if (transcriptLower.includes('utilizing ai') || transcriptLower.includes('using ai')) {
    toolUsageScore += 1; // Reduced from 2
    toolUsageEvidence.push('Demonstrated active use of AI in workflow');
  }

  if (transcriptLower.includes('prompt') || transcriptLower.includes('prompting')) {
    toolUsageScore += 1; // Reduced from 2
    toolUsageEvidence.push('Showed understanding of prompt engineering');
  }

  if (transcriptLower.includes('research') && hasExplicitAIMention) {
    toolUsageScore += 1; // Reduced from 2
    toolUsageEvidence.push('Used AI for research and analysis');
  }

  // Cap tool usage score at 8
  toolUsageScore = Math.min(toolUsageScore, 8);

  // Check for implementation examples - more stringent
  if (transcriptLower.includes('create') && hasExplicitAIMention) {
    implementationScore += 2; // Reduced from 3
    implementationEvidence.push('Used AI to create content or plans');
  }

  if (transcriptLower.includes('outline') && hasExplicitAIMention) {
    implementationScore += 1; // Reduced from 2
    implementationEvidence.push('Used AI to create structured content');
  }

  if (transcriptLower.includes('format') && hasExplicitAIMention) {
    implementationScore += 1; // Reduced from 2
    implementationEvidence.push('Used AI to format content');
  }

  // Cap implementation score at 6
  implementationScore = Math.min(implementationScore, 6);

  // Check for understanding - more stringent
  if (transcriptLower.includes('productive') && hasExplicitAIMention) {
    understandingScore += 1; // Reduced from 2
    understandingEvidence.push('Demonstrated understanding of AI for productivity');
  }

  if (transcriptLower.includes('structure') && hasExplicitAIMention) {
    understandingScore += 1; // Reduced from 2
    understandingEvidence.push('Showed understanding of AI for content structure');
  }

  if (transcriptLower.includes('time') && hasExplicitAIMention) {
    understandingScore += 1; // Reduced from 2
    understandingEvidence.push('Demonstrated understanding of AI for efficiency');
  }

  // Cap understanding score at 4
  understandingScore = Math.min(understandingScore, 4);

  // Calculate overall score
  const overallScore = Math.round(
    (toolUsageScore * 0.5) +
    (implementationScore * 0.3) +
    (understandingScore * 0.2)
  );

  // Generate strengths and areas for improvement
  const keyStrengths = [];
  const areasForImprovement = [];

  if (toolUsageScore >= 6) {
    keyStrengths.push({
      strength: 'Strong AI Tool Usage',
      example: 'Demonstrated effective use of AI tools in sales process',
      impact: 'Shows potential for AI-driven sales improvement',
      scoringLevel: getScoringLevel(toolUsageScore)
    });
  } else {
    keyStrengths.push({
      strength: 'Basic AI Tool Usage',
      example: 'Mentioned using AI for specific tasks',
      impact: 'Shows awareness of AI capabilities',
      scoringLevel: getScoringLevel(toolUsageScore)
    });
  }

  if (implementationScore >= 4) {
    keyStrengths.push({
      strength: 'Effective AI Implementation',
      example: 'Showed clear process for AI integration',
      impact: 'Demonstrates ability to leverage AI for sales efficiency',
      scoringLevel: getScoringLevel(implementationScore)
    });
  } else {
    areasForImprovement.push({
      area: 'AI Implementation',
      currentState: 'Limited AI implementation demonstrated',
      targetLevel: '7-8: Strong AI Usage',
      recommendation: 'Develop structured approach to AI implementation',
      tools: 'AI workflow templates, automation tools'
    });
  }

  return {
    overallScore: {
      score: overallScore,
      rationale: 'Overall AI readiness score based on tool usage, implementation, and understanding',
      scoringLevel: getScoringLevel(overallScore),
      justification: `Scored ${overallScore}/10 based on comprehensive analysis of AI readiness indicators`
    },
    keyStrengths,
    areasForImprovement,
    aiUsagePatterns: [
      {
        pattern: 'AI Tool Usage',
        example: 'Explicitly mentioned using AI tools',
        analysis: 'Demonstrates awareness and application of AI in sales process',
        scoringLevel: getScoringLevel(toolUsageScore)
      }
    ],
    detailedAnalysis: {
      toolUsage: {
        assessment: toolUsageScore,
        scoringLevel: getScoringLevel(toolUsageScore),
        evidence: toolUsageEvidence,
        impact: 'Critical for effective AI integration in sales'
      },
      implementation: {
        assessment: implementationScore,
        scoringLevel: getScoringLevel(implementationScore),
        evidence: implementationEvidence,
        impact: 'Essential for successful AI adoption'
      },
      understanding: {
        assessment: understandingScore,
        scoringLevel: getScoringLevel(understandingScore),
        evidence: understandingEvidence,
        impact: 'Important for sustainable AI usage'
      }
    }
  };
};

export { analyzeAIReadiness, type AnalysisResult }; 