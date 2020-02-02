console.log('Client side javascript file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {

    // Preventing the page to reload itself every time we press the search button.
    // That way we can see the result of our search.
    e.preventDefault();

    // The value of input form.
    const location  = search.value;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location + '.';
                messageTwo.textContent = data.forecast + '.';
            }
        });
    });
});