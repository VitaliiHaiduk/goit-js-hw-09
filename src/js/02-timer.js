import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

  
const dateInput = document.querySelector('input#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');


startButton.setAttribute('disabled', true);


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


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

    if (selectedDates[0] < Date.now()) {
      return alert('Please choose a date in the future')
    } 

    startButton.removeAttribute('disabled');
    dateInput.setAttribute('disabled', true);

       const deltaTime = selectedDates[0] - Date.now();
       countdownValue(convertMs(deltaTime));
       

    startButton.addEventListener('click', () => {  
       
      intervalID = setInterval(() => {

        if (selectedDates[0] - Date.now() <= 0) {
          clearInterval(intervalID);
          return
        } else{
          const deltaTime = selectedDates[0] - Date.now();
          countdownValue(convertMs(deltaTime));}
       
      }, 1000);});   
  }
};


function countdownValue({ days, hours, minutes, seconds }) {
  daysLeft.textContent = days;
  hoursLeft.textContent = hours;
  minutesLeft.textContent = minutes;
  secondsLeft.textContent = seconds;
}

flatpickr(dateInput, options);

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
