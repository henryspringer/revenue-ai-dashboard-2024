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
  Badge
} from '@shopify/polaris';

interface AnalysisResult {
  score: number;
  strengths: string[];
  areasForImprovement: string[];
  aiUsagePatterns: string[];
}

const AIInterviewAnalysis: React.FC = () => {
  const [transcript, setTranscript] = useState('');
  const [candidateOutput, setCandidateOutput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeTranscript = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        score: 7.5,
        strengths: [
          'Demonstrated strong AI tool selection',
          'Effective use of AI for research and analysis',
          'Clear explanation of AI-assisted approach'
        ],
        areasForImprovement: [
          'Could leverage AI more for data visualization',
          'Opportunity to use AI for stakeholder analysis',
          'Consider using AI for competitive intelligence'
        ],
        aiUsagePatterns: [
          'Used AI for initial research (3 instances)',
          'Leveraged AI for data analysis (2 instances)',
          'Applied AI for presentation creation (1 instance)'
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <Page
      title="AI Interview Analysis"
      subtitle="Analyze candidate responses and AI readiness through detailed scoring and feedback mechanisms."
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Transcript Analysis</Text>
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
                  <ProgressBar progress={analysisResult.score * 10} size="medium" />
                  <Text as="p" variant="bodyMd">
                    {analysisResult.score}/10
                  </Text>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Strengths</Text>
                  <List>
                    {analysisResult.strengths.map((strength, index) => (
                      <List.Item key={index}>
                        <Badge tone="success">{strength}</Badge>
                      </List.Item>
                    ))}
                  </List>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">Areas for Improvement</Text>
                  <List>
                    {analysisResult.areasForImprovement.map((area, index) => (
                      <List.Item key={index}>
                        <Badge tone="warning">{area}</Badge>
                      </List.Item>
                    ))}
                  </List>
                </BlockStack>

                <BlockStack gap="200">
                  <Text as="h3" variant="headingSm">AI Usage Patterns</Text>
                  <List>
                    {analysisResult.aiUsagePatterns.map((pattern, index) => (
                      <List.Item key={index}>
                        <Badge tone="info">{pattern}</Badge>
                      </List.Item>
                    ))}
                  </List>
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