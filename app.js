/**
 * ==========================================================================
 * StudyMate - Asosiy Dastur Mantiqi (app.js)
 * Sof (Vanilla) JavaScript - hech qanday tashqi kutubxonasiz.
 * Har bir funksiya imtihon himoyasida oson tushuntirib berish uchun
 * batafsil o'zbekcha izohlar bilan ta'minlangan.
 * ==========================================================================
 */

// 1. Dastur Holati (Global State)
const state = {
  selectedTopic: null,          // Hozirda tanlangan mavzu obyekti
  currentQuestionIndex: 0,      // Joriy savol indeksi (0 dan 4 gacha)
  userAnswers: [],              // Foydalanuvchi tanlagan variantlar indekslari: [1, 0, 2, ...]
  isSubmitting: false,          // Tez-tez bosish (double-click) himoyasi uchun bayroqcha
  isResultSaved: false          // Natija localStorage'ga bir martadan ortiq yozilmasligi uchun bayroqcha
};

// localStorage kalit nomi
const STORAGE_KEY = 'studymate_quiz_history';

// 2. DOM Elementlari (Keshlab olish - Tezkor ishlash uchun)
const dom = {
  // Ekranlar
  screenHome: document.getElementById('screen-home'),
  screenQuiz: document.getElementById('screen-quiz'),
  screenResult: document.getElementById('screen-result'),

  // 1-ekran elementlari
  topicsContainer: document.getElementById('topics-container'),
  topicPreview: document.getElementById('topic-preview'),
  previewCategory: document.getElementById('preview-category'),
  previewTitle: document.getElementById('preview-title'),
  previewSummary: document.getElementById('preview-summary'),
  previewExample: document.getElementById('preview-example'),
  btnStartQuiz: document.getElementById('btn-start-quiz'),
  recentResultsContainer: document.getElementById('recent-results-container'),

  // 2-ekran elementlari
  quizTopicTitle: document.getElementById('quiz-topic-title'),
  quizTopicBadge: document.getElementById('quiz-topic-badge'),
  quizCounter: document.getElementById('quiz-counter'),
  progressSegments: document.querySelectorAll('#segmented-progress .segment'),
  questionText: document.getElementById('question-text'),
  optionsContainer: document.getElementById('options-container'),
  btnNextQuestion: document.getElementById('btn-next-question'),

  // 3-ekran elementlari
  resultTopicName: document.getElementById('result-topic-name'),
  resultScoreDisplay: document.getElementById('result-score-display'),
  resultFeedbackText: document.getElementById('result-feedback-text'),
  resultIconWrapper: document.getElementById('result-icon-wrapper'),
  reviewList: document.getElementById('review-list'),
  btnRestartQuiz: document.getElementById('btn-restart-quiz'),
  btnGoHome: document.getElementById('btn-go-home')
};

// ==========================================================================
// 3. EKRANLARNI ALMASHTIRISH (Navigation)
// ==========================================================================

/**
 * 3 ta ekrandan aynan bittasini ko'rsatish funksiyasi.
 * Barcha ekranlardan 'active' klassini olib tashlaydi va keraklisiga qo'shadi.
 * @param {HTMLElement} activeScreen - Ko'rsatilishi kerak bo'lgan ekran elementi
 */
