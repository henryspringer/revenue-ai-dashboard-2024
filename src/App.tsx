import React from 'react';
import { AppProvider, Frame } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavigationComponent from './components/Navigation';
import AIImpactScore from './pages/AIImpactScore';
import AIInterviewAssignments from './pages/AIInterviewAssignments';
import AIInterviewAnalysis from './pages/AIInterviewAnalysis';

const AppContent: React.FC = () => {
  const location = useLocation();
  const [selected, setSelected] = React.useState('home');

  React.useEffect(() => {
    const path = location.pathname;
    if (path === '/') setSelected('home');
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
  return (
    <AppProvider i18n={{}}>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
