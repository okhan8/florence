// Problem:
// Given: a string input of 2 numbers separated by a space. i.e. "1 10"
// Solve: Find the highest occurring digit of the prime numbers that occur in the range given by the input (inclusive). 

// If multiple digits occur the same highest number of times return the greater. 

// Example 1: for the input "1 10" the highest occurring digit is 7
// Example 2: for the input "1 20" the highest occurring digit is 1


// Expectations:
// Please track your time to complete
// Your code should be in one file executable via the command "node index.js"
// You can choose how to pass the input to the program (command line, prompt etc...)
// Please do not use any external dependencies
// Please submit via github


//Osman Khan
//Florence coding assessment 
//Time total: 31 minutes and 25 seconds
//Time complexity: O(n^2)


var highestDigitCount = function(strs){

    if (strs.length === 0) {
        console.log("Sorry, there is no valid input. The value returned is null");
        return null;
    }
    else if (strs.match(/[^0-9\s]/) !== null){
        console.log("Sorry, there are characters other than digits in the input. The value returned is null");
        return null;
    }

    strs = strs.split(' ');
    //another edge case
    if (strs.length !== 2){
        console.log("Sorry, invalid input. There must be 2 numbers separated with a single space. The value returned is null");
        return null;
    }
    const lowerRange = parseInt(strs[0]); 
    const upperRange = parseInt(strs[1]);

    let primeNumbers = [];
    let countingDigits = new Map();

    for (let i = lowerRange; i <= upperRange; i++){
        if (isPrime(i) === true){
            primeNumbers.push(i);
        }
    }

    while (primeNumbers.length){
        const number = primeNumbers.pop().toString();

        for (let digit of number){
            if (countingDigits.has(digit) === false){
                countingDigits.set(digit,1);
            }
            else{
                const value = countingDigits.get(digit);
                countingDigits.set(digit,value+1);
            }
        }
    }
    return maxDigit(countingDigits);
    
};

var isPrime = function(num,list){
    if (num === 1 || num === 2) return true;

    for (let i = 2; i < num; i++){
        if (num%i === 0){
            return false;
        }
    }
    return true;
};

var maxDigit = function(countPrimeDigits){

    let maxValue = -Infinity;
    let maxKey = null;

    for (let [key,value] of countPrimeDigits){
        if (value > maxValue){
            maxValue = value;
            maxKey = key;
        }
        else if (value === maxValue){
            maxKey = Math.max(key,maxKey);
        }
    }
    return maxKey;
};

console.log(highestDigitCount('1 10'));
console.log(highestDigitCount('1 20'));
console.log(highestDigitCount('5 100'));

console.log(highestDigitCount('')); //testing valid input
console.log(highestDigitCount('A 20')); //testing valid input
console.log(highestDigitCount('1 20 30')); //testing valid input
