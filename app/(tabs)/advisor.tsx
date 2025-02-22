import ScreenContainer from '@/components/ui/ScreenContainer';
import BackgroundImage from '@/components/ui/BackgroundImage';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { ProductState } from '@/features/products/productSlice';
import { generatePromptForAdvisor } from '@/lib/ai';
import DietaryAnalysis from '@/features/advisor/DietaryAnalysis';


function createSimplifiedProductList(originalJson: ProductState) {
  // Extract the history array containing product data
  const products = originalJson.history;

  // Map each product to a simplified object
  const simplifiedProducts = products.map(product => {
    const productInfo = product.productInfo;
    const extraInfo = product.extraInfo;

    // Determine if the product is a solid or liquid for nutrimentsPer (heuristic based on category)
    const isLiquid = productInfo.category.toLowerCase().includes('beverage') ||
      productInfo.category.toLowerCase().includes('drink') ||
      productInfo.quantity.toLowerCase().includes('ml') ||
      productInfo.quantity.toLowerCase().includes('l');
    const nutrimentsPer = isLiquid ? '100ml' : '100g';

    // Extract ingredients as a simple array of text
    const ingredients = productInfo.ingredients.map(ingredient => ingredient.text);

    // Standardize energy fields in nutriments
    const nutriments = {
      ...productInfo.nutriments,
      energyKj: productInfo.nutriments.energy || productInfo.nutriments.energyKj,
      energyKcal: productInfo.nutriments.energyKcal
    };
    delete nutriments.energy; // Remove ambiguous "energy" field if present

    // Extract health warnings
    const healthWarnings = extraInfo.health.warnings.map(warning => warning.text);

    return {
      productName: productInfo.productName,
      brand: productInfo.brand,
      ingredients: ingredients,
      nutrimentsPer: nutrimentsPer,
      nutriments: nutriments,
      allergens: productInfo.allergens,
      additives: productInfo.additives,
      nutriScore: productInfo.nutriscore,
      ecoScore: productInfo.ecoscore,
      novaGroup: productInfo.novaGroup,
      servingSize: productInfo.servingSize,
      quantity: productInfo.quantity,
      healthWarnings: healthWarnings
    };
  });

  // Return the array of simplified product objects
  return simplifiedProducts;
}

