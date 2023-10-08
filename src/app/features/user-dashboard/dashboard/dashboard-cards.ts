export interface DashboardCard {
  icon: string;
  title: string;
  description: string;
  link: string;
}

export const DASHBOARD_CARDS: DashboardCard[] = [
  {
    icon: 'pencil-outline',
    title: 'Edit Profile',
    description: 'Click to view and edit your profile details.',
    link: 'profile'
  },
  {
    icon: 'calendar-outline',
    title: 'Upcoming Events',
    description: 'Check out events you\'ve marked for the future.',
    link: 'upcoming-events'
  },
  {
    icon: 'time-outline',
    title: 'Past Events',
    description: 'Review events you\'ve attended in the past.',
    link: 'past-events'
  }
];
