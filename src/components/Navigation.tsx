import React from 'react';
import { Navigation as PolarisNavigation } from '@shopify/polaris';
import { HomeMinor, ListMinor, AnalyticsMinor } from '@shopify/polaris-icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  selected: string;
  onSelect: (selected: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ selected, onSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string, key: string) => {
    navigate(path);
    onSelect(key);
  };

  return (
    <PolarisNavigation location="/">
      <PolarisNavigation.Section
        items={[
          {
            label: 'AI Impact Score',
            icon: HomeMinor,
            selected: location.pathname === '/',
            onClick: () => handleNavigation('/', 'home'),
          },
          {
            label: 'AI Interview Assignments',
            icon: ListMinor,
            selected: location.pathname === '/interview-assignments',
            onClick: () => handleNavigation('/interview-assignments', 'assignments'),
          },
          {
            label: 'AI Interview Analysis',
            icon: AnalyticsMinor,
            selected: location.pathname === '/interview-analysis',
            onClick: () => handleNavigation('/interview-analysis', 'analysis'),
          },
        ]}
      />
    </PolarisNavigation>
  );
};

export default Navigation; 