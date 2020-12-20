## Assignment 3: Password Generator (using Javascript)
---

### User Story (Obtained from the assignment description)

```
AS AN employee with access to sensitive data
I WANT to randomly generate a password that meets certain criteria
SO THAT I can create a strong password that provides greater security
```

### Acceptance Criteria (Obtained from the assignment description)

```
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN prompted for character types to include in the password
THEN I choose lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
```

### Expected Final Outcome (Obtained from assignment instruction)
![password generator demo](./Assets/03-javascript-homework-demo.png)

## My Actions and Notes

* Obtained the starter code from Gitlab repo.
* Modified the javascript file to meet the acceptance criteria
* Basic considerations were as follows:
    * When the user clicks "Generate Password" button, a series of prompt appears to collect length and character type information.
    * The inputs are validated on-the-fly and information is stored in a global object
    * If a particular character type is selected, then it is ensured that at least one character of that type will be present in the password
    * The characters were selected randomly from appropriate list of characters 
* I included "space" as part of special character set (may not be used in practice, but I considered all characters mentioned in [here](https://owasp.org/www-community/password-special-characters))
* The task can be completed in different ways; however, I tried to use a similar structure that was presented in Module 3 lessons

### Repository URL
[Click here to see the final outcome](https://samiul1988.github.io/assignment3_password_generator/)