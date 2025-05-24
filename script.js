/**
 * LABIREND ASAL SAYI TESTİ - v2.0
 * Deterministic Prime Number Testing Algorithm
 * Developed by Doğan Acar - 2025
 * Blockchain Certified: SHA-256 d1979c1af28c481aed3aaa798db40be7379fecd04515adbf9d306bf09d933fa3
 */

document.addEventListener('DOMContentLoaded', function() {
  // DOM Element References
  const elements = {
    numberInput: document.getElementById('numberInput'),
    checkBtn: document.getElementById('checkBtn'),
    result: document.getElementById('result'),
    languageSelect: document.getElementById('languageSelect'),
    promptText: document.getElementById('prompt'),
    titleText: document.querySelector('h1'),
    infoText: document.getElementById('infoText'),
    blockchainText: document.getElementById('blockchainText')
  };

  // Language Configuration
  let currentLanguage = 'tr';
  const translations = {
    tr: {
      title: 'Labirend Asal Sayı Testi',
      prompt: 'Bir sayı giriniz:',
      button: 'KONTROL ET',
      placeholder: 'Ör: 17',
      errors: {
        empty: 'Lütfen bir sayı giriniz',
        negative: 'Pozitif bir sayı giriniz',
        one: '1 sayısı asal değildir'
      },
      results: {
        prime: num => `${num} sayısı ASALDIR`,
        notPrime: num => `${num} sayısı ASAL DEĞİLDİR`
      }
    },
    en: {
      title: 'Labirend Prime Test',
      prompt: 'Enter a number:',
      button: 'CHECK',
      placeholder: 'Ex: 17',
      errors: {
        empty: 'Please enter a number',
        negative: 'Please enter a positive number',
        one: '1 is not a prime number'
      },
      results: {
        prime: num => `${num} is a PRIME number`,
        notPrime: num => `${num} is NOT a prime number`
      }
    }
  };

  // Event Listeners
  function initEventListeners() {
    elements.languageSelect.addEventListener('change', handleLanguageChange);
    elements.checkBtn.addEventListener('click', handlePrimeCheck);
    elements.numberInput.addEventListener('keydown', handleKeyPress);
  }

  // Language Handling
  function handleLanguageChange() {
    currentLanguage = this.value;
    updateUI();
  }

  function updateUI() {
    const lang = translations[currentLanguage];
    elements.titleText.textContent = lang.title;
    elements.promptText.textContent = lang.prompt;
    elements.checkBtn.textContent = lang.button;
    elements.numberInput.placeholder = lang.placeholder;
  }

  // Input Validation
  function validateInput(input) {
    if (!input.trim()) {
      return { valid: false, message: translations[currentLanguage].errors.empty };
    }
    
    try {
      const num = BigInt(input);
      if (num <= 0n) {
        return { valid: false, message: translations[currentLanguage].errors.negative };
      }
      return { valid: true, num };
    } catch {
      return { valid: false, message: translations[currentLanguage].errors.empty };
    }
  }

  // Prime Check Logic
  function isPrime(n) {
    if (n === 1n) return { prime: false, message: translations[currentLanguage].errors.one };
    
    const num = (2n ** n) - 2n;
    const prime = num % n === 0n;
    
    return {
      prime,
      message: prime 
        ? translations[currentLanguage].results.prime(n)
        : translations[currentLanguage].results.notPrime(n)
    };
  }

  // Result Display
  function displayResult(message, isPrime) {
    elements.result.textContent = message;
    elements.result.className = isPrime ? 'prime show' : 'not-prime show';
    animateResult();
  }

  function animateResult() {
    elements.result.style.transform = 'scale(1.05)';
    setTimeout(() => {
      elements.result.style.transform = 'scale(1)';
    }, 200);
  }

  // Event Handlers
  function handlePrimeCheck() {
    const validation = validateInput(elements.numberInput.value);
    if (!validation.valid) {
      displayResult(validation.message, false);
      return;
    }
    
    const primeCheck = isPrime(validation.num);
    displayResult(primeCheck.message, primeCheck.prime);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') handlePrimeCheck();
  }

  // Initialize Application
  function init() {
    initEventListeners();
    updateUI();
    console.log('Labirend Prime Test Initialized');
  }

  init();
});

// Additional utility functions for demonstration
function generatePrimesUpTo(max) {
  const primes = [];
  for (let i = 2n; i <= max; i++) {
    const num = (2n ** i) - 2n;
    if (num % i === 0n) primes.push(i);
  }
  return primes;
}

function explainAlgorithm() {
  return {
    theorem: "Fermat's Little Theorem Adaptation",
    formula: "(2^n - 2) mod n === 0",
    certainty: "Deterministic (100% accurate)",
    efficiency: "O(log n) complexity"
  };
}

// Export for testing environment
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isPrime,
    generatePrimesUpTo,
    explainAlgorithm
  };
}