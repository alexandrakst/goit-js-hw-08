import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const messageInput = document.querySelector('textarea[name="message"]');
const emailInput = document.querySelector('input[name="email"]');

const STORAGE_KEY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const savedMessage = localStorage.getItem(STORAGE_KEY);

feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onFormInput, 500));

onReload();

function onFormInput(evt) {
  if (evt.target.name === 'email') {
    formData.email = evt.target.value;
  } else if (evt.target.name === 'message') {
    formData.message = evt.target.value;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);

  feedbackForm.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onReload() {
  if (savedMessage) {
    const parsedValues = JSON.parse(savedMessage);
    emailInput.value = parsedValues.email;
    messageInput.value = parsedValues.message;
  }
}
