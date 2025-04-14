import React from 'react';
import { Navigation as PolarisNavigation } from '@shopify/polaris';
import { HomeMinor, ListMinor, AnalyticsMinor } from '@shopify/polaris-icons';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  selected: string;
  onSelect: (selected: string) => void;
}

const NavigationComponent: React.FC<NavigationProps> = ({ selected, onSelect }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string, selected: string) => {
    navigate(path);
    onSelect(selected);
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

export default NavigationComponent; 