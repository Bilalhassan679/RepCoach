import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {wp, hp} from '../../theme/responsive';
import {colors} from '../../theme/colors';
import {scale} from '../../theme/typography';
import {typography} from '../../theme';
import CacheImage from '../../components/CacheImage';
import {search, filter, heart} from '../../assets';
import Slider from '../../components/Slider';
import BottomModalComponent from '../../components/BottomSheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Material {
  id: string;
  name: string;
  selected: boolean;
}

interface Category {
  id: string;
  name: string;
  active: boolean;
}

interface RecentItem {
  id: string;
  image: string;
  name: string;
  price: number;
  isFavorite: boolean;
}

interface ResultItem {
  id: string;
  name: string;
  price: number;
  image: string;
  isFavorite: boolean;
}

type RootStackParamList = {
  ProductDetail: {
    item: ResultItem | RecentItem;
    from: 'search' | 'filter' | 'recent';
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

const categories: Category[] = [
  {id: '1', name: 'Rings', active: false},
  {id: '2', name: 'Necklace', active: false},
  {id: '3', name: 'Bracelets', active: false},
  {id: '4', name: 'Chains', active: false},
  {id: '5', name: 'Diamonds', active: false},
  {id: '6', name: 'Ear Rings', active: false},
  {id: '7', name: 'Pendants', active: false},
  {id: '8', name: 'Hoops', active: false},
];

const recentlyViewed: RecentItem[] = [
  {id: '1', image: 'https://picsum.photos/200/200', name: 'Italian Necklace', price: 200.00, isFavorite: false},
  {id: '2', image: 'https://picsum.photos/200/200', name: 'Rosaries Necklace', price: 200.00, isFavorite: false},
  {id: '3', image: 'https://picsum.photos/200/200', name: 'Italian Necklace', price: 200.00, isFavorite: false},
  {id: '4', image: 'https://picsum.photos/200/200', name: 'Rosaries Necklace', price: 200.00, isFavorite: false},
  {id: '5', image: 'https://picsum.photos/200/200', name: 'Italian Necklace', price: 200.00, isFavorite: false},
];

const materials: Material[] = [
  {id: '1', name: 'Gold', selected: true},
  {id: '2', name: 'Platinum', selected: false},
  {id: '3', name: 'Titanium', selected: false},
  {id: '4', name: 'Diamond', selected: false},
  {id: '5', name: 'Zircon', selected: false},
  {id: '6', name: 'Silver', selected: false},
  {id: '7', name: 'Topaz', selected: false},
  {id: '8', name: 'Pearl', selected: false},
  {id: '9', name: 'Sapphire', selected: false},
  {id: '10', name: 'Agate', selected: false},
  {id: '11', name: 'Amber', selected: false},
];

const results: ResultItem[] = [
  {
    id: '1',
    name: 'Italian Necklace',
    price: 200.00,
    image: 'https://picsum.photos/200/200',
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Rosaries Necklace',
    price: 200.00,
    image: 'https://picsum.photos/200/200',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Italian Necklace',
    price: 200.00,
    image: 'https://picsum.photos/200/200',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Rosaries Necklace',
    price: 200.00,
    image: 'https://picsum.photos/200/200',
    isFavorite: false,
  },
];

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('1');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState(['1']);
  console.log({selectedMaterials});
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(1000);
  const [min, setMin] = useState(25);
  const [max, setMax] = useState(100);
  const [rangeValue, setRangeValue] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showFilterResults, setShowFilterResults] = useState(false);

  const toggleMaterial = useCallback((id: string) => {
    setSelectedMaterials(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id],
    );
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setShowResults(text.length > 0);
    setShowFilterResults(false); // Hide filter results when searching
  };

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    let count = selectedMaterials.length;
    if (low > 0 || high < 1000) count += 1;
    return count;
  };

  const handleApplyFilter = () => {
    const activeFiltersCount = getActiveFiltersCount();
    if (activeFiltersCount > 0) {
      setIsFilterVisible(false);
      setShowFilterResults(true);
      setShowResults(false);
    }
  };

  const handleItemPress = (item: ResultItem | RecentItem, from: 'search' | 'filter' | 'recent') => {
    navigation.navigate('ProductDetail', {
      item,
      from
    });
  };

  const renderSearchBar = useCallback(() => (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchInputWrapper}>
        <Image source={search} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => {
              setSearchQuery('');
              setShowResults(false);
            }}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.filterButtonContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            showFilterResults && styles.filterButtonActive
          ]}
          onPress={() => setIsFilterVisible(true)}>
          <Image source={filter} style={styles.filterIcon} />
        </TouchableOpacity>
        {getActiveFiltersCount() > 0 && (
          <View style={styles.filterCount}>
            <Text style={styles.filterCountText}>{getActiveFiltersCount()}</Text>
          </View>
        )}
      </View>
    </View>
  ), [searchQuery, showResults, showFilterResults, selectedMaterials, low, high]);

  const renderCategories = useCallback(() => (
    <View style={styles.categoriesSection}>
      <Text style={styles.sectionTitle}>Top searches</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategory === item.id && styles.categoryButtonActive,
            ]}
            onPress={() => setActiveCategory(item.id)}>
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === item.id && styles.categoryButtonTextActive,
              ]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  ), [activeCategory]);

  const renderResultCount = (isFilterResults: boolean) => (
    <View style={styles.resultCountContainer}>
      <Text style={styles.resultCount}>
        {isFilterResults ? 'Filter Results' : 'Search Results'}
      </Text>
      <TouchableOpacity onPress={() => {
        if (isFilterResults) {
          setShowFilterResults(false);
        } else {
          setSearchQuery('');
          setShowResults(false) ;
          setSelectedMaterials(['1']);
          setLow(0);
          setHigh(1000);
        }
      }}>
        <Text style={styles.clearAll}>Clear all</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }: { item: ResultItem | RecentItem }) => (
    <TouchableOpacity 
      onPress={() => handleItemPress(item, showFilterResults ? 'filter' : 'search')} 
      style={styles.itemContainer}
    >
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => toggleFavorite(item.id)}>
        <Image
          source={heart}
          style={[
            styles.heartIcon,
            favorites.includes(item.id) && styles.heartIconActive,
          ]}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Estimated price ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecentItem = ({ item }: { item: RecentItem }) => (
    <TouchableOpacity 
      onPress={() => handleItemPress(item, 'recent')}
      style={[styles.itemContainer, styles.recentItem]}
    >
      <TouchableOpacity
        style={styles.heartButton}
        onPress={() => toggleFavorite(item.id)}>
        <Image
          source={heart}
          style={[
            styles.heartIcon,
            favorites.includes(item.id) && styles.heartIconActive,
          ]}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Estimated price ${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderSearchBar()}
      {(showResults || showFilterResults) ? (
        <View style={styles.content}>
          {renderResultCount(showFilterResults)}
          <FlatList
            data={results}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {renderCategories()}
          <View style={styles.recentSection}>
            <View style={styles.recentHeader}>
              <Text style={styles.sectionTitle}>Recently viewed</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={recentlyViewed}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.recentContainer}
              columnWrapperStyle={styles.recentColumnWrapper}
              renderItem={renderRecentItem}
              keyExtractor={item => item.id}
            />
          </View>
        </ScrollView>
      )}

      <BottomModalComponent
        innerViewStyles={{padding: 0}}
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedMaterials([]);
                  setLow(0);
                  setHigh(1000);
                  setShowFilterResults(false);
                }}>
                <Text style={styles.clearAll}>Clear all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.modalScroll}>
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Materials</Text>
                <View style={styles.materialsGrid}>
                  
                  {materials.map(material => (
                    <TouchableOpacity
                      key={material.id}
                      style={[
                        styles.materialButton,
                        selectedMaterials.includes(material.id) &&
                          styles.materialButtonSelected,
                      ]}
                      onPress={() => toggleMaterial(material.id)}>
                      <Text
                        style={[
                          styles.materialButtonText,
                          selectedMaterials.includes(material.id) &&
                            styles.materialButtonTextSelected,
                        ]}>
                        {material.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Price range</Text>
                <View style={styles.sliderContainer}>
                  <Slider
                    low={low}
                    high={high}
                    setHigh={setHigh}
                    setLow={setLow}
                    maxRange={1000}
                    step={10}
                  />
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={[
                styles.applyButton,
                getActiveFiltersCount() === 0 && styles.applyButtonDisabled
              ]}
              onPress={handleApplyFilter}>
              <Text style={styles.applyButtonText}>
                Apply {getActiveFiltersCount() > 0 ? `(${getActiveFiltersCount()})` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomModalComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    paddingVertical: hp('2'),
    gap: wp('3'),
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: wp('10'),
    paddingHorizontal: wp('4'),
    height: hp('6'),
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: '#999',
  },
  searchInput: {
    flex: 1,
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: '#000',
    marginHorizontal: wp('2'),
  },
  clearText: {
    color: '#666',
    fontSize: scale(16),
    paddingHorizontal: wp('2'),
  },
  filterButtonContainer: {
    position: 'relative',
  },
  filterButton: {
    width: wp('11'),
    height: wp('11'),
    backgroundColor: '#fff',
    borderRadius: wp('5.5'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: '#000',
  },
  filterCount: {
    position: 'absolute',
    top: -wp('1.5'),
    right: -wp('1.5'),
    backgroundColor: '#FF3B30',
    borderRadius: wp('3'),
    minWidth: wp('5'),
    height: wp('5'),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  filterCountText: {
    color: '#fff',
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interMedium,
    textAlign: 'center',
  },
  resultCountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    marginBottom: hp('2'),
  },
  resultCount: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interSemiBold,
    color: '#000',
  },
  clearAll: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: colors.primary.main,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: wp('5'),
  },
  listContent: {
    paddingBottom: hp('2'),
  },
  itemContainer: {
    width: wp('43'),
    marginBottom: hp('2'),
    backgroundColor: '#fff',
    borderRadius: wp('4'),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartButton: {
    position: 'absolute',
    top: wp('2'),
    right: wp('2'),
    zIndex: 1,
    borderRadius: wp('4'),
    padding: wp('2'),
  },
  heartIcon: {
    width: wp('5'),
    height: wp('5'),
    tintColor: '#666',
  },
  heartIconActive: {
    tintColor: colors.primary.main,
  },
  itemImage: {
    width: '100%',
    height: wp('43'),
    resizeMode: 'cover',
  },
  itemInfo: {
    padding: wp('3'),
  },
  itemName: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: '#000',
    marginBottom: hp('0.5'),
  },
  itemPrice: {
    fontSize: scale(12),
    fontFamily: typography.fontFamily.interRegular,
    color: '#666',
  },
  categoriesSection: {
    paddingTop: hp('3'),
    paddingHorizontal: wp('5'),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontFamily: typography.fontFamily.interSemiBold,
    color: '#000',

  },
  categoriesContainer: {
    gap: wp('2'),
    paddingRight: wp('5'),
    

  },
  categoryButton: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1.2'),
    borderRadius: wp('6'),
    backgroundColor: '#F5F5F5',
    marginRight: wp('2'),
    marginTop: hp('2'),
  },
  categoryButtonActive: {
    backgroundColor: colors.primary.main,
  },
  categoryButtonText: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  recentSection: {
    paddingTop: hp('3'),
    paddingHorizontal: wp('5'),
  },
  recentContainer: {
    gap: wp('3'),
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2'),
  },
  viewAll: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interMedium,
    color: '#666',
  },
  recentItem: {
 
    overflow: 'hidden',
    marginRight: wp('3'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartIconContainer: {
    position: 'absolute',
    top: wp('2'),
    right: wp('2'),
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: wp('4'),
    padding: wp('1.5'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: wp('8'),
    borderTopRightRadius: wp('8'),
    paddingHorizontal: wp('5'),
    paddingTop: hp('3'),
    paddingBottom: hp('4'),
    height: hp('70'),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3'),
  },
  modalTitle: {
    fontSize: scale(24),
    fontFamily: typography.fontFamily.againstRegular,
    color: colors.text.primary,
  },
  modalScroll: {
    flex: 1,
  },
  filterSection: {
    marginBottom: hp('3'),
  },
  filterSectionTitle: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interSemiBold,
    color: colors.text.primary,
    marginBottom: hp('2'),
  },
  materialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2'),
  },
  materialButton: {
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
    borderRadius: wp('5'),
    backgroundColor: '#F5F5F5',
    marginBottom: hp('1'),
  },
  materialButtonSelected: {
    backgroundColor: '#FF9933',
  },
  materialButtonText: {
    fontSize: scale(14),
    fontFamily: typography.fontFamily.interRegular,
    color: '#666',
  },
  materialButtonTextSelected: {
    color: '#fff',
  },
  sliderContainer: {
    paddingHorizontal: wp('1'),
    height: hp('12'),
    marginTop: hp('2'),
    justifyContent: 'center',
    position: 'relative',
  },
  applyButton: {
    backgroundColor: '#FF9933',
    padding: hp('2'),
    borderRadius: wp('3'),
    alignItems: 'center',
    marginTop: hp('2'),
  },
  applyButtonText: {
    fontSize: scale(16),
    fontFamily: typography.fontFamily.interMedium,
    color: '#fff',
  },
  recentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  filterButtonActive: {
    borderColor: colors.primary.main,
  },
  recentColumnWrapper: {
    justifyContent: 'space-between',
  },
  applyButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
});

export default ExploreScreen;
