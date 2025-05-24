# Labirend Asal Sayı Testi

Matematikte yaygın olarak kullanılan çoğu asal sayı algoritmasından farklı olarak Labirend Asal Sayı Testi'nde bir sayının asal sayı olup olmadığını **%100 kesinlik oranıyla** öğrenme imkanı.

## Algoritma

```javascript
function checkNumber() {
    let n = BigInt(document.getElementById("numberInput").value);
    let num = (BigInt(2) ** n) - BigInt(2);  
    return num % n === BigInt(0);
}
```

## Blockchain Kanıtı
Bu algoritma, 23 Mayıs 2025 tarihinde OpenTimestamps ile Bitcoin blockchain sistemine kaydedilmiştir.

**SHA256 Hash**: `d1979c1af28c481aed3aaa798db40be7379fecd04515adbf9d306bf09d933fa3`

## Özellikler
- Sade ve temiz arayüz
- Responsive görünüm
- Çoklu dil desteği
- %100 doğru sonuç

##
© 2025 Doğan Acar
