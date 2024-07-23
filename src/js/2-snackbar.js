import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(`.form`);
form.addEventListener(`submit`,handleClick);

function handleClick(event) {
    event.preventDefault();
    event.currentTarget.elements;

    const delay = document.querySelector('input[name="delay"]').value.trim();
    const state = document.querySelector('input[name="state"]:checked').value.trim();

    function createPromise(delay, state) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve(delay);
          } else {
            reject(delay);
          }
        }, delay);
        
      });
    }
  
    createPromise(delay, state)
      .then((delay) => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'green',
          color: 'white',
          messageSize: 'width: 303px, height: 24px;',
            messageColor:  'white'
        });
      })
      .catch((delay) => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          backgroundColor: 'red',
          color: 'white',
          messageSize: 'width: 303px, height: 24px;',
          messageColor:  'white'
        });
         
});
form.reset(); 
  };
  
  
