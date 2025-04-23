import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { wp, hp, isIOS } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { arrowleft, heart } from '../../assets';
import { CustomHeader } from '../../navigation/RootNavigator';

const tabs = ['Necklaces', 'Chains', 'Diamonds', 'Ladies Set'];

const products = [
  {
    id: '1',
    name: 'Italian Necklace',
    image: 'https://picsum.photos/400',
    price: 200.00,
  },
  {
    id: '2',
    name: 'Rosaries Necklace',
    image: 'https://picsum.photos/401',
    price: 200.00,
  },
  {
    id: '3',
    name: 'Italian Necklace',
    image: 'https://picsum.photos/400',
    price: 200.00,
  },
  {
    id: '4',
    name: 'Rosaries Necklace',
    image: 'https://picsum.photos/401',
    price: 200.00,
  },
  {
    id: '5',
    name: 'Italian Necklace',
    image: 'https://picsum.photos/400',
    price: 200.00,
  },
  {
    id: '6',
    name: 'Rosaries Necklace',
    image: 'https://picsum.photos/401',
    price: 200.00,
  },
];

const NewArrival = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Necklaces');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <Pressable
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item.id)}>
          <Image
            source={favorites.includes(item.id) ? heart : heart}
            style={styles.heartIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.estimatedText}>Estimated price</Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="New Arrival"
        leftButton={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={arrowleft} style={styles.headerIcon} />
          </TouchableOpacity>
        }
      />

      {/* Category Tabs */}
      <View style={styles.tabsContainer}>
        <FlatList
          data={tabs}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              style={[styles.tab, activeTab === item && styles.activeTab]}
              onPress={() => setActiveTab(item)}>
              <Text 
                style={[
                  styles.tabText,
                  activeTab === item && styles.activeTabText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Products Grid */}
      <View style={styles.productsContainer}>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsContainer}

          columnWrapperStyle={styles.productRow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    marginBottom: hp(isIOS ? '23' : '20'),
  },
  headerIcon: {
    width: wp('6'),
    height: wp('6'),
    resizeMode: 'contain',
  },
  tabsContainer: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1.5'),
  },
  tab: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    marginRight: wp('3'),
    borderRadius: wp('1'),
    borderWidth: 1,
    borderColor: colors.border.main,
  },
  activeTab: {
    backgroundColor: '#FF9F0A',
    borderRadius: wp('1'),
  },
  tabText: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.background.paper,
    fontFamily: typography.fontFamily.interMedium,
  },
  productsContainer: {
    paddingHorizontal: wp('2'),
  },
  productRow: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: wp('44'),
    marginBottom: hp('2'),
    backgroundColor: colors.background.paper,
    borderRadius: wp('2'),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.main,
  },
  imageContainer: {
    width: '100%',
    height: wp('44'),
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: wp('2'),
    right: wp('2'),
    width: wp('8'),
    height: wp('8'),
    borderRadius: wp('4'),
    backgroundColor: colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heartIcon: {
    width: wp('4'),
    height: wp('4'),
    resizeMode: 'contain',
  },
  productInfo: {
    padding: wp('3'),
  },
  productName: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
    marginBottom: hp('0.5'),
  },
  estimatedText: {
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
    marginBottom: hp('0.5'),
  },
  productPrice: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interBold,
    color: colors.primary.main,
  },
});

export default NewArrival; 