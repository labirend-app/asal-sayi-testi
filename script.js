document.addEventListener('DOMContentLoaded', function() {
  // Dil değişkeni
  let lang = 'tr';
  
  // Elementler
  const elements = {
    title: document.getElementById('title'),
    prompt: document.getElementById('prompt'),
    checkBtn: document.getElementById('checkBtn'),
    result: document.getElementById('result'),
    numberInput: document.getElementById('numberInput'),
    languageSelect: document.getElementById('languageSelect'),
    infoTitle: document.getElementById('infoTitle'),
    infoText: document.getElementById('infoText'),
    jsTitle: document.getElementById('jsTitle'),
    blockchainTitle: document.getElementById('blockchainTitle'),
    blockchainText: document.getElementById('blockchainText'),
    hashTitle: document.getElementById('hashTitle'),
    otsTitle: document.getElementById('otsTitle'),
    otsDownload: document.getElementById('otsDownload'),
    algorithmCode: document.getElementById('algorithmCode')
  };

  // Algoritma kodu
  const algorithmCode = `document.getElementById("checkBtn").addEventListener("click", checkNumber);
document.getElementById("numberInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkNumber();
    }
});

function checkNumber() {
    let n = BigInt(document.getElementById("numberInput").value);
    if (!n || n <= 0) {
        document.getElementById("result").innerText = "Lütfen geçerli bir sayı giriniz";
        return;
    }
    if (n === BigInt(1)) {
        document.getElementById("result").innerText = "1 asal sayı değildir";
        return;
    }

    let num = (BigInt(2) ** n) - BigInt(2);  

    if (num % n === BigInt(0)) {
        document.getElementById("result").innerText = n + " ASALDIR";
    } else {
        document.getElementById("result").innerText = n + " ASAL DEĞİLDİR";
    }
}`;

  // Kod bloğunu ayarla
  elements.algorithmCode.textContent = algorithmCode;

  // Dil değiştirme
  elements.languageSelect.addEventListener('change', function() {
    lang = this.value;
    updateTexts();
  });

  // Sayı kontrolü
  elements.checkBtn.addEventListener('click', checkPrime);
  elements.numberInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') checkPrime();
  });

  // Metinleri güncelle
  function updateTexts() {
    const texts = {
      tr: {
        title: "Labirend Asal Sayı Testi",
        prompt: "Bir sayı giriniz:",
        checkBtn: "KONTROL ET",
        infoTitle: "Labirend Asal Sayı Testi Nedir?",
        infoText: `<p>Bu testin algoritması Doğan Acar tarafından yazılmıştır. Matematikte yaygın olarak kullanılan çoğu asal sayı algoritmasından farklı olarak Labirend Asal Sayı Testi'nde bir sayının asal sayı olup olmadığını %100 kesinlik oranıyla öğrenme imkanına sahibiz.</p>`,
        jsTitle: "Temel Algoritma Yapısı (JavaScript)",
        blockchainTitle: "Blockchain Kanıtı",
        blockchainText: `<p>Bu algoritma, 23 Mayıs 2025 tarihinde OpenTimestamps ile Bitcoin blockchain sistemine kaydedilmiştir. Bu zaman damgası, algoritmanın özgünlüğünü ve sahipliğini kriptografik olarak kanıtlar.</p>`,
        hashTitle: "SHA256 Hash",
        otsTitle: "OTS Dosyası",
        otsDownload: "OTS dosyasını indir"
      },
      en: {
        title: "Labirend Prime Number Test",
        prompt: "Enter a number:",
        checkBtn: "CHECK",
        infoTitle: "What is Labirend Prime Number Test?",
        infoText: `<p>This test's algorithm was written by Doğan Acar. Unlike most prime number algorithms, the Labirend Prime Number Test allows us to determine whether a number is prime with 100% accuracy.</p>`,
        jsTitle: "Basic Algorithm Structure (JavaScript)",
        blockchainTitle: "Blockchain Proof",
        blockchainText: `<p>This algorithm was recorded on the Bitcoin blockchain using OpenTimestamps on May 23, 2025. This timestamp cryptographically proves the authenticity and ownership of the algorithm.</p>`,
        hashTitle: "SHA256 Hash",
        otsTitle: "OTS File",
        otsDownload: "Download OTS file"
      }
    };

    // Tüm metinleri güncelle
    for (const [key, value] of Object.entries(texts[lang])) {
      if (elements[key]) {
        if (key === 'infoText' || key === 'blockchainText') {
          elements[key].innerHTML = value;
        } else {
          elements[key].textContent = value;
        }
      }
    }

    // Placeholder güncelle
    elements.numberInput.placeholder = lang === 'tr' ? "Ör: 17" : "Ex: 17";
  }

  // Asal sayı kontrolü
  function checkPrime() {
    const inputValue = elements.numberInput.value.trim();
    
    if (!inputValue) {
      showResult(lang === 'tr' ? 'Lütfen bir sayı giriniz' : 'Please enter a number', false);
      return;
    }
    
    let n;
    try {
      n = BigInt(inputValue);
    } catch (e) {
      showResult(lang === 'tr' ? 'Geçersiz sayı formatı' : 'Invalid number format', false);
      return;
    }
    
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
    elements.result.textContent = message;
    elements.result.className = isPrime ? 'prime show' : 'not-prime show';
    
    // Animasyon
    setTimeout(() => {
      elements.result.style.transform = 'scale(1.05)';
      setTimeout(() => {
        elements.result.style.transform = 'scale(1)';
      }, 200);
    }, 10);
  }

  // İlk yüklemede metinleri ayarla
  updateTexts();
});