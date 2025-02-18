type LangCode = string; //  2-letter language code e.g., "en", "fr"
type TaxonomyEntryId = string;  // e.g., "en:bottle"

interface TaxonomyEntry {
    id: TaxonomyEntryId;
    lc_name?: string; // Only present if tags_lc is specified in the request
}
interface ImageSizes {
    "100"?: {  // Example size, could be other numbers like 200, 400, etc.
        h: number;
        w: number;
        x?: number;
        y?: number
    };
    full?: {
        h: number;
        w: number;
    };
    [key: string]: { //for any other sizes that might exist.
        h: number;
        w: number;
    } | undefined
}
interface BaseImage {
    sizes: ImageSizes;
    uploaded_t?: string; // Unix timestamp
    uploader?: string;
    imgid?: string;   // ID of the original image
}

interface SelectedImageDetail {
    display?: ImageSizes;
    small?: ImageSizes;
    thumb?: ImageSizes;
}
interface PackagingComponent {
    number_of_units?: number;
    shape?: TaxonomyEntry;
    material?: TaxonomyEntry;
    recycling?: TaxonomyEntry;
    quantity_per_unit?: string;
    quantity_per_unit_value?: number;
    quantity_per_unit_unit?: string;
    weight_specified?: number;
    weight_measured?: number;
    weight_estimated?: number;
    weight?: number;
    weight_source_id?: "specified" | "measured" | "estimated";
}
interface NutrientLevels {
    fat?: "low" | "moderate" | "high";
    salt?: "low" | "moderate" | "high";
    "saturated-fat"?: "low" | "moderate" | "high";
    sugars?: "low" | "moderate" | "high";
}
interface RoleImage extends BaseImage {
    angle?: number;
    coordinates_image_size?: string;
    geometry?: string;
    normalize?: string | boolean | null;
    rev?: string;
    white_magic?: string | boolean | null;
    x1?: string;
    x2?: string;
    y1?: string;
    y2?: string;
}

// Corrected Images interface with a single index signature
interface Images {
    front?: RoleImage;
    // Single index signature that covers all cases
    [key: string]: BaseImage | RoleImage | undefined;
}

interface SelectedImages {
    front?: SelectedImageDetail;
    // Use a proper mapped type instead of template literal index signature
    [key: string]: SelectedImageDetail | undefined;
}
interface EcoscoreAdjustments {
    origins_of_ingredients?: object; // TODO: Define more specific type if structure is known
    packaging?: object;              // TODO: Define more specific type if structure is known
    production_system?: object;       // TODO: Define more specific type if structure is known
    threatened_species?: object;     // TODO: Define more specific type if structure is known
}
interface AgribalyseData {
    agribalyse_proxy_food_code?: string;
    agribalyse_food_code?: string;
    co2_agriculture?: number;
    co2_consumption?: number | null;
    co2_distribution?: number;
    co2_packaging?: number;
    co2_processing?: number;
    co2_total?: number;
    co2_transportation?: number;
    code?: string;
    dqr?: string;
    ef_agriculture?: number;
    ef_consumption?: number | null;
    ef_distribution?: number;
    ef_packaging?: number;
    ef_processing?: number;
    ef_total?: number;
    ef_transportation?: number;
    is_beverage?: 0 | 1;
    name_en?: string;
    // Using proper mapped type for dynamic language support
    [key: string]: string | number | null | undefined;
}

interface EcoscoreData {
    adjustments?: EcoscoreAdjustments;
    agribalyse?: AgribalyseData;
    grade?: string;
    grades?: { [key: string]: string };
    missing?: {
        labels?: number;
        origins?: number;
        packagings?: number;
    };
    missing_data_warning?: 0 | 1;
    previous_data?: {
        grade?: string | null;
        score?: number | null;
        agribalyse?: object; // Use a more specific type if available
    };
    score?: number;
    scores?: { [key: string]: number };
    status?: string;
}

interface Ingredient {
    id?: string;
    ingredients?: Ingredient[];  // Recursive ingredients
    percent?: number;
    percent_estimate?: number;
    percent_max?: string | number;
    percent_min?: number;
    text?: string;
    vegan?: string;  // Could be refined to an enum if possible values are known
    vegetarian?: string; // Could be refined to an enum if possible values are known
}

