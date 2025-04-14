import React from 'react';
import { Page, Layout, Card, Text } from '@shopify/polaris';

const AIInterviewAnalysis: React.FC = () => {
  return (
    <Page title="AI Interview Analysis">
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2" variant="headingMd">
              Coming Soon
            </Text>
            <Text as="p">
              This page will allow you to analyze candidate responses and assess their AI readiness.
              Features will include:
            </Text>
            <ul>
              <li>Transcript analysis</li>
              <li>AI readiness scoring</li>
              <li>Response quality assessment</li>
              <li>Detailed feedback generation</li>
            </ul>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default AIInterviewAnalysis; 