function showScreen(activeScreen) {
  // Barcha ekranlarni yashiramiz
  dom.screenHome.classList.remove('active');
  dom.screenQuiz.classList.remove('active');
  dom.screenResult.classList.remove('active');

  // Kerakli ekranni faollashtiramiz
  activeScreen.classList.add('active');

  // Sahifani tepaga silliq aylantiramiz
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// 4. 1-EKRAN MANTIQI: MAVZULAR VA TARIX
// ==========================================================================

/**
 * Bosh sahifadagi 3 ta mavzu kartasini data.js dagi ma'lumotlar asosida chizish
 */
function renderTopics() {
  dom.topicsContainer.innerHTML = '';

  topicsData.forEach((topic, index) => {
    const card = document.createElement('div');
    card.className = `topic-card ${state.selectedTopic && state.selectedTopic.id === topic.id ? 'active' : ''}`;
    card.setAttribute('data-id', topic.id);

    // Karta ichki tuzilishi (har birida 5 savol yozuvi bor)
    card.innerHTML = `
      <div>
        <div class="topic-card-category">${escapeHtml(topic.category)}</div>
        <h3 class="topic-card-title">${escapeHtml(topic.title)}</h3>
      </div>
      <div class="topic-card-footer">
        <span class="topic-card-count">📝 5 savol</span>
      </div>
    `;

    // Mavzu kartasi bosilganda faollashtirish
    card.addEventListener('click', () => {
      selectTopic(topic.id);
    });

    dom.topicsContainer.appendChild(card);
  });
}

/**
 * Mavzuni tanlash va uning qisqa tushuntirishi (preview) ni ekranga chiqarish
 * @param {string} topicId - Tanlangan mavzu ID si
 */
function selectTopic(topicId) {
  const foundTopic = topicsData.find(t => t.id === topicId);
  if (!foundTopic) return;

  state.selectedTopic = foundTopic;

  // Kartalardagi active klassini yangilash
  const allCards = dom.topicsContainer.querySelectorAll('.topic-card');
  allCards.forEach(card => {
    if (card.getAttribute('data-id') === topicId) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Pastki tafsilot (Preview) blokini to'ldiramiz
  dom.previewCategory.textContent = foundTopic.category;
  dom.previewTitle.textContent = foundTopic.title;
  dom.previewSummary.textContent = foundTopic.summary;
  dom.previewExample.textContent = foundTopic.example;
  dom.topicPreview.style.display = 'block';
}

/**
 * localStorage'dan oxirgi 5 ta natijani o'qib ekranga chiqarish
 */
function renderHistory() {
  const history = getHistoryFromStorage();

  // Agar tarix bo'sh bo'lsa
  if (!history || history.length === 0) {
    dom.recentResultsContainer.innerHTML = `
      <div class="empty-history-text">
        ℹ️ Hali natija yo'q. Birinchi testingizni topshirib ko'ring!
      </div>
    `;
    return;
  }

  // Tarix mavjud bo'lsa, ro'yxatni tuzamiz
  dom.recentResultsContainer.innerHTML = history.map(item => {
    const isPerfect = item.score === item.totalQuestions;
    return `
      <div class="history-item">
        <div class="history-item-left">
          <span class="history-topic-name">${escapeHtml(item.topicTitle)}</span>
          <span class="history-date">📅 ${item.date}</span>
        </div>
        <div class="history-badge ${isPerfect ? 'perfect' : ''}">
          ${item.score}/${item.totalQuestions} (${item.percentage}%)
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// 5. 2-EKRAN MANTIQI: TEST JARAYONI (QUIZ)
// ==========================================================================

/**
 * Testni yangitdan boshlash
 * @param {Object} topic - Test boshlanayotgan mavzu
 */
function startQuiz(topic) {
  state.selectedTopic = topic;
  state.currentQuestionIndex = 0;
  // Barcha 5 ta savol uchun foydalanuvchi javoblarini bo'sh qilib tayyorlaymiz
  state.userAnswers = new Array(topic.questions.length).fill(null);
  state.isSubmitting = false;
  state.isResultSaved = false;

  // Ekran sarlavhalari
  dom.quizTopicTitle.textContent = topic.title;
  dom.quizTopicBadge.textContent = topic.category;

  // 1-savolni yuklash
  loadQuestion(0);

  // 2-ekranga o'tamiz
  showScreen(dom.screenQuiz);
}

/**
 * Berilgan indeksdagi savolni ekranga chiqarish
 * @param {number} index - Savol indeksi (0..4)
 */
function loadQuestion(index) {
  const currentQuestion = state.selectedTopic.questions[index];
  const totalQuestions = state.selectedTopic.questions.length;

  // 1. Yuqoridagi "Savol X/5" yozuvi
  dom.quizCounter.textContent = `Savol ${index + 1}/${totalQuestions}`;

  // 2. 5 bo'lakli progress barni yangilash
  dom.progressSegments.forEach((seg, segIndex) => {
    seg.classList.remove('completed', 'current');
    if (segIndex < index) {
      seg.classList.add('completed'); // O'tilgan savollar
    } else if (segIndex === index) {
      seg.classList.add('current');   // Hozirgi savol
    }
  });

  // 3. Savol matnini joylashtirish
  dom.questionText.textContent = `${index + 1}. ${currentQuestion.question}`;

  // 4. Variantlarni (A, B, C, D) chiqarish
  const optionLetters = ['A', 'B', 'C', 'D'];
  dom.optionsContainer.innerHTML = '';

  currentQuestion.options.forEach((optionText, optIndex) => {
    const optionBtn = document.createElement('button');
    optionBtn.type = 'button';
    optionBtn.className = 'option-btn';

    // Agar foydalanuvchi allaqachon shu savolga javob tanlagan bo'lsa
    if (state.userAnswers[index] === optIndex) {
      optionBtn.classList.add('selected');
    }

    optionBtn.innerHTML = `
      <span class="option-letter">${optionLetters[optIndex]}</span>
      <span class="option-text">${escapeHtml(optionText)}</span>
    `;

    // Variant bosilganda tanlovni saqlash
    optionBtn.addEventListener('click', () => {
      selectOption(optIndex);
    });

    dom.optionsContainer.appendChild(optionBtn);
  });

  // 5. "Keyingi" / "Natijani ko'rish" tugmasini sozlash
  const hasSelectedAnswer = state.userAnswers[index] !== null;
  dom.btnNextQuestion.disabled = !hasSelectedAnswer;

  // 5-savolda tugma matnini o'zgartirish
  if (index === totalQuestions - 1) {
    dom.btnNextQuestion.textContent = "Natijani ko'rish →";
  } else {
    dom.btnNextQuestion.textContent = "Keyingi →";
  }
}

/**
 * Foydalanuvchi variant tanlaganda chaqiriladi.
 * Eslatma: Test paytida javob to'g'ri/xatoligi ko'rsatilmaydi,
 * faqat ramka bilan ajraladi va foydalanuvchi tanlovini bemalol o'zgartira oladi.
 * @param {number} optionIndex - Tanlangan variant indeksi (0..3)
 */
function selectOption(optionIndex) {
  // Tanlangan javobni xotirada saqlaymiz
  state.userAnswers[state.currentQuestionIndex] = optionIndex;

  // DOM dagi variantlarning 'selected' holatini yangilaymiz
  const optionButtons = dom.optionsContainer.querySelectorAll('.option-btn');
  optionButtons.forEach((btn, idx) => {
    if (idx === optionIndex) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });

  // Javob tanlangach, "Keyingi" tugmasi faollashadi
  dom.btnNextQuestion.disabled = false;
}

/**
 * "Keyingi" yoki "Natijani ko'rish" tugmasi bosilganda
 */
function handleNextQuestion() {
  // Tanlov qilinmagan bo'lsa yoki jarayon davom etayotgan bo'lsa to'xtatamiz
  if (state.userAnswers[state.currentQuestionIndex] === null) return;
  if (state.isSubmitting) return;

  const totalQuestions = state.selectedTopic.questions.length;

  // Agar oxirgi savolda bo'lsak -> Natija ekraniga o'tish
  if (state.currentQuestionIndex >= totalQuestions - 1) {
    state.isSubmitting = true;
    finishQuiz();
  } else {
    // Keyingi savolga o'tamiz
    state.currentQuestionIndex++;
    loadQuestion(state.currentQuestionIndex);
  }
}

// ==========================================================================
// 6. 3-EKRAN MANTIQI: NATIJA VA TAHLIL
// ==========================================================================

/**
 * Testni yakunlash, ballni hisoblash, localStorage'ga faqat 1 marta saqlash
 * va Natija ekranini ko'rsatish
 */
function finishQuiz() {
  const questions = state.selectedTopic.questions;
  const totalQuestions = questions.length;

  // Ballni xavfsiz va aniq hisoblash (Double-click ballni oshira olmaydi)
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (state.userAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });

  // Aniq foizni hisoblash (0% dan 100% gacha)
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Natijani localStorage'ga saqlash (faqat 1 marta yozilishi kafolatlanadi)
  if (!state.isResultSaved) {
    saveResultToStorage({
      topicId: state.selectedTopic.id,
      topicTitle: state.selectedTopic.title,
      score: correctCount,
      totalQuestions: totalQuestions,
      percentage: percentage,
      date: getFormattedCurrentDate()
    });
    state.isResultSaved = true;
  }

  // Natija ekranidagi asosiy ma'lumotlarni yangilash
  dom.resultTopicName.textContent = `"${state.selectedTopic.title}" mavzusi yakunlandi`;
  dom.resultScoreDisplay.textContent = `${correctCount}/${totalQuestions} = ${percentage}%`;

  // Foizga qarab motivatsion matn va belgi tanlash
  if (percentage === 100) {
    dom.resultIconWrapper.textContent = "🌟";
    dom.resultFeedbackText.textContent = "Ajoyib natija! Siz mavzuni 100% mukammal o'zlashtiribsiz!";
  } else if (percentage >= 80) {
    dom.resultIconWrapper.textContent = "🎉";
    dom.resultFeedbackText.textContent = "Juda yaxshi natija! Bilimlaringiz mustahkam!";
  } else if (percentage >= 60) {
    dom.resultIconWrapper.textContent = "👍";
    dom.resultFeedbackText.textContent = "Yaxshi natija! Xatolaringiz ustida ishlab, yanada oshirishingiz mumkin.";
  } else {
    dom.resultIconWrapper.textContent = "📖";
    dom.resultFeedbackText.textContent = "Ko'proq mashq qilish tavsiya etiladi. Nazariyani qayta o'qib chiqing!";
  }

  // Savollar tahlilini tuzish
  renderReviewList();

  // 3-ekranni ochamiz
  showScreen(dom.screenResult);
  state.isSubmitting = false;
}

/**
 * Har bir savol bo'yicha batafsil tahlilni render qilish
 * Foydalanuvchi javobi, to'g'ri javob, izoh va aniq matnli status belgilar
 */
function renderReviewList() {
  const questions = state.selectedTopic.questions;
  const optionLetters = ['A', 'B', 'C', 'D'];
  dom.reviewList.innerHTML = '';

  questions.forEach((q, idx) => {
    const userAnswerIndex = state.userAnswers[idx];
    const isCorrect = userAnswerIndex === q.correctIndex;

    const userAnswerText = userAnswerIndex !== null
      ? `${optionLetters[userAnswerIndex]}) ${q.options[userAnswerIndex]}`
      : "Javob berilmagan";

    const correctAnswerText = `${optionLetters[q.correctIndex]}) ${q.options[q.correctIndex]}`;

    const card = document.createElement('div');
    card.className = `review-card ${isCorrect ? 'correct' : 'wrong'}`;

    // Har bir savolda aniq "To'g'ri" yoki "Xato" matnli belgilari (faqat rang emas)
    card.innerHTML = `
      <div class="review-card-header">
        <h4 class="review-question-title">${idx + 1}-savol: ${escapeHtml(q.question)}</h4>
        <span class="badge-status ${isCorrect ? 'correct' : 'wrong'}">
          ${isCorrect ? '✓ To‘g‘ri' : '✕ Xato'}
        </span>
      </div>

      <div class="review-answers-box">
        <div class="review-answer-row">
          <span class="review-answer-label">Sizning javobingiz:</span>
          <span class="user-answer ${isCorrect ? 'text-correct' : 'text-wrong'}">
            ${escapeHtml(userAnswerText)}
          </span>
        </div>
        ${
          !isCorrect
            ? `<div class="review-answer-row">
                 <span class="review-answer-label">To‘g‘ri javob:</span>
                 <span class="correct-answer-text">${escapeHtml(correctAnswerText)}</span>
               </div>`
            : ''
        }
      </div>

      <div class="review-explanation">
        <span class="explanation-label">💡 Izoh:</span> ${escapeHtml(q.explanation)}
      </div>
    `;

    dom.reviewList.appendChild(card);
  });
}

// ==========================================================================
// 7. LOCALSTORAGE BILAN ISHLASH (Tarixni boshqarish)
// ==========================================================================

/**
 * localStorage'dan natijalar massivini olish
 * @returns {Array} Natijalar massivi
 */
function getHistoryFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error("localStorage ma'lumotlarini o'qishda xatolik:", error);
    return [];
  }
}

/**
 * Yangi natijani saqlash (Maksimal 5 ta oxirgi natija)
 * @param {Object} resultItem - Saqlanadigan natija obyekti
 */
function saveResultToStorage(resultItem) {
  try {
    const history = getHistoryFromStorage();
    // Yangi natijani ro'yxatning boshiga qo'shamiz (eng oxirgisi yuqorida bo'ladi)
    history.unshift(resultItem);

    // Ro'yxatni maksimal 5 ta element bilan cheklaymiz
    const trimmedHistory = history.slice(0, 5);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error("localStorage'ga yozishda xatolik:", error);
  }
}

// ==========================================================================
// 8. YORDAMCHI FUNKSIYALAR (Helpers)
// ==========================================================================

/**
 * XSS xurujlarining oldini olish uchun matnni xavfsiz qilish
 * @param {string} str - Tozalanadigan matn
 * @returns {string} Tozalangan xavfsiz matn
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Hozirgi sana va vaqtni o'zbekcha qulay formatda qaytarish
 * Masalan: "27.11.2026, 17:45"
 * @returns {string} Formatlangan sana
 */
function getFormattedCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

// ==========================================================================
// 9. EVENT LISTENERS VA ILOVANI ISHGA TUSHIRISH (Init)
// ==========================================================================

function setupEventListeners() {
  // 1-ekran: "Testni boshlash" tugmasi
  dom.btnStartQuiz.addEventListener('click', () => {
    if (state.selectedTopic) {
      startQuiz(state.selectedTopic);
    }
  });

  // 2-ekran: "Keyingi" / "Natijani ko'rish" tugmasi
  dom.btnNextQuestion.addEventListener('click', handleNextQuestion);

  // 3-ekran: "Yana ishlash" tugmasi (shu mavzuni boshidan boshlaydi)
  dom.btnRestartQuiz.addEventListener('click', () => {
    if (state.selectedTopic) {
      startQuiz(state.selectedTopic);
    }
  });

  // 3-ekran: "Bosh sahifa" tugmasi
  dom.btnGoHome.addEventListener('click', () => {
    renderHistory(); // Yangilangan natijalar tarixini ko'rsatamiz
    showScreen(dom.screenHome);
  });
}

/**
 * Ilova dastlabki ishga tushishi
 */
function initApp() {
  setupEventListeners();

  // Mavzularni chizish
  renderTopics();

  // Boshlang'ich holatda 1-mavzuni tanlab qo'yamiz (Kasrlar)
  if (topicsData && topicsData.length > 0) {
    selectTopic(topicsData[0].id);
  }

  // Oxirgi natijalar tarixini yuklash
  renderHistory();

  // Bosh sahifani ochish
  showScreen(dom.screenHome);
}

// Sahifa to'liq yuklangach ilovani ishga tushirish
document.addEventListener('DOMContentLoaded', initApp);
