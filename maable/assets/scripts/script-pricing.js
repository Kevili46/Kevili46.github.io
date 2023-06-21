const monthly = document.getElementsByClassName('monthly')[0];
const yearly = document.getElementsByClassName('yearly')[0];
const aboBasic = document.getElementsByClassName('abo-basic')[0];
const aboFocus = document.getElementsByClassName('abo-focus')[0];
const basicPrice = aboBasic.getElementsByClassName('abo-price')[0];
const focusPrice = aboFocus.getElementsByClassName('abo-price')[0];
const billingPeriods = document.getElementsByClassName('abo-period');

monthly.addEventListener('click', () => {
    monthly.classList.add('chosen-plan');
    yearly.classList.remove('chosen-plan');
    adaptPrices();
});
yearly.addEventListener('click', () => {
    yearly.classList.add('chosen-plan');
    monthly.classList.remove('chosen-plan');
    adaptPrices();
});

window.addEventListener('load', () => {
    adaptPrices();
});

function adaptPrices() {
    if (monthly.classList.contains('chosen-plan')) {
        basicPrice.innerHTML = '€4.99 / Month';
        focusPrice.innerHTML = '€9.99 / Month';
        for (let i = 1; i < billingPeriods.length; i++) {
            billingPeriods[i].innerHTML = 'Billed monthly';
        }
    }
    if (yearly.classList.contains('chosen-plan')) {
        basicPrice.innerHTML = '€49.99 / Year';
        focusPrice.innerHTML = '€99.99 / Year';
        for (let i = 1; i < billingPeriods.length; i++) {
            billingPeriods[i].innerHTML = 'Billed annually. Save 16%';
        }
    }
}