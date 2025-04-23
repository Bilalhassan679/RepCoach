import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import {wp, hp, isIOS} from '../../theme/responsive';
import {colors} from '../../theme/colors';
import {scale} from '../../theme/typography';

import {typography} from '../../theme';
import {
  user,
  notificationhome,
  carthome,
  inquiryhome,
  shippinghome,
  Splash,
  bg,
  clock,
  heart,
  cart,
} from '../../assets';
import CacheImage from '../../components/CacheImage';
import {useAuth} from '../../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
const categories = [
  {id: '1', name: 'Chains', image: 'https://picsum.photos/800/800'},
  {id: '2', name: 'Bracelet', image: 'https://picsum.photos/800/800'},
  {id: '3', name: 'Rings', image: 'https://picsum.photos/800/800'},
  {id: '4', name: 'Necklace', image: 'https://picsum.photos/800/800'},
  {id: '5', name: 'Charms', image: 'https://picsum.photos/800/800'},
];

const collections = [
  {id: '1', name: 'Chains', image: 'https://picsum.photos/200/300'},
  {id: '2', name: 'Bracelets', image: 'https://picsum.photos/200/300'},
  {id: '3', name: 'Necklaces', image: 'https://picsum.photos/200/300'},
  {id: '4', name: 'Rings', image: 'https://picsum.photos/200/300'},
];

const newArrivals = [
  {
    id: '1',
    name: 'Italian Necklace',
    price: '200.00',
    image: 'https://picsum.photos/200/300',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Rosaries Necklace',
    price: '200.00',
    image: 'https://picsum.photos/200/300',
    isFavorite: false,
  },
];

