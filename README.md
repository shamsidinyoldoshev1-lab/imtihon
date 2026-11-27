# 📚 StudyMate — Ta'lim va Bilimni Sinash Platformasi

**StudyMate** — o'quvchilar va talabalar uchun mo'ljallangan, sof (vanilla) texnologiyalarda yaratilgan zamonaviy amaliy imtihon loyihasi.

---

## 🚀 Texnologik Stak
- **HTML5:** Semantik va qulay veb-struktura (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS3:** Sof CSS (CSS Variables, Flexbox, CSS Grid, media queries - 360px dan boshlab to'liq responsive). Hech qanday tashqi kutubxona ishlatilmagan.
- **JavaScript (ES6+):** Sof Vanilla JS (State management, DOM manipulyatsiyasi, Event handling, localStorage).

---

## 📂 Fayllar Tuzilishi
Loyiha aynan 4 ta asosiy fayldan va qo'shimcha ushbu `README.md` qo'llanmasidan iborat:

1. `index.html` — Saytning 3 ta asosiy ekrani (Bosh sahifa, Test ekrani, Natija ekrani) va ularning skelet tuzilishi.
2. `style.css` — Yengil, ko'zga yoqimli zamonaviy ranglar, 5 bo'lakli progress bar, to'g'ri/xato vizual ko'rsatkichlari va moslashuvchan dizayn.
3. `data.js` — 3 ta mavzu ("Kasrlar", "Present Simple", "JavaScript asoslari") bo'yicha nazariya, misollar va 100% tekshirilgan 15 ta test savoli.
4. `app.js` — Ekranlar navigatsiyasi, test boshqaruvi, javoblar tahlili, double-click xavfsizligi va `localStorage` bilan ishlash mantiqi.
5. `README.md` — Loyihani ishlatish va imtihon himoyasi uchun maxsus spravochnik.

---

## 🖥️ Ekranlar va Ularning Vazifalari

### 1. Bosh Sahifa (1-ekran)
- **Mavzular kartalari:** 3 ta mavzu aks etgan. Bosilganda ajralib turadi (`active` klassi).
- **Mavzu tafsilotlari (Preview):** Tanlangan mavzuning qisqa mazmuni (3-5 gap), 1 ta aniq misol va "Testni boshlash (5 savol)" tugmasi.
- **Oxirgi natijalar bo'limi:** Brauzerning `localStorage` xotirasida saqlangan oxirgi 5 ta test natijasi (mavzu, sana-vaqt, foiz). Agar natija bo'lmasa, *"Hali natija yo'q"* xabari chiqadi.

### 2. Test Ekrani (2-ekran)
- **Bir vaqtda 1 ta savol:** 4 ta variant (A, B, C, D) bilan ko'rinadi.
- **Jarayon ko'rsatkichi:** "Savol X/5" yozuvi va 5 ta segmentli maxsus progress bar.
- **Tanlov erkinligi:** Variant tanlanganda ajralib turadi, lekin to'g'ri/xatoligi test paytida oshkor qilinmaydi. Foydalanuvchi keyingisiga o'tguncha tanlovini bemalol o'zgartira oladi.
- **Keyingi tugmasi:** Variant tanlanmaguncha `disabled` turadi. 5-savolda avtomatik ravishda *"Natijani ko'rish →"* matniga o'zgaradi.
- **Xavfsizlik:** Tugmani ketma-ket tez bosish (double-click) ballni aslo oshirib yubormaydi.

### 3. Natija Ekrani (3-ekran)
- **Umumiy statistika:** To'plangan ball va aniq foiz (`Masalan: 3/5 = 60%`).
- **Savollar tahlili:** Har bir savol bo'yicha:
  - Savol matni;
  - Foydalanuvchi bergan javob;
  - To'g'ri javob;
  - Qisqa izoh (`explanation`);
  - Aniq matnli belgilar (`[✓ To‘g‘ri]` yoki `[✕ Xato]`).
- **Tugmalar:** *"🔄 Yana ishlash"* (holatni tozalab shu testni qayta boshlaydi) va *"🏠 Bosh sahifa"* (tarixni yangilab bosh ekranga o'tadi).
- **Dublikatdan himoya:** Test natijasi faqat 1 marta tarixga yoziladi. Sahifa yangilanganda takror yozilmaydi.

---

## 🎓 Imtihon Himoyasi Uchun Muhim Savol-Javoblar (Cheat Sheet)

O'qituvchi yoki komissiya a'zolari loyihani ko'rganda quyidagi savollarni berishi mumkin:

#### 1. "Saytda sahifa yangilanmasdan (SPA kabi) ekranlar qanday almashadi?"
> **Javob:** `showScreen(activeScreen)` funksiyasi orqali boshqariladi. Barcha ekranlarda `.screen` klassi bor (`display: none`). Qaysi ekran ko'rsatilishi kerak bo'lsa, unga `.active` klassi qo'shiladi (`display: block`).

#### 2. "Tez-tez bosganda (double-click) ball ko'payib ketmasligi qanday ta'minlangan?"
> **Javob:** Ikkita qatlamli himoya mavjud:
> 1. Ball har bir tugma bosilganda qo'shilmaydi. Foydalanuvchi shunchaki o'z tanlovini `state.userAnswers` massivida saqlaydi (`state.userAnswers[index] = optionIndex`). Test tugaganda ushbu massiv `questions[i].correctIndex` bilan bir marta solishtirilib, ball hisoblanadi.
> 2. `state.isSubmitting` bayrog'i qo'yilgan bo'lib, o'tish vaqtida takroriy bosishlar bloklanadi.

#### 3. "Tarixda natijalar 5 tadan oshib ketmasligi qanday amalga oshirilgan?"
> **Javob:** `saveResultToStorage` funksiyasida yangi natija massiv boshiga `history.unshift(resultItem)` orqali qo'shiladi va so'ngra `history.slice(0, 5)` metodi orqali faqat eng so'nggi 5 ta element olinib, `localStorage.setItem` qilinadi.

#### 4. "Sahifa yangilanganda natija nega takror yozilib qolmaydi?"
> **Javob:** `state.isResultSaved` flagi orqali natija faqat test yakunlanganda 1 marta yoziladi. Sahifa yangilanganda ilova dastlabki xavfsiz holatda (Bosh sahifa) qayta ishga tushadi.

---

## 💻 Loyihani Ishga Tushirish
Hech qanday o'rnatish (npm, node, server) talab etilmaydi!
Shunchaki `index.html` faylini istalgan zamonaviy brauzerda (Chrome, Edge, Firefox, Safari) oching.
