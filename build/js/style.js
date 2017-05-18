/* Start - Menu bar setting */
document.getElementById("menu__icon--mobile").onclick = function() {
  var B_bar_mobile = document.getElementById("menu__list");
  var B_bar_mobileicon = document.getElementById("menu__icon--mobile");

  if (B_bar_mobile.classList.contains('open')) {
    B_bar_mobile.classList.remove('open');
    B_bar_mobileicon.classList.remove('open');
  } else {
    B_bar_mobileicon.classList.add('open');
    B_bar_mobile.classList.add('open');
  }
}

function check_width() {
  var width = document.documentElement.clientWidth;
  if (width < 750) {
    document.getElementById("menu__list").className = document.getElementById("menu__list").className.replace(new RegExp('(?:^|\\s)' + 'open' + '(?:\\s|$)'), ' ');
    document.getElementById("menu__icon--mobile").className = document.getElementById("menu__icon--mobile").className.replace(new RegExp('(?:^|\\s)' + 'open' + '(?:\\s|$)'), ' ');
  } else {
    document.getElementById("menu__list").classList.add('open');
    document.getElementById("menu__icon--mobile").classList.add('open');
  }
}

window.addEventListener('DOMContentLoaded', check_width, false);
window.addEventListener('resize', check_width);
/* End - Menu bar setting */

/* Start - Scroll event */
/*Reference: https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/*/
function scrollIt(destination) {
  var duration = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
  var easing = arguments.length <= 2 || arguments[2] === undefined ? 'linear' : arguments[2];
  var callback = arguments[3];

  // Predefine list of available timing functions
  // If you need more, tween js is full of great examples
  // https://github.com/tweenjs/tween.js/blob/master/src/Tween.js#L421-L737
  var easings = {
    easeOutQuad: function easeOutQuad(t) {
      return t * (2 - t);
    }
  };

  // Store initial position of a window and time
  // If performance is not available in your browser
  // It will fallback to new Date().getTime() - thanks IE < 10
  var start = window.pageYOffset;
  var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  // const startTime = typeof(window.performance['now']) == 'function' ? performance.now() : new Date().getTime();

  // Take height of window and document to sesolve max scrollable value
  // Prevent requestAnimationFrame() from scrolling below maximum scollable value
  // Resolve destination type (node or number)
  var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  // If requestAnimationFrame is not supported
  // Move window to destination position and trigger callback function
  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  // function resolves position of a window and moves to exact amount of pixels
  // Resolved by calculating delta and timing function choosen by user
  function scroll() {
    var now = 'now' in window.performance ? performance.now() : new Date().getTime();
    var time = Math.min(1, (now - startTime) / duration);
    var timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));

    // Stop requesting animation when window reached its destination
    // And run a callback function
    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    // If window still needs to scroll to reach destination
    // Request another scroll invokation
    requestAnimationFrame(scroll);
  }

  // Invoke scroll and sequential requestAnimationFrame
  scroll();
}
/* End - Scroll event */

/* Start - Words */
/*Reference by: http://codepen.io/danielgroen/pen/VeRPOq */
document.addEventListener('DOMContentLoaded',function(event){
  // array with texts to type in typewriter
  var dataText = [ "am a Web Programmer.", "like coding."];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < (text.length)) {
      // add next character to h1
     document.getElementById("words").innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 1500);
    }
  }
  // start a typewriter animation for a text in the dataText array
   function StartTextAnimation(i) {
     if (typeof dataText[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(0);
        }, 1500);
     }
     // check if dataText[i] exists
    else if (i < dataText[i].length) {
      // text exists! start typewriter animation
     typeWriter(dataText[i], 0, function(){
       // after callback (and whole text has been animated), start next text
       StartTextAnimation(i + 1);
     });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});
/* End - Words */
