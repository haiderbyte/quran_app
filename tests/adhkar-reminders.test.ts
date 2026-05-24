import { describe, it, expect } from 'vitest';
import adhkarData from '../constants/adhkar-dua.json';

describe('Adhkar and Reminders', () => {
  it('should load adhkar data successfully', () => {
    expect(adhkarData).toBeDefined();
    expect(adhkarData.categories).toBeDefined();
    expect(Array.isArray(adhkarData.categories)).toBe(true);
  });

  it('should have at least 5 categories', () => {
    expect(adhkarData.categories.length).toBeGreaterThanOrEqual(5);
  });

  it('should have correct structure for each category', () => {
    adhkarData.categories.forEach((category: any) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('icon');
      expect(category).toHaveProperty('items');
      expect(Array.isArray(category.items)).toBe(true);
    });
  });

  it('should have correct structure for each adhkar item', () => {
    adhkarData.categories.forEach((category: any) => {
      category.items.forEach((item: any) => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('text');
        expect(item).toHaveProperty('count');
        expect(typeof item.text).toBe('string');
        expect(item.text.length).toBeGreaterThan(0);
        expect(typeof item.count).toBe('number');
        expect(item.count).toBeGreaterThan(0);
      });
    });
  });

  it('should have unique category IDs', () => {
    const ids = adhkarData.categories.map((cat: any) => cat.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(adhkarData.categories.length);
  });

  it('should have categories with items', () => {
    adhkarData.categories.forEach((category: any) => {
      expect(category.items.length).toBeGreaterThan(0);
    });
  });

  it('should have morning and evening adhkar', () => {
    const categoryNames = adhkarData.categories.map((cat: any) => cat.name);
    expect(categoryNames).toContain('أذكار الصباح');
    expect(categoryNames).toContain('أذكار المساء');
  });

  it('should have valid count values', () => {
    adhkarData.categories.forEach((category: any) => {
      category.items.forEach((item: any) => {
        expect(item.count).toBeGreaterThan(0);
        expect(item.count).toBeLessThanOrEqual(100);
      });
    });
  });
});
