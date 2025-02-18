import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const ProductDetailsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  
  // Get the product ID from the route
  const { id } = useLocalSearchParams();
  const [expandedSection, setExpandedSection] = useState(null);

  // Simulate fetching product data
  React.useEffect(() => {
    // In a real app, you'd fetch this data from an API
    setTimeout(() => {
      // Find the product in the DATA array
      const foundProduct = DATA.find(p => p.id === id);
      if (foundProduct) {
        setProduct({
          code: foundProduct.id,
          product_name: foundProduct.productName,
          brands: foundProduct.brandName,
          image_url: foundProduct.imageUrl,
          nutriscore_grade: foundProduct.nutriScore.toLowerCase(),
          ecoscore_grade: foundProduct.ecoScore.toLowerCase(),
          nova_group: 3, // Default to processed food
          nutriments: {
            energy: 2000,
            energy_unit: 'kJ',
            fat: 10,
            'saturated-fat': 3,
            carbohydrates: 50,
            sugars: 20,
            proteins: 5,
            salt: 0.5,
          },
          ingredients_text: 'Ingredients not available',
          allergens: 'en:milk,en:nuts',
          categories_tags: ['en:food'],
          packaging: 'Plastic',
          origins: 'Unknown',
          labels_tags: ['en:organic'],
        });
      }
      setLoading(false);
    }, 1500);
  }, []);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const getNutriscoreImage = (grade) => {
    // In a real app, you'd have actual images for each grade
    if (!grade) return null;
    return `https://static.openfoodfacts.org/images/attributes/nutriscore-${grade.toLowerCase()}.png`;
  };

  const getNutrientLevel = (value, nutrient) => {
    // Simple example thresholds - in a real app, these would be more sophisticated
    if (nutrient === 'fat') {
      return value < 3 ? 'low' : value < 20 ? 'moderate' : 'high';
    } else if (nutrient === 'saturated-fat') {
      return value < 1.5 ? 'low' : value < 5 ? 'moderate' : 'high';
    } else if (nutrient === 'sugars') {
      return value < 5 ? 'low' : value < 12.5 ? 'moderate' : 'high';
    } else if (nutrient === 'salt') {
      return value < 0.3 ? 'low' : value < 1.5 ? 'moderate' : 'high';
    }
    return 'unknown';
  };

  const getNutrientLevelColor = (level) => {
    switch (level) {
      case 'low': return '#85BB2F';
      case 'moderate': return '#FFC107';
      case 'high': return '#EF5350';
      default: return '#9E9E9E';
    }
  };

  const NovaGroupExplanations = {
    1: 'Unprocessed or minimally processed foods',
    2: 'Processed culinary ingredients',
    3: 'Processed foods',
    4: 'Ultra-processed foods'
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading product information...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={60} color="#EF5350" />
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderScoreCircle = (score, label, color) => (
    <View style={[styles.scoreCircle, { backgroundColor: color }]}>
      <Text style={styles.scoreText}>{score || '?'}</Text>
      <Text style={styles.scoreLabel}>{label}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: product.image_url }}
            style={styles.productImage}
            resizeMode="contain"
          />

          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.product_name}</Text>
            <Text style={styles.brandName}>{product.brands}</Text>
            <Text style={styles.barcode}>Barcode: {product.code}</Text>

            <View style={styles.scoreContainer}>
              {renderScoreCircle(
                product.nutriscore_grade?.toUpperCase(),
                'Nutri',
                product.nutriscore_grade === 'a' ? '#038141' :
                  product.nutriscore_grade === 'b' ? '#85BB2F' :
                    product.nutriscore_grade === 'c' ? '#FFC107' :
                      product.nutriscore_grade === 'd' ? '#FF9800' : '#EF5350'
              )}

              {renderScoreCircle(
                product.ecoscore_grade?.toUpperCase(),
                'Eco',
                product.ecoscore_grade === 'a' ? '#038141' :
                  product.ecoscore_grade === 'b' ? '#85BB2F' :
                    product.ecoscore_grade === 'c' ? '#FFC107' :
                      product.ecoscore_grade === 'd' ? '#FF9800' : '#EF5350'
              )}

              {renderScoreCircle(
                product.nova_group,
                'Nova',
                product.nova_group === 1 ? '#038141' :
                  product.nova_group === 2 ? '#85BB2F' :
                    product.nova_group === 3 ? '#FFC107' : '#EF5350'
              )}
            </View>
          </View>
        </View>

        {/* Ingredients Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('ingredients')}
        >
          <MaterialCommunityIcons name="food-variant" size={24} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <MaterialIcons
            name={expandedSection === 'ingredients' ? 'expand-less' : 'expand-more'}
            size={24}
            color="#9E9E9E"
          />
        </TouchableOpacity>

        {expandedSection === 'ingredients' && (
          <View style={styles.sectionContent}>
            <Text style={styles.ingredientsText}>{product.ingredients_text}</Text>

            {product.allergens && (
              <View style={styles.allergensContainer}>
                <Text style={styles.allergensTitle}>Allergens:</Text>
                <View style={styles.allergensList}>
                  {product.allergens.split(',').map((allergen, index) => (
                    <View key={index} style={styles.allergenTag}>
                      <Text style={styles.allergenText}>
                        {allergen.replace('en:', '')}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Nutrition Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('nutrition')}
        >
          <MaterialCommunityIcons name="nutrition" size={24} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Nutrition Facts</Text>
          <MaterialIcons
            name={expandedSection === 'nutrition' ? 'expand-less' : 'expand-more'}
            size={24}
            color="#9E9E9E"
          />
        </TouchableOpacity>

        {expandedSection === 'nutrition' && (
          <View style={styles.sectionContent}>
            <View style={styles.nutritionHeader}>
              <Text style={styles.nutritionHeaderText}>Nutrition Facts per 100g</Text>
            </View>

            <View style={styles.nutritionRow}>
              <Text style={styles.nutritionLabel}>Energy</Text>
              <Text style={styles.nutritionValue}>
                {product.nutriments.energy} {product.nutriments.energy_unit}
              </Text>
            </View>

            {['fat', 'saturated-fat', 'carbohydrates', 'sugars', 'proteins', 'salt'].map((nutrient) => {
              const level = ['fat', 'saturated-fat', 'sugars', 'salt'].includes(nutrient)
                ? getNutrientLevel(product.nutriments[nutrient], nutrient)
                : null;

              return (
                <View key={nutrient} style={styles.nutritionRow}>
                  <View style={styles.nutritionLabelContainer}>
                    <Text style={styles.nutritionLabel}>
                      {nutrient.charAt(0).toUpperCase() + nutrient.slice(1).replace('-', ' ')}
                    </Text>
                    {level && (
                      <View style={[styles.levelIndicator, { backgroundColor: getNutrientLevelColor(level) }]}>
                        <Text style={styles.levelText}>{level}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.nutritionValue}>
                    {product.nutriments[nutrient]}g
                  </Text>
                </View>
              );
            })}

            {product.nutriscore_grade && (
              <View style={styles.nutriscoreContainer}>
                <Text style={styles.nutriscoreTitle}>Nutri-Score</Text>
                <Image
                  source={{ uri: getNutriscoreImage(product.nutriscore_grade) }}
                  style={styles.nutriscoreImage}
                  resizeMode="contain"
                />
              </View>
            )}
          </View>
        )}

        {/* Nova Group Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('nova')}
        >
          <MaterialCommunityIcons name="atom" size={24} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Processing (NOVA)</Text>
          <MaterialIcons
            name={expandedSection === 'nova' ? 'expand-less' : 'expand-more'}
            size={24}
            color="#9E9E9E"
          />
        </TouchableOpacity>

        {expandedSection === 'nova' && (
          <View style={styles.sectionContent}>
            <View style={styles.novaContainer}>
              <View style={[styles.novaCircle, {
                backgroundColor: product.nova_group === 1 ? '#038141' :
                  product.nova_group === 2 ? '#85BB2F' :
                    product.nova_group === 3 ? '#FFC107' : '#EF5350'
              }]}>
                <Text style={styles.novaNumber}>{product.nova_group}</Text>
              </View>
              <Text style={styles.novaExplanation}>
                {NovaGroupExplanations[product.nova_group] || 'Unknown processing level'}
              </Text>
            </View>
          </View>
        )}

        {/* Categories & Labels Section */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection('categories')}
        >
          <MaterialIcons name="category" size={24} color="#4CAF50" />
          <Text style={styles.sectionTitle}>Categories & Labels</Text>
          <MaterialIcons
            name={expandedSection === 'categories' ? 'expand-less' : 'expand-more'}
            size={24}
            color="#9E9E9E"
          />
        </TouchableOpacity>

        {expandedSection === 'categories' && (
          <View style={styles.sectionContent}>
            {product.categories_tags && (
              <View style={styles.categoriesContainer}>
                <Text style={styles.categoriesTitle}>Categories:</Text>
                <View style={styles.tagContainer}>
                  {product.categories_tags.map((category, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>
                        {category.replace('en:', '')}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {product.labels_tags && (
              <View style={styles.labelsContainer}>
                <Text style={styles.labelsTitle}>Labels:</Text>
                <View style={styles.tagContainer}>
                  {product.labels_tags.map((label, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>
                        {label.replace('en:', '')}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {product.packaging && (
              <View style={styles.packagingContainer}>
                <Text style={styles.packagingTitle}>Packaging:</Text>
                <Text style={styles.packagingText}>{product.packaging}</Text>
              </View>
            )}

            {product.origins && (
              <View style={styles.originsContainer}>
                <Text style={styles.originsTitle}>Origin:</Text>
                <Text style={styles.originsText}>{product.origins}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Footer buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerButton, styles.editButton]}>
          <MaterialIcons name="edit" size={20} color="#FFFFFF" />
          <Text style={styles.footerButtonText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton, styles.historyButton]}>
          <MaterialIcons name="history" size={20} color="#FFFFFF" />
          <Text style={styles.footerButtonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton, styles.shareButton]}>
          <MaterialIcons name="share" size={20} color="#FFFFFF" />
          <Text style={styles.footerButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#4CAF50',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#EF5350',
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productImage: {
    width: 100,
    height: 130,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  brandName: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  barcode: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 8,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scoreLabel: {
    position: 'absolute',
    bottom: -20,
    color: '#616161',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    borderBottomWidth: expandedSection ? 0 : 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginLeft: 10,
  },
  sectionContent: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  // Ingredients styles
  ingredientsText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  allergensContainer: {
    marginTop: 15,
  },
  allergensTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 8,
  },
  allergensList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  allergenTag: {
    backgroundColor: '#FFCDD2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EF9A9A',
  },
  allergenText: {
    color: '#D32F2F',
    fontSize: 12,
  },

  // Nutrition styles
  nutritionHeader: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 10,
  },
  nutritionHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  nutritionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#424242',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
  },
  levelIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 8,
  },
  levelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  nutriscoreContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  nutriscoreTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  nutriscoreImage: {
    width: '80%',
    height: 50,
  },

  // Nova styles
  novaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  novaCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  novaNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  novaExplanation: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
  },

  // Categories & Labels styles
  categoriesContainer: {
    marginBottom: 15,
  },
  categoriesTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  tagText: {
    color: '#2E7D32',
    fontSize: 12,
  },
  labelsContainer: {
    marginBottom: 15,
  },
  labelsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 8,
  },
  packagingContainer: {
    marginBottom: 15,
  },
  packagingTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 4,
  },
  packagingText: {
    fontSize: 14,
    color: '#616161',
  },
  originsContainer: {},
  originsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#424242',
    marginBottom: 4,
  },
  originsText: {
    fontSize: 14,
    color: '#616161',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  historyButton: {
    backgroundColor: '#FF9800',
  },
  shareButton: {
    backgroundColor: '#2196F3',
  },
  footerButtonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: '500',
  },
});

export default ProductDetailsScreen;
