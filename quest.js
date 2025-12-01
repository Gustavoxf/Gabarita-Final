let allQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let questionsAnswered = 0;
let selectedAnswer = null;

const defaultConfig = {
  app_title: "📚 GABARITA",
  page_title: "Pratique com Questões",
  background_color: "#FFB3D9",
  surface_color: "#FFFFFF",
  text_color: "#333333",
  primary_action_color: "#D81B60",
  secondary_action_color: "#8E24AA",
  font_family: "Poppins",
  font_size: 16
};

// Sample questions data
const sampleQuestions = [
  {
    id: 1,
    subject: "Matemática",
    question: "Qual é o resultado de 15 × 8?",
    options: [
      "100",
      "110",
      "120",
      "130"
    ],
    correctAnswer: 2,
    explanation: "15 × 8 = 120. Podemos calcular como (10 × 8) + (5 × 8) = 80 + 40 = 120."
  },
  {
    id: 2,
    subject: "Português",
    question: "Qual é o plural correto de 'capitão'?",
    options: [
      "Capitães",
      "Capitãos",
      "Capitans",
      "Capitães"
    ],
    correctAnswer: 0,
    explanation: "O plural de 'capitão' é 'capitães', seguindo a regra dos substantivos terminados em -ão."
  },
  {
    id: 3,
    subject: "História",
    question: "Em que ano foi proclamada a Independência do Brasil?",
    options: [
      "1789",
      "1808",
      "1822",
      "1889"
    ],
    correctAnswer: 2,
    explanation: "A Independência do Brasil foi proclamada em 7 de setembro de 1822 por D. Pedro I."
  },
  {
    id: 4,
    subject: "Geografia",
    question: "Qual é a capital do Estado de Minas Gerais?",
    options: [
      "São Paulo",
      "Belo Horizonte",
      "Brasília",
      "Rio de Janeiro"
    ],
    correctAnswer: 1,
    explanation: "Belo Horizonte é a capital do estado de Minas Gerais desde 1897."
  },
  {
    id: 5,
    subject: "Ciências",
    question: "Qual é o planeta mais próximo do Sol?",
    options: [
      "Vênus",
      "Terra",
      "Mercúrio",
      "Marte"
    ],
    correctAnswer: 2,
    explanation: "Mercúrio é o planeta mais próximo do Sol, com uma distância média de 57,9 milhões de km."
  }
];

// Initialize
function init() {
  allQuestions = [...sampleQuestions];
  loadQuestion();
  updateStats();
}

