// Assignment Code
var generateBtn = document.querySelector("#generate");

function charactersFromRange(start, end) {
    return Array(end - start + 1).fill().map(( _, index ) => String.fromCharCode(start + index));
}

// Global Variables
const vocabularyLowercaseCharacter = charactersFromRange(97, 122);
const vocabularyUppercaseCharacter = charactersFromRange(65, 90);
const vocabularyNumericCharacter = charactersFromRange(48, 57);
const vocabularySpecialCharacter = charactersFromRange(32, 47).concat( 
                                    charactersFromRange(58, 64).concat(  
                                    charactersFromRange(91, 96).concat( 
                                    charactersFromRange(123, 126))));

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
        var confirmSpecialCharacter = window.confirm("Include special characters to your password?");
        while (!confirmLowerCase && !confirmUpperCase && !confirmNumericCharacter && !confirmSpecialCharacter) {
            window.alert("Please select at least one character type...");
            this.selectCharacterTypes();
        }
        this.isLowerCaseSelected = confirmLowerCase;
        this.isUpperCaseSelected = confirmUpperCase;
        this.isNumericCharacterSelected = confirmNumericCharacter;
        this.isSpecialCharacterSelected = confirmSpecialCharacter;
    }
};

// Helper functions
var getPasswordLength = function() {
    var promptPasswordLength = window.prompt("Please specify length of password (should be between 8 and 128 characters)");
    // Validattion
    if (promptPasswordLength === null || promptPasswordLength === "" || isNaN(promptPasswordLength)) {
        window.alert("Please provide a valid answer! Please try again...");
        return getPasswordLength();
    }
    promptPasswordLength = parseInt(promptPasswordLength); // convert to int
    if (isNaN(promptPasswordLength)){
        window.alert("Please provide a number...");
        return getPasswordLength();
    }else if ( !(promptPasswordLength >= 8 && promptPasswordLength <= 128) ) {
        window.alert("Please choose a number between 8 and 128...");
        return getPasswordLength();
    }
    return promptPasswordLength;
}

var selectCharacterTypes = function() {
    var confirmLowerCase = window.confirm("Include lowercase characters to your password?");
    var confirmUpperCase = window.confirm("Include uppercase characters to your password?");
    var confirmNumericCharacter = window.confirm("Include numeric characters to your password?");
    var confirmSpecialCharacter = window.confirm("Include special characters to your password?");
    while (!confirmLowerCase && !confirmUpperCase && !confirmNumericCharacter && !confirmSpecialCharacter) {
        window.alert("Please select at least one character type...");
        selectCharacterTypes();
    }
    passwordObj.isLowerCaseSelected = confirmLowerCase;
    passwordObj.isUpperCaseSelected = confirmUpperCase;
    passwordObj.isNumericCharacterSelected = confirmNumericCharacter;
    passwordObj.isSpecialCharacterSelected = confirmSpecialCharacter;
}

var getRandomIndex = function(limit) {
    return Math.floor(Math.random() * Math.floor(limit));
}

var createPassword = function() {
    let password = ""; // initialize return value
    let pwVoc = []; // initialize dictionary of selectable characters
    // Lowercase characters
    if (passwordObj.isLowerCaseSelected) {
        password = password + vocabularyLowercaseCharacter[getRandomIndex(vocabularyLowercaseCharacter.length)];
        // pwArr.push(vocabularyLowercaseCharacter[getRandomIndex(vocabularyLowercaseCharacter.length)]); // ensure presence of at least one lowercase character
        pwVoc = pwVoc.concat(vocabularyLowercaseCharacter); // include lowercase letters to selectable character list     
    }

    // Uppercase characters
    if (passwordObj.isUpperCaseSelected) {
        password = password + vocabularyUppercaseCharacter[getRandomIndex(vocabularyUppercaseCharacter.length)];
        // pwArr.push(vocabularyUppercaseCharacter[getRandomIndex(vocabularyUppercaseCharacter.length)]); // ensure presence of at least one uppercase character
        pwVoc = pwVoc.concat(vocabularyUppercaseCharacter); // include uppercase letters to selectable character list    
    }

    // Numeric characters
    if (passwordObj.isNumericCharacterSelected) {
        password = password + vocabularyNumericCharacter[getRandomIndex(vocabularyNumericCharacter.length)];
        // pwArr.push(vocabularyNumericCharacter[getRandomIndex(vocabularyNumericCharacter.length)]); // ensure presence of at least one numeric character
        pwVoc = pwVoc.concat(vocabularyNumericCharacter); // include numeric characters to selectable character list    
    }

    // Special characters
    if (passwordObj.isSpecialCharacterSelected) {
        password = password + vocabularySpecialCharacter[getRandomIndex(vocabularySpecialCharacter.length)];
        // pwArr.push(vocabularySpecialCharacter[getRandomIndex(vocabularySpecialCharacter.length)]); // ensure presence of at least one special character
        pwVoc = pwVoc.concat(vocabularySpecialCharacter);  // include special characters to selectable character list  
    }

    // fill out the rest of the password
    let k = 0;
    let initialLength = password.length;
    while(k < passwordObj.length - initialLength) {
        password = password + pwVoc[getRandomIndex(pwVoc.length)];
        // pwArr.push(pwVoc[getRandomIndex(pwVoc.length)]);
        k += 1;
    }

    return password;
}

// Generate Password Definition
var generatePassword = function() {
    window.alert("Welcome to password generator. Please respond to the following criteria to generate a secure password.");
    passwordObj.setLength(getPasswordLength());
    passwordObj.selectCharacterTypes();

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
