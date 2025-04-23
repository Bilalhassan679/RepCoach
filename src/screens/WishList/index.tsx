import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { wp, hp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { CustomHeader } from '../../navigation/RootNavigator';
import { heart, heartFill } from '../../assets';
import CacheImage from '../../components/CacheImage';

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
  isLiked?: boolean;
}

const WishListScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Italian Necklace',
      price: '$200.00',
      image: 'https://picsum.photos/800/600',
      isLiked: true,
    },
    {
      id: '2',
      name: 'Rosaries Necklace',
      price: '$200.00',
      image: 'https://picsum.photos/800/600',
      isLiked: true,
    },
    {
      id: '3',
      name: 'Rosaries Necklace',
      price: '$200.00',
      image: 'https://picsum.photos/800/600',
      isLiked: true,
    },
    {
      id: '4',
      name: 'Italian Necklace',
      price: '$200.00',
      image: 'https://picsum.photos/800/600',
      isLiked: true,
    },
  ]);

  const toggleHeart = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isLiked: !product.isLiked }
        : product
    ));
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <Pressable 
      style={[
        styles.productCard,
        { marginLeft: index % 2 === 0 ? 0 : wp('4') }
      ]}
      onPress={() => {}}
    >
      <View style={styles.imageContainer}>
        <CacheImage url={item.image} style={styles.productImage} />
        <TouchableOpacity 
          style={styles.heartButton} 
          onPress={() => toggleHeart(item.id)}
        >
          <Image 
            source={item.isLiked ? heartFill : heart} 
            style={[
              styles.heartIcon,
              { tintColor: item.isLiked ? colors.primary.main : colors.text.secondary }
            ]}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.estimatedText}>Estimated price</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  listContent: {
    padding: wp('4'),
  },
  columnWrapper: {
    marginBottom: hp('2'),
  },
  productCard: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heartButton: {
    position: 'absolute',
    top: wp('2'),
    right: wp('2'),
    backgroundColor: colors.background.paper,
    borderRadius: wp('4'),
    padding: wp('1.5'),
  },
  heartIcon: {
    width: wp('5'),
    height: wp('5'),
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
  price: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.primary.main,
  },
});

export default WishListScreen; 