const slides = document.querySelectorAll(".slide");
const indicatorsContainer = document.querySelector("#indicators-container");
const indicators = document.querySelectorAll(".indicator");
const pauseBtn = document.querySelector("#pause");
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');


let slidesCount = slides.length;
let currentSlide = 0;
let isPlaying = true;
let timerID = null;


function goToSlide(n) {
    slides[currentSlide].classList.toggle("active");
    indicators[currentSlide].classList.toggle("active");
    currentSlide = (n + slidesCount) % slidesCount;
    slides[currentSlide].classList.toggle("active");
    indicators[currentSlide].classList.toggle("active");
}

const nextSlide = () => goToSlide(currentSlide + 1);

const prevSlide = () => goToSlide(currentSlide - 1);

function prev() {
    pause();
    prevSlide();
}

function next() {
    pause();
    nextSlide();
}

function pause() {
    pauseBtn.innerHTML = "Play";
    isPlaying = false;
    clearInterval(timerID); //ставим на паузу, стираем интервал
}

function play() {
    pauseBtn.innerHTML = "Pause";
    isPlaying = true;
    timerID = setInterval(nextSlide, 1000);
}

function indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
        pause();
        goToSlide(+target.dataset.slideTo);
    }
}


const pausePlay = () => isPlaying ? pause() : play();

pauseBtn.addEventListener("click", pausePlay);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
indicatorsContainer.addEventListener("click", indicate);

timerID = setInterval(nextSlide, 1000);