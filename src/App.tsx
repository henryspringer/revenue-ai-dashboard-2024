import React, { useState } from 'react';
import { AppProvider, Frame, Page, Card, TextField, Button, Text, Box, FormLayout } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationComponent from './components/Navigation';
import AIImpactScore from './pages/AIImpactScore';
import AIInterviewAssignments from './pages/AIInterviewAssignments';
import AIInterviewAnalysis from './pages/AIInterviewAnalysis';

const PasswordPrompt: React.FC<{ onCorrectPassword: () => void }> = ({ onCorrectPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (password === 'shopify') {
      onCorrectPassword();
    } else {
      setError('Incorrect password');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Page>
      <Box padding="16">
        <Card>
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
                  Access Dashboard
                </Button>
              </FormLayout>
            </Box>
          </Box>
        </Card>
      </Box>
    </Page>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const [selected, setSelected] = React.useState('home');

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '') setSelected('home');
    else if (path === '/interview-assignments') setSelected('assignments');
    else if (path === '/interview-analysis') setSelected('analysis');
  }, [location]);

  return (
    <Frame navigation={<NavigationComponent selected={selected} onSelect={setSelected} />}>
      <Routes>
        <Route path="/" element={<AIImpactScore />} />
        <Route path="/interview-assignments" element={<AIInterviewAssignments />} />
        <Route path="/interview-analysis" element={<AIInterviewAnalysis />} />
      </Routes>
    </Frame>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AppProvider i18n={{}}>
      <Router>
        {!isAuthenticated ? (
          <PasswordPrompt onCorrectPassword={() => setIsAuthenticated(true)} />
        ) : (
          <AppContent />
        )}
      </Router>
    </AppProvider>
  );
};

export default App;
