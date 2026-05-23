import { describe, it, expect, beforeEach } from 'vitest';
import quranData from '../constants/quran-data.json';

describe('Quran Data', () => {
  it('should load quran data successfully', () => {
    expect(quranData).toBeDefined();
    expect(Array.isArray(quranData)).toBe(true);
  });

  it('should have 114 surahs', () => {
    expect(quranData).toHaveLength(114);
  });

  it('should have correct structure for each surah', () => {
    quranData.forEach((surah: any) => {
      expect(surah).toHaveProperty('id');
      expect(surah).toHaveProperty('name');
      expect(surah).toHaveProperty('transliteration');
      expect(surah).toHaveProperty('type');
      expect(surah).toHaveProperty('total_verses');
      expect(surah).toHaveProperty('verses');
      expect(Array.isArray(surah.verses)).toBe(true);
    });
  });

  it('should have correct verse count for each surah', () => {
    quranData.forEach((surah: any) => {
      expect(surah.verses.length).toBe(surah.total_verses);
    });
  });

  it('should have correct structure for each verse', () => {
    quranData.forEach((surah: any) => {
      surah.verses.forEach((verse: any) => {
        expect(verse).toHaveProperty('id');
        expect(verse).toHaveProperty('text');
        expect(typeof verse.text).toBe('string');
        expect(verse.text.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have Al-Fatihah as first surah', () => {
    const firstSurah = quranData[0];
    expect(firstSurah.id).toBe(1);
    expect(firstSurah.name).toBe('الفاتحة');
    expect(firstSurah.total_verses).toBe(7);
  });

  it('should have An-Nas as last surah', () => {
    const lastSurah = quranData[113];
    expect(lastSurah.id).toBe(114);
    expect(lastSurah.name).toBe('الناس');
  });

  it('should have total of 6236 verses', () => {
    const totalVerses = quranData.reduce((sum, surah: any) => sum + surah.total_verses, 0);
    expect(totalVerses).toBe(6236);
  });

  it('should have unique surah IDs', () => {
    const ids = quranData.map((surah: any) => surah.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(114);
  });

  it('should have valid surah types', () => {
    const validTypes = ['meccan', 'medinan'];
    quranData.forEach((surah: any) => {
      expect(validTypes).toContain(surah.type);
    });
  });
});
