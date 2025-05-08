import React, { useState, useMemo } from 'react';
import { Page, Layout, Card, DataTable, Text, Badge, List, TextField } from '@shopify/polaris';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

interface InterviewAssignment {
  role: string;
  scenario: string;
  time: string;
  context: string[];
  task: string;
  evaluationCriteria: string[];
  successIndicators: string[];
  failureIndicators: string[];
}

const AIInterviewAssignments: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const toggleRole = (role: string) => {
    setSelectedRole(prev => prev === role ? null : role);
  };

  const assignments: Record<string, InterviewAssignment> = {
    'Revenue Operations Specialist': {
      role: 'Revenue Operations Specialist',
      scenario: 'Enterprise Launch Challenge',
      time: '10 minutes prep + discussion',
      context: [
        'You\'re joining our Revenue Operations team',
        'Enterprise merchant launches currently take 45 days post-sale',
        'Leadership target is 15 days',
        'Market standard is 20 days',
        'Multiple teams involved: Solutions Engineering, Customer Success, Payments, Apps',
        'Process includes: Technical setup, payment config, data migration, team training',
        'Impact on merchant satisfaction and time-to-value'
      ],
      task: 'You have 10 minutes to prepare a presentation for the launch operations team on how you would approach solving this challenge. The team wants to understand your methodology for diagnosing and addressing the delays.',
      evaluationCriteria: [
        'Systems thinking: Can they break down a complex, multi-team process?',
        'Data approach: How would they measure and track improvements?',
        'Scale mindset: Are solutions repeatable and automated?'
      ],
      successIndicators: [
        'Immediately think to use AI for process mapping and bottleneck analysis',
        'Consider AI for cross-team coordination and automated checkpoints',
        'Suggest AI-powered dashboards for real-time launch tracking'
      ],
      failureIndicators: [
        'Focus only on manual process improvements',
        'Ignore cross-team coordination challenges',
        'Lack of data-driven approach to problem-solving'
      ]
    },
    'Regional L&D Lead, GTM Enablement': {
      role: 'Regional L&D Lead, GTM Enablement',
      scenario: 'Sales Enablement Transformation',
      time: '10 minutes prep + discussion',
      context: [
        'Leading GTM enablement for sales teams up to $150M segment',
        'Multiple products and updates launching next quarter',
        'Global sales team across different time zones',
        'Current training completion rate: 65%',
        'Need to improve time-to-productivity for new hires',
        'Have access to historical training data, product documentation, sales performance metrics, and current learning materials'
      ],
      task: 'You have 10 minutes to present your strategy for transforming our sales enablement approach. Focus on improving training completion rates and reducing time-to-productivity.',
      evaluationCriteria: [
        'Learning strategy: How they design scalable programs',
        'Engagement approach: How they drive adoption',
        'Impact measurement: How they track and prove effectiveness'
      ],
      successIndicators: [
        'Use AI to personalize learning paths',
        'Leverage AI for content creation and localization',
        'Think to use AI for skill gap analysis',
        'Consider AI for automated coaching and feedback'
      ],
      failureIndicators: [
        'Focus only on traditional training methods',
        'Ignore personalization opportunities',
        'Lack of data-driven approach to learning effectiveness'
      ]
    },
    'SMB Account Executive': {
      role: 'SMB Account Executive',
      scenario: 'Merchant Solution Design',
      time: '10 minutes prep + discussion',
      context: [
        'Prospect: Growing DTC brand, $5M annual revenue',
        'Currently using competitor platform',
        'Main challenges: inventory management, international expansion',
        'You have access to Shopify\'s full solution set'
      ],
      task: 'You have 10 minutes to prepare for this meeting. How would you approach building your value proposition?',
      evaluationCriteria: [
        'Research depth: How they gather and analyze competitor info',
        'Solution design: How they customize for specific needs',
        'Value articulation: How they build compelling presentations'
      ],
      successIndicators: [
        'Use AI to quickly research competitor weaknesses',
        'Leverage AI for custom pitch deck creation',
        'Use AI to generate ROI calculations and comparisons'
      ],
      failureIndicators: [
        'Rely solely on manual research',
        'Use generic pitch materials',
        'Lack of data-driven value proposition'
      ]
    },
    'Enterprise Account Executive': {
      role: 'Enterprise Account Executive',
      scenario: 'Enterprise Migration Strategy',
      time: '10 minutes prep + discussion',
      context: [
        'Fortune 500 retail prospect, $2B annual ecommerce revenue',
        'Currently using legacy on-premise commerce platform',
        'Pain points: High maintenance costs ($10M/year), slow feature deployment (6-month cycles), limited international capabilities, complex integration landscape',
        'Considering multi-year digital transformation'
      ],
      task: 'You have 10 minutes to prepare for a meeting with their C-suite. How would you approach building the business case for Shopify?',
      evaluationCriteria: [
        'Strategic thinking: How they approach enterprise-scale transformation',
        'Risk assessment: How they identify and address concerns',
        'Value storytelling: How they build executive-level narratives'
      ],
      successIndicators: [
        'Use AI to analyze the prospect\'s digital footprint',
        'Leverage AI for competitive intelligence gathering',
        'Use AI to generate customized ROI models',
        'Think to use AI for stakeholder analysis'
      ],
      failureIndicators: [
        'Rely on generic enterprise sales approach',
        'Lack of data-driven business case',
        'Ignore stakeholder-specific concerns'
      ]
    },
    'Senior Solutions Engineer': {
      role: 'Senior Solutions Engineer',
      scenario: 'Technical Discovery Challenge',
      time: '10 minutes prep + discussion',
      context: [
        'Enterprise prospect in financial services',
        'Complex requirements: 100+ third-party integrations, custom checkout flow, regulatory compliance needs, legacy system dependencies',
        'Technical stakeholders from 6 different teams'
      ],
      task: 'You have 10 minutes to prepare for a technical discovery session. How would you approach understanding and documenting their requirements?',
      evaluationCriteria: [
        'Technical depth: How they assess complex architectures',
        'Solution design: How they approach integration challenges',
        'Documentation: How they capture and share technical requirements'
      ],
      successIndicators: [
        'Use AI to map integration dependencies',
        'Leverage AI for technical documentation',
        'Think to use AI for compliance requirement analysis',
        'Consider AI for solution architecture visualization'
      ],
      failureIndicators: [
        'Focus only on manual documentation',
        'Ignore integration complexity',
        'Lack of systematic approach to requirements gathering'
      ]
    },
    'Channel Partner Manager': {
      role: 'Channel Partner Manager',
      scenario: 'Partner Growth Strategy',
      time: '10 minutes prep + discussion',
      context: [
        'You manage APAC channel partners up to $150M revenue',
        'Mix of established and growing partners',
        'Recent platform updates: New B2B capabilities, enhanced international features, updated API infrastructure',
        'Partners need to hit 30% YoY growth targets',
        'Market showing increased competition'
      ],
      task: 'You have 10 minutes to prepare a strategy presentation for three different partner segments: New (<$1M), Growing ($1-50M), and Strategic ($50-150M). How would you approach enabling their growth?',
      evaluationCriteria: [
        'Partner segmentation: How they customize approaches for different partner types',
        'Growth strategy: How they identify and activate opportunities',
        'Enablement planning: How they scale partner support'
      ],
      successIndicators: [
        'Use AI to analyze partner performance patterns',
        'Leverage AI for personalized partner playbooks',
        'Think to use AI for market opportunity analysis',
        'Consider AI for partner communication automation'
      ],
      failureIndicators: [
        'Apply one-size-fits-all approach',
        'Ignore partner-specific needs',
        'Lack of data-driven growth strategy'
      ]
    }
  };

  const filteredAssignments = useMemo(() => {
    return Object.entries(assignments)
      .filter(([role]) => 
        role.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(([role, assignment]) => ({
        ...assignment
      }));
  }, [searchQuery]);

  const rows = filteredAssignments.map(assignment => {
    const isSelected = selectedRole === assignment.role;
    return [
      <div 
        onClick={() => toggleRole(assignment.role)}
        style={{ cursor: 'pointer', color: '#008060' }}
      >
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {assignment.role}
        </Text>
      </div>,
      <Text as="span" variant="bodyMd">
        {assignment.scenario}
      </Text>,
      <Text as="span" variant="bodyMd">
        {assignment.time}
      </Text>
    ];
  });

  return (
    <Page
      title="AI Interview Assignments"
      subtitle="Review and manage AI-focused interview scenarios and evaluation criteria"
    >
      <Layout>
        {/* What we are trying to achieve Block */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '1rem' }}>
              <Text as="h2" variant="headingMd" tone="success">What we are trying to achieve</Text>
              <Text as="p" variant="bodyMd">
                Building an AI-first hiring framework across Revenue to identify candidates who naturally leverage AI tools. This interview assignment is designed to assess how candidates approach real-world sales scenarios using AI tools, creativity, and problem-solving.
              </Text>
            </div>
          </Card>
        </Layout.Section>
        {/* How to run the assignment Block */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '1rem' }}>
              <Text as="h2" variant="headingMd" tone="success">How to run the assignment</Text>
              <List>
                <List.Item>Review the assignment brief.</List.Item>
                <List.Item>Ask the candidate to complete the task using any tools they wish.</List.Item>
                <List.Item>
                  <RouterLink to="/interview-analysis">
                    Submit their output for AI-driven analysis and feedback.
                  </RouterLink>
                </List.Item>
              </List>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: '1rem' }}>
              <TextField
                label="Search Roles"
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search by job title..."
                autoComplete="off"
              />
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <DataTable
              columnContentTypes={['text', 'text', 'text']}
              headings={['Role', 'Scenario', 'Time']}
              rows={rows}
            />
          </Card>
        </Layout.Section>

        {selectedRole && (
          <Layout.Section>
            <Card>
              <div style={{ padding: '1rem' }}>
                <div 
                  onClick={() => toggleRole(selectedRole)}
                  style={{ cursor: 'pointer', marginBottom: '1rem' }}
                >
                  <Text as="h2" variant="headingMd" tone="success">
                    {selectedRole}
                  </Text>
                </div>
                
                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Scenario</Text>
                  <Text as="p" variant="bodyMd">{assignments[selectedRole].scenario}</Text>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Context</Text>
                  <List>
                    {assignments[selectedRole].context.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Task</Text>
                  <Text as="p" variant="bodyMd">{assignments[selectedRole].task}</Text>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Evaluation Criteria</Text>
                  <List>
                    {assignments[selectedRole].evaluationCriteria.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Success Indicators</Text>
                  <List>
                    {assignments[selectedRole].successIndicators.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Failure Indicators</Text>
                  <List>
                    {assignments[selectedRole].failureIndicators.map((item, index) => (
                      <List.Item key={index}>{item}</List.Item>
                    ))}
                  </List>
                </div>
              </div>
            </Card>
          </Layout.Section>
        )}
      </Layout>
    </Page>
  );
};

export default AIInterviewAssignments; 