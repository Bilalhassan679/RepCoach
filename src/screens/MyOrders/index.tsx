import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { wp, hp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { arrowleft, arrowright } from '../../assets';
import { CustomHeader } from '../../navigation/RootNavigator';

type RootStackParamList = {
  ViewOrders: { orderId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ViewOrders'>;

type TabType = 'pending' | 'active' | 'history';

const MyOrdersScreen = () => {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const navigation = useNavigation<NavigationProp>();

  const renderTab = (tab: TabType, label: string) => (
    <TouchableOpacity
      style={[
        styles.tab,
        activeTab === tab && styles.activeTab,
      ]}
      onPress={() => setActiveTab(tab)}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === tab && styles.activeTabText,
        ]}
      >
        {label}
      </Text>
      {activeTab === tab && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  const renderOrderCard = (orderId: string, amount: string) => (
    <TouchableOpacity 
      style={styles.orderCard}
      onPress={() => navigation.navigate('ViewOrders', { orderId })}
    >
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order ID</Text>
        <Text style={styles.orderNumber}>{orderId}</Text>
      </View>
      <View style={styles.orderActions}>
        <Text style={styles.estimatedText}>Estimated price</Text>
        <Text style={styles.amount}>${amount}</Text>
        <TouchableOpacity 
          style={styles.viewButton}
          onPress={() => navigation.navigate('ViewOrders', { orderId })}
        >
          <Text style={styles.viewButtonText}>View order</Text>
          <Image 
            source={arrowright}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <CustomHeader title="My Orders" leftButton={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowleft} style={{width: 25, height: 27}} />
            </TouchableOpacity>
          } 
          />    
      <View style={styles.tabContainer}>
        {renderTab('pending', 'Pending')}
        {renderTab('active', 'Active')}
        {renderTab('history', 'History')}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'pending' && (
          <View style={styles.ordersList}>
            {renderOrderCard('#SB-001598', '140.00')}
            {renderOrderCard('#SB-001599', '235.50')}
            {renderOrderCard('#SB-001600', '180.75')}
            {renderOrderCard('#SB-001601', '320.25')}
          </View>
        )}
        
        {activeTab === 'active' && (
          <View style={styles.ordersList}>
            {renderOrderCard('#SB-001602', '190.00')}
            {renderOrderCard('#SB-001603', '275.00')}
          </View>
        )}
        
        {activeTab === 'history' && (
          <View style={styles.ordersList}>
            {renderOrderCard('#SB-001595', '120.50')}
            {renderOrderCard('#SB-001596', '445.75')}
            {renderOrderCard('#SB-001597', '165.25')}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    paddingHorizontal: wp('6'),
    paddingVertical: hp('2'),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.thin,
  },
  title: {
    fontSize: scale(32),
    fontFamily: typography.fontFamily.againstRegular,
    color: colors.text.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4'),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.thin,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('2'),
    position: 'relative',
  },
  activeTab: {
    borderBottomColor: colors.primary.main,
  },
  tabText: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.primary.main,
    fontFamily: typography.fontFamily.interMedium,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: colors.primary.main,
    borderRadius: 1,
  },
  content: {
    flex: 1,
  },
  ordersList: {
    padding: wp('4'),
    gap: hp('2'),
  },
  orderCard: {
    backgroundColor: colors.background.paper,
    borderRadius: 12,
    padding: wp('4'),
    borderWidth: 1,
    borderColor: colors.border.thin,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5'),
  },
  orderId: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
    marginRight: wp('2'),
  },
  orderNumber: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
  },
  orderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  estimatedText: {
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
  },
  amount: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.primary.main,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.default,
    paddingHorizontal: wp('3'),
    paddingVertical: hp('1'),
    borderRadius: 6,
  },
  viewButtonText: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.primary,
    marginRight: wp('1'),
  },
  arrowIcon: {
    width: wp('4'),
    height: wp('4'),
    tintColor: colors.text.primary,
  },
});

export default MyOrdersScreen; 