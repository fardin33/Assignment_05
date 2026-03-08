==================== 01 ======================

----------------- 1.1 VAR -----------------

1. What is the difference between var, let, and const?

|| var : var keyword is used to declare a variable In JavaScript.
         var is the old way of declaring variables in JavaScript.
 
|| Var Syntax : var variableName = value;

|| Var Example : var name = "Jihad"; ||  var age = 22;

--------------------- 1.2 LET -----------------
|| Let : let is a keyword used to declare a variable in JavaScript

|| Let Syntax : let variableName = value;

|| Let Example : et name = "Jihad"; || let age = 22;

===================== 01 END ===================


===================== 02 =======================

|| spread operator : 2.What is the spread operator (...)?
|| Ans : Spread Operator (...) is used to expand or unpack elements of an array, 
         object, or iterable into individual elements.

|| Syntax : ...variableName

|| Example : const numbers = [1, 2, 3];
             const newNumbers = [...numbers];
             console.log(newNumbers);

==================== 02 END =====================

===================== 03 ========================

|| 3. What is the difference between map(), filter(), and forEach()?

--------------------- 3.1 map() -----------------
|| map() : map() is an array method in JavaScript.
           It is used to create a new array by applying a function to each 
           element of the original array.

|| Syntax : array.map(function(element,array,index){
            // return new value
            }) 

|| Example : const numbers = [1, 2, 3, 4];
             const result = numbers.map(num => num * 2);
             console.log(result);            

--------------------- 3.2 filter() -------------
|| filter() : in JavaScript filter() is an array method used to create a new array 
              containing elements that satisfy a condition.It checks each 
              element and keeps only the elements that return true.

|| Syntax  : array.filter((element) => condition)

|| Example : const numbers = [10, 20, 30, 40, 50];
             const result = numbers.filter(num => num > 25);
             console.log(result);

--------------------- 3.3 forEach() -------------
|| forEach() : in javascript forEach() is an array method used to loop through 
               each element ofan array.It performs an action for every 
               element but does not return a new array.

|| Syntax : array.forEach((element) => {
            // code
            })

|| Example : const numbers = [1, 2, 3, 4];
             numbers.forEach(num => {
             console.log(num * 2);
             });
===================== 03 End ====================


===================== 04 ========================

|| Arrow Function : 4. What is an arrow function?
|| Ans : Arrow Function is a short way to write functions in JavaScript.

|| Syntax : (parameters) => {
            // function body
            }

|| Example : const add = (a, b) => {
             return a + b;
             }; 
             console.log(add(5, 3));
             
===================== 04 End ====================


===================== 05 ========================

|| Template Literals : 5. What are template literals?
|| Ans : Template literals are a way to create strings with embedded variables 
         and expressions in JavaScript.use backticks ( ) instead of single ' ' or 
         double " " quotes.

|| Syntax : `string text ${variable}`

|| Example : const name = "Jihad";
             const message = `Hello ${name}`;
             console.log(message);

===================== 05 End ====================

