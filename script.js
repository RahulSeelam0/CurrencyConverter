const left_dropdown = document.getElementById('left_selector');
const right_dropdown = document.getElementById('right_selector');
const swap = document.getElementById('convert');
const input = document.getElementById('input');
const output = document.getElementById('output');
const From = document.getElementById('from');
const To = document.getElementById('to');
const r3 = document.getElementById('r3');

function generateOptions(selectedCountry) {
    let options = "";
    for (const [currencyCode, countryCode] of Object.entries(countryList)) {
        if (countryCode === selectedCountry) {
            options += `<option selected value="${currencyCode}">${countryCode}</option>`;
        } else {
            options += `<option value="${currencyCode}">${countryCode}</option>`;
        }
    }
    return options;
}

function insertFlag(flagElementId, countryCode) {
    const flagElement = document.getElementById(flagElementId);
    flagElement.innerHTML = `<img src="https://flagsapi.com/${countryCode}/shiny/32.png">`;
}

function updateFlagFromDropdown(dropdown, flagElementId) {
    const selectedCurrencyCode = dropdown.value;
    const countryCode = countryList[selectedCurrencyCode];
    insertFlag(flagElementId, countryCode);
}

// Set initial options and flags
left_dropdown.innerHTML = generateOptions("IN");
right_dropdown.innerHTML = generateOptions("US");
updateFlagFromDropdown(left_dropdown, "left_flag");
updateFlagFromDropdown(right_dropdown, "right_flag");

// Add event listeners to update flags dynamically
left_dropdown.addEventListener('change', () => {
    updateFlagFromDropdown(left_dropdown, "left_flag");
    console.log(left_dropdown.value);

});
right_dropdown.addEventListener('change', () => {
    updateFlagFromDropdown(right_dropdown, "right_flag");
    console.log(right_dropdown.value);
});

convertor.addEventListener('click', () => {
    getConvertedValue(input.value);

});

swap.addEventListener('click', () => {
    const temp = left_dropdown.value;
    left_dropdown.value = right_dropdown.value;
    right_dropdown.value = temp;

    // Update flags after swapping
    updateFlagFromDropdown(left_dropdown, 'left_flag');
    updateFlagFromDropdown(right_dropdown, 'right_flag');
    resetValues();
});

function resetValues() {
    input.value = "";
    output.value = "";
    From.innerText = "";
    To.innerText = "";
    r3.innerText = "";
}

async function getConvertedValue(input) {
    const apiKey = config.apiKey;
    const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const leftcon = left_dropdown.value;
            const rightcon = right_dropdown.value;
            r3.innerText = `The data was last updated on : ${data.date}`;

            calculateRate(input, data.rates[leftcon], data.rates[rightcon]);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

function calculateRate(input, from, to) {
    let fromSingualr = from / from;
    let toSingular = to / from;

    From.innerText = `${fromSingualr}  ${left_dropdown.value}`;
    To.innerText = `${(toSingular.toFixed(5))}  ${right_dropdown.value}`;
    displayConversion(input, toSingular);
}

function displayConversion(input, b) {
    output.value = (b * input).toFixed(5);
}