// Load current question
function loadQuestion() {
  if (currentQuestionIndex >= allQuestions.length) {
    showCompletionMessage();
    return;
  }

  const question = allQuestions[currentQuestionIndex];
  selectedAnswer = null;

  document.getElementById('questionNumber').textContent = `Questão ${currentQuestionIndex + 1}/${allQuestions.length}`;
  document.getElementById('questionSubject').textContent = question.subject;
  document.getElementById('questionText').textContent = question.question;

  const optionsList = document.getElementById('optionsList');
  optionsList.innerHTML = '';

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-button';
    button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)})</span><span>${option}</span>`;
    button.onclick = () => selectOption(index);
    optionsList.appendChild(button);
  });

  document.getElementById('feedback').classList.remove('show', 'correct', 'incorrect');
  document.getElementById('checkBtn').disabled = true;
  document.getElementById('nextBtn').style.display = 'none';
}

// Select option
function selectOption(index) {
  if (selectedAnswer !== null) return;

  const buttons = document.querySelectorAll('.option-button');
  buttons.forEach(btn => btn.classList.remove('selected'));
  buttons[index].classList.add('selected');

  selectedAnswer = index;
  document.getElementById('checkBtn').disabled = false;
}

// Check answer
function checkAnswer() {
  if (selectedAnswer === null) return;

  const question = allQuestions[currentQuestionIndex];
  const buttons = document.querySelectorAll('.option-button');
  const isCorrect = selectedAnswer === question.correctAnswer;

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === question.correctAnswer) {
      btn.classList.add('correct');
    } else if (index === selectedAnswer && !isCorrect) {
      btn.classList.add('incorrect');
    }
  });

  questionsAnswered++;
  if (isCorrect) {
    score++;
  }

  showFeedback(isCorrect, question.explanation);
  updateStats();

  document.getElementById('checkBtn').style.display = 'none';
  document.getElementById('nextBtn').style.display = 'inline-flex';
}

// Show feedback
function showFeedback(isCorrect, explanation) {
  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');

  document.getElementById('feedbackIcon').textContent = isCorrect ? '✅' : '❌';
  document.getElementById('feedbackTitle').textContent = isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta';
  document.getElementById('feedbackText').textContent = explanation;
}

// Next question
function nextQuestion() {
  currentQuestionIndex++;
  loadQuestion();
  
  document.getElementById('checkBtn').style.display = 'inline-flex';
  document.getElementById('checkBtn').disabled = true;
}

// Show completion message
function showCompletionMessage() {
  const percentage = Math.round((score / allQuestions.length) * 100);
  
  document.querySelector('.question-card').innerHTML = `
    <div style="text-align: center; padding: 40px 20px;">
      <div style="font-size: 80px; margin-bottom: 20px;">🎉</div>
      <h2 style="font-size: 32px; font-weight: 800; background: linear-gradient(135deg, #D81B60 0%, #8E24AA 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 15px 0;">
        Parabéns! Você completou todas as questões!
      </h2>
      <p style="font-size: 18px; color: #666; margin: 0 0 30px 0;">
        Você acertou ${score} de ${allQuestions.length} questões (${percentage}%)
      </p>
      <button class="btn btn-primary" onclick="restartQuiz()">
        🔄 Recomeçar
      </button>
    </div>
  `;
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  questionsAnswered = 0;
  selectedAnswer = null;
  init();
}

// Update stats
function updateStats() {
  const accuracy = questionsAnswered > 0 ? Math.round((score / questionsAnswered) * 100) : 0;
  
  document.getElementById('statAnswered').textContent = questionsAnswered;
  document.getElementById('statCorrect').textContent = score;
  document.getElementById('statAccuracy').textContent = accuracy + '%';
}

// Element SDK Configuration
async function onConfigChange(config) {
  const fontFamily = config.font_family || defaultConfig.font_family;
  const baseFontSize = config.font_size || defaultConfig.font_size;
  const backgroundColor = config.background_color || defaultConfig.background_color;
  const surfaceColor = config.surface_color || defaultConfig.surface_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const primaryColor = config.primary_action_color || defaultConfig.primary_action_color;
  const secondaryColor = config.secondary_action_color || defaultConfig.secondary_action_color;

  document.body.style.fontFamily = `${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
  
  document.querySelector('.content').style.background = `linear-gradient(180deg, ${backgroundColor} 0%, ${backgroundColor} 100%)`;
  
  document.querySelectorAll('.question-card, .stat-card').forEach(el => {
    el.style.backgroundColor = surfaceColor;
  });
  
  document.querySelectorAll('.question-text, .stat-label').forEach(el => {
    el.style.color = textColor;
  });
  
  document.querySelector('.header').style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;
  document.querySelector('.footer').style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`;

  document.getElementById('appTitle').textContent = config.app_title || defaultConfig.app_title;
  document.getElementById('pageTitle').textContent = config.page_title || defaultConfig.page_title;
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.background_color = value;
            window.elementSdk.setConfig({ background_color: value });
          }
        }
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.surface_color = value;
            window.elementSdk.setConfig({ surface_color: value });
          }
        }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.text_color = value;
            window.elementSdk.setConfig({ text_color: value });
          }
        }
      },
      {
        get: () => config.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.primary_action_color = value;
            window.elementSdk.setConfig({ primary_action_color: value });
          }
        }
      },
      {
        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => {
          if (window.elementSdk) {
            window.elementSdk.config.secondary_action_color = value;
            window.elementSdk.setConfig({ secondary_action_color: value });
          }
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        if (window.elementSdk) {
          window.elementSdk.config.font_family = value;
          window.elementSdk.setConfig({ font_family: value });
        }
      }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        if (window.elementSdk) {
          window.elementSdk.config.font_size = value;
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["app_title", config.app_title || defaultConfig.app_title],
    ["page_title", config.page_title || defaultConfig.page_title]
  ]);
}

// Initialize SDKs
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// Start quiz on load
init();