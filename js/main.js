const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const search = $('.weather__input')


const city = $('.name__city')
const country = $('.name__country')
const time = $('.contact__time')
const shortDesc = $('.contact__short-desc')
const value = $('.temperature__value')
const moreDesc = $('.contact__more-desc')
const visibility = $('.visibility span')
const wind = $('.wind span')
const cloud = $('.cloud span')
const body = $('body')
// const returnContact = $('.contact')


function changeWeatherUI(data) {
    $('.contact').style.display = ''

    if (data.cod == 200) {
        city.innerHTML = data.name
        country.innerHTML = data.sys.country
        visibility.innerHTML = data.visibility + ` (m)`
        wind.innerHTML = data.wind.speed + ` (m/s)`
        cloud.innerHTML = data.clouds.all + ` (%)`
        shortDesc.innerHTML = data.weather[0] ? data.weather[0].main : 'Clouds'
        time.innerHTML = new Date().toLocaleString('vi')

        const temp = Math.round(data.main.temp - 273.15)
        value.innerHTML = temp

        temp <= 10 ? body.setAttribute('class', 'cool')
            : temp <= 12 ? body.setAttribute('class', 'spring')
                : temp <= 20 ? body.setAttribute('class', 'autumn')
                    : body.setAttribute('class', 'summer')

    } else {
        $('.contact').style.display = 'none'
    }

}



search.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        let capitaSearch = (e.target.value.trim())
        getWeather(capitaSearch)
        e.target.value = ''
    }
})

async function getWeather(value) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=d77edaa4050d6f2c05773a1708a423cb`
    let data = await fetch(apiUrl)
        .then(response => response.json())

    changeWeatherUI(data)
}

getWeather('Hanoi')