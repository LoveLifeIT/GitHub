$('.card-carousel').owlCarousel({
    margin: 15,
    loop: false,
    autoWidth: true,
    nav: true,
    responsive: {
        640: {
            items: 1
        },
        1024: {
            items: 2
        },
    },
    navElement: 'div class="carousel-arrow"',
    navText: ['<img src="/img/arrow.svg" alt="Previous" />', '<img src="/img/arrow.svg" alt="Next" />']
})

$('.bio-carousel').owlCarousel({
    loop: false,
    autoWidth: true,
    nav: true,
    responsive: {
        640: {
            items: 1
        },
        1024: {
            items: 2
        },
    },
    navElement: 'div class="carousel-arrow"',
    navText: ['<img src="/img/arrow.svg" alt="Previous" />', '<img src="/img/arrow.svg" alt="Next" />']
})

$('.modal-carousel')?.owlCarousel({
    margin: 15,
    loop: false,
    autoWidth: true,
    nav: true,
    responsive: {
        640: {
            items: 1
        },
        1024: {
            items: 2
        },
    },
    navElement: 'div class="carousel-arrow"',
    navText: ['<img src="/img/arrow.svg" alt="Previous" />', '<img src="/img/arrow.svg" alt="Next" />']
})

$('.gallery-carousel')?.owlCarousel({
    loop: true,
    autoWidth: true,
    nav: true,
    navElement: 'div class="carousel-arrow"',
    navText: ['<img src="/img/arrow.svg" alt="Previous" />', '<img src="/img/arrow.svg" alt="Next" />']
})

function isAndroid() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /android/.test(userAgent);
}

function isIOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
}

document.addEventListener('DOMContentLoaded', function () {
    let showOnDesktop = document.querySelectorAll('[data-show-on-desktop]') || [];
    let showOnIos = document.querySelectorAll('[data-show-on-ios]') || [];
    let showOnAndroid = document.querySelectorAll('[data-show-on-android]') || [];
    if (isIOS()) {
        showOnDesktop.forEach((el) => el.style.display = 'none');
        showOnIos.forEach((el) => el.style.display = 'block');
        showOnAndroid.forEach((el) => el.style.display = 'none');
    } else if (isAndroid()) {
        showOnDesktop.forEach((el) => el.style.display = 'none');
        showOnIos.forEach((el) => el.style.display = 'none');
        showOnAndroid.forEach((el) => el.style.display = 'block');
    } else {
        showOnDesktop.forEach((el) => el.style.display = 'block');
        showOnIos.forEach((el) => el.style.display = 'none');
        showOnAndroid.forEach((el) => el.style.display = 'none');
    }
})

function goto(url, target = '_self') {
    window.open(url, target);
}

function openModal(selector = '.owl-carousel', position = 0) {
    let fullSelector = selector + ' .owl-carousel';

    let element = document.querySelector(selector);
    element.classList.toggle('active');
    $(fullSelector).trigger('to.owl.carousel', [position, 0]);
    noScroll(true)
}

function closeModal() {
    document.querySelectorAll('.modal-cards').forEach((modals, idx) => {
        modals.classList.remove('active')
    });

    noScroll(false)
}

function noScroll(toggle = true) {
    (toggle) ?
        document.querySelector('body')?.classList?.add('no-scroll') :
        document.querySelector('body')?.classList?.remove('no-scroll');
}

function addTargetToLinks(selector, target = '_blank') {
    const parentElement = document.querySelector(selector);
    if (!parentElement) return;
    const links = parentElement.querySelectorAll('a[rel="noopener noreferrer"]');
    links.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', target);
        }
    });
}

function triggerAdTheorentActivity(adTheorentActivityId, id = (Math.random() * 10000000000000)) {
    try {
        if(!adTheorentActivityId) return;
        if(!isTrackingAllowed()) return;
        let p_url = encodeURIComponent(window.location.href);
        let px = `https://px.adentifi.com/Pixels?a_id=${adTheorentActivityId};uq=${id};p_url=${p_url}`;
        let x = document.createElement('IMG');
        x.setAttribute('src', px);
        x.setAttribute('width', '1');
        x.setAttribute('height', '1');
        x.setAttribute('style', 'display:none');
        document.body.appendChild(x);
        console.log('AdTheorent Activity submitted', adTheorentActivityId)
    } catch (err) {
        console.error('Failed to submit AdTheorant Activity', err)
    }
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function isTrackingAllowed() {
    const consent = getCookie('cookieConsent');
    let hasConsent = (consent === 'accepted');
    console.log('isTrackingAllowed', hasConsent);
    return hasConsent;
}