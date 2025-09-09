# Questions - 

1) What is the difference between var, let, and const?
2) What is the difference between map(), forEach(), and filter()? 
3) What are arrow functions in ES6?
4) How does destructuring assignment work in ES6?
5) Explain template literals in ES6. How are they different from string concatenation?


# Answers -

1. Var, let, and const are ways to declare variables in JavaScript, but they behave differently. Var is function-scoped, which means it is accessible throughout the function where it is declared, and it can be redeclared and updated. Let is block-scoped, so it only works inside the block where it is defined, and it can be updated but not redeclared in the same block. Const is also block-scoped, but its value cannot be updated or redeclared, and it must be assigned a value when it is declared.

2. Map, forEach, and filter are array methods, but they work differently. ForEach goes through each item in an array and runs a function for it, but it does not return anything. Map goes through each item, runs a function, and returns a new array with the results. Filter goes through each item, checks a condition, and returns a new array with only the items that meet the condition.

3. Arrow functions are a shorter way to write functions in ES6 using the => syntax. They make the code cleaner and simpler, and for a single expression, you can skip writing the return statement. Arrow functions also handle the value of this differently, which can be useful in some cases.

4. Destructuring assignment allows you to take values from arrays or objects and assign them to separate variables in a single line. This makes it easier to work with data because you do not need to access each item or property individually.

5. Template literals are strings written with backticks instead of quotes. They let you include variables and expressions directly inside the string using ${}. Template literals also allow multi-line strings without using extra symbols. This is cleaner and easier to read compared to string concatenation, where you have to use + to join strings and variables.

