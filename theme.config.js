/** @type {const} */
const themeColors = {
  // الأخضر الإسلامي - اللون الأساسي
  primary: { light: '#1E7E34', dark: '#4CAF50' },
  // الخلفية - أبيض نقي في الوضع الفاتح، أسود عميق في الليلي
  background: { light: '#FFFFFF', dark: '#0D0D0D' },
  // السطح - للبطاقات والعناصر المرتفعة
  surface: { light: '#F5F5F5', dark: '#1A1A1A' },
  // النص الأساسي
  foreground: { light: '#1A1A1A', dark: '#E8E8E8' },
  // النص الثانوي - رمادي متوسط
  muted: { light: '#666666', dark: '#999999' },
  // الحدود
  border: { light: '#E0E0E0', dark: '#333333' },
  // النجاح
  success: { light: '#22C55E', dark: '#4ADE80' },
  // التحذير - الذهبي
  warning: { light: '#D4AF37', dark: '#FFD700' },
  // الخطأ
  error: { light: '#EF4444', dark: '#F87171' },
};

module.exports = { themeColors };
