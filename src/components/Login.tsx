import React, { useState, KeyboardEvent } from 'react';
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
    if (password === 'shopify') {
      localStorage.setItem('isAuthenticated', 'true');
      onLogin(true);
    } else {
      setError('Incorrect password');
      onLogin(false);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Page>
      <Box padding="16">
        <Card>
          <BlockStack gap="4">
            <Box padding="4">
              <Text as="h2" variant="headingLg">
                Shopify Revenue AI Analysis Dashboard
              </Text>
              <Box paddingTop="4">
                <Text as="p" variant="bodyMd">
                  Please enter the password to access this dashboard.
                </Text>
              </Box>
              <Box paddingTop="4">
                <FormLayout>
                  <TextField
                    type="password"
                    value={password}
                    onChange={setPassword}
                    error={error}
                    autoComplete="off"
                    label="Password"
                    onKeyPress={handleKeyPress}
                  />
                  <Button primary onClick={handleSubmit}>
                    Login
                  </Button>
                </FormLayout>
              </Box>
            </Box>
          </BlockStack>
        </Card>
      </Box>
    </Page>
  );
};

export default Login; 