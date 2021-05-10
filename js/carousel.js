function Carousel() {
    this.container = document.querySelector("#carousel");
    this.slides = this.container.querySelectorAll(".slide");
    this.indicatorsContainer = this.container.querySelector("#indicators-container");
    this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    this.pauseBtn = this.container.querySelector("#pause");
    this.nextBtn = this.container.querySelector('#next');
    this.prevBtn = this.container.querySelector('#prev');

    this.CODE_SPACE = "Space";
    this.CODE_ARROW_LEFT = "ArrowLeft";
    this.CODE_ARROW_RIGHT = "ArrowRight";

    this.slidesCount = this.slides.length;
    this.currentSlide = 0;
    this.isPlaying = true;
    this.timerID = null;
    this.swipeStartX = null;
    this.swipeEndX = null;

}

Carousel.prototype = {

    _initListeners() {
        this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
        this.prevBtn.addEventListener("click", this.prev.bind(this));
        this.nextBtn.addEventListener("click", this.next.bind(this));
        this.indicatorsContainer.addEventListener("click", this.indicate.bind(this));
        document.addEventListener("keydown", this.pressKey.bind(this));
    },

    goToSlide(n) {
        this.slides[this.currentSlide].classList.toggle("active");
        this.indicators[this.currentSlide].classList.toggle("active");
        this.currentSlide = (n + this.slidesCount) % this.slidesCount;
        this.slides[this.currentSlide].classList.toggle("active");
        this.indicators[this.currentSlide].classList.toggle("active");
    },

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    },

    prev() {
        this.pause();
        this.prevSlide();
    },

    next() {
        this.pause();
        this.nextSlide();
    },

    pause() {
        if (this.isPlaying) {
            this.pauseBtn.innerHTML = "Play";
            this.isPlaying = false;
            clearInterval(this.timerID);
        }
    },

    play() {
        this.pauseBtn.innerHTML = "Pause";
        this.isPlaying = true;
        this.timerID = setInterval(playafter = () => this.nextSlide(), 1000);
    },

    pausePlay() {
        if (this.isPlaying) this.pause();
        else this.play();
    },

    indicate(e) {
        const target = e.target;
        if (target && target.classList.contains('indicator')) {
            this.pause();
            this.goToSlide(+target.dataset.slideTo);
        }
    },

    pressKey(e) {
        if (e.code === this.CODE_ARROW_LEFT) this.prev();
        if (e.code === this.CODE_ARROW_RIGHT) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },


    init() {
        this._initListeners();
        this.timerID = setInterval(handler = () => this.nextSlide(), 1000);
    }
}

function SwipeCarousel() {
    Carousel.apply(this, arguments);
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype.swipeStart = function(e) {
    this.swipeStartX = e.changedTouches[0].clientX;
};

SwipeCarousel.prototype.swipeEnd = function(e) {
    this.swipeEndX = e.changedTouches[0].clientX;
    this.swipeStartX - this.swipeEndX > 100 && this.prev();
    this.swipeStartX - this.swipeEndX < -100 && this.next();
};

SwipeCarousel.prototype._initListeners = function() {
    Carousel.prototype._initListeners.apply(this);
    this.container.addEventListener("touchstart", this.swipeStart.bind(this));
    this.container.addEventListener("touchend", this.swipeEnd.bind(this));
};