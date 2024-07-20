import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

    const startButton = document.querySelector('button[data-start]');
    const datetimePicker = document.querySelector('#datetime-picker');
    const daysElement = document.querySelector('[data-days]');
    const hoursElement = document.querySelector('[data-hours]');
    const minutesElement = document.querySelector('[data-minutes]');
    const secondsElement = document.querySelector('[data-seconds]');

    let userSelectedDate = null;
    let intervalId = null;

    const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
          if (selectedDates[0] < new Date()) {
           // alert('Please choose a date in the future');
           iziToast.show({
            //title: 'Hey',
            backgroundColor: 'red',
            theme: 'light', 
            color: 'white',
            messageColor:  'white',
            close: true,
            position: "topCenter",
            message: 'Please choose a date in the future'
        });
        
            startButton.disabled = true;
          } else {
            userSelectedDate = selectedDates[0];
            startButton.disabled = false;
          };
        },
    };

    flatpickr("#datetime-picker", options)

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
      
        
        const days = Math.floor(ms / day);
        
        const hours = Math.floor((ms % day) / hour);
       
        const minutes = Math.floor(((ms % day) % hour) / minute);
        
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      
        return { days, hours, minutes, seconds };
      }
      
      console.log(convertMs(2000)); 
      console.log(convertMs(140000)); 
      console.log(convertMs(24140000)); 

      function addLeadingZero(value) {
        return String(value).padStart(2, '0');
      }
      function updateTimer({ days, hours, minutes, seconds }) {
        daysElement.textContent = addLeadingZero(days);
        hoursElement.textContent = addLeadingZero(hours);
        minutesElement.textContent = addLeadingZero(minutes);
        secondsElement.textContent = addLeadingZero(seconds);
      }
      
      function startTimer() {
        intervalId = setInterval(() => {
          const now = new Date();
          const timeDifference = userSelectedDate - now;
  
          if (timeDifference <= 0) {
            clearInterval(intervalId);
            updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            startButton.disabled = true;
            return;
          }
          const timeRemaining = convertMs(timeDifference);
        updateTimer(timeRemaining);
      }, 1000);
      startButton.disabled = true;
    }
    startButton.addEventListener('click', startTimer);