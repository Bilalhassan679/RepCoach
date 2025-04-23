export type OnboardingItem = {
  id: string;
  title: string;
  subtitle: string;
  image: any;
  backgroundColor: string;
};

export const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Welcome to Famous Gold',
    subtitle: 'Fine Gold Jewelry\nSince 2001',
    image: require('../assets/images/Splash.png'),
    backgroundColor: '#5D0C1D', // Dark maroon
  },
  {
    id: '2',
    title: 'Jewelry You Can Trust',
    subtitle: 'Quality that Deserves',
    image: require('../assets/images/Splash.png'),
    backgroundColor: '#5D0C1D',
  },
  {
    id: '3',
    title: 'Get Started',
    subtitle: "We're the name of trusted and real jewelry",
    image: require('../assets/images/Splash.png'),
    backgroundColor: '#5D0C1D',
  },
];
