import React from 'react';
import { Frame, Navigation, Badge } from '@shopify/polaris';
import { HomeIcon, ListBulletedIcon, ChartLineIcon } from '@shopify/polaris-icons';
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
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            label: 'AI Impact Score Analysis',
            icon: HomeIcon,
            selected: location.pathname === '/',
            onClick: () => handleNavigation('/', 'home'),
          },
          {
            label: 'AI Interview Assignments',
            icon: ListBulletedIcon,
            selected: location.pathname === '/interview-assignments',
            onClick: () => handleNavigation('/interview-assignments', 'assignments'),
          },
          {
            label: 'AI Interview Analysis',
            icon: ChartLineIcon,
            selected: location.pathname === '/interview-analysis',
            onClick: () => handleNavigation('/interview-analysis', 'analysis'),
          },
        ]}
      />
    </Navigation>
  );
};

export default NavigationComponent; 