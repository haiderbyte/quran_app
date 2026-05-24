/** @type {const} */
const themeColors = {
  // الأخضر الفاتح الهادئ - اللون الأساسي
  primary: { light: '#2D8659', dark: '#4CAF7F' },
  // الخلفية - كريمي دافئ في النهار، بني عميق في الليل
  background: { light: '#F5F1ED', dark: '#1A1410' },
  // السطح - بيج فاتح في النهار، بني غامق في الليل
  surface: { light: '#F0E8E0', dark: '#2A1F18' },
  // النص الأساسي - بني غامق في النهار، كريمي فاتح في الليل
  foreground: { light: '#3E2723', dark: '#F5E6D3' },
  // النص الثانوي - بني متوسط
  muted: { light: '#8D6E63', dark: '#A1887F' },
  // الحدود - بني فاتح جداً
  border: { light: '#D7CCC8', dark: '#3E2723' },
  // النجاح - أخضر فاتح
  success: { light: '#4CAF7F', dark: '#81C784' },
  // التحذير - ذهبي دافئ
  warning: { light: '#D4A574', dark: '#FFB74D' },
  // الخطأ - أحمر فاتح
  error: { light: '#E57373', dark: '#EF9A9A' },
  // رقم الآية - أخضر فاتح
  verseNumber: { light: '#2D8659', dark: '#4CAF7F' },
};

// سمات الألوان المتدرجة
const colorThemes = {
  theme1: {
    name: 'الأخضر والبني',
    colors: {
      top: '#7CB342',
      upper: '#A1887F',
      middle: '#D32F2F',
      lower: '#E8D5C4',
      bottom: '#FFF9C4',
    },
  },
  theme2: {
    name: 'البرتقالي والكريمي',
    colors: {
      top: '#FF9800',
      upper: '#D2691E',
      middle: '#CD5C5C',
      lower: '#F5DEB3',
      bottom: '#FFFACD',
    },
  },
  theme3: {
    name: 'البنفسجي والرمادي',
    colors: {
      top: '#D7CCC8',
      upper: '#A39F9F',
      middle: '#9C7E8F',
      lower: '#F5E6D3',
      bottom: '#FFFEF0',
    },
  },
  theme4: {
    name: 'الوردي والأخضر',
    colors: {
      top: '#FF9999',
      upper: '#E8A87C',
      middle: '#D4A5A5',
      lower: '#F5E6D3',
      bottom: '#C8E6C9',
    },
  },
};

module.exports = { themeColors, colorThemes };
