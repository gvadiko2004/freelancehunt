document.addEventListener("DOMContentLoaded", function() {
  var images = document.querySelectorAll("img");
  images.forEach(function(img) {
    img.setAttribute("loading", "lazy");
  });
});



const form = document.getElementById('my-form')
const submit = document.getElementById('submit')
submit.addEventListener('click', e => {
  e.preventDefault()
  const formData = {}
  for (let i = 0; i < form.elements.length; i++) {
    const field = form.elements[i]
    if (field.type !== 'submit' && field.value !== undefined) {
      formData[field.id] = field.value.trim()
    }
  }
  for (const key in formData) {
    const emptyField = document.getElementById(key)
    if (formData.hasOwnProperty(key) && formData[key] === '') {
      emptyField.classList.add('error')
    } else {
      emptyField.classList.remove('error')
    }
  }
})

// btn-menu
const headerLink = document.querySelectorAll('.header__list-link');
const btnReset = document.querySelectorAll('.btn-reset');
const btnMenu = document.querySelector('.btn-menu');
const btnMenuClose = document.querySelector('.btn-menu-close');
const headerList = document.querySelector('.header__list');
const formSection = document.querySelector('.form-section');

headerLink.forEach((link) => {
  link.addEventListener('click', function () {
    headerList.classList.remove('active');
  });
});

btnReset.forEach((btn) => {
  btn.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    formSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the form section
    headerList.classList.remove('active');
  });
});

btnMenu.addEventListener('click', function () {
  headerList.classList.add('active');
});

btnMenuClose.addEventListener('click', function () {
  headerList.classList.remove('active');
});

