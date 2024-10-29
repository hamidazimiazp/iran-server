import $ from "jquery";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/fonts.css";
import "../styles/styles.scss";

// get menu items
$.get("http://localhost:3000/menuItems", function (data) {
  data.forEach((item) => {
    $("#green-menu").append(
      `<li class="nav-item ml-3 d-flex align-items-center justify-content-center">
                <a class="nav-link text-secondary" href="#">${item.name}</a>
                <i class="bi bi-chevron-down text-light d-flex align-items-center justify-content-center chevron"></i>
        </li>`
    );
  });
});

// get hot domains
$.get("http://localhost:3000/hotDomains", function (data) {
  data.forEach((item) => {
    let formattedPrice = Number(item.price).toLocaleString();
    $(".hotDomainsSwiper .swiper-wrapper").append(`
      <div class="swiper-slide">
        <a href="#" class="text-five">
          <span>${item.domain}</span>
          <span>${formattedPrice}</span>
        </a>
      </div>
    `);
  });

  new Swiper(".hotDomainsSwiper", {
    slidesPerView: 4,
    centeredSlides: true,
    grabCursor: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    loop: true,
  });
});

// get social media's
$.get("http://localhost:3000/socialMedia", function (data) {
  data.forEach((item) => {
    $(".social-media").append(`
      <li class="ml-2">
        <a href="${item.path}" target="_blank">
          <img
            src="${item.image}"
            alt="${item.title}"
            width="24px"
            height="24px"
          />
        </a>
      </li>
    `);
  });
});

// get plans
$.get("http://localhost:3000/plans", function (data) {
  data.forEach((item) => {
    const optionsList = item.options
      .map((option) => `<li>${option}</li>`)
      .join("");

    $(".plans-container").append(`
      <div class="card ${item.priority === 2 ? "active" : ""}">
        <img
          src="${item.icon}"
          alt="dedicated server"
          width="54.93px"
          height="54.8px"
        />
        <div>
          <h2>${item.title}</h2>
          <span>${item.en_title}</span>
        </div>
        <p>${item.description}</p>
        <ul>
          ${optionsList}
        </ul>
        <a href="${item.path}" class="btn  ${
      item.priority === 2 ? "btn-primary" : "btn-outline-primary"
    }">مشاهده پلن ها</a>
      </div>
    `);
  });
});

// get chart data
$.get("http://localhost:3000/iranServerCustomerChart", function (data) {
  data.forEach((item) => {
    $(".chart-container").append(`
      <div
        class="card-chart d-flex text-center justify-content-center align-items-center flex-column"
      >
        <h4>+ ${item.number}</h4>
        <p class="p-0">${item.title}</p>
      </div>
    `);
  });
});

// comments slider
$.get("http://localhost:3000/customerComments", function (data) {
  data.forEach((item) => {
    $(".commentsSwipper .swiper-wrapper").append(`
      <div class="swiper-slide">
        <div class="comment-conetent">
          <div class="comment-body">
            <p>
            ${item.content}
            </p>
          </div>
          <div
            class="bottom-section d-flex justify-flex-start align-items-center"
          >
            <div
              class="first d-flex justify-content-center align-items-center"
            >
              <div class="avatar">
                <img src="images/image.svg" alt="avatar" />
              </div>
              <div
                class="d-flex justify-content-center align-items-center names"
              >
                <h2>${item.name}</h2>
                <p>${item.task}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  let nn = new Swiper(".commentsSwipper", {
    slidesPerView: 2,
    spaceBetween: 50,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    speed: 5000,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });
});
// get customers icon
let loadedCount = 0;
const batchSize = 6;

function loadImages() {
  $.get("http://localhost:3000/customer_icons", function (data) {
    const imagesToLoad = data.slice(loadedCount, loadedCount + batchSize);

    imagesToLoad.forEach((item) => {
      $(".customers-icon .customers-icon-wrapper").append(`
        <div><img src="${item.image}" width="149px" height="75px" /></div>
      `);
    });

    loadedCount += batchSize;

    if (loadedCount >= data.length) {
      $("#loadMoreBtn").hide();
    }
  });
}

loadImages();
loadImages();
loadImages();

$("#loadMoreBtn").on("click", function () {
  loadImages();
  loadImages();
});
