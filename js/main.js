'use strict'
window.addEventListener('load', () => {
    const btn = document.querySelector('.btn');
    const modal = document.querySelector('.modal');
    const btn_icon = document.querySelector('.btn__icon');
    const wrapper = document.querySelector('.wrapper');
    const quote = document.querySelector("blockquote p");
    const cite = document.querySelector("blockquote cite");
    const reload = document.querySelector('.reload');
    const clock = document.querySelector('.watch__clock');
    const greet = document.querySelector('.greeting__greet');
    const icon = document.querySelector('.greeting__icon img');
    const container = document.querySelector('#container');
    const timezone = document.querySelector('#timezone');
    const utc = document.querySelector('.watch__utc');
    const zone = document.querySelector('#zone');
    const dayY = document.querySelector('#dayY');
    const dayW = document.querySelector('#dayW');
    const week = document.querySelector('#week');
    let sun = './assets/desktop/jeremy-bishop-dvACrXUExLs-unsplash.jpg';
    let moon = './assets/desktop/jeremy-bishop-dvACrXUExLs-unsplash(night).jpg';
    if (screen.width > 425 && screen.width < 1081 ) {
        sun = './assets/tablet/jeremy-bishop-dvACrXUExLs-unsplash1.jpg';
        moon = './assets/tablet/jeremy-bishop-dvACrXUExLs-unsplash1(night).jpg';
    } else {
        if (screen.width <= 425) {
            sun = './assets/mobile/jeremy-bishop-dvACrXUExLs-unsplash2.jpg';
            moon = './assets/mobile/jeremy-bishop-dvACrXUExLs-unsplash2(night).jpg';
        }
    }

    btn.addEventListener('click', () => {
        btn_icon.classList.toggle('btn__icon--rotate');
        modal.classList.toggle('modal--translate');
        wrapper.classList.toggle('wrapper--translate');
    });

    reload.addEventListener('click', updateQuote);

    async function updateQuote() {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();
        if (response.ok) {
            quote.textContent = data.content;
            cite.textContent = data.author;
        } else {
            quote.textContent = "An error occured";
            console.log(data);
        }
    }
    async function getIP() {
        const response = await fetch("https://freegeoip.app/json/");
        const data = await response.json();
        if (response.ok) {
            timezone.textContent = data.country_name;
            updateTimezone(data.ip);
        } else {
            quote.textContent = "An error occured";
            console.log(data);
        }
    }
    async function updateTimezone(ip) {
        const response = await fetch("http://worldtimeapi.org/api/ip/:ipv6/" + ip);
        const data = await response.json();
        if (response.ok) {
            utc.textContent = data.abbreviation;
            zone.textContent = data.timezone;
            dayY.textContent = data.day_of_year;
            dayW.textContent = data.day_of_week;
            week.textContent = data.week_number;

        } else {
            quote.textContent = "An error occured";
            console.log(data);
        }
    }
    function watchClock() {
        var fechahora = new Date();
        var hora = fechahora.getHours();
        var minuto = fechahora.getMinutes();
        if ((hora == 12 || hora == 18) && minuto == 0 && fechahora.getSeconds() == 0) {
            console.log('hola')
            changeGreet();
        }
        hora = (hora < 10) ? "0" + hora : hora;
        minuto = (minuto < 10) ? "0" + minuto : minuto;
        var tiempo = hora + ":" + minuto;
        clock.innerHTML = tiempo;
        setTimeout(watchClock, 1000);
    }
    function changeGreet() {
        var fechahora = new Date();
        var hora = fechahora.getHours();
        if (hora >= 5 && hora < 12) {
            greet.innerHTML = "good morning";
            icon.src = './assets/desktop/icon-sun.svg';
            modal.classList.toggle('modal-nigth');
            container.style.backgroundImage = `url("${sun}")`
        } else if (hora >= 12 && hora < 18) {
            greet.innerHTML = "good afternoon";
        } else {
            greet.innerHTML = "good evening";
            icon.src = './assets/desktop/icon-moon.svg';
            modal.classList.toggle('modal-nigth');
            console.log(moon)
            container.style.backgroundImage = `url("${moon}")`
        }
    }

    updateQuote();
    watchClock();
    changeGreet();
    getIP();
})