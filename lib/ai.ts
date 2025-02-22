import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { config } from "../config";

const genAI = new GoogleGenerativeAI(config.googleGeminiApiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 16_384,
  responseMimeType: "text/plain",
};

export function generatePromptForAdvisor(productsJson: object) {
  const prompt = `
You are a health and nutrition expert. Your task is to analyze the provided product data and generate a detailed report on how the user can improve their health based on the products they are consuming. The product data includes information on ingredients, nutritional values, allergens, additives, health scores, and health warnings.

Here is the product data in JSON format:

${JSON.stringify(productsJson)}

Please note the following when interpreting the 

- Nutritional values are provided per 100g for solid products (e.g., chips) and per 100ml for liquid products (e.g., beverages), as specified in the "nutrimentsPer" field.
- The Nutri-Score is a health score ranging from A (healthiest) to E (least healthy).
- The Nova Group classifies foods based on their level of processing, with 1 being unprocessed or minimally processed and 4 being ultra-processed.
- The Eco-Score provides an environmental impact assessment, but for this analysis, focus primarily on health aspects.
- Some ingredient names may be in languages other than English. Use your language capabilities to interpret them accurately.

For each product, consider the following:

1. **Nutritional values**: Analyze the amounts of fat, saturated fat, sugars, salt, and other relevant nutrients. Consider how these compare to recommended daily intakes for an average adult.
2. **Health scores**: Use the Nutri-Score and Nova Group to assess the overall health impact of the product.
3. **Additives and allergens**: Note any potentially harmful additives or common allergens that might affect health.
4. **Health warnings**: Pay special attention to any specific health warnings provided, as they directly indicate areas for improvement.

Based on this analysis, provide recommendations for each product on how the user can make healthier choices. Suggestions could include:

- Choosing alternative products with better nutritional profiles or health scores.
- Modifying consumption habits, such as reducing portion sizes or frequency of consumption.
- Providing general health advice related to the product's nutritional content, such as ways to balance high-sugar or high-fat intake in the diet.

Additionally, look for patterns across the products. If multiple products share similar health concerns (e.g., high sugar content), provide overarching recommendations to address these issues holistically.

Please structure your report as follows:

1. **Introduction**: Briefly explain the purpose of the report and the data being analyzed.
2. **Product Analysis**: For each product, provide a subsection with:
   - A summary of the product's nutritional profile and health scores.
   - Specific health concerns or benefits based on the analysis.
   - Actionable recommendations for improving health related to this product.
3. **Overall Recommendations**: Summarize the key health improvement strategies based on the analysis of all products. Address any patterns or recurring issues observed.
4. **Conclusion**: Reinforce the importance of making informed dietary choices and encourage the user to consider the recommendations provided.

The output should be in this json format:

{
  "reportTitle": "string",
  "introduction": {
    "overview": "string",
    "disclaimer": "string"
  },
  "productAnalysis": [
    {
      "productName": "string",
      "brand": "string",
      "summary": "string",
      "nutriScore": "string",
      "novaGroup": "number",
      "healthConcerns": "string",
      "recommendations": [
        "string",
        "string",
        "string",
        "string"
      ]
    },
    {
      "productName": "string",
      "brand": "string",
      "summary": "string",
      "nutriScore": "string",
      "novaGroup": "number",
      "healthConcerns": "string",
      "recommendations": [
        "string",
        "string",
        "string",
        "string"
      ]
    },
    {
      "productName": "string",
      "brand": "string",
      "summary": "string",
      "nutriScore": "string",
      "ecoScore": "string",
      "novaGroup": "number",
      "healthConcerns": "string",
      "recommendations": [
        "string",
        "string",
        "string",
        "string"
      ]
    },
    {
      "productName": "string",
      "brand": "string",
      "summary": "string",
      "nutriScore": "string",
      "ecoScore": "string",
      "novaGroup": "number",
      "healthConcerns": "string",
      "recommendations": [
        "string",
        "string",
        "string"
      ]
    },
    {
      "productName": "string",
      "brand": "string",
      "summary": "string",
      "nutriScore": "string",
      "ecoScore": "string",
      "novaGroup": "number",
      "healthConcerns": "string",
      "recommendations": [
        "string",
        "string",
        "string"
      ]
    },
    {
      "productName": "string",
      "brand": "string",
      "summary": "string",
      "nutriScore": "string",
      "ecoScore": "string",
      "novaGroup": "number",
      "healthConcerns": "string",
      "recommendations": [
        "string",
        "string",
        "string"
      ]
    },
    {
      "productName": "string",
      "brand": "string",
      "summary": "string",
      "nutriScore": "string",
      "ecoScore": "string",
      "novaGroup": "number",
      "healthConcerns": "string",
      "recommendations": [
        "string",
        "string",
        "string"
      ]
    }
   ],
  "overallRecommendations": {
    "recurringIssues": [
      "string",
      "string",
      "string",
      "string",
      "string"
    ],
    "healthImprovementStrategies": [
      "string",
      "string",
      "string",
      "string",
      "string"
    ]
  },
  "conclusion": "string"
}


Be specific and actionable in your advice, and explain the reasoning behind your recommendations. Use the data provided to support your suggestions.

Remember that this analysis is based on limited data about the user's diet. Your recommendations should be tailored to the provided product information and should not make assumptions about the user's entire diet or health status. If necessary, suggest that the user consults with a healthcare professional for personalized advice.
`


  return prompt;
}


function removeJsonTags(jsonString: string): string {
  const resultJson = jsonString.replace("\`\`\` json", "").replace("\`\`\`", "");
  return resultJson;
}

export async function callGeminiAPI(prompt: string): Promise<string> {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const finalResult = removeJsonTags(result.response.text());
    console.log("Gemini API response:", finalResult);
    return finalResult;
  } catch (error) {
    console.error("Failed to call Gemini API:", error);
    return "Failed to generate response from Gemini API."; // Or handle error as needed
  }
}
