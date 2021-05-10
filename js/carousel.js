class Carousel {

    constructor(containerID = '#carousel', slideID = '.slide') {
        this.container = document.querySelector(containerID);
        this.slides = this.container.querySelectorAll(slideID);

        this.interval = 2000;
    }

    _initProps() {
        this.CODE_SPACE = "Space";
        this.CODE_ARROW_LEFT = "ArrowLeft";
        this.CODE_ARROW_RIGHT = "ArrowRight";

        this.FA_PAUSE = '<i class="fas fa-pause"></i>';
        this.FA_PLAY = '<i class="fas fa-pause"></i>';
        this.FA_PREV = '<i class="fas fa-chevron-left"></i>';
        this.FA_NEXT = '<i class="fas fa-chevron-right"></i>';

        this.slidesCount = this.slides.length;
        this.currentSlide = 0;
        this.isPlaying = true;
        this.timerID = null;
    }

    _initControls() {

        let controls = document.createElement('div');
        const PAUSE = `<div id="pause" class="control">${this.FA_PAUSE}</div>`;
        const PREV = `<div id="prev" class="control">${this.FA_PREV}</div>`;
        const NEXT = `<div id="next" class="control">${this.FA_NEXT}</div>`;

        controls.setAttribute('class', 'controls');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.container.appendChild(controls);
        this.pauseBtn = this.container.querySelector('#pause');
        this.nextBtn = this.container.querySelector('#next');
        this.prevBtn = this.container.querySelector('#prev');

    }

    _initIndicators() {

        const indicators = document.createElement('div');
        indicators.setAttribute('class', 'indicators');

        for (let i = 0, n = this.slidesCount; i < n; i++) {
            const indicator = document.createElement('div');
            indicator.setAttribute('class', 'indicator');
            indicator.dataset.slideTo = `${i}`;
            i === 0 && indicator.classList.add('active');
            indicators.appendChild(indicator);
        }

        this.container.appendChild(indicators);
        this.indicatorsContainer = this.container.querySelector('.indicators');
        this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
    }

    _initListeners() {
        this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
        this.prevBtn.addEventListener("click", this.prev.bind(this));
        this.nextBtn.addEventListener("click", this.next.bind(this));
        this.indicatorsContainer.addEventListener("click", this.indicate.bind(this));
        document.addEventListener("keydown", this.pressKey.bind(this));
    }

    goToSlide(n) {
        this.slides[this.currentSlide].classList.toggle("active");
        this.indicators[this.currentSlide].classList.toggle("active");
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle("active");
        this.indicators[this.currentSlide].classList.toggle("active");
    }

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    prev() {
        this.pause();
        this.prevSlide();
    }

    next() {
        this.pause();
        this.nextSlide();
    }

    pause() {
        if (this.isPlaying) {
            this.pauseBtn.innerHTML = this.FA_PLAY;
            this.isPlaying = false;
            clearInterval(this.timerID);
        }
    }

    play() {
        this.pauseBtn.innerHTML = this.FA_PAUSE;
        this.isPlaying = true;
        this.timerID = setInterval(() => this.nextSlide(), this.interval);
    }

    pausePlay() {
        if (this.isPlaying) this.pause();
        else this.play();
    }

    indicate(e) {
        const target = e.target;
        if (target && target.classList.contains('indicator')) {
            this.pause();
            this.goToSlide(+target.dataset.slideTo);
        }
    }

    pressKey(e) {
        if (e.code === this.CODE_ARROW_LEFT) this.prev();
        if (e.code === this.CODE_ARROW_RIGHT) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    }

    init() {
        this._initProps();
        this._initIndicators();
        this._initControls();
        this._initListeners();
        this.timerID = setInterval(() => this.nextSlide(), this.interval);
    }
}



class SwipeCarousel extends Carousel {
    _initListeners() {
        super._initListeners();
        this.container.addEventListener("touchstart", this.swipeStart.bind(this));
        this.container.addEventListener("touchend", this.swipeEnd.bind(this));
    }


    swipeStart(e) {
        this.swipeStartX = e.changedTouches[0].clientX;
    }

    swipeEnd(e) {
        this.swipeEndX = e.changedTouches[0].clientX;
        this.swipeStartX - this.swipeEndX > 100 && this.prev();
        this.swipeStartX - this.swipeEndX < -100 && this.next();
    }

}