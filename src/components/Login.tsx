import React, { useState } from 'react';
import {
  Page,
  Card,
  FormLayout,
  TextField,
  Button,
  Text,
  Box,
  BlockStack
} from '@shopify/polaris';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    // This is a simple example - in a real app, you'd want to use environment variables
    // and proper encryption for the password
    if (password === 'ShopifyRevenue2024') {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin(true);
    } else {
      setError('Incorrect password');
      onLogin(false);
    }
  };

  return (
    <Page>
      <Box paddingTop="16">
        <Card>
          <BlockStack gap="4">
            <Text as="h2" variant="headingLg">
              Shopify Revenue AI Analysis Dashboard
            </Text>
            <Text as="p" variant="bodyMd">
              Please enter the password to access this dashboard.
            </Text>
            <FormLayout>
              <TextField
                type="password"
                value={password}
                onChange={setPassword}
                error={error}
                autoComplete="off"
                label="Password"
              />
              <Button primary onClick={handleSubmit}>
                Login
              </Button>
            </FormLayout>
          </BlockStack>
        </Card>
      </Box>
    </Page>
  );
};

export default Login; 