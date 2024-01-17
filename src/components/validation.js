import { addClass, removeClass } from "./modal";


function returnErrorText (inputElement) {
  if (inputElement.validity.patternMismatch) {
    return inputElement.dataset.errorMessage;
  } else {
    return inputElement.validationMessage;
  }
}

function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  addClass(inputElement, config.inputErrorClass);
    errorElement.textContent = returnErrorText(inputElement);
  addClass(errorElement, config.errorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  removeClass(inputElement, config.inputErrorClass);
  removeClass(errorElement, config.errorClass);
  errorElement.textContent = '';
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(form => setEventListeners(form, config));
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach(element => {
    element.addEventListener('input', () => {
      toggleInputErrorState(formElement, element, config);
    toggleButtonState(inputList, button, config);
    });
  });
}

function toggleInputErrorState(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

export function clearValidation(formElement, config) {
  const button = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  formElement.reset();
  toggleButtonState(inputList, button, config);
  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });
}