export default function SwapScreen() {
  const productState = useSelector((state: RootState) => state.product);
  const simplifiedProducts = createSimplifiedProductList(productState);
  const systemPrompt = generatePromptForAdvisor(simplifiedProducts);

  const sampleResult = `{
  "reportTitle": "Personalized Dietary Analysis and Recommendations",
  "introduction": {
    "overview": "This report analyzes the nutritional profiles and health scores of several commonly consumed products. Based on this analysis, it provides personalized recommendations for improving your overall dietary habits and health. This is achieved through analyzing product ingredients, nutritional values, allergens, additives, health scores and health warnings.",
    "disclaimer": "This analysis is based solely on the provided product data and does not constitute medical advice. Individual dietary needs and health conditions may vary. It is recommended to consult with a healthcare professional or registered dietitian for personalized advice."
  },
  "productAnalysis": [
    {
      "productName": "Sour Cream and Onion Chips",
      "brand": "Lay’s",
      "summary": "Lay's Sour Cream and Onion Chips are a highly processed snack food (Nova Group 4) with a poor Nutri-Score (E) due to high fat and sodium content. While containing some vitamin C, potassium, calcium and iron, these amounts are relatively low and not significant contributors to daily requirements. Key ingredients of concern are vegetable oil and the various additives.",
      "nutriScore": "e",
      "novaGroup": 4,
      "healthConcerns": "High in fat, saturated fat, and sodium. Ultra-processed nature raises concerns about long-term health effects.",
      "recommendations": [
        "Limit consumption frequency and portion sizes. The serving size is 17 chips, however, many often eat much more than this.",
        "Choose healthier snack alternatives such as baked chips or vegetable sticks with hummus.",
        "Be mindful of sodium intake from other sources in your diet when consuming these chips.",
        "Read the ingredient list before buying. Look for alternatives with less additives and healthy oils."
      ]
    },
    {
      "productName": "Coke Cola",
      "brand": "Coca-Cola",
      "summary": "Coca-Cola is an ultra-processed sugary drink (Nova Group 4) with a poor Nutri-Score (E). It provides minimal nutritional value, with a large amount of sugar per serving (10.6g per 100ml).",
      "nutriScore": "e",
      "novaGroup": 4,
      "healthConcerns": "Extremely high in sugar, contributing to excessive calorie intake. No nutritional benefits. Linked to increased risk of weight gain, type 2 diabetes, and other health problems.",
      "recommendations": [
        "Reduce or eliminate consumption entirely.",
        "Replace with water, unsweetened tea, or sparkling water with a squeeze of lemon or lime.",
        "If craving a fizzy drink, opt for diet or zero-sugar versions in moderation, but be aware of the potential impact of artificial sweeteners.",
        "Consider the impact on dental health and brush teeth after consuming sugary drinks."
      ]
    },
    {
      "productName": "Hershey's Milk Chocolate Bar",
      "brand": "Hershey's",
      "summary": "Hershey's Milk Chocolate Bar is an ultra-processed confectionery product (Nova Group 4) with a poor Nutri-Score (E). It is high in sugar and saturated fat. The presence of additives is also a concern.",
      "nutriScore": "e",
      "ecoScore": "e",
      "novaGroup": 4,
      "healthConcerns": "High in sugar and saturated fat. Provides minimal nutritional value. Ultra-processed nature raises concerns about long-term health effects.",
      "recommendations": [
        "Limit consumption frequency and portion sizes. Stick to the recommended serving size of 1 bar (43g).",
        "Choose dark chocolate with a higher cocoa content (70% or more) as a healthier alternative, providing antioxidants and less sugar.",
        "Be mindful of sugar intake from other sources in your diet when consuming chocolate.",
        "Consider it as an occasional treat rather than a regular snack."
      ]
    },
    {
      "productName": "Frosted Flakes",
      "brand": "KELLOGG'S",
      "summary": "Kellogg's Frosted Flakes are a processed cereal (Nova Group 3) with a Nutri-Score of D. While they are fortified with vitamins and minerals, they are also high in sugar.",
      "nutriScore": "d",
      "ecoScore": "d",
      "novaGroup": 3,
      "healthConcerns": "High sugar content. Added vitamins and minerals do not compensate for the high sugar level.",
      "recommendations": [
        "Reduce portion size and frequency of consumption.",
        "Choose a healthier cereal option with lower sugar and higher fiber content, such as whole-grain oats or bran flakes.",
        "Add fresh fruit like berries to your cereal for natural sweetness and added nutrients.",
        "Consider adding healthy fats and proteins such as nuts or seeds to balance out the carbohydrate load."
      ]
    },
    {
      "productName": "Pringles Original",
      "brand": "Pringles",
      "summary": "Pringles Original are a highly processed snack food (Nova Group 4) with a Nutri-Score of D due to high fat and sodium content. The main ingredients are potato flakes, vegetable oils, and rice flour. Allergen is gluten. The food additive present is an emulsifier.",
      "nutriScore": "d",
      "ecoScore": "b",
      "novaGroup": 4,
      "healthConcerns": "High in fat and sodium. Ultra-processed nature raises concerns about long-term health effects.",
      "recommendations": [
        "Limit consumption frequency and portion sizes.",
        "Choose healthier snack alternatives such as air-popped popcorn or baked sweet potato fries.",
        "Be mindful of sodium intake from other sources in your diet when consuming these chips.",
        "Look for alternatives with less additives and healthier oils."
      ]
    },
    {
      "productName": "Natural Creamy Peanut Butter Spread",
      "brand": "Skippy",
      "summary": "Skippy Natural Creamy Peanut Butter Spread is a processed food (Nova Group 2) with a Nutri-Score of C. It's a relatively good source of protein and fiber, but also high in fat and contains added sugar and palm oil.",
      "nutriScore": "c",
      "ecoScore": "d",
      "novaGroup": 2,
      "healthConcerns": "High in fat, particularly saturated fat from palm oil. Contains added sugar.",
      "recommendations": [
        "Choose natural peanut butter with no added sugar, salt, or oils.",
        "Limit portion size to 1-2 tablespoons per serving.",
        "Pair with whole-grain bread, fruits, or vegetables for a balanced snack.",
        "Be aware of the high calorie content and adjust intake accordingly."
      ]
    },
    {
      "productName": "M&M's Milk Chocolate",
      "brand": "M&M's",
      "summary": "M&M's Milk Chocolate are a highly processed confectionery product (Nova Group 4) with a poor Nutri-Score (E). It is very high in sugar and contains several artificial colors (e102, e110, e129, e132, e133) of concern. Allergen is milk and soybeans.",
      "nutriScore": "e",
      "ecoScore": "d",
      "novaGroup": 4,
      "healthConcerns": "Extremely high in sugar. Contains artificial colors that may have adverse effects on some individuals. Ultra-processed nature raises concerns about long-term health effects.",
      "recommendations": [
        "Limit consumption to very occasional treats.",
        "Explore healthier dessert options such as fresh fruit with a small amount of dark chocolate.",
        "Be particularly cautious if sensitive to food colorings.",
        "Consider the impact on dental health and brush teeth after consuming sugary sweets."
      ]
    }
  ],
  "overallRecommendations": {
    "recurringIssues": [
      "High sugar content across multiple products (Coke, Hershey's, Frosted Flakes, M&M's).",
      "High fat content, especially saturated fat, in several products (Chips, Hershey's, Peanut Butter, M&M's).",
      "High sodium content in processed snacks (Chips, Pringles).",
      "Ultra-processed nature (Nova Group 4) of many of the consumed items, potentially leading to long-term health issues.",
      "Presence of additives, including artificial colors, emulsifiers, and preservatives, in several products."
    ],
    "healthImprovementStrategies": [
      "Prioritize whole, unprocessed foods such as fruits, vegetables, whole grains, and lean protein sources.",
      "Reduce consumption of sugary drinks and processed snacks.",
      "Read nutrition labels carefully to be aware of sugar, fat, and sodium content.",
      "Choose products with a higher Nutri-Score (A or B) whenever possible.",
      "Prepare meals at home more often to control ingredients and portion sizes.",
      "Limit ultra-processed foods (Nova Group 4) and opt for minimally processed alternatives (Nova Group 1 or 2).",
      "Increase fiber intake by incorporating more fruits, vegetables, and whole grains into your diet.",
      "Stay hydrated by drinking plenty of water throughout the day."
    ]
  },
  "conclusion": "Making informed dietary choices is crucial for maintaining long-term health and well-being. This report highlights areas for improvement based on the analyzed product data. By implementing the recommended strategies, you can create a healthier and more balanced diet. Remember to consult with a healthcare professional or registered dietitian for personalized advice tailored to your individual needs."
}`

  const sampleJSON = JSON.parse(sampleResult);
  return (
    <BackgroundImage>
      <ScreenContainer>
        <DietaryAnalysis data={sampleJSON} />
      </ScreenContainer>
    </BackgroundImage>
  );
}

