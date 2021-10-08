// dastlab ma'lumotlarni olib kelish
// drop qismini ishlatish
// region filterlash
// search qismini ishlatish
// dark-light rejimini ishga tushirish
// back button tugmasini ishlatish
let countryElement = document.querySelector('.countries');
const dropDownCon = document.querySelector('.dropDownCon')
const dropElement = document.querySelector('.drop')
const region = document.querySelectorAll('.region')
const search = document.querySelector('.search')
const toggle = document.querySelector('.toggle')
const moon = document.querySelector('.moon')
const saralash = document.querySelector('#saralash')
async function getCountry() {
    const url = await fetch('https://restcountries.com/v2/all');
    const res = await url.json();
    // console.log(res);
    // showCountry(res);
    res.forEach(element => {
        showCountry(element);
    });
}
getCountry();

function showCountry(data) {
    // console.log(data.capital);
    const country = document.createElement('div');
    country.classList.add('country');
    country.innerHTML = `
    <div class="country-img">
                <img src="${data.flags["svg"]}" alt="">
            </div>
            <div class="country-info">
                <h5 class="countryName">${data.name}</h5>
                <p class="regionName"><strong>Region:</strong> ${data.region}</p>
                <p><strong>Population:</strong> ${data.population}</p>
                <p><strong>Capital:</strong> ${data.capital}</p>
    </div>`;
    countryElement.appendChild(country);
    country.addEventListener('click', () => {
        showCountryDetail(data)
    })

}
dropDownCon.addEventListener('click', () => {
    dropElement.classList.toggle('showDropDown')
})
const regionName = document.getElementsByClassName('regionName');
const countryName = document.getElementsByClassName('countryName');
region.forEach(element => {
    element.addEventListener('click', () => {
        console.log(element.innerText);
        saralash.innerText = element.innerText;
        Array.from(regionName).forEach(elem => {
            console.log(elem.innerText);

            if (elem.innerHTML.includes(element.innerText) || element.innerText == 'All') {
                elem.parentElement.parentElement.style.display = 'grid'
            }
            else {
                elem.parentElement.parentElement.style.display = 'none'
            }
        })
    })
})

search.addEventListener('input', () => {
    // console.log(search.value);
    Array.from(countryName).forEach(elem => {
        // console.log(elem.innerText)
        if (elem.innerText.toLowerCase().includes(search.value.toLocaleLowerCase())) {
            elem.parentElement.parentElement.style.display = 'grid'
        }
        else {
            elem.parentElement.parentElement.style.display = 'none'
        }
    })
})

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    moon.classList.toggle('fas')
})

const countryModal = document.querySelector('.countryModal');
function showCountryDetail(data) {
    countryModal.classList.toggle('show');
    countryModal.innerHTML = `
    <button class="back">Back</button>
        <div class="modal">
            <div class="leftModal">
                <img src="${data.flags['svg']}" alt="">
            </div>
            <div class="rightModal">
                <h1>${data.name}</h1>
                <div class="modalInfo">
                    <div class="innerLeft inner">
                        <p class="regionName"><strong>Region:</strong> ${data.region}</p>
                        <p><strong>Sub Region:</strong> ${data.subregion}</p>
                        <p><strong>Capital:</strong> ${data.capital}</p>
                        <p><strong>Area:</strong> ${data.area}</p>
                    </div>
                    <div class="innerRight inner">
                        <p class="countryName"><strong>Population:</strong> ${data.population}</p>
                        <p><strong>TopLevelDomain:</strong> ${data.topLevelDomain}</p>
                        <p><strong>callingCodes:</strong> ${data.callingCodes}</p>
                        <p><strong>nativeName:</strong> ${data.nativeName}</p>
                    </div>
                </div>
            </div>
        </div>`;
    const back = document.querySelector('.back')
    back.addEventListener('click', () => {
        console.log('clicked');
        countryModal.classList.toggle('show');
    })
}




