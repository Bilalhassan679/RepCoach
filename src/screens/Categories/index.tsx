import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme';
import { wp, hp } from '../../theme/responsive';
import { scale } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';
import { arRight } from '../../assets';

const tabs = ['All', 'Men', 'Women', 'Children'];

const chainCategories = [
  { id: '1', name: 'Link chains', image: 'https://picsum.photos/200' },
  { id: '2', name: 'Clip chains', image: 'https://picsum.photos/201' },
  { id: '3', name: 'Hollow chains', image: 'https://picsum.photos/202' },
  { id: '4', name: 'Necklaces', image: 'https://picsum.photos/203' },
];

const necklaceCategories = [
  { id: '1', name: 'White rope necklaces', image: 'https://picsum.photos/204' },
  { id: '2', name: 'Chino baby ID necklaces', image: 'https://picsum.photos/205' },
  { id: '3', name: 'Necklaces', image: 'https://picsum.photos/206' },
];

const materials = ['Gold', 'Silver', 'Diamonds', 'Zircon', 'Platinum'];

const ringCategories = [
  { id: '1', name: 'Wedding rings', image: 'https://picsum.photos/207' },
  { id: '2', name: 'Engagement rings', image: 'https://picsum.photos/208' },
  { id: '3', name: 'Fashion rings', image: 'https://picsum.photos/209' },
];

const Categories = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');
  
  const renderSectionHeader = (title: string) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity style={styles.sectionTitleContainer} onPress={() => {}}>
        <Text style={styles.viewAll}>View all</Text>
      <Image source={arRight} style={styles.arrowRight} />
      </TouchableOpacity>
    </View>
  );

  const renderCategoryItem = (item: { id: string; name: string; image: string },style: any) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.categoryItem, style]}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.categoryImageContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMaterialItem = (material: string) => (
    <TouchableOpacity
      key={material}
      style={styles.materialItem}
      onPress={() => {}}
    >
      <Text style={styles.materialText}>{material}</Text>
    </TouchableOpacity>
  );

  const renderNecklaceItem = (item: { id: string; name: string; image: string }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.necklaceItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.necklaceImageContainer}>
        <Image source={{ uri: item.image }} style={styles.necklaceImage} />
      </View>
      <Text style={styles.necklaceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderRingItem = (item: { id: string; name: string; image: string }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.ringItem}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <View style={styles.ringImageContainer}>
        <Image source={{ uri: item.image }} style={styles.ringImage} />
      </View>
      <Text style={styles.ringName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>


       <View style={styles.tabsContainer}>

        <FlatList
        data={tabs}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.tab,
              activeTab === item && styles.activeTab,
            ]}
            onPress={() => setActiveTab(item)}
          >
            <Text style={[
              styles.tabText,
              activeTab === item && styles.activeTabText,
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        />
      </View>
      {/* Chains Section */}
      {renderSectionHeader('Chains')}
      <FlatList
        data={chainCategories}
        renderItem={({item}) => renderCategoryItem(item, styles.categoryItem)}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />  
 

      {/* Necklaces Section */}
      <View style={styles.necklaceSection}>
        <View style={[styles.sectionHeader, {paddingVertical: hp('1')}]}>
          <Text style={[styles.sectionTitle, styles.necklaceTitle]}>Necklaces</Text>
          <TouchableOpacity style={styles.sectionTitleContainer} onPress={() => {}}>
            <Text style={styles.viewAll}>View all</Text>
            <Image source={arRight} style={styles.arrowRight} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={necklaceCategories}
          renderItem={({item}) => renderNecklaceItem(item)}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.necklaceList}
        />
      </View>
      {/* Materials Section */}
      {renderSectionHeader('Materials')}
      <FlatList
      data={materials}
      renderItem={({item}) => renderMaterialItem(item)}
      keyExtractor={item => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalList}
      />
      <View style={styles.divider} />
      {/* Rings Section */}
      <View style={styles.ringsSection}>
        <View style={[styles.sectionHeader, { paddingVertical: hp('1') }]}>
          <Text style={[styles.sectionTitle, styles.ringsTitle]}>Rings</Text>
          <TouchableOpacity style={styles.sectionTitleContainer} onPress={() => {}}>
            <Text style={styles.viewAll}>View all</Text>
            <Image source={arRight} style={styles.arrowRight} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={ringCategories}
          renderItem={({item}) => renderRingItem(item)}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ringsListContainer}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
    tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp('4'),
    marginTop: hp('2'),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  

  },

  tab: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    marginRight: wp('3'),
    borderRadius: wp('1'),
    borderWidth: 1,
    borderColor: colors.border.primary,
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
    color: colors.text.inverse,
    fontFamily: typography.fontFamily.interMedium,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowRight: {
    width: wp('4'),
    height: wp('4'),
    marginLeft: wp('2'),
    resizeMode: 'contain',

    tintColor: colors.text.primary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    paddingBottom: hp('1'),
  },
  sectionTitle: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.againstRegular,
    color: colors.text.primary,
  },
  viewAll: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: colors.text.primary,
  },
  horizontalList: {
    paddingHorizontal: wp('4'),
    paddingBottom: hp('3'),
  },
  categoryItem: {
    marginRight: wp('4'),
    alignItems: 'center',
    width: wp('25'),
  },

  categoryImageContainer: {
    width: wp('25'),
    height: wp('25'),
    borderRadius: wp('12.5'),
    overflow: 'hidden',
    marginBottom: hp('1'),
    backgroundColor: colors.background.paper,
  },
  newStyle: {
    width: wp('25'),
    height: wp('25'),
    borderRadius: wp(''),
    overflow: 'hidden',
    marginBottom: hp('1'),
    backgroundColor: colors.background.paper,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interSemiBold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  materialItem: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    backgroundColor: '#FF9F0A',
    borderRadius: wp('5'),
    marginRight: wp('2'),
  },
  materialText: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interSemiBold,
    
    color: colors.background.paper,
  },
  necklaceSection: {
    backgroundColor: '#F79B001A',
    paddingVertical: hp('1'),
    marginBottom: hp('2'),
  },
  necklaceTitle: {
    fontFamily: typography.fontFamily.againstRegular,
    
    fontSize: scale(25),
  },
  necklaceList: {
    paddingHorizontal: wp('4'),
    paddingTop: hp('1'),
  },
  necklaceItem: {
    marginRight: wp('4'),
    width: wp('45'),
  },
  necklaceImageContainer: {
    width: wp('45'),
    height: hp('15'),
    borderRadius: wp('3'),
    overflow: 'hidden',
    marginBottom: hp('1'),
    backgroundColor: colors.background.paper,
  },
  necklaceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  necklaceName: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interSemiBold,
    color: colors.text.primary,
  },
  ringsSection: {
    backgroundColor: colors.background.default,
    paddingVertical: hp('1'),
    marginBottom: hp('2'),
  },
  ringsTitle: {
    fontFamily: typography.fontFamily.againstRegular,
    fontSize: scale(28),
  },
  ringName: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interSemiBold,
    color: colors.text.primary,
    marginTop: hp('1'),
  },
  ringsListContainer: {
    paddingHorizontal: wp('4'),
    paddingTop: hp('1'),
  },
  ringItem: {
    marginRight: wp('3'),
  },
  ringImageContainer: {
    width: wp('35'),
    height: hp('12'),
    borderRadius: wp('2'),
    overflow: 'hidden',
    backgroundColor: colors.background.paper,
  },
  ringImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.primary,
    marginVertical: hp('2'),
  },
});

export default Categories; 