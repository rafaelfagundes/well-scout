import { capitalize, capitalizeAll, removeDashes, removeHTMLTags } from '../../lib/text';

describe('Text Utility Functions', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('a')).toBe('A');
      expect(capitalize('')).toBe('');
    });

    it('should lowercase the rest of the string', () => {
      expect(capitalize('HELLO')).toBe('Hello');
      expect(capitalize('wORLD')).toBe('World');
    });
    it('should handle mixed-case strings', () => {
      expect(capitalize("hELLO wORLD")).toBe("Hello world");
    });
  });

  describe('capitalizeAll', () => {
    it('should capitalize the first letter of each word in a string', () => {
      expect(capitalizeAll('hello world')).toBe('Hello World');
      expect(capitalizeAll('this is a test')).toBe('This Is A Test');
      expect(capitalizeAll('single')).toBe('Single');
      expect(capitalizeAll('')).toBe('');
    });

    it('should handle multiple spaces and mixed case', () => {
      expect(capitalizeAll("  hello   world  ")).toBe("  Hello   World  ");
      expect(capitalizeAll("hELLO wORLD")).toBe("Hello World");
    });
  });

  describe('removeDashes', () => {
    it('should replace all dashes with spaces', () => {
      expect(removeDashes('hello-world')).toBe('hello world');
      expect(removeDashes('this-is-a-test')).toBe('this is a test');
      expect(removeDashes('no-dashes')).toBe('no dashes');
      expect(removeDashes('')).toBe('');
      expect(removeDashes('----')).toBe('    ');
    });
  });

  describe('removeHTMLTags', () => {
    it('should remove all HTML tags from a string', () => {
      expect(removeHTMLTags('<p>Hello, <b>world</b>!</p>')).toBe('Hello, world!');
      expect(removeHTMLTags('<div>This is a <span>test</span>.</div>')).toBe('This is a test.');
      expect(removeHTMLTags('No tags here.')).toBe('No tags here.');
      expect(removeHTMLTags('')).toBe('');
      expect(removeHTMLTags('<br>')).toBe('');
      expect(removeHTMLTags('<img src="image.jpg" alt="An image">')).toBe('');
      expect(removeHTMLTags('<a href="https://example.com">Link</a>')).toBe('Link');
    });

    it('should handle empty tags', () => {
      expect(removeHTMLTags('<p></p>')).toBe('');
    });
  });
});
