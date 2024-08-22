const counter = (() => {
    let count_1 = 0;

    const updateDisplay = (newCount, direction) => {
        const topDigit = document.getElementById('topDigit');
        const bottomDigit = document.getElementById('bottomDigit');
        const flipper = document.querySelector('.flipper');

        topDigit.textContent = count_1;
        bottomDigit.textContent = newCount;

        flipper.classList.remove('up', 'down');
        flipper.classList.add(direction);

        setTimeout(() => {
            topDigit.textContent = newCount;
            flipper.classList.remove('up', 'down');
        }, 1000); // 这应与动画持续时间一致
    };

    const plus = () => {
        count_1++;
        updateDisplay(count_1, 'up');
    };

    const minus = () => {
        count_1--;
        updateDisplay(count_1, 'down');
    };

    return { plus, minus };
})();


const do_calculator = () =>{
    let input_1 = document.querySelector('#num_1').value;
    let input_2 = document.querySelector('#num_2').value;
    let num_1 = parseFloat(input_1);
    let num_2 = parseFloat(input_2);
    let result_plus = num_1 + num_2;
    alert(num_1 + '+' +num_2 + ' = ' + result_plus);
    let result_minus = num_1 - num_2;
    alert(num_1 + '-' +num_2 + ' = ' + result_minus);
    let result_multiply = num_1 * num_2 ;
    alert(num_1 + '×' +num_2 + ' = ' + result_multiply) ;
    let result_div = num_1 / num_2 ;
    alert(num_1 + '÷' +num_2 + ' = ' + result_div) ;
}

const minus_btn = document.querySelector('#minus_btn');
const plus_btn = document.querySelector('#plus_btn');
const calculator_btn = document.querySelector('#calculator_btn');

minus_btn.onclick = counter.minus;
plus_btn.onclick = counter.plus;
calculator_btn.onclick = do_calculator;
