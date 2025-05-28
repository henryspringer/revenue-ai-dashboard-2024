import React, { useState, useEffect } from 'react';
import {
  AppProvider,
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
  Banner,
  FormLayout
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
    if (password === 'nationaltreasure') {
      // Store authentication with a timestamp
      const authData = {
        isAuthenticated: true,
        timestamp: Date.now()
      };
      localStorage.setItem('cageAuth', JSON.stringify(authData));
      onCorrectPassword();
    } else {
      setError('Incorrect password - The Declaration of Independence remains hidden');
    }
  };

  return (
    <Page fullWidth>
      <div style={{ padding: '2rem' }}>
        <Card>
          <div style={{ padding: '1rem' }}>
            <Text as="h2" variant="headingLg" tone="success">
              Nicolas Cage Movie Excellence Dashboard
            </Text>
            <div style={{ paddingTop: '1rem' }}>
              <Text as="p" variant="bodyMd">
                Enter the secret password to access the Cage-o-meter™ and discover which roles are worthy of the One True God.
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
                  label="Password (Hint: His greatest treasure hunt)"
                  onBlur={() => {}}
                  onFocus={() => {}}
                />
                <div style={{ marginTop: '1rem' }}>
                  <Button variant="primary" onClick={handleSubmit} tone="success">
                    Steal the Declaration
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
    localStorage.removeItem('cageAuth');
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
        <div style={{ 
          padding: '1rem', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #d4af37',
          backgroundColor: '#d4af37',
          boxShadow: '0 2px 4px rgba(212, 175, 55, 0.3)'
        }}>
          <Text as="h1" variant="headingLg" fontWeight="bold" tone="base">
            Nicolas Cage Acting Method Analysis System
          </Text>
          <Button onClick={handleLogout} tone="success">Put the Bunny Back in the Box</Button>
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
      const authData = localStorage.getItem('cageAuth');
      if (authData) {
        try {
          const { isAuthenticated, timestamp } = JSON.parse(authData);
          // Check if authentication is less than 24 hours old
          if (isAuthenticated && Date.now() - timestamp < 24 * 60 * 60 * 1000) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('cageAuth');
          }
        } catch (e) {
          localStorage.removeItem('cageAuth');
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
