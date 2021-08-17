//Напишите программу, которая возвращает наибольшее число палиндром, которое является

// произведением двух простых пятизначных чисел, а также возвращает сами сомножители.

// Простое число - это натуральное число, которое делится нацело только на 1 и на себя само (2, 3, 5, 7,

// 11, …)



function getBiggestPolindromOfPrimes(from,to){

	let max_multipliers = [0,0,0];
	let primes = getPrimesFromTo(from,to);
	console.log(primes.length);

	for (let i = primes.length-1; i > 0; i--) {
		for (let j = i; j > 0; j--) {
			//console.log(primes[i],i,primes.length);

			let mult = primes[i]*primes[j];

			if(isPalindrom(mult) && mult>max_multipliers[0]){
				
				max_multipliers = [mult,primes[i],primes[j]];
				console.log(max_multipliers);
			}
				
		}

	}
	return max_multipliers;
}

function getPrimesFromTo(from,to){
	let primes = [];
	for (let index = from; index < to; index++) {
		if(isPrime(index)){
			primes.push(index);
		}
	}
	return primes
}

const isPrime = num => {
	for(let i = 2, s = Math.sqrt(num); i <= s; i++)
			if(num % i === 0) return false; 
	return num > 1;
}

const isPalindrom = num=>{
	num = num.toString();
	return num === num.split('').reverse().join('');
}


//console.log(getBiggestPolindromOfPrimes(100,99999))


function largestPalindrome() {

	var max = [0,0,0];

	// not using i >= 100 since 100*100 is not palindrome! :)
	//999
	for (var i = 999; i > 100; i--) {
			// because i * j === j * i, no need of both i and j
			// to count down from 999
			for (var j = i; j > 100; j--) {
					var mul = j * i;
					if (isPalindrom(mul) && mul > max[0]) {
							max = [mul,i,j];
					}
			}
	}

	return max;
}

//let largestPalindromeArr = largestPalindrome();
//console.log(largestPalindromeArr,isPrime(largestPalindrome[1]),isPrime(largestPalindrome[2]) );
