import React, { useState, useMemo } from 'react';
import { Page, Layout, Card, DataTable, Text, Badge, List, ProgressBar, TextField } from '@shopify/polaris';
import { useNavigate } from 'react-router-dom';

interface RoleScores {
  'Task Automation': number;
  'Data Analysis': number;
  'Customer Interaction': number;
  'Strategic Planning': number;
}

interface CurrentState {
  aiAdoption: number;
  productivityIncrease: string;
}

interface RoleDetails {
  overallScore: number;
  scores: RoleScores;
  suggestions: string[];
  currentState: CurrentState;
  keyOpportunities: string[];
  readinessRequirements: string[];
}

const AIImpactScore: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const roleDetails: Record<string, RoleDetails> = {
    'Solutions Architect POS': {
      overallScore: 5.0,
      scores: {
        'Task Automation': 5,
        'Data Analysis': 6,
        'Customer Interaction': 4,
        'Strategic Planning': 5
      },
      suggestions: [
        'Use AI for basic technical documentation assistance',
        'Implement AI for initial requirement gathering and analysis',
        'Leverage AI for performance monitoring automation',
        'Utilize AI for basic architecture pattern suggestions'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '15-20%'
      },
      keyOpportunities: [
        'Basic technical documentation assistance',
        'Initial requirement gathering and analysis',
        'Performance monitoring automation',
        'Basic architecture pattern suggestions'
      ],
      readinessRequirements: [
        'Understanding of AI\'s current limitations in technical architecture',
        'Ability to validate AI-generated technical suggestions',
        'Experience with AI as a supplementary tool, not a replacement',
        'Strong foundation in traditional technical architecture'
      ]
    },
    'Account Executive (Existing Business - EMEA)': {
      overallScore: 6.0,
      scores: {
        'Task Automation': 6,
        'Data Analysis': 7,
        'Customer Interaction': 5,
        'Strategic Planning': 6
      },
      suggestions: [
        'Implement AI for automated account health monitoring',
        'Use AI for expansion opportunity identification',
        'Leverage AI for smart CRM data management',
        'Utilize AI for performance analytics and reporting'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '15-20%'
      },
      keyOpportunities: [
        'Automated account health monitoring',
        'Expansion opportunity identification',
        'Smart CRM data management',
        'Performance analytics and reporting'
      ],
      readinessRequirements: [
        'Comfort with AI account management tools',
        'Ability to interpret AI-generated insights',
        'Experience with AI-enhanced CRM systems',
        'Data-driven decision making skills'
      ]
    },
    'Sales Development Representative (SDR)': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 8,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 5
      },
      suggestions: [
        'Implement AI for automated lead scoring and outreach',
        'Use AI for prospect research and analysis',
        'Leverage AI for CRM data management',
        'Utilize AI for performance analytics'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Automated lead scoring and outreach',
        'Prospect research and analysis',
        'CRM data management',
        'Performance analytics'
      ],
      readinessRequirements: [
        'Comfort with AI tools',
        'Data-driven mindset',
        'Willingness to learn new tools',
        'Ability to demonstrate AI usage'
      ]
    },
    'Regional L&D Lead, GTM Enablement': {
      overallScore: 7.0,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 8,
        'Customer Interaction': 6,
        'Strategic Planning': 7
      },
      suggestions: [
        'Use AI to personalize learning paths',
        'Leverage AI for content creation and localization',
        'Implement AI for skill gap analysis',
        'Utilize AI for automated coaching and feedback'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '25-30%'
      },
      keyOpportunities: [
        'Personalized learning paths',
        'Content creation and localization',
        'Skill gap analysis',
        'Automated coaching'
      ],
      readinessRequirements: [
        'Understanding of AI in learning development',
        'Experience with content creation tools',
        'Ability to analyze learning effectiveness',
        'Comfort with automated coaching systems'
      ]
    },
    'Channel Partner Manager (Singapore)': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 6
      },
      suggestions: [
        'Implement AI for automated partner performance tracking',
        'Use AI for partner communication templates',
        'Leverage AI for partner program management',
        'Utilize AI for growth opportunity identification'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Automated partner performance tracking',
        'AI-powered partner communication',
        'Partner program management automation',
        'Growth opportunity identification'
      ],
      readinessRequirements: [
        'Comfort with AI tools',
        'Data-driven mindset',
        'Willingness to learn new tools',
        'Ability to demonstrate AI usage',
        'Understanding of partner success metrics'
      ]
    },
    'Enterprise Account Executive (Global Accounts)': {
      overallScore: 6.0,
      scores: {
        'Task Automation': 6,
        'Data Analysis': 7,
        'Customer Interaction': 5,
        'Strategic Planning': 6
      },
      suggestions: [
        'Use AI to analyze prospect\'s digital footprint',
        'Leverage AI for competitive intelligence gathering',
        'Implement AI for customized ROI models',
        'Utilize AI for stakeholder analysis'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Digital footprint analysis',
        'Competitive intelligence',
        'Customized ROI modeling',
        'Stakeholder analysis'
      ],
      readinessRequirements: [
        'Understanding of AI analysis tools',
        'Experience with enterprise sales',
        'Ability to interpret complex data',
        'Comfort with AI-assisted enterprise selling'
      ]
    },
    'Merchant Success Manager': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 6
      },
      suggestions: [
        'Implement AI for automated merchant performance tracking',
        'Use AI for merchant communication templates',
        'Leverage AI for success program management',
        'Utilize AI for growth opportunity identification'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Automated merchant performance tracking',
        'AI-powered merchant communication',
        'Success program management automation',
        'Growth opportunity identification'
      ],
      readinessRequirements: [
        'Comfort with AI tools',
        'Data-driven mindset',
        'Willingness to learn new tools',
        'Ability to demonstrate AI usage',
        'Understanding of merchant success metrics'
      ]
    },
    'Partner Marketing Manager (Longtail Agency Partners)': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 6
      },
      suggestions: [
        'Implement AI for automated marketing performance tracking',
        'Use AI for partner communication templates',
        'Leverage AI for campaign management',
        'Utilize AI for content creation and optimization'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Automated marketing performance tracking',
        'AI-powered partner communication',
        'Campaign management automation',
        'Content creation and optimization'
      ],
      readinessRequirements: [
        'Comfort with AI tools',
        'Data-driven mindset',
        'Willingness to learn new tools',
        'Ability to demonstrate AI usage',
        'Understanding of marketing success metrics'
      ]
    },
    'Revenue Operations Specialist (Launch Operations)': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 6
      },
      suggestions: [
        'Implement AI for automated operations performance tracking',
        'Use AI for communication templates',
        'Leverage AI for program management',
        'Utilize AI for growth opportunity identification'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Automated operations performance tracking',
        'AI-powered communication',
        'Program management automation',
        'Growth opportunity identification'
      ],
      readinessRequirements: [
        'Comfort with AI tools',
        'Data-driven mindset',
        'Willingness to learn new tools',
        'Ability to demonstrate AI usage',
        'Understanding of operations success metrics'
      ]
    },
    'Revenue Operations Specialist': {
      overallScore: 7.5,
      scores: {
        'Task Automation': 8,
        'Data Analysis': 8,
        'Customer Interaction': 6,
        'Strategic Planning': 8
      },
      suggestions: [
        'Implement AI for process mapping and bottleneck analysis',
        'Use AI for cross-team coordination and automated checkpoints',
        'Leverage AI-powered dashboards for real-time launch tracking',
        'Utilize AI for automated workflow optimization'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '25-30%'
      },
      keyOpportunities: [
        'Process automation and optimization',
        'Cross-team coordination',
        'Real-time tracking and analytics',
        'Workflow automation'
      ],
      readinessRequirements: [
        'Understanding of AI process mapping tools',
        'Experience with workflow automation',
        'Ability to analyze and optimize processes',
        'Comfort with data-driven decision making'
      ]
    },
    'SMB Account Executive': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 6
      },
      suggestions: [
        'Use AI to quickly research competitor weaknesses',
        'Leverage AI for custom pitch deck creation',
        'Implement AI for ROI calculations and comparisons',
        'Utilize AI for prospect research and analysis'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Competitor research automation',
        'Custom pitch creation',
        'ROI analysis automation',
        'Prospect research'
      ],
      readinessRequirements: [
        'Understanding of AI research tools',
        'Experience with presentation automation',
        'Ability to analyze sales data',
        'Comfort with AI-assisted selling'
      ]
    },
    'Enterprise Account Executive': {
      overallScore: 6.0,
      scores: {
        'Task Automation': 6,
        'Data Analysis': 7,
        'Customer Interaction': 5,
        'Strategic Planning': 6
      },
      suggestions: [
        'Use AI to analyze prospect\'s digital footprint',
        'Leverage AI for competitive intelligence gathering',
        'Implement AI for customized ROI models',
        'Utilize AI for stakeholder analysis'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Digital footprint analysis',
        'Competitive intelligence',
        'Customized ROI modeling',
        'Stakeholder analysis'
      ],
      readinessRequirements: [
        'Understanding of AI analysis tools',
        'Experience with enterprise sales',
        'Ability to interpret complex data',
        'Comfort with AI-assisted enterprise selling'
      ]
    },
    'Senior Solutions Engineer': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 6
      },
      suggestions: [
        'Use AI to map integration dependencies',
        'Leverage AI for technical documentation',
        'Implement AI for compliance requirement analysis',
        'Utilize AI for solution architecture visualization'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Integration mapping automation',
        'Technical documentation',
        'Compliance analysis',
        'Architecture visualization'
      ],
      readinessRequirements: [
        'Understanding of AI technical tools',
        'Experience with system architecture',
        'Ability to analyze technical requirements',
        'Comfort with AI-assisted engineering'
      ]
    },
    'Channel Partner Manager': {
      overallScore: 6.5,
      scores: {
        'Task Automation': 7,
        'Data Analysis': 7,
        'Customer Interaction': 6,
        'Strategic Planning': 6
      },
      suggestions: [
        'Use AI to analyze partner performance patterns',
        'Leverage AI for personalized partner playbooks',
        'Implement AI for market opportunity analysis',
        'Utilize AI for partner communication automation'
      ],
      currentState: {
        aiAdoption: 2,
        productivityIncrease: '20-25%'
      },
      keyOpportunities: [
        'Partner performance analysis',
        'Personalized playbooks',
        'Market opportunity analysis',
        'Communication automation'
      ],
      readinessRequirements: [
        'Understanding of AI partner tools',
        'Experience with partner management',
        'Ability to analyze partner data',
        'Comfort with AI-assisted partner relations'
      ]
    }
  };

  const filteredRoles = useMemo(() => {
    return Object.entries(roleDetails)
      .filter(([role]) => 
        role.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort(([, a], [, b]) => b.overallScore - a.overallScore)
      .map(([role]) => role);
  }, [searchQuery]);

  const averageScore = useMemo(() => {
    const scores = Object.values(roleDetails).map(details => details.overallScore);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  }, []);

  const toggleRole = (role: string) => {
    setSelectedRole(prev => prev === role ? null : role);
  };

  const rows = filteredRoles.map(role => {
    const details = roleDetails[role];
    const isSelected = selectedRole === role;
    
    return [
      <div 
        onClick={() => toggleRole(role)}
        style={{ cursor: 'pointer', color: '#008060' }}
      >
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          {role}
        </Text>
      </div>,
      <Badge tone={details.overallScore >= 7 ? 'success' : 'warning'}>
        {`${details.overallScore}/10`}
      </Badge>,
      <Text as="span" tone="subdued">
        {details.suggestions[0]}
      </Text>
    ];
  });

  const ScoreBar = ({ score }: { score: number }) => (
    <div style={{ width: '100%', marginTop: '0.5rem' }}>
      <ProgressBar progress={score * 10} size="small" />
    </div>
  );

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const roles = Object.entries(roleDetails);
    const totalRoles = roles.length;
    const avgScore = (roles.reduce((sum, [_, details]) => sum + details.overallScore, 0) / totalRoles).toFixed(1);
    return { totalRoles, avgScore };
  }, []);

  return (
    <Page
      title="AI Impact Score"
      subtitle="Evaluate and track AI readiness and impact across different roles"
    >
      <Layout>
        {/* Condensed Summary Section */}
        <Layout.Section>
          <Card>
            <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div>
                <Text variant="headingMd" as="h2" tone="success">Current AI Readiness</Text>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                  <Text as="span">Roles Analyzed: <strong>{summaryStats.totalRoles}</strong></Text>
                  <Text as="span">Avg Impact Score: <strong>{summaryStats.avgScore}/10</strong></Text>
                  <Text as="span">Current AI Adoption: <strong>2/10</strong></Text>
                  <Text as="span">Expected Productivity Gain: <strong>10-25%</strong></Text>
                </div>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: '1rem' }}>
              <Text as="h2" variant="headingMd" tone="success">Shopify AI Context</Text>
              <List>
                <List.Item>Employees have access to comprehensive AI tools</List.Item>
                <List.Item>Current AI adoption is at 2/10 across the organization</List.Item>
                <List.Item>Data integration with AI tools is still in progress</List.Item>
                <List.Item>Expected productivity increase: 10-25% in next 12 months</List.Item>
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
              headings={['Role', 'AI Impact Score', 'Top Suggestion']}
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
                  <Text as="h3" variant="headingSm">Scores</Text>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
                    {Object.entries(roleDetails[selectedRole].scores).map(([category, score]) => (
                      <div key={category} style={{ 
                        padding: '1rem',
                        backgroundColor: '#f6f6f7',
                        borderRadius: '4px'
                      }}>
                        <Text as="p" variant="bodyMd" tone="subdued">{category}</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Text as="p" variant="headingXl" fontWeight="bold">{score}/10</Text>
                          <ProgressBar progress={score * 10} size="small" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Suggestions for Improvement</Text>
                  <List>
                    {roleDetails[selectedRole].suggestions.map((suggestion, index) => (
                      <List.Item key={index}>{suggestion}</List.Item>
                    ))}
                  </List>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Current State</Text>
                  <div style={{ 
                    padding: '1rem',
                    backgroundColor: '#f6f6f7',
                    borderRadius: '4px',
                    marginTop: '0.5rem'
                  }}>
                    <Text as="p" variant="bodyMd">
                      AI Adoption Level: {roleDetails[selectedRole].currentState.aiAdoption}/10
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Expected Productivity Increase: {roleDetails[selectedRole].currentState.productivityIncrease}
                    </Text>
                  </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Key Opportunities</Text>
                  <List>
                    {roleDetails[selectedRole].keyOpportunities.map((opportunity, index) => (
                      <List.Item key={index}>{opportunity}</List.Item>
                    ))}
                  </List>
                </div>

                <div style={{ marginTop: '1rem' }}>
                  <Text as="h3" variant="headingSm">Readiness Requirements</Text>
                  <List>
                    {roleDetails[selectedRole].readinessRequirements.map((requirement, index) => (
                      <List.Item key={index}>{requirement}</List.Item>
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

export default AIImpactScore; 