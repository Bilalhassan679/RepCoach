import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { wp, hp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { arrowleft, bag, cart, dotsvertical, edit, receipt, trash } from '../../assets';
import CacheImage from '../../components/CacheImage';
import { CustomHeader } from '../../navigation/RootNavigator';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
}

const ViewOrdersScreen = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<OrderItem[]>([
    {
      id: '1',
      name: 'China baby ID necklaces',
      price: 140.00,
      image: 'https://picsum.photos/800/600',
      quantity: 2,
    },
    {
      id: '2',
      name: 'China baby ID necklaces',
      price: 140.00,
      image: 'https://picsum.photos/800/600',
      quantity: 1,
    },
    {
      id: '3',
      name: 'Italian Valentir Necklace',
      price: 140.00,
      image: 'https://picsum.photos/800/600',
      quantity: 1,
    },
    {
      id: '4',
      name: 'Italian Flower Valentino Necklace',
      price: 140.00,
      image: 'https://picsum.photos/800/600',
      quantity: 1,
    },
  ]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const updateQuantity = (id: string, increment: boolean) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: increment ? item.quantity + 1 : Math.max(1, item.quantity - 1),
        };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const renderItem = (item: OrderItem) => (
    <View key={item.id} style={styles.itemContainer}>
      <CacheImage url={item.image} style={styles.productImage} />
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.productName}>{item.name}</Text>
          <TouchableOpacity 
            onPress={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
            style={styles.moreButton}
          >
            <Image source={dotsvertical} style={[styles.moreIcon,]} />
          </TouchableOpacity>
        </View>
        <Text style={styles.estimatedPrice}>Estimated price</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        
        {selectedItemId === item.id && (
          <View style={styles.actionMenu}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                // Add edit functionality
                setSelectedItemId(null);
              }}
            >
                <View style={styles.menuItemIcon}>

                <Image source={receipt} style={{...styles.menuIcon, tintColor: colors.primary.main}} />
              <Text style={styles.menuText}>Edit</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menuItem, styles.removeItem]}
              onPress={() => {
                removeItem(item.id);
                setSelectedItemId(null);
              }}
            >
                <View
                
                style={styles.menuItemIcon}>

                <Image
                resizeMode='contain'
                tintColor={colors.secondary.main}
                source={trash} style={styles.menuIcon} />
              <Text style={[styles.menuText, styles.removeText]}>Remove</Text>
                </View>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            onPress={() => updateQuantity(item.id, false)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity 
            onPress={() => updateQuantity(item.id, true)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
 <CustomHeader title="Orders" leftButton={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowleft} style={{width: 25, height: 27}} />
            </TouchableOpacity>
          } 
            rightButton={
              <TouchableOpacity >
              <Image source={bag} style={{width: wp('8'), height: hp('4'),resizeMode:'contain'}} />
            </TouchableOpacity>
            }
          />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {items.map(renderItem)}
      </ScrollView>

      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    paddingVertical: hp('2'),
    backgroundColor: colors.primary.dark,
  },
  backButton: {
    marginRight: wp('4'),
    padding: wp('2'),
  },
  backIcon: {
    width: wp('6'),
    height: wp('6'),
    tintColor: colors.text.inverse,
  },
  title: {
    fontSize: scale(20),
    fontFamily: typography.fontFamily.againstRegular,
    color: colors.text.inverse,
  },
  content: {
    flex: 1,
    padding: wp('4'),
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: hp('2'),
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: wp('3'),
    borderWidth: 1,
    borderColor: colors.border.thin,
  },
  productImage: {
    width: wp('20'),
    height: wp('20'),
    borderRadius: 8,
    marginRight: wp('3'),
  },
  itemDetails: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
    flex: 1,
    marginRight: wp('2'),
  },
  moreButton: {
    padding: wp('2'),
  },
  moreIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: colors.text.secondary,
  },
  estimatedPrice: {
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
    marginTop: hp('0.5'),
  },
  price: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.primary.main,
    marginTop: hp('0.5'),
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
    position: 'absolute',
    bottom: wp('0'),
    right: wp('0'),
  },
  quantityButton: {
    width: wp('8'),
    height: wp('8'),
    borderRadius: 4,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: scale(20),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.inverse,
    lineHeight: scale(20),
  },
  quantity: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
    marginHorizontal: wp('4'),
  },
  actionMenu: {
    position: 'absolute',
    top: hp('4'),
    right: wp('2'),
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    padding: wp('2'),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  menuItem: {
    paddingVertical: hp('1'),
    paddingHorizontal: wp('3'),
  },
  menuText: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.primary,
  },
  removeItem: {
    marginTop: hp('0.5'),
  },
  removeText: {
    color: colors.secondary.main,
  },
  sendButton: {
    backgroundColor: colors.primary.main,
    margin: wp('4'),
    paddingVertical: hp('2'),
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.inverse,
  },
  menuItemIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2'),
  },
  menuIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: colors.secondary.main,
  },
  
});

export default ViewOrdersScreen; 