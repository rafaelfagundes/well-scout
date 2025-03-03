import { callGeminiAPI, generatePromptForAdvisor, } from '../../lib/ai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Mock the entire @google/generative-ai module
jest.mock('@google/generative-ai');

const mockGenerativeModel = {
  startChat: jest.fn(),
};

const mockChatSession = {
  sendMessage: jest.fn(),
};

const mockResponse = {
  response: {
    text: jest.fn(),
  },
};

describe('AI Utility Functions', () => {
  beforeEach(() => {
    // Clear all mock implementations before each test
    jest.clearAllMocks();

    // Set up default mock implementations
    (GoogleGenerativeAI as unknown as jest.Mock).mockImplementation(() => ({
      getGenerativeModel: jest.fn(() => mockGenerativeModel),
    }));

    mockGenerativeModel.startChat.mockReturnValue(mockChatSession);
    mockChatSession.sendMessage.mockResolvedValue(mockResponse);

  });

  describe('callGeminiAPI', () => {

    it('should throw an error if no API key is provided', async () => {
      await expect(callGeminiAPI('', 'test prompt')).rejects.toThrow('No API key provided.');
    });

    it('should call the Gemini API with the correct parameters', async () => {
      mockResponse.response.text.mockReturnValue("```json{}```");
      const apiKey = 'test-api-key';
      const prompt = 'test prompt';
      await callGeminiAPI(apiKey, prompt);

      expect(GoogleGenerativeAI).toHaveBeenCalledWith(apiKey);
      expect(mockGenerativeModel.startChat).toHaveBeenCalledWith({
        generationConfig: expect.anything(), // Don't test the exact object
        history: [],
      });
      expect(mockChatSession.sendMessage).toHaveBeenCalledWith(prompt, { signal: undefined });

    });

    it('should return the generated text from the API response with JSON tags removed', async () => {
      mockResponse.response.text.mockReturnValue('```json{"key": "value"}```');
      const apiKey = 'test-api-key';
      const prompt = 'test prompt';
      const result = await callGeminiAPI(apiKey, prompt);
      expect(result).toBe('{"key": "value"}');
    });

    it("should handle errors during the API call", async () => {
      mockChatSession.sendMessage.mockRejectedValue(new Error("API Error"));
      const result = await callGeminiAPI("test-api-key", "some prompt")
      expect(result).toBe("Failed to generate response from Gemini API.");

    });

    it('should use provided AbortSignal', async () => {
      mockResponse.response.text.mockReturnValue("```json{}```");
      const apiKey = 'test-api-key';
      const prompt = 'test prompt';
      const abortController = new AbortController();
      const signal = abortController.signal;

      await callGeminiAPI(apiKey, prompt, signal);
      expect(mockChatSession.sendMessage).toHaveBeenCalledWith(prompt, { signal });

    });

  });

  describe("generatePromptForAdvisor", () => {

    it("should generate a valid prompt", () => {
      const productList = [{
        productName: "Test product",
        ingredients: ["water", "sugar"],
        nutriments: { fat: 10 },
        nutrimentsPer: "100g",
        allergens: [],
        additives: [],
        nutriScore: "A",
        ecoScore: "B",
        novaGroup: 1,
        healthWarnings: [],
      }];
      const prompt = generatePromptForAdvisor(productList);
      expect(prompt).toContain("You are a health and nutrition expert.");
      expect(prompt).toContain(JSON.stringify(productList));
    });

    it("should generate valid prompt for empty product list", () => {
      const prompt = generatePromptForAdvisor([]);

      expect(prompt).toContain("You are a health and nutrition expert.");
      expect(prompt).toContain(JSON.stringify([]));
    })
  });

});
