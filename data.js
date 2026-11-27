/**
 * StudyMate - Mavzular va savollar bazasi
 * Har bir mavzu o'z ichiga qisqa nazariy ma'lumot va 5 tadan tekshirilgan test savolini oladi.
 */

const topicsData = [
  {
    id: "kasrlar",
    title: "Kasrlar",
    category: "Matematika",
    summary:
      "Kasr — bu butun narsaning bir yoki bir nechta teng qismlarini ifodalovchi son. Kasr chizig'ining ustidagi son surat, ostidagi son esa maxraj deb ataladi. Maxraj butun nechta teng qismga bo'linganini, surat esa shulardan nechtasi olinganini ko'rsatadi. Kasrlarni qo'shish yoki ayirishda ularning maxrajlari bir xil bo'lishi talab etiladi.",
    example:
      "Masalan, pitssani 4 ta teng bo'lakka bo'lib, 1 bo'lagini yesangiz, bu 1/4 (to'rtdan bir) qism bo'ladi. Agar 2 ta bo'lak yesangiz, 2/4 ya'ni 1/2 (yarim) qism bo'ladi.",
    questions: [
      {
        id: 1,
        question: "1/2 va 1/4 kasrlarining yig'indisi nechaga teng?",
        options: ["2/6", "3/4", "2/4", "3/8"],
        correctIndex: 1,
        explanation:
          "1/2 kasrini umumiy maxraj 4 ga keltiramiz: 2/4 bo'ladi. Keyin suratlarni qo'shamiz: 2/4 + 1/4 = 3/4."
      },
      {
        id: 2,
        question: "Kasrning surati maxrajidan kichik bo'lsa, bunday kasr qanday ataladi?",
        options: ["Noto'g'ri kasr", "Aralash kasr", "To'g'ri kasr", "O'nli kasr"],
        correctIndex: 2,
        explanation:
          "Surati maxrajidan kichik bo'lgan barcha kasrlar to'g'ri kasrlar deyiladi (masalan, 3/5, 1/2)."
      },
      {
        id: 3,
        question: "3/5 kasrini 2 ga ko'paytirganda qanday natija hosil bo'ladi?",
        options: ["6/10", "6/5", "3/10", "5/5"],
        correctIndex: 1,
        explanation:
          "Kasrni butun songa ko'paytirishda uning faqat surati shu songa ko'paytiriladi: (3 * 2) / 5 = 6/5."
      },
      {
        id: 4,
        question: "Quyidagi kasrlardan qaysi biri 1/2 ga teng?",
        options: ["2/5", "4/8", "3/7", "5/9"],
        correctIndex: 1,
        explanation:
          "4/8 kasrining surati va maxrajini 4 ga qisqartirsak, 1/2 hosil bo'ladi."
      },
      {
        id: 5,
        question: "5/6 kasridan 2/6 kasri ayrilsa, natija necha bo'ladi va qisqartirilganda nima chiqadi?",
        options: ["3/6 (ya'ni 1/2)", "3/0 (ya'ni 0)", "7/6", "1/6"],
        correctIndex: 0,
        explanation:
          "Maxrajlar bir xil bo'lgani uchun suratlar ayriladi: (5 - 2)/6 = 3/6. Kasrni 3 ga qisqartirsak 1/2 chiqadi."
      }
    ]
  },
  {
    id: "present-simple",
    title: "Present Simple",
    category: "Ingliz tili",
    summary:
      "Present Simple zamoni ingliz tilida odat tusiga kirgan, doimiy takrorlanadigan ish-harakatlar yoki umumiy haqiqatlarni ifodalash uchun ishlatiladi. Bu zamonda fe'llar o'zining boshlang'ich shaklida qo'llaniladi. Faqat uchinchi shaxs birlikda (he, she, it) fe'l oxiriga -s yoki -es qo'shimchasi qo'shiladi. So'roq va inkor gaplarni yasash uchun 'do' va 'does' yordamchi fe'llari xizmat qiladi.",
    example:
      "I read books every day (Men har kuni kitob o'qiyman). / He reads books every day (U har kuni kitob o'qiydi).",
    questions: [
      {
        id: 1,
        question: "He ___ to school by bus every morning.",
        options: ["go", "goes", "going", "went"],
        correctIndex: 1,
        explanation:
          "'He' uchinchi shaxs birlik bo'lgani sababli fe'lga '-es' qo'shimchasi qo'shiladi: 'goes'."
      },
      {
        id: 2,
        question: "Present Simple zamonida asosiy fe'llar uchun inkor gap qaysi yordamchi fe'llar orqali yasaladi?",
        options: ["am not / is not", "don't / doesn't", "didn't / won't", "haven't / hasn't"],
        correctIndex: 1,
        explanation:
          "Present Simple'da inkor gaplar 'do not (don't)' va 'does not (doesn't)' yordamchi fe'llari yordamida hosil qilinadi."
      },
      {
        id: 3,
        question: "Quyidagi gaplarning qaysi biri grammatik jihatdan to'g'ri tuzilgan?",
        options: [
          "She doesn't likes coffee.",
          "She don't like coffee.",
          "She doesn't like coffee.",
          "She doesn't liking coffee."
        ],
        correctIndex: 2,
        explanation:
          "'doesn't' ishlatilganda asosiy fe'l o'zining sof boshlang'ich shakliga qaytadi: 'She doesn't like coffee'."
      },
      {
        id: 4,
        question: "Qaysi vaqt ko'rsatkichi (signal word) Present Simple zamoniga xos emas?",
        options: ["always", "usually", "yesterday", "often"],
        correctIndex: 2,
        explanation:
          "'Yesterday' (kecha) o'tgan zamonga (Past Simple) xos bo'lib, hozirgi oddiy zamonda ishlatilmaydi."
      },
      {
        id: 5,
        question: "'They ___ in Tashkent.' Bo'sh o'ringa to'g'ri fe'lni qo'ying.",
        options: ["lives", "live", "is living", "lived"],
        correctIndex: 1,
        explanation:
          "'They' (ular) ko'plikda bo'lgani uchun fe'lga hech qanday qo'shimcha qo'shilmaydi: 'live'."
      }
    ]
  },
  {
    id: "javascript-asoslari",
    title: "JavaScript asoslari",
    category: "Dasturlash",
    summary:
      "JavaScript — veb-sahifalarni interaktiv va jonli qilish uchun ishlatiladigan eng ommabop dasturlash tili. U brauzerda to'g'ridan-to'g'ri ishlaydi va HTML elementlarini boshqarish (DOM manipulyatsiyasi) imkonini beradi. Zamonaviy JavaScriptda o'zgaruvchilar 'let' va 'const' kalit so'zlari orqali e'lon qilinadi. JavaScript yordamida tugma bosilishi, ma'lumotlarni saqlash va mantiqiy hisob-kitoblarni amalga oshirish mumkin.",
    example:
      "const ism = 'Ali'; console.log(`Salom, ${ism}!`); // Konsolga 'Salom, Ali!' matnini chiqaradi.",
    questions: [
      {
        id: 1,
        question: "Qayta qiymat biriktirib bo'lmaydigan (o'zgarmas) o'zgaruvchi qaysi kalit so'z bilan e'lon qilinadi?",
        options: ["var", "let", "const", "static"],
        correctIndex: 2,
        explanation:
          "'const' (constant) orqali e'lon qilingan o'zgaruvchining qiymatini keyinchalik qayta o'zgartirib bo'lmaydi."
      },
      {
        id: 2,
        question: "JavaScriptda `typeof '123'` kodi qanday natija qaytaradi?",
        options: ["number", "string", "boolean", "undefined"],
        correctIndex: 1,
        explanation:
          "Qo'shtirnoq ichiga olingan har qanday qiymat JavaScriptda 'string' (matn) turiga kiradi."
      },
      {
        id: 3,
        question: "Foydalanuvchi brauzerida ma'lumotlarni kalit-qiymat ko'rinishida saqlash uchun qaysi obyektdan foydalaniladi?",
        options: ["localStorage", "sessionHistory", "serverStore", "documentCookieOnly"],
        correctIndex: 0,
        explanation:
          "'localStorage' ma'lumotlarni brauzer yopilgandan keyin ham xotirada saqlab qolish imkonini beradi."
      },
      {
        id: 4,
        question: "Qaysi operator qiymatni ham, ma'lumot turini ham (qat'iy tenglik) tekshiradi?",
        options: ["==", "=", "===", "!="],
        correctIndex: 2,
        explanation:
          "'===' (qat'iy tenglik) operatori ikkita ma'lumotning ham qiymatini, ham turini tekshiradi (masalan, 5 === '5' -> false)."
      },
      {
        id: 5,
        question: "Massivning oxiriga yangi element qo'shish uchun qaysi metod ishlatiladi?",
        options: ["pop()", "shift()", "push()", "unshift()"],
        correctIndex: 2,
        explanation:
          "'push()' metodi massivning oxiriga yangi element qo'shadi. 'pop()' esa oxirgisini sug'urib oladi."
      }
    ]
  }
];
