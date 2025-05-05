import React, {JSX} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import {useAuth} from '../context/AuthContext';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import {headerBg} from '../assets';
import {typography} from '../theme/typography';
import {scale} from '../theme/typography';
import {hp} from '../theme/responsive';
import ProfileScreen from '../screens/ProfileScreen';
import MyOrdersScreen from '../screens/MyOrders';
import ViewOrdersScreen from '../screens/ViewOrders';
import MyInvoicesScreen from '../screens/MyInvoices';
import ProductDetail from '../screens/ProductDetail';
import NewArrival from '../screens/NewArrival';
import { RootStackParamList } from './types';
import InformationGatheringScreen from '../screens/assessment/InformationGatheringScreen';
import GymTypeScreen from '../screens/assessment/GymTypeScreen';
import GymEquipmentScreen from '../screens/assessment/GymEquipmentScreen';
import EmploymentTypeScreen from '../screens/assessment/EmploymentTypeScreen';
import WorkoutDurationScreen from '../screens/assessment/WorkoutDurationScreen';
import ExerciseFrequencyScreen from '../screens/assessment/ExerciseFrequencyScreen';
import AuthNavigator from './AuthNavigator';
import TailoredSolutionScreen from '../screens/assessment/TailoredSolutionScreen';
import SubscriptionStarScreen from '../screens/assessment/SubscriptionStarScreen';
import ConfirmationScreen from '../screens/assessment/ConfirmationScreen';
import DataReview from '../screens/assessment/DataReview';
import DataReview2 from '../screens/assessment/DataReview2';
import DataReview3 from '../screens/assessment/DataReview3';
import HeartRateAssessmentScreen from '../screens/assessment/HeartRateAssessmentScreen';
import LiftingAssessmentScreen from '../screens/assessment/LiftingAssessmentScreen';
import PhysicalAssessmentScreen from '../screens/assessment/PhysicalAssessmentScreen';  
import GoalsAndProgramInterestScreen from '../screens/assessment/GoalsAndProgramInterestScreen';
import InjuryHistoryScreen from '../screens/assessment/InjuryHistoryScreen';
import SurgeriesScreen from '../screens/assessment/SurgeriesScreen';
import DiseasesHealthIssuesScreen from '../screens/assessment/DiseasesHealthIssuesScreen';
import BodyFatLossGoalsScreen from '../screens/assessment/BodyFatLossGoalsScreen';
import BodyWeightGoalsScreen from '../screens/assessment/BodyWeightGoalsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const CustomHeader = ({
  title,
  leftButton,
  rightButton,
}: {
  title: string;
  leftButton?: JSX.Element;
  rightButton?: JSX.Element;
}) => {
  return (
    <ImageBackground source={headerBg} style={styles.header} resizeMode="cover">
      <View style={styles.headerContent}>
        {leftButton && (
          <TouchableOpacity style={styles.leftButton}>
            {leftButton}
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
        {rightButton && (
          <TouchableOpacity style={styles.rightButton}>
            {rightButton}
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const RootNavigator = () => {
  const {isAuthenticated, isAssessmentCompleted} = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuthenticated ? (
           <Stack.Screen 
           name="ExerciseFrequency" 
           component={ExerciseFrequencyScreen} 
         />
        // Auth Stack
        // <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : !isAssessmentCompleted ? (
        // Assessment Flow
        <Stack.Group>
          <Stack.Screen 
            name="GoalsAndProgramInterest" 
            component={GoalsAndProgramInterestScreen} 
          />
          <Stack.Screen 
            name="InjuryHistory" 
            component={InjuryHistoryScreen} 
          />
          <Stack.Screen 
            name="Surgeries" 
            component={SurgeriesScreen} 
          />
          <Stack.Screen 
            name="DiseasesHealthIssues" 
            component={DiseasesHealthIssuesScreen} 
          />
          <Stack.Screen 
            name="BodyFatLossGoals" 
            component={BodyFatLossGoalsScreen} 
          />
          <Stack.Screen 
            name="BodyWeightGoals" 
            component={BodyWeightGoalsScreen} 
          />
          <Stack.Screen 
            name="PhysicalAssessment" 
            component={PhysicalAssessmentScreen} 
          />
          <Stack.Screen 
            name="HeartRateAssessment" 
            component={HeartRateAssessmentScreen} 
          />
          <Stack.Screen 
            name="LiftingAssessment" 
            component={LiftingAssessmentScreen} 
          />
          <Stack.Screen 
            name="DataReview" 
            component={DataReview} 
          />
          <Stack.Screen 
            name="DataReview2" 
            component={DataReview2} 
          />
          <Stack.Screen 
            name="DataReview3" 
            component={DataReview3} 
          />
          <Stack.Screen 
            name="Confirmation" 
            component={ConfirmationScreen} 
          />
          <Stack.Screen 
            name="SubscriptionStar" 
            component={SubscriptionStarScreen} 
          />
          <Stack.Screen 
            name="TailoredSolution" 
            component={TailoredSolutionScreen} 
          />
          <Stack.Screen 
            name="InformationGathering" 
            component={InformationGatheringScreen} 
          />
          <Stack.Screen 
            name="GymType" 
            component={GymTypeScreen} 
          />
          <Stack.Screen 
            name="GymEquipment" 
            component={GymEquipmentScreen} 
          />
          <Stack.Screen 
            name="EmploymentType" 
            component={EmploymentTypeScreen} 
          />
         
       
      
        </Stack.Group>
      ) : (
        // Main App Stack
        <Stack.Group>
          <Stack.Screen name="MainApp" component={BottomTabNavigator} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
          <Stack.Screen name="ViewOrders" component={ViewOrdersScreen} />
          <Stack.Screen name="MyInvoices" component={MyInvoicesScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="NewArrival" component={NewArrival} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  header: {
    height: hp(Platform.OS === 'ios' ? '13' : '9'),
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: scale(25),
    fontFamily: typography.fontFamily.WorkSansRegular,
  },
  headerContent: {
    width: '100%',
    alignItems: 'center',
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1000,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
});
