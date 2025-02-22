export interface ProductInfo {
  productName: string;
  genericName: string;
  brand: string;
  image: string;
  nutriscore: string;
  novaGroup: number;
  ecoscore: string;
  ingredients: {
    text: string;
    id: string;
    vegan?: string;
    vegetarian?: string;
  }[];
  additives: string[];
  allergens: string[];
  nutriments: {
    fat: number;
    saturatedFat: number;
    sugars: number;
    salt: number;
    energyKj?: number;
    energyKcal?: number;
    carbohydrates?: number;
    proteins?: number;
    fiber?: number;
    sodium?: number
  };
  servingSize: string;
  quantity: string;
  packaging: string[];
  manufacturingPlaces: string[];
  categories: string[];
}

export interface ExtraInformation {
  health: {
    additives: {
      name: string;
      information?: string;
      sourceText?: string;
      sourceUrl?: string;
    }[];
    nutrients: {
      id: string;
      name: string;
      quantity: string;
      unit?: string;
      evaluation?: string;
      information?: string;
    }[];
    warnings: {
      text: string;
      level?: string;
      evaluation?: string;
    }[];
  };
  other: {
    isRecyclable?: boolean;
    isPalmOilFree?: 'yes' | 'no' | 'unknown';
    isVegan?: 'yes' | 'no' | 'unknown';
    isVegetarian?: 'yes' | 'no' | 'unknown';
  };
}

export function extractExtraInformation(data: any): ExtraInformation {
  const knowledgePanels = data?.product?.knowledge_panels;

  const extraInformation: ExtraInformation = {
    health: {
      additives: [],
      nutrients: [],
      warnings: [],
    },
    other: {
      isRecyclable: undefined,
      isPalmOilFree: 'unknown', // Initialize
      isVegan: 'unknown',
      isVegetarian: 'unknown',
    },
  };

  if (knowledgePanels) {
    // Extract Additives
    for (const key in knowledgePanels) {
      if (key.startsWith("additive_en:")) {
        const additive = knowledgePanels[key];
        const additiveInfo = {
          name: additive?.title_element?.title || "",
          information: additive?.elements?.[0]?.text_element?.html,
          sourceText: additive?.elements?.[0]?.text_element?.source_text,
          sourceUrl: additive?.elements?.[0]?.text_element?.source_url,
        };
        extraInformation.health.additives.push(additiveInfo);
      }
    }

    // Extract Nutrient Levels with IDs
    const nutrientLevels: { key: string; id: string }[] = [
      { key: "nutrient_level_fat", id: "fat" },
      { key: "nutrient_level_saturated-fat", id: "saturatedFat" },
      { key: "nutrient_level_sugars", id: "sugars" },
      { key: "nutrient_level_salt", id: "salt" },
    ];

    nutrientLevels.forEach(({ key, id }) => {
      const level = knowledgePanels[key];
      if (level) {
        const title = level?.title_element?.title || "";
        const match = title.match(/([\d.]+)\s*([a-zA-Z%]+)/);
        const quantity = match ? match[1] : "";
        const unit = match ? match[2] : "";

        extraInformation.health.nutrients.push({
          id: id, // Use the defined ID
          name: level?.title_element?.name || "",
          quantity: quantity,
          unit: unit,
          evaluation: level?.evaluation,
          information: level?.elements?.[0]?.text_element?.html,
        });
      }
    });

    // Extract Ultra-Processed Food Warnings
    const ultraProcessed = knowledgePanels?.recommendation_ultra_processed_foods;
    if (ultraProcessed) {
      extraInformation.health.warnings.push({
        text: ultraProcessed.title_element?.title + " " + ultraProcessed.title_element?.subtitle || "",
        level: ultraProcessed.level,
        evaluation: ultraProcessed.evaluation,
      });

    }

    // Extract Other Information (Recyclable, Palm Oil, Vegan, Vegetarian)
    extraInformation.other.isRecyclable = knowledgePanels["packaging_recycling"]?.evaluation === 'good'

    const palmOilStatus = knowledgePanels["ingredients_analysis_en:palm-oil-free"]?.evaluation;
    extraInformation.other.isPalmOilFree = palmOilStatus === "good" ? "yes" : palmOilStatus === "bad" ? 'no' : "unknown";


    const veganStatus = knowledgePanels["ingredients_analysis_en:vegan-status-unknown"]?.evaluation;
    extraInformation.other.isVegan = veganStatus === "good" ? "yes" : veganStatus === "bad" ? "no" : "unknown";

    const vegetarianStatus = knowledgePanels["ingredients_analysis_en:vegetarian-status-unknown"]?.evaluation;
    extraInformation.other.isVegetarian = vegetarianStatus === "good" ? "yes" : vegetarianStatus === "bad" ? "no" : "unknown";

  }

  return extraInformation;
}


export function extractProductInfo(data: any): ProductInfo {
  const product = data.product;

  const packaging: string[] = product.packaging_tags
    ? product.packaging_tags.map((tag: string) => tag.replace('en:', ''))
    : [];

  const ingredients = product.ingredients
    ? product.ingredients.map((ing: any) => ({
      text: ing.text,
      id: ing.id,
      vegan: ing.vegan,
      vegetarian: ing.vegetarian,
    })).filter((ingredient: any) => ingredient.id.startsWith('en:'))
    : [];

  return {
    productName: product.product_name_en || product.product_name || "",
    genericName: product.generic_name_en || product.generic_name || "",
    brand: product.brands || product.brands_tags[0] || "",
    image: product.image_front_url || "",
    nutriscore: product.nutriscore_grade || "not-applicable",
    novaGroup: product.nova_group || -1,
    ecoscore: product.ecoscore_grade || "not-applicable",
    ingredients: ingredients,
    additives: product.additives_tags ? product.additives_tags.map((tag: string) => tag.replace('en:', '')) : [],
    allergens: product.allergens_tags ? product.allergens_tags.map((tag: string) => tag.replace('en:', '')) : [],
    nutriments: {
      fat: product.nutriments.fat_100g,
      saturatedFat: product.nutriments["saturated-fat_100g"],
      sugars: product.nutriments.sugars_100g,
      salt: product.nutriments.salt_100g,
      energyKj: product.nutriments["energy-kj_100g"],
      energyKcal: product.nutriments["energy-kcal_100g"],
      carbohydrates: product.nutriments["carbohydrates_100g"],
      proteins: product.nutriments["proteins_100g"],
      fiber: product.nutriments["fiber_100g"],
      sodium: product.nutriments["sodium_100g"]
    },
    servingSize: product.serving_size || "",
    quantity: product.quantity || "",
    packaging: packaging,
    manufacturingPlaces: product.manufacturing_places_tags ? product.manufacturing_places_tags.map((place: string) => place.replace('en:', '')) : [],
    categories: product.categories_tags ? product.categories_tags.map((category: string) => category.replace('en:', '')) : []
  };
}
