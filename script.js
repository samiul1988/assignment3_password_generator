// Assignment Code
var generateBtn = document.querySelector("#generate");

// Helper functions

// creates a list of ASCII characters from codes
let charactersFromRange = function(start, end) {
    return Array(end - start + 1).fill().map(( _, index ) => String.fromCharCode(start + index));
}

// generate random index from 0 to limit
let getRandomIndex = function(limit) {
    return Math.floor(Math.random() * Math.floor(limit));
}

// prompts user for password length input, validates the input and return an integer with successful validation 
var getPasswordLength = function() {
    var promptPasswordLength = window.prompt("Please specify length of password (should be between 8 and 128 characters)");
    // Validattion
    if (promptPasswordLength === null || promptPasswordLength === "" || isNaN(promptPasswordLength)) {
        window.alert("Please provide a valid answer! Please try again...");
        return getPasswordLength();
    }
    promptPasswordLength = parseInt(promptPasswordLength); // convert to integer
    if (isNaN(promptPasswordLength)){
        window.alert("Please provide a number..."); // handler for invalid numbers
        return getPasswordLength();
    }else if ( !(promptPasswordLength >= 8 && promptPasswordLength <= 128) ) {
        window.alert("Please choose a number between 8 and 128...");  // handler for numbers outside allowed range
        return getPasswordLength();
    }
    return promptPasswordLength; // return valid length
}

// Global Variables and consts
const vocabularyLowercaseCharacter = charactersFromRange(97, 122);  // a list of lowercase characters
const vocabularyUppercaseCharacter = charactersFromRange(65, 90); // a list of uppercase characters
const vocabularyNumericCharacter = charactersFromRange(48, 57); // a list of numeric characters
const vocabularySpecialCharacter = charactersFromRange(32, 47)
                                    .concat(charactersFromRange(58, 64)
                                    .concat(charactersFromRange(91, 96)
                                    .concat(charactersFromRange(123, 126)))); // a list of special characters including space

// object that stores password related properties
var passwordObj = {
    length: 0,
    isLowerCaseSelected: false,
    isUpperCaseSelected: false,
    isNumericCharacterSelected: false,
    isSpecialCharacterSelected: false,
    setLength: function(n) {
        this.length = n;
    },
    selectCharacterTypes: function() {
        var confirmLowerCase = window.confirm("Include lowercase characters to your password?");
        var confirmUpperCase = window.confirm("Include uppercase characters to your password?");
        var confirmNumericCharacter = window.confirm("Include numeric characters to your password?");
        var confirmSpecialCharacter = window.confirm("Include special characters to your password (including space)?");
        while (!confirmLowerCase && !confirmUpperCase && !confirmNumericCharacter && !confirmSpecialCharacter) {
            window.alert("Please select at least one character type...");
            return this.selectCharacterTypes();
        }
        this.isLowerCaseSelected = confirmLowerCase;
        this.isUpperCaseSelected = confirmUpperCase;
        this.isNumericCharacterSelected = confirmNumericCharacter;
        this.isSpecialCharacterSelected = confirmSpecialCharacter;
    }
};

// createPassword Definition
var createPassword = function() {
    let password = ""; // initialize return value
    let pwVoc = []; // initialize dictionary of selectable characters
    // Lowercase characters
    if (passwordObj.isLowerCaseSelected) {
        password = password + vocabularyLowercaseCharacter[getRandomIndex(vocabularyLowercaseCharacter.length)]; // include at least one lowercase letter to the desired password
        pwVoc = pwVoc.concat(vocabularyLowercaseCharacter); // include lowercase letters to selectable character list     
    }

    // Uppercase characters
    if (passwordObj.isUpperCaseSelected) {
        password = password + vocabularyUppercaseCharacter[getRandomIndex(vocabularyUppercaseCharacter.length)]; // include at least one uppercase letter to the desired password
        pwVoc = pwVoc.concat(vocabularyUppercaseCharacter); // include uppercase letters to selectable character list    
    }

    // Numeric characters
    if (passwordObj.isNumericCharacterSelected) {
        password = password + vocabularyNumericCharacter[getRandomIndex(vocabularyNumericCharacter.length)]; // include at least one numeric character to the desired password
        pwVoc = pwVoc.concat(vocabularyNumericCharacter); // include numeric characters to selectable character list    
    }

    // Special characters
    if (passwordObj.isSpecialCharacterSelected) {
        password = password + vocabularySpecialCharacter[getRandomIndex(vocabularySpecialCharacter.length)]; // include at least one special character to the desired password
        pwVoc = pwVoc.concat(vocabularySpecialCharacter);  // include special characters to selectable character list  
    }

    // fill out the rest of the password
    let k = 0;
    let initialLength = password.length;
    while(k < passwordObj.length - initialLength) {
        password = password + pwVoc[getRandomIndex(pwVoc.length)];
        k += 1;
    }
    return password;
}

// generatePassword Definition
var generatePassword = function() {
    window.alert("Welcome to password generator. Please respond to the following criteria to generate a secure password.");
    passwordObj.setLength(getPasswordLength()); // Get valid password lenght from user input
    passwordObj.selectCharacterTypes();  // Get valid character type(s) to be included in the password from user input
    window.alert(`Your selection criteria are:\n
                    Password Length: ${passwordObj.length}\n
                    Contains lowercase letters: ${passwordObj.isLowerCaseSelected ? "Yes" : "No"}\n
                    Contains uppercase letters: ${passwordObj.isUpperCaseSelected ? "Yes" : "No"}\n
                    Contains numeric characters: ${passwordObj.isNumericCharacterSelected ? "Yes" : "No"}\n
                    Contains special characters: ${passwordObj.isSpecialCharacterSelected ? "Yes" : "No"}\n`);
    
    let password = createPassword();

    return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  console.log("password: ", password);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
