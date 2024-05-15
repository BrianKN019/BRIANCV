$(document).ready(function() {
  //  Utils
  (function prepareMenu() {
    var menu = document.getElementById("menu");
    menu.onclick = function(event) {
      styles = getComputedStyle(event.target.parentNode);
      transform = styles.getPropertyValue("transform");

      var values = transform.split('(')[1].split(')')[0].split(',');
      var a = values[0];
      var b = values[1];
      var c = values[2];
      var d = values[3];

      var scale = Math.sqrt(a * a + b * b);
      var sin = b / scale;
      var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
      log(angle);
      
      var rotateAngle = 60 - angle;
      menu.style.transform = "rotate(" + rotateAngle + "deg)";
    };
  })();
  function log(msg) {
    console.warn('\n start: ••••• 🔥 •••••');
    console.log(msg);
    console.warn(' end: ¶¶¶¶¶ 💩 ¶¶¶¶¶ \n');
  };
  
  // Application state/models
  var state = {
    currSection: 'home'
  };
  Object.defineProperty(state, 'active', {
    set: function(val) {
      this.currSection = val;
     
      $('#menu li a')
        .removeClass('active-menu')
        .filter(function(index) {
          return $(this).parent().attr('class') === val;
         })
        .addClass('active-menu');

      $('#quick-menu .quick-btn')
        .removeClass('active-main')
        .filter(function() {
          return $(this).attr("for") === val;
        })
        .addClass('active-main');
    },
    get: function() {
      return this.currSection;
    },
    enumerable: true,
    configurable: true
  });
  
  // Vendor initialization (fullpage.js, typed.js)
  var emulateTyping = function(options) {
    if (typeof options !== "object") 
      throw new Error('options must be an object');

    var typedStrings = "";
    if (options.hasOwnProperty('typedStrings')) 
      typedStrings = options['typedStrings'];
    
    $('#fullpage .description').hide()
    $("#fullpage .typed-element").typed({
      strings: typedStrings,
      typeSpeed: 20,
      backSpeed: 20,
      startDelay: 0,
      backDelay: 500,
      shuffle: false,                     // shuffle the strings
      loop: false,
      // loopCount: false,                   // false = infinite
      showCursor: true,
      cursorChar: "🁢",
      contentType: 'html',                 // or 'text'
      callback: function() {              // call when done 
        $('#fullpage .typed-element').hide();
        $('#fullpage .typed-cursor').hide();
        $('#fullpage .description').show();
      }
    });
  };  
  $('#fullpage').fullpage({
    anchors: [
      "objective", "work", "education", 
      "skills", "projects", "random"
    ],
    onLeave: function(idx, nIdx, direction) {
      // log('do some computation on current screen');
    },
    afterLoad: function(anchorLink, idx) {
      log("first loaded!");
      state.active = "work";
      
      //  rotate circle menu
      var menu = document.getElementById('menu'),
          angle = idx - 1 <= 3 ? 60*(idx - 1)  :  (60*(idx - 1)  - 360),
          rotateAngle = 60 - angle;
      menu.style.transform = "rotate(" + rotateAngle + "deg)";

      //  reset prev/next button state
      var currIdx = idx;
      $('#main .btn').show();
      if (currIdx === 1) {
        $('#main .upper').hide();
      } else if (currIdx === 6) {
        $('#main .lower').hide();
      }
      $('#main').hover(function mouseIn() {
        $('.btn', this).show();
        if (currIdx === 1) {
          $('#main .upper').hide();
        } else if (currIdx === 6) {
          $('#main .lower').hide();
        }
      }, function mouseOut() {
        $('.btn', this).hide();
      });
    }
  });
  emulateTyping({
    typedStrings: [
      "To be rather <strong>simple</strong>",
      "I promise <strong>NOT</strong> to pull down the <strong>average</strong> <i>IQ</i> of my team",
      "Oh, wait, just kidding ヽ(´▽`)/  ............."
    ],
  });

  // Event handlers
  $('#quick-menu label').on('click', function(e) {
    var targetSection = $(this).attr('for').trim();
    $.fn.fullpage.moveTo(targetSection);
  });
  $('#main .upper').on('click', function(e) {
    $.fn.fullpage.moveSectionUp();
  });
  $('#main .lower').on('click', function(e) {                               $.fn.fullpage.moveSectionDown();
  });
 
});