const HomeScreen = ({navigation}: any) => {
  const {isAuthenticated, signIn, signOut,  setUser} = useAuth();

  const renderCategories = () => (
    <View style={[styles.section, {backgroundColor: 'transparent',
      marginTop: hp('0'),
      marginBottom: hp('0'),
    }]}>
      <View style={styles.categoriesHeader}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all →</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity key={item.id} style={styles.categoryItem}>
            <View style={styles.categoryImageContainer}>
              <CacheImage url={item.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />
    </View>
  );

  const renderStatusCards = () => (
    <View style={styles.statusCardsContainer}>
      <TouchableOpacity>
        <LinearGradient
          colors={['#F79B0080', '#FFE5CC', '#FFFFFF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}
          >
          <View style={styles.statusCard}>
          <View style={styles.statusIconContainer}>
            <Image source={inquiryhome} style={styles.statusIcon} />
          </View>
          <Text style={styles.statusTitle}>View inquiries updates</Text>
          <View style={styles.statusButtonContainer}>
            <Text style={styles.statusButton}>3 Inquiries</Text>
          </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity >
        <LinearGradient
          colors={['#F79B0080', '#FFE5CC', '#FFFFFF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.linearGradient}
         >
          <View style={styles.statusCard}>

          <View style={styles.statusIconContainer}>
            <Image source={shippinghome} style={styles.statusIcon} />
          </View>
          <Text style={styles.statusTitle}>View your shipments status</Text>
          <View style={styles.statusButtonContainer}>
            <Text style={styles.statusButton}>5 Pending</Text>
          </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderGoldPrice = () => (
    <View style={styles.goldPriceCard}>
      <Text style={styles.goldPriceTitle}>Gold price today</Text>
      <View style={styles.goldPriceContent}>
        <Text style={styles.goldPriceAmount}>2,915.31</Text>
        <Text style={styles.goldPriceDelta}>-0.21%</Text>
      </View>
      <View style={styles.goldPriceUpdateContainer}>
        <Image source={clock} style={styles.goldPriceUpdateIcon} />
      <Text style={styles.goldPriceUpdate}>Real-time Data 14:05:56</Text>
      </View>
    </View>
  );

  const renderCollections = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Collections</Text>
   
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all →</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.collectionsGrid}>

        <FlatList
        data={collections}
        renderItem={({item}) => (
          <TouchableOpacity key={item.id} style={styles.collectionItem}>
            <View style={styles.collectionImageContainer}>
              <CacheImage url={item.image} style={styles.collectionImage} />
            </View>
            <Text style={styles.collectionName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.collectionsContainer}
      />
      </View>
    </View>
  );

  const renderNewArrivals = () => (
    <ImageBackground source={bg} style={styles.newArrivalsSection}>

    <View style={styles.newArrivalsSection}>
      <View style={styles.newArrivalsHeader}>
        <Text style={styles.newArrivalsTitle}>New Arrival</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllWhite}>View all →</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={newArrivals}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.newArrivalItem}>
            <View style={styles.newArrivalImageContainer}>
              <CacheImage url={item.image} style={styles.newArrivalImage} />
              <TouchableOpacity style={styles.favoriteButton}>
                <Image 
                  source={heart}
                  style={[styles.heartIcon, item.isFavorite && styles.heartIconActive]}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.newArrivalName}>{item.name}</Text>
            <View style={styles.newArrivalPriceContainer}>

            <Text style={styles.estimatedText}>Estimated price</Text>
            <Text style={styles.newArrivalPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.newArrivalsContainer}
      />
    </View>
    </ImageBackground>
  );

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <CacheImage url={'https://picsum.photos/200/300'} style={styles.avatar} />
            <Text style={styles.greeting}>Hello Zain</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={cart} style={styles.headerIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={notificationhome} style={styles.headerIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {renderCategories()}
        {renderStatusCards()}
        {renderGoldPrice()}
        {renderCollections()}
        {renderNewArrivals()}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: hp('6'),
    borderBottomLeftRadius: wp('8'),
    borderBottomRightRadius: wp('8'),

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    paddingBottom: hp('2'),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3'),
  },
  avatar: {
    width: wp('13'),
    height: wp('13'),
    resizeMode: 'contain',
    borderRadius: wp('100'),

  },
  greeting: {
    fontSize: scale(25),
    fontFamily: typography.fontFamily.againstRegular,
    color: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: wp('3'),
  },
  iconContainer: {
    width: wp('10'),
    height: wp('10'),

  },
  headerIcon: {
    width: wp('10'),
    height: wp('10'),
    resizeMode: 'contain',
  },
  categoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoriesTitle: {
    fontSize: scale(25),
    fontFamily: typography.fontFamily.againstRegular,
    color: colors.text.primary,
  },
  viewAll: {
    fontSize: scale(12),
    color: colors.text.primary,
    fontFamily: typography.fontFamily.interSemiBold,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background.paper,
    borderTopLeftRadius: wp('5'),
    borderTopRightRadius: wp('5'),
    marginTop: hp('2'),
  },
  section: {
    marginTop: hp('4'),
    marginBottom: hp('4'),
    padding: wp('5'),
    backgroundColor: 'rgba(247, 155, 0, 0.08)',

  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  sectionTitle: {
    fontSize: scale(28),
    fontFamily: typography.fontFamily.againstRegular,
    color: colors.text.primary,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: wp('3'),
    paddingVertical: hp('0.5'),
    borderRadius: wp('4'),
    gap: wp('2'),
  },
  filterText: {
    fontSize: scale(14),
    color: colors.text.primary,
    fontFamily: typography.fontFamily.interRegular,
  },
  filterIcon: {
    width: wp('4'),
    height: wp('4'),
    tintColor: colors.text.primary,
  },
  collectionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    
  },
  collectionsContainer: {
    paddingBottom: hp('2'),
    gap: wp('4'),
    marginTop: hp('1'),
    marginLeft: wp('1'),
  },
  collectionItem: {
    alignItems: 'center',
  },
  collectionImageContainer: {
    width: wp('23'),
    height: wp('23'),
    borderRadius: wp('4'),
    overflow: 'hidden',
    marginBottom: hp('1'),
    backgroundColor: '#F5F5F5',
  },
  collectionImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  collectionName: {
    fontSize: scale(14),
    color: colors.text.primary,
    fontFamily: typography.fontFamily.interSemiBold,
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingVertical: hp('2'),
    gap: wp('4'),
  },
  categoryItem: {
    alignItems: 'center',
    width: wp('20'),
  },
  categoryImageContainer: {
    width: wp('18'),
    height: wp('18'),
    borderRadius: wp('10'),
    justifyContent: 'center',

  },
  categoryImage: {
    width: wp('20'),
    height: wp('20'),
    borderRadius: wp('10'),
    resizeMode: 'contain',
  },
  categoryName: {
    fontSize: scale(12),
    color: '#000',
    fontFamily: typography.fontFamily.interSemiBold,
    textAlign: 'center',
    marginTop: hp('1'),
  },
  statusCardsContainer: {
    flexDirection: 'row',
    gap: wp('2'),
    paddingHorizontal: wp('5'),
  },
  linearGradient: {
    borderRadius: wp('4'),
  },
  statusCard: {
    height: hp(isIOS ? '20' : '22'),
    padding: wp('4'),
    width: wp('44'),

    
  },

  statusIconContainer: {
    width: wp('10'),
    height: wp('12'),
    borderRadius: wp('5'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('1.5'),
    marginTop: hp('1'),


  },
  statusIcon: {
    width: wp('22'),
    height: wp('22'),
  },
  statusTitle: {
    fontSize: scale(16),
    color: '#000',
    fontFamily: typography.fontFamily.interSemiBold,
    marginBottom: hp('1'),
  },
  statusButtonContainer: {
    backgroundColor: '#FF9933',
    borderRadius: wp('1'),
    paddingHorizontal: wp('3'),
    paddingVertical: hp('0.5'),
    alignSelf: 'flex-start',
  },
  statusButton: {
    fontSize: scale(14),
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.interMedium,
  },
  goldPriceCard: {
    margin: wp('5'),
    padding: wp('4'),
    backgroundColor: '#000',
    borderRadius: wp('4'),
  },
  goldPriceTitle: {
    fontSize: scale(25),
    color: '#fff',
    fontFamily: typography.fontFamily.againstRegular,
    marginBottom: hp('1'),
  },
  goldPriceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2'),
  },
  goldPriceAmount: {
    fontSize: scale(30),
    color: colors.primary.main,
    fontFamily: typography.fontFamily.interSemiBold,
  },
  goldPriceDelta: {
    fontSize: scale(12),
    color: '#FF4D4D',
    fontFamily: typography.fontFamily.interMedium,
    marginTop: hp('2'),
  },
  goldPriceUpdate: {
    fontSize: scale(12),
    color: colors.text.inverse,
    fontFamily: typography.fontFamily.interRegular,
  },
  goldPriceUpdateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2'),
    marginTop: hp('1'),
  },
  goldPriceUpdateIcon: {
    width: wp('5'),  
    height: wp('5'),
    resizeMode: 'contain',
  },
  newArrivalsSection: {
    padding: wp('2'),
    borderRadius: wp('5'),
    overflow: 'hidden',

  },
  newArrivalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  newArrivalPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1'),
    marginTop: hp('0.5'),
  },  
  newArrivalsTitle: {
    fontSize: scale(28),
    fontFamily: typography.fontFamily.againstRegular,
    color: '#FFFFFF',
  },
  viewAllWhite: {
    fontSize: scale(14),
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.interSemiBold,
  },
  newArrivalsContainer: {
    gap: wp('4'),
  },
  newArrivalItem: {
    width: wp('42'),

  },
  newArrivalImageContainer: {
    width: wp('42'),
    height: wp('37'),
    borderRadius: wp('4'),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: hp('1.5'),
    position: 'relative',
  },
  newArrivalImage: {
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  heartIcon: {
    width: wp('4'),
    height: wp('4'),
    tintColor: '#999999',
  },
  heartIconActive: {
    tintColor: '#FF0000',
  },
  newArrivalName: {
    fontSize: scale(16),
    color: '#FFFFFF',
    fontFamily: typography.fontFamily.interSemiBold,
  },
  estimatedText: {
    fontSize: scale(12),
    color: '#999999',
    fontFamily: typography.fontFamily.interRegular,
  },
  newArrivalPrice: {
    fontSize: scale(12),
    color: colors.primary.main,
    fontFamily: typography.fontFamily.interSemiBold,
  },
});

export default HomeScreen;