interface IngredientsAnalysis {
    "en:palm-oil"?: string[];
    "en:vegan-status-unknown"?: string[];
    "en:vegetarian-status-unknown"?: string[];
    [key: string]: string[] | undefined
}

// Corrected Nutriments using a mapped type
type NutrientSuffix = "_unit" | "_100g" | "_serving" | "_value" | "_prepared" | "_prepared_unit" | "_prepared_100g" | "_prepared_serving" | "_prepared_value";
type NutrientUnit = "g" | "mg" | "μg" | "cl" | "ml" | "% dv" | "% vol" | "ph" | "%" | "iu" | "mol/l" | "mval/l" | "ppm" | "kJ" | "kcal" | string;

interface Nutriments {
    alcohol?: number;
    carbohydrates?: number;
    energy?: number;
    energy_value?: number;
    "energy-kcal"?: number;
    "energy-kj"?: number;
    fat?: number;
    "fruits-vegetables-legumes-estimate-from-ingredients"?: number;
    "fruits-vegetables-nuts-estimate-from-ingredients"?: number;
    "nova-group"?: number;
    "nutrition-score-fr"?: any; //TODO: CHECK
    proteins?: number;
    salt?: number;
    "saturated-fat"?: number;
    sodium?: number;
    sugars?: number;
    "carbon-footprint-from-known-ingredients_product"?: number;
    "carbon-footprint-from-known-ingredients_serving"?: number;
    erythritol?: number;
    energy_unit?: "kcal" | "kJ";

    // Use a mapped type for dynamic nutrient properties
    [key: string]: number | string | undefined; // General index signature
}

interface NutriscoreDataCommon {
    category_available?: 0 | 1;
    grade?: "a" | "b" | "c" | "d" | "e";
    nutrients_available?: 0 | 1;
    nutriscore_applicable?: 0 | 1;
    nutriscore_computed?: 0 | 1;
    score?: number;
}
interface NutriscoreDataDetail {
    saturated_fat_ratio?: number;
    saturated_fat_ratio_points?: number;
    saturated_fat_ratio_value?: number;
    is_beverage?: 0 | 1;
    is_cheese?: 0 | 1;
    is_water?: 0 | 1;
    is_fat?: 0 | 1;
    energy?: number;
    energy_points?: number;
    energy_value?: number;
    fiber?: number;
    fiber_points?: number;
    fiber_value?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
    fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
    proteins?: number;
    proteins_points?: number;
    proteins_value?: number;
    saturated_fat?: number;
    saturated_fat_points?: number;
    saturated_fat_value?: number;
    sodium?: number;
    sodium_points?: number;
    sodium_value?: number;
    sugars?: number;
    sugars_points?: number;
    sugars_value?: number;
    negative_points?: number;
    positive_points?: number;
    grade?: "a" | "b" | "c" | "d" | "e";
    score?: number;
}

interface Nutriscore {
    "2021"?: NutriscoreDataCommon & { data?: NutriscoreDataDetail };
    "2023"?: NutriscoreDataCommon & { data?: NutriscoreDataDetail };
}

interface Source {
    fields?: string[];
    id?: string;
    images?: object[]; // TODO: Define more specific type if structure is known
    import_t?: number;
    manufacturer?: number | string;
    name?: string;
    source_licence?: string;
    source_licence_url?: string;
    url?: string | null;
}
interface SourcesFields {
    "org-gs1"?: {
        gln?: string;
        gpcCategoryCode?: string;
        gpcCategoryName?: string;
        isAllergenRelevantDataProvided?: string;
        lastChangeDateTime?: string;
        partyName?: string;
        productionVariantDescription?: string;
        publicationDateTime?: string;
    }
}

interface KnowledgePanelElement {
    // Define specific element types here, e.g., text element, image element, etc.
    // Example:
    // type?: "text";
    // text?: string;
    // Or:
    // type?: "image";
    // url?: string;
    [key: string]: any; // Placeholder - needs to be replaced with concrete types
}
interface KnowledgePanel {
    type?: string;
    expanded?: boolean;
    expand_for?: string; //  "large"
    evaluation?: "good" | "average" | "neutral" | "bad" | "unknown";
    title_element?: KnowledgePanelElement; // Use the defined type above
    elements?: KnowledgePanelElement[];
    level?: string;
    size?: "small";
    topics?: string[];
}

