/**
 * Script for practicing Math.random() questions
 * 
 * (c) 2022 https://compsci.rocks
 */
var rnd = {
    init: () => {
        rnd.refreshQuestion();
        document.getElementById('refresh').addEventListener('click', rnd.refreshQuestion);
        document.getElementById('check').addEventListener('click', rnd.checkAnswer);
    },

    refreshQuestion: () => {

        let ans = document.getElementById('answer');
        ans.value = '';
        ans.dataset.answer = '';

        let q = document.getElementById('question');
        q.innerHTML = '';

        let res = document.getElementById('results');
        res.innerHTML
        res.classList.add('hidden');

        let exp = document.getElementById('explanation');
        exp.innerHTML = '';
        exp.classList.add('hidden');

        let question = {};
        let r = randomRange(1, 85);
        if (r <= 5) {
            // Misplace parentheses
            question = rnd.badParentheses();
        } else if (r <= 25) {
            question = rnd.largestValue();
        } else if (r <= 45) {
            question = rnd.smallestValue();
        } else if (r <= 65) {
            question = rnd.fillRange();
        } else if (r <= 85) {
            question = rnd.fillShift();
        } else {
            console.error('Not implemented');
        }

        q.innerHTML = question.question;
        ans.dataset.answer = question.answer;
        exp.innerHTML = question.explanation;

    },

    checkAnswer: function () {
        let ans = document.getElementById('answer');
        let res = document.getElementById('results');
        let exp = document.getElementById('explanation');

        if (ans.value.trim() == '') {
            res.classList.add('hidden');
            exp.classList.add('hidden');
            return;
        }

        if (ans.value.trim() == ans.dataset.answer) {
            res.innerHTML = 'Correct!';
            res.classList.remove('hidden', 'question-incorrect');
            res.classList.add('question-correct');
            exp.classList.remove('hidden');
        } else {
            res.innerHTML = 'Incorrect!';
            res.classList.remove('hidden', 'question-correct');
            res.classList.add('question-incorrect');
            exp.classList.remove('hidden');
        }
    },

    /**
     * Returns info for the largest possible value question
     */
    largestValue: () => {
        let range = randomRange(2, 20);
        let shift = randomRange(-5, 50);
        let max = range + shift - 1;
        let randomCall = '';
        if (shift == 0) {
            randomCall = '(int)(Math.random() * ' + range + ')';
        } else {
            let rnd = randomRange(0, 3);
            if (rnd == 0) {
                randomCall = '(int)(Math.random() * ' + range + (shift >= 0 ? ' + ' : ' - ') + Math.abs(shift) + ')';
            } else if (rnd == 1) {
                randomCall = '(int)(Math.random() * ' + range + ') ' + (shift >= 0 ? ' + ' : ' - ') + Math.abs(shift);
            } else if (rnd == 2) {
                randomCall = shift + ' + (int)(Math.random() * ' + range + ')';
            } else if (rnd == 3) {
                randomCall = shift + ' + (int)(Math.random() * ' + range + ')';
            }
        }

        return {
            question: 'What is the largest possible value returned by the following code?' + '<pre>' + randomCall + '</pre>',
            answer: max,
            explanation: 'The largest value returned from the way we are using <code>Math.random()</code> is the number of possible values, plus the shift, minus 1. So, it this case the largest value would be ' + max + '. <br><br><code>' + range + (shift >= 0 ? ' + ' : ' - ') + Math.abs(shift) + ' - 1 = ' + max + '.</code>',
        };
    },

    smallestValue: () => {
        let range = randomRange(2, 20);
        let shift = randomRange(-5, 50);
        let min = shift;
        let randomCall = '';
        if (shift == 0) {
            randomCall = '(int)(Math.random() * ' + range + ')';
        } else {
            let rnd = randomRange(0, 2);
            if (rnd == 0) {
                randomCall = '(int)(Math.random() * ' + range + (shift >= 0 ? ' + ' : ' - ') + Math.abs(shift) + ')';
            } else if (rnd == 1) {
                randomCall = '(int)(Math.random() * ' + range + ') ' + (shift >= 0 ? ' + ' : ' - ') + Math.abs(shift);
            } else if (rnd == 2) {
                randomCall = shift + ' + (int)(Math.random() * ' + range + ')';
            }
        }

        return {
            question: 'What is the smallest possible value returned by the following code?' + '<pre>' + randomCall + '</pre>',
            answer: min,
            explanation: 'The smallest value returned from the way we are using <code>Math.random()</code> is the shift. So, it this case the smallest value would be <code>' + min + '</code>',
        };
    },

    fillRange: () => {
        let range = randomRange(2, 20);
        let shift = randomRange(-5, 50);
        let min = shift;
        let max = range + shift - 1;
        let randomCall = '';
        if (shift == 0) {
            randomCall = 'int x = (int)(Math.random() * /* Missing Code */)';
        } else {
            let rnd = randomRange(0, 2);
            if (rnd == 0) {
                randomCall = 'int x = (int)(Math.random() * /* Missing Code */' + (shift >= 0 ? ' + ' : ' - ') + Math.abs(shift) + ')';
            } else if (rnd == 1) {
                randomCall = 'int x = (int)(Math.random() * /* Missing Code */) ' + (shift >= 0 ? ' + ' : ' - ') + Math.abs(shift);
            } else if (rnd == 2) {
                randomCall = 'int x = ' + shift + ' + (int)(Math.random() * /* Missing Code */)';
            }
        }

        return {
            question: 'What would replace <code>/* Missing Code */</code> below so that <code>x</code> could be an integer in the range  <code>[' + min + ' - ' + max + '] </code>?' + '<pre>' + randomCall + '</pre>',
            answer: range,
            explanation: 'This snippet of code could return a number in the range [' + min + ' - ' + max + ']. There are ' + range + ' possible values, so we need to multiply <code>Math.random()</code> by ' + range + '.',
        };
    },

    fillShift: () => {
        let range = randomRange(2, 20);
        let shift = randomRange(0, 50);
        let min = shift;
        let max = range + shift - 1;
        let randomCall = '';
        let rnd = randomRange(0, 2);
        if (rnd == 0) {
            randomCall = 'int x = (int)(Math.random() * ' + range + ' + /* Missing Code */)';
        } else if (rnd == 1) {
            randomCall = 'int x = (int)(Math.random() * ' + range + ') + /* Missing Code */';
        } else if (rnd == 2) {
            randomCall = 'int x = /* Missing Code */ + (int)(Math.random() * ' + range + ')';
        }


        return {
            question: 'What would replace <code>/* Missing Code */</code> below so that <code>x</code> could be an integer in the range  <code>[' + min + ' - ' + max + '] </code>?' + '<pre>' + randomCall + '</pre>',
            answer: shift,
            explanation: 'This snippet of code could return a number in the range [' + min + ' - ' + max + ']. The smallest value is ' + min + ', which is our shift value <code>' + shift + '</code>.',
        };
    },

    badParentheses: () => {
        let range = randomRange(2, 20);
        let shift = randomRange(-5, 50);
        let min = shift;
        let max = range + shift - 1;
        let randomCall = '';
        let rnd = randomRange(0, 2);
        if (rnd == 0) {
            randomCall = '(int)Math.random() * ' + range + ' + ' + shift + '';
        } else if (rnd == 1) {
            randomCall = '(int)Math.random() * ' + range + ' + ' + shift;
        } else if (rnd == 2) {
            randomCall = shift + ' + (int)Math.random() * ' + range + '';
        }

        return {
            question: 'What is the ' + (Math.random() > 0.5 ? 'largest' : 'smallest') + ' possible value returned by the following code?' + '<pre>' + randomCall + '</pre>',
            answer: shift,
            explanation: 'The parentheses around <code>(Math.random() * ' + range + ')</code> are missing. Casting <code>Math.random()</code> to an integer will always return 0, so the largest/smallest value returned would be the shift value ' + shift + '.',
        };
    }


}
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}