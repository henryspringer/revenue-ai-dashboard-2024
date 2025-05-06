import React, { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  Text,
  TextField,
  Button,
  BlockStack,
  InlineStack,
  ProgressBar,
  List,
  Badge,
  Banner
} from '@shopify/polaris';
import { testApiConnection, analyzeInterview } from '../services/api';

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
    toolSelection: {
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
    explanation: {
      assessment: number;
      scoringLevel: string;
      evidence: string[];
      impact: string;
    };
    innovation: {
      assessment: number;
      scoringLevel: string;
      evidence: string[];
      impact: string;
    };
  };
}

const AIInterviewAnalysis: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [candidateOutput, setCandidateOutput] = useState('');
  const [assignment, setAssignment] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    setTestError(null);
    
    try {
      const result = await testApiConnection();
      setTestResult('API connection successful! Response received.');
      console.log('Test result:', result);
    } catch (error) {
      setTestError(error instanceof Error ? error.message : 'Failed to connect to API');
      console.error('Test error:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const analyzeTranscript = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeInterview(transcript, candidateOutput, assignment);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing transcript:', error);
      // You might want to show an error banner here
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Page
      title="AI Interview Analysis"
      subtitle="Analyze candidate responses and AI readiness through detailed scoring and feedback mechanisms."
      primaryAction={{
        content: 'Test API Connection',
        onAction: handleTestConnection,
        loading: isTesting,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              {testResult && (
                <Banner status="success">
                  <p>{testResult}</p>
                </Banner>
              )}
              {testError && (
                <Banner status="critical">
                  <p>{testError}</p>
                </Banner>
              )}
              <Text as="h2" variant="headingMd">Transcript Analysis</Text>
              <TextField
                label="Assignment Description"
                value={assignment}
                onChange={setAssignment}
                multiline={4}
                autoComplete="off"
                placeholder="Enter the assignment description given to the candidate..."
              />
              <TextField
                label="Interview Transcript"
                value={transcript}
                onChange={setTranscript}
                multiline={4}
                autoComplete="off"
                placeholder="Paste the interview transcript here..."
              />
              <TextField
                label="Candidate Output"
                value={candidateOutput}
                onChange={setCandidateOutput}
                multiline={4}
                autoComplete="off"
                placeholder="Paste or upload candidate's output here..."
              />
              <Button
                variant="primary"
                onClick={analyzeTranscript}
                loading={isAnalyzing}
              >
                Analyze Transcript
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>

        {analysisResult && (
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">Analysis Results</Text>
                
                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">AI Readiness Score</Text>
                  <ProgressBar progress={analysisResult.overallScore.score * 10} size="medium" />
                  <Text as="p" variant="bodyMd">
                    {analysisResult.overallScore.score}/10 - {analysisResult.overallScore.scoringLevel}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    {analysisResult.overallScore.rationale}
                  </Text>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Key Strengths</Text>
                  <List>
                    {analysisResult.keyStrengths.map((strength, index) => (
                      <List.Item key={index}>
                        <BlockStack gap="200">
                          <Text as="span" variant="bodyMd" fontWeight="bold">{strength.strength}</Text>
                          <Text as="span" variant="bodyMd">Example: {strength.example}</Text>
                          <Text as="span" variant="bodyMd">Impact: {strength.impact}</Text>
                        </BlockStack>
                      </List.Item>
                    ))}
                  </List>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Areas for Improvement</Text>
                  <List>
                    {analysisResult.areasForImprovement.map((area, index) => (
                      <List.Item key={index}>
                        <BlockStack gap="200">
                          <Text as="span" variant="bodyMd" fontWeight="bold">{area.area}</Text>
                          <Text as="span" variant="bodyMd">Current State: {area.currentState}</Text>
                          <Text as="span" variant="bodyMd">Recommendation: {area.recommendation}</Text>
                          <Text as="span" variant="bodyMd">Suggested Tools: {area.tools}</Text>
                        </BlockStack>
                      </List.Item>
                    ))}
                  </List>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">AI Usage Patterns</Text>
                  <List>
                    {analysisResult.aiUsagePatterns.map((pattern, index) => (
                      <List.Item key={index}>
                        <BlockStack gap="200">
                          <Text as="span" variant="bodyMd" fontWeight="bold">{pattern.pattern}</Text>
                          <Text as="span" variant="bodyMd">Example: {pattern.example}</Text>
                          <Text as="span" variant="bodyMd">Analysis: {pattern.analysis}</Text>
                        </BlockStack>
                      </List.Item>
                    ))}
                  </List>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Detailed Analysis</Text>
                  
                  <BlockStack gap="400">
                    <Card>
                      <BlockStack gap="200">
                        <Text as="h4" variant="headingSm">AI Tool Selection (30%)</Text>
                        <ProgressBar progress={analysisResult.detailedAnalysis.toolSelection.assessment * 10} size="small" />
                        <Text as="p" variant="bodyMd">
                          Score: {analysisResult.detailedAnalysis.toolSelection.assessment}/10 - {analysisResult.detailedAnalysis.toolSelection.scoringLevel}
                        </Text>
                        <Text as="p" variant="bodyMd">
                          Impact: {analysisResult.detailedAnalysis.toolSelection.impact}
                        </Text>
                        <List>
                          {analysisResult.detailedAnalysis.toolSelection.evidence.map((evidence, index) => (
                            <List.Item key={index}>
                              <Text as="span" variant="bodyMd">{evidence}</Text>
                            </List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    </Card>

                    <Card>
                      <BlockStack gap="200">
                        <Text as="h4" variant="headingSm">AI Implementation (30%)</Text>
                        <ProgressBar progress={analysisResult.detailedAnalysis.implementation.assessment * 10} size="small" />
                        <Text as="p" variant="bodyMd">
                          Score: {analysisResult.detailedAnalysis.implementation.assessment}/10 - {analysisResult.detailedAnalysis.implementation.scoringLevel}
                        </Text>
                        <Text as="p" variant="bodyMd">
                          Impact: {analysisResult.detailedAnalysis.implementation.impact}
                        </Text>
                        <List>
                          {analysisResult.detailedAnalysis.implementation.evidence.map((evidence, index) => (
                            <List.Item key={index}>
                              <Text as="span" variant="bodyMd">{evidence}</Text>
                            </List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    </Card>

                    <Card>
                      <BlockStack gap="200">
                        <Text as="h4" variant="headingSm">AI Explanation (20%)</Text>
                        <ProgressBar progress={analysisResult.detailedAnalysis.explanation.assessment * 10} size="small" />
                        <Text as="p" variant="bodyMd">
                          Score: {analysisResult.detailedAnalysis.explanation.assessment}/10 - {analysisResult.detailedAnalysis.explanation.scoringLevel}
                        </Text>
                        <Text as="p" variant="bodyMd">
                          Impact: {analysisResult.detailedAnalysis.explanation.impact}
                        </Text>
                        <List>
                          {analysisResult.detailedAnalysis.explanation.evidence.map((evidence, index) => (
                            <List.Item key={index}>
                              <Text as="span" variant="bodyMd">{evidence}</Text>
                            </List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    </Card>

                    <Card>
                      <BlockStack gap="200">
                        <Text as="h4" variant="headingSm">AI Innovation (20%)</Text>
                        <ProgressBar progress={analysisResult.detailedAnalysis.innovation.assessment * 10} size="small" />
                        <Text as="p" variant="bodyMd">
                          Score: {analysisResult.detailedAnalysis.innovation.assessment}/10 - {analysisResult.detailedAnalysis.innovation.scoringLevel}
                        </Text>
                        <Text as="p" variant="bodyMd">
                          Impact: {analysisResult.detailedAnalysis.innovation.impact}
                        </Text>
                        <List>
                          {analysisResult.detailedAnalysis.innovation.evidence.map((evidence, index) => (
                            <List.Item key={index}>
                              <Text as="span" variant="bodyMd">{evidence}</Text>
                            </List.Item>
                          ))}
                        </List>
                      </BlockStack>
                    </Card>
                  </BlockStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        )}

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Scoring Guidelines</Text>
              <List>
                <List.Item>
                  <Text as="span" variant="bodyMd">
                    <strong>9-10:</strong> Exceptional AI integration, innovative usage, clear explanation
                  </Text>
                </List.Item>
                <List.Item>
                  <Text as="span" variant="bodyMd">
                    <strong>7-8:</strong> Strong AI usage, effective implementation, good explanation
                  </Text>
                </List.Item>
                <List.Item>
                  <Text as="span" variant="bodyMd">
                    <strong>5-6:</strong> Basic AI usage, some implementation, adequate explanation
                  </Text>
                </List.Item>
                <List.Item>
                  <Text as="span" variant="bodyMd">
                    <strong>3-4:</strong> Limited AI usage, minimal implementation, unclear explanation
                  </Text>
                </List.Item>
                <List.Item>
                  <Text as="span" variant="bodyMd">
                    <strong>1-2:</strong> No AI usage, manual approach, no explanation
                  </Text>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default AIInterviewAnalysis; 