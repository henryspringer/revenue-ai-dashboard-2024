import React, { useState, useEffect } from 'react';
import {
  Frame,
  Navigation,
  TopBar,
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
import '@shopify/polaris/build/esm/styles.css';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NavigationComponent from './components/Navigation';
import AIImpactScore from './pages/AIImpactScore';
import AIInterviewAssignments from './pages/AIInterviewAssignments';
import AIInterviewAnalysis from './pages/AIInterviewAnalysis';

const PasswordPrompt: React.FC<{ onCorrectPassword: () => void }> = ({ onCorrectPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (password === 'shopify') {
      // Store authentication with a timestamp
      const authData = {
        isAuthenticated: true,
        timestamp: Date.now()
      };
      localStorage.setItem('shopifyAuth', JSON.stringify(authData));
      onCorrectPassword();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <Page fullWidth>
      <div style={{ padding: '2rem' }}>
        <Card>
          <div style={{ padding: '1rem' }}>
            <Text as="h2" variant="headingLg">
              Shopify Revenue AI Analysis Dashboard
            </Text>
            <div style={{ paddingTop: '1rem' }}>
              <Text as="p" variant="bodyMd">
                Please enter the password to access this dashboard.
              </Text>
            </div>
            <div style={{ paddingTop: '1rem' }}>
              <FormLayout>
                <TextField
                  type="password"
                  value={password}
                  onChange={setPassword}
                  error={error}
                  autoComplete="off"
                  label="Password"
                  onBlur={() => {}}
                  onFocus={() => {}}
                />
                <div style={{ marginTop: '1rem' }}>
                  <Button variant="primary" onClick={handleSubmit}>
                    Access Dashboard
                  </Button>
                </div>
              </FormLayout>
            </div>
          </div>
        </Card>
      </div>
    </Page>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState('home');

  const handleLogout = () => {
    localStorage.removeItem('shopifyAuth');
    navigate('/');
    window.location.reload();
  };

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '') setSelected('home');
    else if (path === '/interview-assignments') setSelected('assignments');
    else if (path === '/interview-analysis') setSelected('analysis');
  }, [location]);

  return (
    <Frame 
      navigation={<NavigationComponent selected={selected} onSelect={setSelected} />}
      topBar={
        <div style={{ padding: '0.5rem 1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      }
    >
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

  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('shopifyAuth');
      if (authData) {
        try {
          const { isAuthenticated, timestamp } = JSON.parse(authData);
          // Check if authentication is less than 24 hours old
          if (isAuthenticated && Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('shopifyAuth');
          }
        } catch (e) {
          localStorage.removeItem('shopifyAuth');
        }
      }
    };

    checkAuth();
    // Check auth every minute
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

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
