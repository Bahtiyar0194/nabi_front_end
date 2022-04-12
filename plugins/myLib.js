let VueScrollTo = require('vue-scrollto');
let options = {
  easing: 'ease-in',
  lazy: false,
  offset: -100,
  force: true,
  x: true,
  y: true
}

const myLib = {
  name: 'myLib',
  scrollToElem(elem) {
    let element = document.getElementById(elem);
    element.classList.add("invalid");
    setTimeout(function () {
      element.classList.remove("invalid");
    }, 2500);
    VueScrollTo.scrollTo("#" + elem + "", 300, options)
    return;
  },
  scrollTo(elem) {
    VueScrollTo.scrollTo("#" + elem + "", 300, options)
    return;
  }
}

export default ({ app }, inject) => {
  inject('myLib', myLib)
}