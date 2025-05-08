import React, { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  Text,
  TextField,
  Button,
  BlockStack,
  ProgressBar,
  List,
  Box,
  InlineStack,
  Icon,
  Divider
} from '@shopify/polaris';
import { analyzeAIReadiness, type AnalysisResult } from '../services/interviewAnalysis';

const AIInterviewAnalysis: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [candidateOutput, setCandidateOutput] = useState('');
  const [assignment, setAssignment] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeTranscript = () => {
    setIsAnalyzing(true);
    try {
      const result = analyzeAIReadiness(transcript, candidateOutput, assignment);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing transcript:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Box background="bg-surface-secondary" padding="400">
      <Page
        title="AI Interview Analysis"
        subtitle="Evaluate candidate AI readiness and implementation capabilities through comprehensive interview analysis"
        primaryAction={
          <Button
            variant="primary"
            onClick={analyzeTranscript}
            loading={isAnalyzing}
            tone="success"
            size="large"
          >
            Analyze Transcript
          </Button>
        }
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text as="h2" variant="headingMd" tone="success">Transcript Analysis</Text>
                  <Icon source="analytics" tone="success" />
                </InlineStack>
                <Divider />
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
              </BlockStack>
            </Card>
          </Layout.Section>

          {analysisResult && (
            <Layout.Section>
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text as="h2" variant="headingMd">Analysis Results</Text>
                    <Icon source="checkmark" tone="success" />
                  </InlineStack>
                  <Divider />
                  
                  <BlockStack gap="200">
                    <Text as="h3" variant="headingSm">AI Readiness Score</Text>
                    <ProgressBar 
                      progress={analysisResult.overallScore.score * 10} 
                      size="large"
                      tone="success"
                    />
                    <InlineStack align="space-between">
                      <Text as="p" variant="bodyMd" tone="success" fontWeight="bold">
                        {analysisResult.overallScore.score}/10 - {analysisResult.overallScore.scoringLevel}
                      </Text>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        {analysisResult.overallScore.rationale}
                      </Text>
                    </InlineStack>
                  </BlockStack>

                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingSm">Key Strengths</Text>
                      <Icon source="tick" tone="success" />
                    </InlineStack>
                    <List>
                      {analysisResult.keyStrengths.map((strength, index) => (
                        <List.Item key={index}>
                          <BlockStack gap="200">
                            <Text as="span" variant="bodyMd" fontWeight="bold">{strength.strength}</Text>
                            <Text as="span" variant="bodyMd">Example: {strength.example}</Text>
                            <Text as="span" variant="bodyMd" tone="success">Impact: {strength.impact}</Text>
                          </BlockStack>
                        </List.Item>
                      ))}
                    </List>
                  </BlockStack>

                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingSm">Areas for Improvement</Text>
                      <Icon source="alert" tone="warning" />
                    </InlineStack>
                    <List>
                      {analysisResult.areasForImprovement.map((area, index) => (
                        <List.Item key={index}>
                          <BlockStack gap="200">
                            <Text as="span" variant="bodyMd" fontWeight="bold">{area.area}</Text>
                            <Text as="span" variant="bodyMd" tone="subdued">Current State: {area.currentState}</Text>
                            <Text as="span" variant="bodyMd" tone="success">Recommendation: {area.recommendation}</Text>
                            <Text as="span" variant="bodyMd">Suggested Tools: {area.tools}</Text>
                          </BlockStack>
                        </List.Item>
                      ))}
                    </List>
                  </BlockStack>

                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingSm">AI Usage Patterns</Text>
                      <Icon source="analytics" tone="success" />
                    </InlineStack>
                    <List>
                      {analysisResult.aiUsagePatterns.map((pattern, index) => (
                        <List.Item key={index}>
                          <BlockStack gap="200">
                            <Text as="span" variant="bodyMd" fontWeight="bold">{pattern.pattern}</Text>
                            <Text as="span" variant="bodyMd">Example: {pattern.example}</Text>
                            <Text as="span" variant="bodyMd" tone="success">Analysis: {pattern.analysis}</Text>
                          </BlockStack>
                        </List.Item>
                      ))}
                    </List>
                  </BlockStack>

                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="h3" variant="headingSm">Detailed Analysis</Text>
                      <Icon source="data" tone="success" />
                    </InlineStack>
                    <Divider />
                    
                    <BlockStack gap="400">
                      <Card>
                        <BlockStack gap="200">
                          <InlineStack align="space-between">
                            <Text as="h4" variant="headingSm">AI Tool Usage (50%)</Text>
                            <Icon source="checkmark" tone="success" />
                          </InlineStack>
                          <ProgressBar 
                            progress={analysisResult.detailedAnalysis.toolUsage.assessment * 10} 
                            size="large"
                            tone="success"
                          />
                          <InlineStack align="space-between">
                            <Text as="p" variant="bodyMd" tone="success" fontWeight="bold">
                              Score: {analysisResult.detailedAnalysis.toolUsage.assessment}/10 - {analysisResult.detailedAnalysis.toolUsage.scoringLevel}
                            </Text>
                            <Text as="p" variant="bodyMd" tone="subdued">
                              Impact: {analysisResult.detailedAnalysis.toolUsage.impact}
                            </Text>
                          </InlineStack>
                          <List>
                            {analysisResult.detailedAnalysis.toolUsage.evidence.map((evidence, index) => (
                              <List.Item key={index}>
                                <Text as="span" variant="bodyMd">{evidence}</Text>
                              </List.Item>
                            ))}
                          </List>
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="200">
                          <InlineStack align="space-between">
                            <Text as="h4" variant="headingSm">Implementation (30%)</Text>
                            <Icon source="checkmark" tone="success" />
                          </InlineStack>
                          <ProgressBar 
                            progress={analysisResult.detailedAnalysis.implementation.assessment * 10} 
                            size="large"
                            tone="success"
                          />
                          <InlineStack align="space-between">
                            <Text as="p" variant="bodyMd" tone="success" fontWeight="bold">
                              Score: {analysisResult.detailedAnalysis.implementation.assessment}/10 - {analysisResult.detailedAnalysis.implementation.scoringLevel}
                            </Text>
                            <Text as="p" variant="bodyMd" tone="subdued">
                              Impact: {analysisResult.detailedAnalysis.implementation.impact}
                            </Text>
                          </InlineStack>
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
                          <InlineStack align="space-between">
                            <Text as="h4" variant="headingSm">Understanding (20%)</Text>
                            <Icon source="checkmark" tone="success" />
                          </InlineStack>
                          <ProgressBar 
                            progress={analysisResult.detailedAnalysis.understanding.assessment * 10} 
                            size="large"
                            tone="success"
                          />
                          <InlineStack align="space-between">
                            <Text as="p" variant="bodyMd" tone="success" fontWeight="bold">
                              Score: {analysisResult.detailedAnalysis.understanding.assessment}/10 - {analysisResult.detailedAnalysis.understanding.scoringLevel}
                            </Text>
                            <Text as="p" variant="bodyMd" tone="subdued">
                              Impact: {analysisResult.detailedAnalysis.understanding.impact}
                            </Text>
                          </InlineStack>
                          <List>
                            {analysisResult.detailedAnalysis.understanding.evidence.map((evidence, index) => (
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
                <InlineStack align="space-between">
                  <Text as="h2" variant="headingMd">Scoring Criteria</Text>
                  <Icon source="info" tone="success" />
                </InlineStack>
                <Divider />
                
                <BlockStack gap="400">
                  <Card>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text as="h4" variant="headingSm">AI Tool Usage (50% of total score)</Text>
                        <Icon source="checkmark" tone="success" />
                      </InlineStack>
                      <List>
                        <List.Item>9-10: Exceptional AI Integration - Comprehensive use of AI tools across multiple tasks</List.Item>
                        <List.Item>7-8: Strong AI Usage - Multiple specific examples of AI tool usage</List.Item>
                        <List.Item>5-6: Basic AI Usage - Some AI tool usage demonstrated</List.Item>
                        <List.Item>3-4: Limited AI Usage - Minimal AI tool usage</List.Item>
                        <List.Item>1-2: No AI Usage - No AI tools mentioned or used</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text as="h4" variant="headingSm">Implementation (30% of total score)</Text>
                        <Icon source="checkmark" tone="success" />
                      </InlineStack>
                      <List>
                        <List.Item>9-10: Exceptional Implementation - Clear, structured approach to AI implementation</List.Item>
                        <List.Item>7-8: Strong Implementation - Multiple examples of effective AI implementation</List.Item>
                        <List.Item>5-6: Basic Implementation - Some implementation examples shown</List.Item>
                        <List.Item>3-4: Limited Implementation - Minimal implementation details</List.Item>
                        <List.Item>1-2: No Implementation - No implementation demonstrated</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text as="h4" variant="headingSm">Understanding (20% of total score)</Text>
                        <Icon source="checkmark" tone="success" />
                      </InlineStack>
                      <List>
                        <List.Item>9-10: Exceptional Understanding - Deep understanding of AI's role in their work</List.Item>
                        <List.Item>7-8: Strong Understanding - Clear grasp of AI applications</List.Item>
                        <List.Item>5-6: Basic Understanding - Some understanding demonstrated</List.Item>
                        <List.Item>3-4: Limited Understanding - Minimal understanding shown</List.Item>
                        <List.Item>1-2: No Understanding - No understanding demonstrated</List.Item>
                      </List>
                    </BlockStack>
                  </Card>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Box>
  );
};

export default AIInterviewAnalysis; 