const mainContent = document.querySelector(".main");

window.onload = () => {
  AOS.init();
  // Initialize slider
  mySwiper.init();
};

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  //form-validation
  const fullname = document.querySelector("#fullName");
  const email = document.querySelector("#email");
  const feedback = document.querySelector("#feedback");
  const mainAlert = document.querySelector(".alert");

  contactForm.addEventListener("submit", (e) => {
    if (fullname.value === "" || email.value === "" || feedback.value === "") {
      mainAlert.innerHTML = "";
      e.preventDefault();
      setTimeout(() => {
        mainAlert.classList.remove("show");
      }, 4000);
      mainAlert.classList.add("show");
      clearInterval();
    }
    if (fullname.value == "") {
      mainAlert.innerHTML = "";
      mainAlert.innerHTML = "Fullname is required";
      return false;
    }
    if (email.value == "") {
      mainAlert.innerHTML = "";
      mainAlert.innerHTML = "Email is required";
      return false;
    }
    if (feedback.value == "") {
      mainAlert.innerHTML = "";
      mainAlert.innerHTML = "Feedback is required";
      e.preventDefault();
      return false;
    }
  });
}

//navigation-bar
const menuControl = document.querySelector(".link-controller");
const navLink = document.querySelector(".nav-links");

menuControl.addEventListener("click", () => {
  navLink.classList.add("active");
});

mainContent.addEventListener("click", () => {
  navLink.classList.remove("active");
});

// smooth-scroll
$('a[href*="#"]').on("click", function (e) {
  e.preventDefault();

  $("html, body").animate(
    {
      scrollTop: $($(this).attr("href")).offset().top,
    },
    800,
    "linear"
  );
});

$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dot: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});

// sticky-nav
window.onscroll = function () {
  myFunction();
};

var header = document.getElementById("header");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

//change-controlller
const controller = document.querySelectorAll(".controller");
const control = document.querySelectorAll(".control");

controller.forEach((pannel, index) => {
  pannel.addEventListener("click", () => {
    for (var i = 0; i < controller.length; i++) {
      controller[i].classList.remove("active");
      control[i].classList.remove("show");
    }
    pannel.classList.add("active");
    control[index].classList.add("show");
  });
});

// Params
var sliderSelector = ".swiper-container",
  options = {
    init: false,
    loop: true,
    speed: 800,
    slidesPerView: 2, // or 'auto'
    // spaceBetween: 10,
    centeredSlides: true,
    effect: "coverflow", // 'cube', 'fade', 'coverflow',
    coverflowEffect: {
      rotate: 50, // Slide rotate in degrees
      stretch: 0, // Stretch space between slides (in px)
      depth: 100, // Depth offset in px (slides translate in Z axis)
      modifier: 1, // Effect multipler
      slideShadows: true, // Enables slides shadows
    },
    grabCursor: true,
    parallax: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1023: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
    // Events
    on: {
      imagesReady: function () {
        this.el.classList.remove("loading");
      },
    },
  };
var mySwiper = new Swiper(sliderSelector, options);

// down-arrow
const downArrow = document.querySelector(".down-arrow");

downArrow.addEventListener("click", () => {
  document.body.style.overflow = "visible";
});
