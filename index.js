// Snowfall

particlesJS("snowflakes", {
    "particles": {
      "number": {
        "value": 147,
        "density": {
          "enable": false
        }
      },
      "color": {
        "value": "#fff"
      },"shape": {
        "type": "star",
        "polygon": {
          "nb_sides": 9
        }
      },"opacity": {
        "value": 1,
        "random": true,
      },"size": {
        "value": 3,
        "random": true,
      },"line_linked":{
        "enable":false
      },"move": {
        "enable": true,
        "speed": 6,
        "direction": "bottom-left",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable":false
        }
      }
    },"interactivity": {
      "detect_on": "window",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },"onclick": {
          "enable": false
        },"resize": true
      },"modes": {
        "repulse": {
          "distance":100,
          "duration":0.4
        }
      }
    },"retina_detect":false
});

// Countdown section

function calculateChristmasCountdown(){
    
    //Get today's date.
    var now = new Date();

    //Get the current month. Add a +1 because
    //getMonth starts at 0 for January.
    var currentMonth = (now.getMonth() + 1);

    //Get the current day of the month.
    var currentDay = now.getDate();

    //Work out the year that the next Christmas
    //day will occur on.
    var christmas = new Date(now.getFullYear(), 11, 25);
    if (currentMonth == 12 && currentDay > 25) {
      christmas.setFullYear(christmas.getFullYear() + 1);
    }

    var nextChristmasDate = christmas;
    var christmasDay = new Date(nextChristmasDate);

    //Get the difference in seconds between the two days.
    var diffSeconds = Math.floor((christmasDay.getTime() - now.getTime()) / 1000);

    var days = 0;
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    //Don't calculate the time left if it is Christmas day.
    if(currentMonth != 12 || (currentMonth == 12 && currentDay != 25)){
        //Convert these seconds into days, hours, minutes, seconds.
        days = Math.floor(diffSeconds / (3600*24));
        diffSeconds  -= days * 3600 * 24;
        hours   = Math.floor(diffSeconds / 3600);
        diffSeconds  -= hours * 3600;
        minutes = Math.floor(diffSeconds / 60);
        diffSeconds  -= minutes * 60;
        seconds = diffSeconds;
    }

    //Add our counts to their corresponding HTML elements.
    document.querySelector('.days').innerHTML = days + 'd';
    document.querySelector('.hours').innerHTML = hours + 'h';
    document.querySelector('.mins').innerHTML = minutes + 'm';
    document.querySelector('.secs').innerHTML = seconds + 's';

    //Recursive call after 1 second using setTimeout
    setTimeout(calculateChristmasCountdown, 1000);
}

calculateChristmasCountdown();

// Vue App to Change Names / Reasons

const app = new Vue({
  el: '#app',
  data: {
    firstName: '',
    lastName: '',
    reasons: ['doing their best', 'waking up this morning', 'being brave', 'being valued', 'being loved', 'succeeding one day at a time', 'being here today'],
    reason: ''
  },
  methods: {
    chooseReason: function() {
      let chosenReason = Math.floor(Math.random() * this.reasons.length);
      this.reason = this.reasons[chosenReason];
    },
    submitForm: function() {
      document.querySelector('.prompt-cta').classList.toggle('hidden');
      setTimeout(function() {
        document.querySelector('.checkList').classList.toggle('hidden');
        setTimeout(function() {
          document.querySelector('.checkList').classList.toggle('hidden');
          setTimeout(function() {
            document.querySelector('.checkTwice').classList.toggle('hidden');
            setTimeout(function() {
              document.querySelector('.checkTwice').classList.toggle('hidden');
              setTimeout(function() {
                document.querySelector('.reasoning').classList.toggle('hidden');
              }, 1500);
            }, 3000);
          }, 1500);
        }, 3000);
      }, 1500);
    },
    checkAgain: function() {
      document.querySelector('.reasoning').classList.toggle('hidden');
      setTimeout(function() {
        document.querySelector('.prompt-cta').classList.toggle('hidden');
      }, 1500);
    }
  }
});

// Timing Variables

var today = new Date();
var month = today.getMonth();
var day = today.getDate();

setInterval(function() {

  const promptCta = document.querySelector('.prompt-cta');
  const christmasCta = document.querySelector('.christmas');
  const vacationCta = document.querySelector('.vacation');
  const countdownCta = document.querySelector('.countdown');

  const promptHidden = document.querySelector('.prompt-cta').classList.contains('hidden');
  const christmasHidden = document.querySelector('.christmas').classList.contains('hidden');
  const vacationHidden = document.querySelector('.vacation').classList.contains('hidden');
  const countdownHidden = document.querySelector('.countdown').classList.contains('hidden');

  if (month == 11 && day >= 26 || month == 0 || month == 1 || month == 2 && day <= 31) {
    // If it's between Dec 26th and Mar 31st the vacation div and timer will display.

    if(vacationHidden) {
      vacationCta.classList.toggle('hidden');
      promptCta.classList.toggle('hidden');
    }

    if(countdownHidden) {
      countdownCta.classList.toggle('hidden');
    }

    if(!christmasHidden) {
      christmasCta.classList.toggle('hidden');
    };
  
  } else if (month == 3 && day >= 1 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9 || month == 10 && day <= 24) {
    // If it's between Apr 1st and Dec 24th the Naughty or Nice prompt will display and the vacation div will hide

    if(!vacationHidden) {
      vacationCta.classList.toggle('hidden');
    }

    if(promptHidden) {
      promptCta.classList.toggle('hidden');
    }

  } else if (month == 11 && day == 25) {
    // If it's Christmas day, the Christmas div will display and timer will hide

    if(!countdownHidden) {
      countdownCta.classList.toggle('hidden');
    };

    if(christmasHidden) {
      christmasCta.classList.toggle('hidden');
    };

    if(!promptHidden) {
      promptCta.classList.toggle('hidden');
    }

  }
}, 1000);

// Adjusting tabbing when hidden

const prompt = document.querySelector('.prompt-cta');
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const subBtn = document.querySelector('.subBtn');

const inputs = [fname, lname, subBtn];

const inputsObserver = new MutationObserver(entries => {
  if(prompt.classList.contains('hidden')) {
    inputs.forEach((input) => {
      input.tabIndex = '-1';
    })
  } else {
    inputs.forEach((input) => {
      input.tabIndex = '0';
    })
  }
});

inputsObserver.observe(prompt, { attributes: true });

const reasoning = document.querySelector('.reasoning');
const checkAgain = document.querySelector('.checkAgain');

const reasoningObserver = new MutationObserver(entries => {
  if(reasoning.classList.contains('hidden')) {
    checkAgain.tabIndex = '-1'
  } else {
    checkAgain.tabindex = 0;
  }
});

reasoningObserver.observe(prompt, { attributes: true });