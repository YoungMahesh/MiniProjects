const inputText = document.getElementById("inputText")
const outputEncrypted = document.getElementById("outputEncrypted")
const inputEncrypted = document.getElementById("inputEncrypted")
const outputText = document.getElementById("outputText")


/*           Caeser-Cypher Algorithm is used here      */

// Encryption

function encryptText2(word) {
   let encrypted = ''
   for (const letter of word) {
      let letterCode = letter.charCodeAt()
      if (letterCode >= 32 && letterCode <= 126) {
         let num1 = letter.charCodeAt() - 32
         num1 += 15
         num1 %= 95
         encrypted += String.fromCharCode(num1 + 32)
      } else {
         encrypted += String.fromCharCode(letterCode)
      }
   }
   return encrypted
}

function encryptText() {
   const text = inputText.value.trim()
   if (text == "") alert("Input-Text area in empty")
   outputEncrypted.value = encryptText2(text)
}

function clearText() {
   inputText.select()
   document.execCommand("delete")
}

function copyEncrypted() {
   outputEncrypted.select();
   document.execCommand("copy")
   alert("Copied: " + outputEncrypted.value)
}



//             Decryption

function decryptText2(word) {
   let decrypted = ''
   for (const letter of word) {
      let letterCode = letter.charCodeAt()
      if (letterCode >= 32 && letterCode <= 126) {
         let num1 = letter.charCodeAt() - 32
         num1 -= 15
         if (num1 < 0) num1 += 95
         decrypted += String.fromCharCode(num1 + 32)
      } else {
         decrypted += String.fromCharCode(letterCode)
      }
   }
   return decrypted
}

function decryptText() {
   const encryptedText = inputEncrypted.value.trim()
   if (encryptedText == "") alert("Input-Encryted-Text area is empty")
   outputText.value = decryptText2(encryptedText)
}

function clearDecrypt() {
   inputEncrypted.select()
   document.execCommand("delete")
}

function copyDecrypted() {
   outputText.select()
   document.execCommand("copy")
   alert("Copied: " + outputText.value)
}