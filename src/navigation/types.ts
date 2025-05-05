import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  MainApp: NavigatorScreenParams<BottomTabParamList>;
  // Assessment Flow
  InformationGathering: undefined;
  GymType: undefined;
  GymEquipment: undefined;
  EmploymentType: undefined;
  WorkoutDuration: undefined;
  ExerciseFrequency: undefined;

  // After Step 2
  GoalsAndProgramInterest: undefined;
  InjuryHistory: undefined;
  Surgeries: undefined;
  DiseasesHealthIssues: undefined;
  BodyFatLossGoals: undefined;
  BodyWeightGoals: undefined;
  // After Step 3
  PhysicalAssessment: undefined;
  HeartRateAssessment: undefined;
  LiftingAssessment: undefined;

  // After Step 4
  DataReview: undefined;
  DataReview2: undefined;
  DataReview3: undefined;

  Confirmation: undefined;
  // After Step 5
  TailoredSolution: undefined;
  SubscriptionStar: undefined;

  // Existing screens
  ProductDetail: {productId: string};
  NewArrival: undefined;
  Home: undefined;
  Profile: undefined;
  MyOrders: undefined;
  ViewOrders: undefined;
  MyInvoices: undefined;
  Onboarding: undefined;
  Welcome: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Categories: undefined;
  Orders: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
