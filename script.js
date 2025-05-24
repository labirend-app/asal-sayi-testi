document.addEventListener('DOMContentLoaded', function() {
  const numberInput = document.getElementById('numberInput');
  const checkBtn = document.getElementById('checkBtn');
  const resultDiv = document.getElementById('result');
  const languageSelect = document.getElementById('languageSelect');
  const promptText = document.getElementById('prompt');
  const titleText = document.querySelector('h1');
  
  let lang = 'tr';
  
  // Dil değiştirme fonksiyonu
  languageSelect.addEventListener('change', function() {
    lang = this.value;
    updateTexts();
  });
  
  // Kontrol butonu ve Enter tuşu
  checkBtn.addEventListener('click', checkPrime);
  numberInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkPrime();
  });
  
  // Metinleri güncelleme
  function updateTexts() {
    if (lang === 'tr') {
      titleText.textContent = 'Labirend Asal Sayı Testi';
      promptText.textContent = 'Bir sayı giriniz:';
      checkBtn.textContent = 'KONTROL ET';
      numberInput.placeholder = 'Ör: 17';
    } else {
      titleText.textContent = 'Labirend Prime Test';
      promptText.textContent = 'Enter a number:';
      checkBtn.textContent = 'CHECK';
      numberInput.placeholder = 'Ex: 17';
    }
  }
  
  // Asal sayı kontrolü
  function checkPrime() {
    const inputValue = numberInput.value.trim();
    
    if (!inputValue) {
      showResult(lang === 'tr' ? 'Lütfen bir sayı giriniz' : 'Please enter a number', false);
      return;
    }
    
    const n = BigInt(inputValue);
    
    if (n <= 0n) {
      showResult(lang === 'tr' ? 'Pozitif bir sayı giriniz' : 'Please enter a positive number', false);
      return;
    }
    
    if (n === 1n) {
      showResult(
        lang === 'tr' 
          ? '1 sayısı asal değildir' 
          : '1 is not a prime number', 
        false
      );
      return;
    }
    
    // Labirend Algoritması
    const num = (2n ** n) - 2n;
    const isPrime = num % n === 0n;
    
    if (isPrime) {
      showResult(
        lang === 'tr' 
          ? `${n} sayısı ASALDIR` 
          : `${n} is a PRIME number`,
        true
      );
    } else {
      showResult(
        lang === 'tr' 
          ? `${n} sayısı ASAL DEĞİLDİR` 
          : `${n} is NOT a prime number`,
        false
      );
    }
  }
  
  // Sonucu göster
  function showResult(message, isPrime) {
    resultDiv.textContent = message;
    resultDiv.className = isPrime ? 'prime show' : 'not-prime show';
    
    // Animasyon için
    setTimeout(() => {
      resultDiv.style.transform = 'scale(1.05)';
      setTimeout(() => {
        resultDiv.style.transform = 'scale(1)';
      }, 200);
    }, 10);
  }
});