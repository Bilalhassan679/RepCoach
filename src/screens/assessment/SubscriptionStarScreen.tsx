import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { hp, wp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { subscriptionbg, substar } from '../../assets';

type Props = NativeStackScreenProps<RootStackParamList, 'SubscriptionStar'>;

interface Feature {
  id: string;
  text: string;
}

interface PlanDetails {
  price: string;
  features: Feature[];
}

const SubscriptionStarScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');

  const planDetails: Record<'basic' | 'premium', PlanDetails> = {
    basic: {
      price: '25',
      features: [
        { id: '1', text: 'Start today and upgrade any time.' },
        { id: '2', text: 'Basic workout plans and tracking.' },
        { id: '3', text: 'Standard support response time.' },
        { id: '4', text: 'Access to essential features.' },
      ],
    },
    premium: {
      price: '49',
      features: [
        { id: '1', text: 'All Basic features included.' },
        { id: '2', text: 'Advanced workout customization.' },
        { id: '3', text: 'Priority support 24/7.' },
        { id: '4', text: 'Exclusive premium content access.' },
      ],
    },
  };

  const currentPlan = useMemo(() => planDetails[selectedPlan], [selectedPlan]);

  const handlePurchase = () => {
    navigation.navigate('TailoredSolution');
  };

  const renderFeatureItem = ({ item }: { item: Feature }) => (
    <View style={styles.featureItem}>
      <View style={styles.checkmark}>
        <Text style={styles.checkmarkText}>✓</Text>
      </View>
      <Text style={styles.featureText}>{item.text}</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      <Text style={styles.title}>Subscription</Text>
      
      <View style={styles.planSelector}>
        <TouchableOpacity 
          style={[
            styles.planTab, 
            selectedPlan === 'basic' && styles.planTabActive
          ]}
          onPress={() => setSelectedPlan('basic')}
        >
          <Text style={[
            styles.planTabText,
            selectedPlan === 'basic' && styles.planTabTextActive
          ]}>Basic</Text>
          {selectedPlan === 'basic' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.planTab,
            selectedPlan === 'premium' && styles.planTabActive
          ]}
          onPress={() => setSelectedPlan('premium')}
        >
          <Text style={[
            styles.planTabText,
            selectedPlan === 'premium' && styles.planTabTextActive
          ]}>Premium</Text>
          {selectedPlan === 'premium' && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.priceSection}>
        <View style={styles.starContainer}>
          <Image source={substar} style={styles.starIcon} />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.superscript}>$</Text>
          <Text style={styles.price}>{currentPlan.price}</Text>
        </View>
      </View>
    </>
  );

  const renderFooter = () => (
    <TouchableOpacity
      style={[
        styles.button,
     
      ]}
      onPress={handlePurchase}
    >
      <Text style={styles.buttonText}>
        Purchase {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground 
      source={subscriptionbg} 
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={currentPlan.features}
          renderItem={renderFeatureItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          ListHeaderComponentStyle={styles.headerContainer}
          ListFooterComponentStyle={styles.footerContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: wp('100'),
    height: hp('100'),
    backgroundColor: 'black',
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingTop: hp('30'),
  },
  headerContainer: {
    marginBottom: hp(2),
  },
  footerContainer: {
    marginTop: 'auto',
    paddingBottom: hp(4),
  },
  separator: {
    height: 16,
  },
  title: {
    fontSize: scale(32),
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.WorkSansBold,
    marginBottom: hp('3'),
    textAlign: 'center',
  },
  planSelector: {
    flexDirection: 'row',
    marginBottom: hp('4%'),
  },
  planTab: {
    flex: 1,
    paddingVertical: 8,
    position: 'relative',
    
    borderColor:'#FF0000',
    borderRadius:hp('1'),
  },
  planTabActive: {
    backgroundColor: 'transparent',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#FF0000',
  },
  planTabText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansMedium,
    textAlign: 'center',
  },
  planTabTextActive: {
    color: '#FFFFFF',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('4%'),
    justifyContent: 'space-between',
  },
  starContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  starIcon: {
    width: wp('15'),
    height: wp('15'),
    resizeMode: 'contain',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  price: {
    fontSize: scale(60),
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.WorkSansBold,
    lineHeight: scale(70),
  },
  superscript: {
    fontSize: scale(24),
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.WorkSansBold,
    lineHeight: scale(35),
    marginTop: hp(1),
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: scale(12),
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: scale(14),
    fontFamily: typography.fontFamily.WorkSansRegular,
    flex: 1,
  },
  button: {
    backgroundColor: '#FF0000',
    height: 56,
    borderRadius: hp('1'),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('90'),
    marginTop:hp('6'),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: typography.fontFamily.WorkSansSemiBold,
  },

});

export default SubscriptionStarScreen; 