document.addEventListener('DOMContentLoaded', () => {
    
    // Находим элементы на странице
    const costSlider = document.getElementById('cost');
    const downSlider = document.getElementById('down');
    const yearsSlider = document.getElementById('years');

    const valCost = document.getElementById('val-cost');
    const valDown = document.getElementById('val-down');
    const valYears = document.getElementById('val-years');
    const monthlyPaymentDisplay = document.getElementById('monthly-payment');

    // Если мы не на главной странице (нет калькулятора), прерываем выполнение
    if (!costSlider) return;

    // Функция для форматирования чисел (1000000 -> 1 000 000)
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    // Основная функция расчета
    function calculateMortgage() {
        // Получаем значения
        let cost = parseInt(costSlider.value);
        let down = parseInt(downSlider.value);
        let years = parseInt(yearsSlider.value);
        
        // Ставка (6% годовых)
        const annualRate = 6; 
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;

        // Сумма кредита (стоимость минус первый взнос)
        let loanAmount = cost - down;

        // Защита: если взнос больше стоимости, кредит = 0
        if (loanAmount < 0) {
            loanAmount = 0;
            downSlider.value = cost; // Ползунок взноса не может быть больше стоимости
            down = cost;
        }

        // Формула аннуитетного платежа: P = S * (r * (1+r)^n) / ((1+r)^n - 1)
        let monthlyPayment = 0;
        if (loanAmount > 0) {
            monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        }

        // Обновляем текст на экране
        valCost.textContent = formatNumber(cost) + ' ₽';
        valDown.textContent = formatNumber(down) + ' ₽';
        valYears.textContent = years + ' лет';
        
        // Округляем ежемесячный платеж
        monthlyPaymentDisplay.textContent = formatNumber(Math.round(monthlyPayment)) + ' ₽';
    }

    // Добавляем слушатели событий на изменение ползунков
    costSlider.addEventListener('input', calculateMortgage);
    downSlider.addEventListener('input', calculateMortgage);
    yearsSlider.addEventListener('input', calculateMortgage);

    // Первый расчет при загрузке страницы
    calculateMortgage();
});