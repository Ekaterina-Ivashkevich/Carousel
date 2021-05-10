/*(function() {
    const container = document.querySelector("#carousel");
    const slides = container.querySelectorAll(".slide");
    const indicatorsContainer = container.querySelector("#indicators-container");
    const indicators = indicatorsContainer.querySelectorAll(".indicator");
    const pauseBtn = container.querySelector("#pause");
    const nextBtn = container.querySelector('#next');
    const prevBtn = container.querySelector('#prev');

    const CODE_SPACE = "Space";
    const CODE_ARROW_LEFT = "ArrowLeft";
    const CODE_ARROW_RIGHT = "ArrowRight";


    let slidesCount = slides.length;
    let currentSlide = 0;
    let isPlaying = true;
    let timerID = null;
    let swipeStartX = null;
    let swipeEndX = null;


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

    function pressKey(e) {
        console.log(e);
        if (e.code === CODE_ARROW_LEFT) prev();
        if (e.code === CODE_ARROW_RIGHT) next();
        if (e.code === CODE_SPACE) pausePlay();
    }

    const swipeStart = (e) => swipeStartX = e.changedTouches[0].clientX;

    function swipeEnd(e) {
        swipeEndX = e.changedTouches[0].clientX;
        swipeStartX - swipeEndX > 100 && prev();
        swipeStartX - swipeEndX < -100 && next();
    }


    const pausePlay = () => isPlaying ? pause() : play();

    function initListeners() {
        pauseBtn.addEventListener("click", pausePlay);
        prevBtn.addEventListener("click", prev);
        nextBtn.addEventListener("click", next);
        indicatorsContainer.addEventListener("click", indicate);
        document.addEventListener("keydown", pressKey);
        container.addEventListener("touchstart", swipeStart);
        container.addEventListener("touchend", swipeEnd);
    }

    function init() {
        initListeners();
        timerID = setInterval(nextSlide, 2000);
    }

    init();

}());*/

const carousel = new SwipeCarousel();
carousel.init();