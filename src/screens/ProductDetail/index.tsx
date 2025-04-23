import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  ImageBackground,
  Platform,
  Modal,
  StatusBar,
  FlatList,
} from 'react-native';
import {colors} from '../../theme/colors';
import {typography} from '../../theme';
import {wp, hp} from '../../theme/responsive';
import {scale} from '../../theme/typography';
import {useNavigation} from '@react-navigation/native';
import CacheImage from '../../components/CacheImage';
import {arrowleft, heart, heartFill} from '../../assets';
import {CustomHeader} from '../../navigation/RootNavigator';
import WishlistModal from '../WishList';
interface ProductDetailProps {
  route: {
    params: {
      productId: string;
    };
  };
}

const ImagePreviewModal = ({
  visible,
  onClose,
  images,
  initialIndex,
}: {
  visible: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={arrowleft} style={styles.closeIcon} />
        </TouchableOpacity>

        <View style={styles.previewImageContainer}>
          <Image
            source={{uri: images[currentIndex]}}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.previewThumbnailsContainer}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentIndex(index)}
              style={[
                styles.previewThumbnailWrapper,
                currentIndex === index && styles.selectedPreviewThumbnail,
              ]}>
              <Image
                source={{uri: image}}
                style={styles.previewThumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const ProductDetail: React.FC<ProductDetailProps> = ({route}) => {
  const navigation = useNavigation();
  const [selectedColor, setSelectedColor] = useState('Gold');
  const [selectedCarat, setSelectedCarat] = useState('22');
  const [selectedSize, setSelectedSize] = useState('2.5');
  const [selectedWeight, setSelectedWeight] = useState('1.3');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const productImages = [
    'https://picsum.photos/400',
    'https://picsum.photos/401',
    'https://picsum.photos/402',
    'https://picsum.photos/403',
    'https://picsum.photos/403',
    'https://picsum.photos/403',
    'https://picsum.photos/403',
    'https://picsum.photos/403',
  ];

  const colors = ['Gold', 'Silver'];
  const carats = ['18', '20', '22', '24'];
  const sizes = ['1.5', '2.0', '2.5', '3.0', '3.5', '4'];
  const weights = ['0.8', '1.0', '1.3', '1.7', '1.9', '2.2'];

  const renderSpecificationItem = (label: string, value: string) => (
    <View style={styles.specificationItem}>
      <Text style={styles.specLabel}>{label}:</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );

  const renderOptionSelector = (
    title: string,
    value: string,
    options: string[],
    selected: string,
    onSelect: (value: string) => void,
    unit?: string,

  ) => (
    <View style={styles.optionContainer}>
      <View style={styles.optionHeader}>
        <Text style={styles.optionTitle}>{title}:</Text>
        <Text style={styles.optionValue}>{value} {unit}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.optionsRow}>
          {options.map(option => (
            <TouchableOpacity
              key={option}
              style={[
               title === 'Carat' ? styles.caratChip : styles.optionChip,
                selected === option && styles.selectedOptionChip,
              ]}
              onPress={() => onSelect(option)}>
              <Text
                style={[
                  styles.optionText,
                  selected === option && styles.selectedOptionText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderMaterialSelector = () => (
    <View style={styles.optionContainer}>
      <View style={styles.optionHeader}>
        <Text style={styles.optionTitle}>Material:</Text>
        <Text style={styles.optionValue}>{selectedColor}</Text>
      </View>
      <View style={styles.colorOptionsRow}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            onPress={() => setSelectedColor(color)}
            style={[
              styles.colorChip,
              selectedColor === color && styles.selectedColorChip,
            ]}>
            <View
              style={[
                styles.colorInnerCircle,
                {
                  backgroundColor: color === 'Gold' ? '#FF9933' : '#E0E0E0',
                },
                selectedColor === color && {
                  backgroundColor: color === 'Gold' ? '#FF9933' : '#E0E0E0',
                },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
        {/* Header */}
        <CustomHeader
          title="Jewellery"
          leftButton={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={arrowleft} style={styles.headerIcon} />
            </TouchableOpacity>
          }
          rightButton={
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => {
                setIsWishlist(!isWishlist);
              }}>
              <Image
                source={isWishlist ? heartFill : heart}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          }
        />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* Product Images */}
        <View style={styles.imageSection}>
          <TouchableOpacity
            style={styles.mainImageContainer}
            onPress={() => setIsPreviewVisible(true)}>
            <Image
              source={{uri: productImages[selectedImageIndex]}}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {/* Thumbnail Images */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailsContainer}>
            <FlatList
              data={productImages}
              keyExtractor={(item, index) => index.toString()}
              numColumns={30}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              columnWrapperStyle={styles.columnWrapper}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedImageIndex(index)}
                  style={[
                    styles.thumbnailWrapper,
                    selectedImageIndex === index && styles.selectedThumbnail,
                  ]}>
                  <CacheImage url={item} style={styles.thumbnailImage} />
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>
              Italian Flower Valentino Necklace
            </Text>
            <View>
              <Text style={styles.price}>$273.45</Text>
              <Text style={styles.estimatedText}>Estimated price</Text>
            </View>
          </View>
          <View style={styles.divider} />

          {/* Specifications */}
          <View>
            <Text style={styles.sectionTitle}>Specifications:</Text>
            <Text style={styles.description}>
              10k gold franco standard size, fine quality product is show in
              pictures, gold plated locked set. All items are brand new and
              exactly same as show in pictures.
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.flexRow}>
            {/* Options */}
            {renderMaterialSelector()}
          {renderOptionSelector('Carat', selectedCarat, carats, selectedCarat, setSelectedCarat, )}
          </View>
          <View style={styles.divider} />
          {renderOptionSelector('Width', selectedSize, sizes, selectedSize, setSelectedSize, 'mm')}
          <View style={styles.divider} />

          {renderOptionSelector('Weight', selectedWeight, weights, selectedWeight, setSelectedWeight, 'gm')}
          <View style={styles.divider} />

          {/* Quantity */}
          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>Add Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.divider} />


          {/* Add to Order Button */}
          <TouchableOpacity style={styles.addToOrderButton}>
            <Text style={styles.addToOrderText}>Add To Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ImagePreviewModal
        visible={isPreviewVisible}
        onClose={() => setIsPreviewVisible(false)}
        images={productImages}
        initialIndex={selectedImageIndex}
      />

      {/* <WishlistModal
        isOpen={isWishlist}
        onClose={() => setIsWishlist(false)}
      /> */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    paddingTop: Platform.OS === 'ios' ? hp('6') : hp('2'),
    paddingBottom: hp('2'),
    backgroundColor: colors.background.default,
  },
  headerButton: {
    width: wp('10'),
    height: wp('10'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
    width: wp('6'),
    height: wp('6'),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: scale(18),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
  },
  imageSection: {
    backgroundColor: colors.background.paper,
    paddingBottom: hp('2'),
  },
  mainImageContainer: {
    width: wp('95'),
    height: hp('35'),
    backgroundColor: '#F5F5F5',
    borderRadius: wp('2'),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp('1'),
    borderWidth: 1,
    borderColor: colors.border.main,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  thumbnailsContainer: {
    paddingHorizontal: wp('4'),
    paddingTop: hp('1'),
    gap: wp('2'),
    flexDirection: 'row',
  },
  thumbnailWrapper: {
    width: wp('20'),
    height: wp('20'),
    borderRadius: wp('2'),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.main,
    marginRight: wp('4.5'),
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  titleContainer: {
    width: wp('93'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    width: wp('93'),
    height: 1,
    backgroundColor: colors.border.thin,
    marginVertical: hp('2'),
  },

  selectedThumbnail: {
    borderColor: colors.primary.main,
    borderWidth: 2,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: wp('4'),
    paddingTop: hp('2'),
  },
  productTitle: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
    marginBottom: hp('1'),
    width: wp('60'),
  },
  price: {
    fontSize: scale(25),
    fontFamily: typography.fontFamily.interBold,
    color: colors.primary.main,
  },
  estimatedText: {
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
    textAlign: 'right',
    marginBottom: hp('2'),
  },

  sectionTitle: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
    marginBottom: hp('1'),
  },
  description: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
    lineHeight: scale(20),
  },
  specificationItem: {
    flexDirection: 'row',
    marginBottom: hp('1'),
  },
  specLabel: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
    marginRight: wp('2'),
  },
  specValue: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.secondary,
  },
  optionContainer: {
    marginBottom: hp('2'),
  },
  optionTitle: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.secondary,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  optionValue: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interSemiBold,
    color: colors.text.primary,
    marginLeft: wp('1'),
  },
  colorOptionsRow: {
    flexDirection: 'row',
    gap: wp('4'),
    marginTop: hp('1'),
  },
  colorChip: {
    width: wp('10'),
    height: wp('10'),
    borderRadius: wp('5'),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedColorChip: {
    borderColor: colors.primary.main,
    borderWidth: 1,
  },
  colorInnerCircle: {
    width: wp('8'),
    height: wp('8'),
    borderRadius: wp('5'),
  },
  caratChip: {
    width: wp('10'),
    height: wp('10'),
    borderRadius: wp('5'),
    borderWidth: 1,
    borderColor: colors.border.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp('2'),
  },
  optionChip: {
    paddingHorizontal: wp('3'),
    paddingVertical: hp('1'),
    borderRadius: wp('1'),
    borderWidth: 1,
    borderColor: colors.border.main,
    minWidth: wp('10'),
    alignItems: 'center',
  },
  selectedOptionChip: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  optionText: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.primary,
  },
  selectedOptionText: {
    color: colors.background.paper,
    fontFamily: typography.fontFamily.interMedium,
  },
  quantityContainer: {
    marginBottom: hp('2'),
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('4'),
  },
  quantityButton: {
    width: wp('8'),
    height: wp('8'),
    borderRadius: wp('4'),
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: scale(20),
    color: colors.background.paper,
    fontFamily: typography.fontFamily.interMedium,
  },
  quantityText: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.text.primary,
  },
  addToOrderButton: {
    backgroundColor: colors.primary.main,
    borderRadius: wp('4'),
    paddingVertical: hp('2'),
    alignItems: 'center',
    marginTop: hp('2'),
  },
  addToOrderText: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.background.paper,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background.default,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp('6') : hp('2'),
    left: wp('4'),
    zIndex: 1,
    width: wp('10'),
    height: wp('10'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: wp('6'),
    height: wp('6'),
    resizeMode: 'contain',
  },
  previewImageContainer: {
    width: '100%',
    height: hp('60'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewThumbnailsContainer: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('2'),
    gap: wp('2'),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  previewThumbnailWrapper: {
    width: wp('15'),
    height: wp('15'),
    borderRadius: wp('2'),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.main,
  },
  selectedPreviewThumbnail: {
    borderColor: colors.primary.main,
    borderWidth: 2,
  },
  previewThumbnailImage: {
    width: '100%',
    height: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: wp('3'),
  },
});

export default ProductDetail;
