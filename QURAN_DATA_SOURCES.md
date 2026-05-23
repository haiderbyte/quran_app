# مصادر بيانات القرآن الكريم المتاحة

## المصادر المختارة

### 1. quran-json (risan/quran-json)
- **الرابط**: https://github.com/risan/quran-json
- **الميزات**:
  - نص القرآن الكامل بصيغة Uthmani
  - متاح على CDN (jsDelivr)
  - ترجمات في لغات متعددة
  - ترتيل وتشكيل
  - ترخيص CC-BY-SA-4.0

- **الملفات المتاحة**:
  - النص الكامل: `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran.json`
  - السور الفردية: `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/{chapterNumber}.json`
  - معلومات السور: `https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/chapters/index.json`

### 2. quranjson (semarketir/quranjson)
- **الرابط**: https://github.com/semarketir/quranjson
- **الميزات**:
  - 6236 آية، 114 سورة، 30 جزء
  - نص عربي مع Tajweed
  - ملفات صوتية MP3
  - ترجمات متعددة اللغات
  - ترخيص MIT

- **الملفات المتاحة**:
  - معلومات السور: `https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah.json`
  - السورة الفردية: `https://raw.githubusercontent.com/semarketir/quranjson/master/source/surah/surah_{number}.json`
  - معلومات الأجزاء: `https://raw.githubusercontent.com/semarketir/quranjson/master/source/juz.json`

### 3. quran-api (fawazahmed0/quran-api)
- **الرابط**: https://github.com/fawazahmed0/quran-api
- **الميزات**:
  - 90+ لغة و 440+ ترجمة
  - بدون حد أقصى للطلبات
  - متاح على CDN (jsDelivr)
  - ترخيص Unlicense (مفتوح تماماً)

- **الملفات المتاحة**:
  - قائمة الإصدارات: `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.json`
  - النص الكامل: `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/{editionName}.json`
  - السورة الفردية: `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/{editionName}/{chapterNo}.json`

## الخيار المختار للتطبيق

سيتم استخدام **quran-json** لأسباب:
1. **الجودة**: نص Uthmani معروف وموثوق
2. **البساطة**: هيكل JSON واضح وسهل الاستخدام
3. **الأداء**: ملفات صغيرة الحجم مناسبة للتطبيقات الجوالة
4. **الترخيص**: CC-BY-SA-4.0 واضح ومفتوح
5. **التوثيق**: توثيق جيد وسهل الفهم

## خطة التكامل

1. **تحميل البيانات**: تحميل ملف `quran.json` الكامل عند بدء التطبيق
2. **التخزين المحلي**: حفظ البيانات في AsyncStorage لاستخدام بدون إنترنت
3. **البنية**: تنظيم البيانات بطريقة تسهل البحث والوصول السريع
4. **التحديث**: إمكانية تحديث البيانات من الإنترنت (اختياري)

## ملاحظات تقنية

- حجم ملف `quran.json` الكامل: حوالي 1-2 MB
- عدد الآيات: 6236 آية
- عدد السور: 114 سورة
- الترميز: UTF-8
- الصيغة: JSON

## الخطوات التالية

1. تحميل ملف البيانات من CDN
2. معالجة البيانات وتنظيمها
3. حفظها محلياً في التطبيق
4. إنشاء واجهات للوصول إلى البيانات
