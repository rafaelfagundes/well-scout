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
    energy?: number;
    energyKj?: number;
    energyKcal?: number;
    proteins?: number;
    casein?: number;
    serumProteins?: number;
    nucleotides?: number;
    carbohydrates?: number;
    sugars?: number;
    sucrose?: number;
    glucose?: number;
    fructose?: number;
    lactose?: number;
    maltose?: number;
    maltodextrins?: number;
    starch?: number;
    polyols?: number;
    fat?: number;
    saturatedFat?: number;
    butyricAcid?: number;
    caproicAcid?: number;
    caprylicAcid?: number;
    capricAcid?: number;
    lauricAcid?: number;
    myristicAcid?: number;
    palmiticAcid?: number;
    stearicAcid?: number;
    arachidicAcid?: number;
    behenicAcid?: number;
    lignocericAcid?: number;
    ceroticAcid?: number;
    montanicAcid?: number;
    melissicAcid?: number;
    monounsaturatedFat?: number;
    polyunsaturatedFat?: number;
    omega3Fat?: number;
    alphaLinolenicAcid?: number;
    eicosapentaenoicAcid?: number;
    docosahexaenoicAcid?: number;
    omega6Fat?: number;
    linoleicAcid?: number;
    arachidonicAcid?: number;
    gammaLinolenicAcid?: number;
    dihomGammaLinolenicAcid?: number;
    omega9Fat?: number;
    oleicAcid?: number;
    elaidicAcid?: number;
    gondoicAcid?: number;
    meadAcid?: number;
    erucicAcid?: number;
    nervonicAcid?: number;
    transFat?: number;
    cholesterol?: number;
    fiber?: number;
    sodium?: number;
    alcohol?: number;
    vitaminA?: number;
    vitaminD?: number;
    vitaminE?: number;
    vitaminK?: number;
    vitaminC?: number;
    vitaminB1?: number;
    vitaminB2?: number;
    vitaminPP?: number;
    vitaminB6?: number;
    vitaminB9?: number;
    vitaminB12?: number;
    biotin?: number;
    pantothenicAcid?: number;
    silica?: number;
    bicarbonate?: number;
    potassium?: number;
    chloride?: number;
    calcium?: number;
    phosphorus?: number;
    iron?: number;
    magnesium?: number;
    zinc?: number;
    copper?: number;
    manganese?: number;
    fluoride?: number;
    selenium?: number;
    chromium?: number;
    molybdenum?: number;
    iodine?: number;
    caffeine?: number;
    taurine?: number;
    ph?: number;
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
      "energy_100g": product.nutriments.energy_100g,
      "energy-kj_100g": product.nutriments["energy-kj_100g"],
      "energy-kcal_100g": product.nutriments["energy-kcal_100g"],
      "proteins_100g": product.nutriments.proteins_100g,
      "casein_100g": product.nutriments.casein_100g,
      "serum-proteins_100g": product.nutriments["serum-proteins_100g"],
      "nucleotides_100g": product.nutriments.nucleotides_100g,
      "carbohydrates_100g": product.nutriments["carbohydrates_100g"],
      "sugars_100g": product.nutriments.sugars_100g,
      "sucrose_100g": product.nutriments.sucrose_100g,
      "glucose_100g": product.nutriments.glucose_100g,
      "fructose_100g": product.nutriments.fructose_100g,
      "lactose_100g": product.nutriments.lactose_100g,
      "maltose_100g": product.nutriments.maltose_100g,
      "maltodextrins_100g": product.nutriments.maltodextrins_100g,
      "starch_100g": product.nutriments.starch_100g,
      "polyols_100g": product.nutriments.polyols_100g,
      "fat_100g": product.nutriments.fat_100g,
      "saturated-fat_100g": product.nutriments["saturated-fat_100g"],
      "butyric-acid_100g": product.nutriments["butyric-acid_100g"],
      "caproic-acid_100g": product.nutriments["caproic-acid_100g"],
      "caprylic-acid_100g": product.nutriments["caprylic-acid_100g"],
      "capric-acid_100g": product.nutriments["capric-acid_100g"],
      "lauric-acid_100g": product.nutriments["lauric-acid_100g"],
      "myristic-acid_100g": product.nutriments["myristic-acid_100g"],
      "palmitic-acid_100g": product.nutriments["palmitic-acid_100g"],
      "stearic-acid_100g": product.nutriments["stearic-acid_100g"],
      "arachidic-acid_100g": product.nutriments["arachidic-acid_100g"],
      "behenic-acid_100g": product.nutriments["behenic-acid_100g"],
      "lignoceric-acid_100g": product.nutriments["lignoceric-acid_100g"],
      "cerotic-acid_100g": product.nutriments["cerotic-acid_100g"],
      "montanic-acid_100g": product.nutriments["montanic-acid_100g"],
      "melissic-acid_100g": product.nutriments["melissic-acid_100g"],
      "monounsaturated-fat_100g": product.nutriments["monounsaturated-fat_100g"],
      "polyunsaturated-fat_100g": product.nutriments["polyunsaturated-fat_100g"],
      "omega-3-fat_100g": product.nutriments["omega-3-fat_100g"],
      "alpha-linolenic-acid_100g": product.nutriments["alpha-linolenic-acid_100g"],
      "eicosapentaenoic-acid_100g": product.nutriments["eicosapentaenoic-acid_100g"],
      "docosahexaenoic-acid_100g": product.nutriments["docosahexaenoic-acid_100g"],
      "omega-6-fat_100g": product.nutriments["omega-6-fat_100g"],
      "linoleic-acid_100g": product.nutriments["linoleic-acid_100g"],
      "arachidonic-acid_100g": product.nutriments["arachidonic-acid_100g"],
      "gamma-linolenic-acid_100g": product.nutriments["gamma-linolenic-acid_100g"],
      "dihomo-gamma-linolenic-acid_100g": product.nutriments["dihomo-gamma-linolenic-acid_100g"],
      "omega-9-fat_100g": product.nutriments["omega-9-fat_100g"],
      "oleic-acid_100g": product.nutriments["oleic-acid_100g"],
      "elaidic-acid_100g": product.nutriments["elaidic-acid_100g"],
      "gondoic-acid_100g": product.nutriments["gondoic-acid_100g"],
      "mead-acid_100g": product.nutriments["mead-acid_100g"],
      "erucic-acid_100g": product.nutriments["erucic-acid_100g"],
      "nervonic-acid_100g": product.nutriments["nervonic-acid_100g"],
      "trans-fat_100g": product.nutriments["trans-fat_100g"],
      "cholesterol_100g": product.nutriments.cholesterol_100g,
      "fiber_100g": product.nutriments["fiber_100g"],
      "sodium_100g": product.nutriments["sodium_100g"],
      "alcohol_100g": product.nutriments["alcohol_100g"],
      "vitamin-a_100g": product.nutriments["vitamin-a_100g"],
      "vitamin-d_100g": product.nutriments["vitamin-d_100g"],
      "vitamin-e_100g": product.nutriments["vitamin-e_100g"],
      "vitamin-k_100g": product.nutriments["vitamin-k_100g"],
      "vitamin-c_100g": product.nutriments["vitamin-c_100g"],
      "vitamin-b1_100g": product.nutriments["vitamin-b1_100g"],
      "vitamin-b2_100g": product.nutriments["vitamin-b2_100g"],
      "vitamin-pp_100g": product.nutriments["vitamin-pp_100g"],
      "vitamin-b6_100g": product.nutriments["vitamin-b6_100g"],
      "vitamin-b9_100g": product.nutriments["vitamin-b9_100g"],
      "vitamin-b12_100g": product.nutriments["vitamin-b12_100g"],
      "biotin_100g": product.nutriments["biotin_100g"],
      "pantothenic-acid_100g": product.nutriments["pantothenic-acid_100g"],
      "silica_100g": product.nutriments["silica_100g"],
      "bicarbonate_100g": product.nutriments["bicarbonate_100g"],
      "potassium_100g": product.nutriments["potassium_100g"],
      "chloride_100g": product.nutriments["chloride_100g"],
      "calcium_100g": product.nutriments["calcium_100g"],
      "phosphorus_100g": product.nutriments["phosphorus_100g"],
      "iron_100g": product.nutriments["iron_100g"],
      "magnesium_100g": product.nutriments["magnesium_100g"],
      "zinc_100g": product.nutriments["zinc_100g"],
      "copper_100g": product.nutriments["copper_100g"],
      "manganese_100g": product.nutriments["manganese_100g"],
      "fluoride_100g": product.nutriments["fluoride_100g"],
      "selenium_100g": product.nutriments["selenium_100g"],
      "chromium_100g": product.nutriments["chromium_100g"],
      "molybdenum_100g": product.nutriments["molybdenum_100g"],
      "iodine_100g": product.nutriments["iodine_100g"],
      "caffeine_100g": product.nutriments["caffeine_100g"],
      "taurine_100g": product.nutriments["taurine_100g"],
      "ph_100g": product.nutriments["ph_100g"]
    },
    servingSize: product.serving_size || "",
    quantity: product.quantity || "",
    packaging: packaging,
    manufacturingPlaces: product.manufacturing_places_tags ? product.manufacturing_places_tags.map((place: string) => place.replace('en:', '')) : [],
    categories: product.categories_tags ? product.categories_tags.map((category: string) => category.replace('en:', '')) : []
  };
}