interface KnowledgePanels {
    [panelId: string]: KnowledgePanel | undefined;
}
interface AttributeGroup {
    id: string;
    status: "known" | "unknown";
    title?: string;  //descriptive sentence.
    match?: number; //  0 to 100
    grade?: "unknown" | "a" | "b" | "c" | "d" | "e";
    name?: string; // name of the atribute
    icon_url?: string;
    description?: string;
    description_short?: string;
}

// Helper types for better type safety with language-specific fields
type LanguageSpecificField<T> = {
    [K in `${string}_${LangCode}`]?: T;
};

// Modified Product interface with proper handling of dynamic properties
interface Product {
    abbreviated_product_name?: string;
    code?: string; // Barcode
    codes_tags?: string[];
    generic_name?: string;
    id?: string;
    lc?: string;
    lang?: string;
    nova_group?: number; // 1 to 4
    nova_groups?: string;
    obsolete?: string;
    obsolete_since_date?: string;
    product_name?: string;
    product_name_en?: string; // And other languages like product_name_fr
    product_quantity?: string;
    product_quantity_unit?: string;
    quantity?: string;
    additives_n?: number;
    checked?: string;
    complete?: number;
    completeness?: number;
    ecoscore_grade?: string;
    ecoscore_score?: number;
    food_groups?: string;
    food_groups_tags?: string[]; // This is explicitly defined
    nutrient_levels?: NutrientLevels;
    packaging_text?: string;
    packagings?: PackagingComponent[];  // Use the defined type
    packagings_complete?: 0 | 1; // 0 or 1
    pnns_groups_1?: string;
    pnns_groups_1_tags?: string[];
    pnns_groups_2?: string;
    pnns_groups_2_tags?: string[];
    popularity_key?: number;
    popularity_tags?: string[];
    scans_n?: number;
    unique_scans_n?: number;
    serving_quantity?: string;
    serving_quantity_unit?: string;
    serving_size?: string;
    brands?: string;
    brands_tags?: string[];
    categories?: string;
    categories_hierarchy?: string[];
    categories_lc?: string;
    categories_tags?: string[];
    checkers_tags?: string[];
    cities?: string;
    cities_tags?: object[]; //TODO CHECK
    correctors_tags?: string[];
    countries?: string;
    countries_hierarchy?: string[];
    countries_lc?: string;
    countries_tags?: string[];
    ecoscore_tags?: string[];
    emb_codes?: string;
    emb_codes_orig?: string;
    emb_codes_tags?: object[]; //TODO CHECK
    labels?: string;
    labels_hierarchy?: string[];
    labels_lc?: string;
    labels_tags?: string[];
    entry_dates_tags?: string[];
    manufacturing_places?: string;
    manufacturing_places_tags?: string[];
    nova_groups_tags?: string[];
    nutrient_levels_tags?: string[];
    images?: Images;
    last_image_dates_tags?: string[];
    last_image_t?: number;
    selected_images?: SelectedImages;
    image_small_url?: string;
    image_thumb_url?: string;
    image_url?: string;
    ecoscore_data?: EcoscoreData;
    ecoscore_extended_data_version?: string;
    environment_impact_level?: string;
    environment_impact_level_tags?: object[]; //TODO CHECK
    additives_tags?: string[];
    allergens?: string;
    allergens_lc?: string;
    allergens_hierarchy?: string[];
    allergens_tags?: string[];
    ingredients?: Ingredient[];
    ingredients_analysis?: IngredientsAnalysis;
    ingredients_analysis_tags?: string[];
    ingredients_from_or_that_may_be_from_palm_oil_n?: number;
    ingredients_from_palm_oil_n?: number;
    ingredients_from_palm_oil_tags?: object[]; //TODO CHECK
    ingredients_hierarchy?: string[];
    ingredients_n?: number;
    ingredients_n_tags?: string[];
    ingredients_original_tags?: string[];
    ingredients_percent_analysis?: number;
    ingredients_sweeteners_n?: number;
    ingredients_non_nutritive_sweeteners_n?: number;
    ingredients_tags?: string[];
    ingredients_lc?: string;
    ingredients_text?: string;
    ingredients_text_with_allergens?: string;
    ingredients_that_may_be_from_palm_oil_n?: number;
    ingredients_that_may_be_from_palm_oil_tags?: object[]; //TODO CHECK
    ingredients_with_specified_percent_n?: number;
    ingredients_with_specified_percent_sum?: number;
    ingredients_with_unspecified_percent_n?: number;
    ingredients_with_unspecified_percent_sum?: number;
    known_ingredients_n?: number;
    origins?: string;
    origins_hierarchy?: object[]; //TODO CHECK
    origins_lc?: string;
    origins_tags?: object[]; //TODO CHECK
    traces?: string;
    traces_hierarchy?: (object | string)[]; //TODO: CHECK
    traces_lc?: string;
    traces_tags?: (object | string)[]; //TODO CHECK
    unknown_ingredients_n?: number;
    no_nutrition_data?: string;
    nutrition_data_per?: "serving" | "100g";
    nutrition_data_prepared_per?: "serving" | "100g";
    nutriments?: Nutriments;
    nutrition_grade_fr?: string;
    nutrition_grades?: string;
    nutrition_grades_tags?: string[];
    nutrition_score_beverage?: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients?: number;
    nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value?: number;
    nutrition_score_warning_no_fiber?: number;
    other_nutritional_substances_tags?: object[]; //TODO CHECK
    unknown_nutrients_tags?: object[]; //TODO CHECK
    vitamins_tags?: object[]; //TODO CHECK
    nutriscore?: Nutriscore;
    nutriscore_2021_tags?: ("a" | "b" | "c" | "d" | "e")[];
    nutriscore_2023_tags?: ("a" | "b" | "c" | "d" | "e")[];
    nutriscore_data?: NutriscoreDataDetail;
    nutriscore_grade?: "a" | "b" | "c" | "d" | "e";
    nutriscore_score?: number;
    nutriscore_score_opposite?: number;
    nutriscore_tags?: ("a" | "b" | "c" | "d" | "e")[];
    nutriscore_version?: string;
    additives_original_tags?: string[];
    additives_prev_original_tags?: string[];
    added_countries_tags?: object[]; //TODO CHECK
    allergens_from_ingredients?: string;
    allergens_from_user?: string;
    amino_acids_prev_tags?: object[]; //TODO CHECK
    amino_acids_tags?: object[]; //TODO CHECK
    carbon_footprint_percent_of_known_ingredients?: number;
    categories_properties?: {
        "agribalyse_food_code:en"?: string;
        "agribalyse_proxy_food_code:en"?: string;
        "ciqual_food_code:en"?: string;
    };
    categories_properties_tags?: string[];
    category_properties?: {
        [key: string]: string
    };
    ciqual_food_name_tags?: string[];
    compared_to_category?: string;
    conservation_conditions?: string;
    customer_service?: string;
    expiration_date?: string;
    link?: string;
    main_countries_tags?: object[]; //TODO CHECK
    minerals_prev_tags?: object[]; //TODO CHECK
    minerals_tags?: object[]; //TODO CHECK
    owner_fields?: {
        [key: string]: number | string | object | undefined
    };
    nova_groups_markers?: {
        [key: string]: string[][]
    };
    nucleotides_tags?: object[]; //TODO CHECK
    origin?: string;
    purchase_places?: string;
    purchase_places_tags?: string[];
    stores?: string;
    stores_tags?: string[];
    traces_from_ingredients?: string;
    traces_from_user?: string;
    created_t?: number;  // Unix timestamp
    creator?: string;
    editors_tags?: string[];
    informers_tags?: string[];
    interface_version_created?: string;
    interface_version_modified?: string;
    languages?: { [key: `en:${LangCode}`]: number };
    languages_codes?: { [key: LangCode]: number };
    languages_hierarchy?: string[];
    languages_tags?: string[];
    last_edit_dates_tags?: string[];
    last_editor?: string;
    last_modified_by?: string;
    last_modified_t?: number; // Unix timestamp
    owner?: string;
    owners_tags?: string;
    photographers_tags?: string[];
    rev?: number;
    sources?: Source[];
    sources_fields?: SourcesFields
    teams?: string;
    teams_tags?: string[];
    update_key?: string;
    knowledge_panels?: KnowledgePanels;
    attribute_groups?: AttributeGroup[];

    // Single index signature for all dynamic properties to avoid conflicts
    [key: string]: any;
}

interface GetProductByBarcodeResponse {
    code: string;
    status: 0 | 1;
    status_verbose: string;
    product?: Product;
}