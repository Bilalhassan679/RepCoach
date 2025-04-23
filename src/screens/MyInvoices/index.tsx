import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ListRenderItem,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { wp, hp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { arrowleft } from '../../assets';
import { CustomHeader } from '../../navigation/RootNavigator';

// type RootStackParamList = {
//   Settings: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

interface Invoice {
  id: string;
  date: string;
  amount: string;
}

const MyInvoicesScreen = () => {
  const navigation = useNavigation();    

  const invoices: Invoice[] = [
    { id: '#SB-001598', date: 'March 11th 2025', amount: '617.17' },
    { id: '#SB-001598', date: 'March 11th 2025', amount: '740.15' },
    { id: '#SB-001598', date: 'March 11th 2025', amount: '273.45' },
    { id: '#SB-001598', date: 'March 11th 2025', amount: '570.45' },
    { id: '#SB-001598', date: 'March 11th 2025', amount: '273.45' },
    { id: '#SB-001598', date: 'March 11th 2025', amount: '740.15' },
    { id: '#SB-001598', date: 'March 11th 2025', amount: '617.17' },
    { id: '#SB-001598', date: 'March 11th 2025', amount: '570.45' },
  ];

  const renderInvoiceCard: ListRenderItem<Invoice> = ({ item,index }) => (
    <TouchableOpacity 
      style={[styles.invoiceCard, {backgroundColor: index % 2 === 0 ? colors.background.shadow : colors.background.paper}]}
      onPress={() => {}}
    >
      <View style={styles.invoiceInfo}>
        <Text style={styles.invoiceId}>INV {item.id}</Text>
        <Text style={styles.invoiceDate}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>${item.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="My invoices" 
        leftButton={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowleft} style={{width: 25, height: 27}} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={invoices}
        renderItem={renderInvoiceCard}
        keyExtractor={(item, index) => `${item.id}-${item.amount}-${index}`}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollContent: {
    padding: wp('4'),
  },
  separator: {
    height: hp('2'),
  },
  invoiceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
    borderRadius: 8,
    padding: wp('4'),
    borderWidth: 1,
    borderColor: colors.border.thin,
    shadowColor:Platform.OS === 'ios' ? "#000" : colors.background.shadow,
    
shadowOffset: {
	width: 0,
	height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  invoiceInfo: {
    gap: hp('0.5'),
  },
  invoiceId: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
  },
  invoiceDate: {
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
  },
  amount: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.primary.main,
  },
});

export default MyInvoicesScreen; 