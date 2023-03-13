// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  
  inputErrorClass: 'popup__input_type_error',
  activeErrorClass: 'popup__error_visible',
  errorIdTemplate: '-error',

}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid)
}

function toggleButtonState(submitButton, inactiveButtonClass, inputList) {
  if (!hasInvalidInput(inputList)) {
    enableButton(submitButton, inactiveButtonClass)

  } else {
    disabledButton(submitButton, inactiveButtonClass)
  }
}


function showInputError(errorTextElement, validationMessage, activeErrorClass) {
  errorTextElement.textContent = validationMessage;
  errorTextElement.classList.add(activeErrorClass)
}

function hideInputError(errorTextElement, activeErrorClass) {
  errorTextElement.textContent = '';
  errorTextElement.classList.remove(activeErrorClass)
}

function disabledButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass)
  submitButton.disabled = true
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass)
  submitButton.disabled = false
}
function addInputClassError(input, inputErrorClass) {
  input.classList.add(inputErrorClass)
}

function removeInputClassError(input, inputErrorClass) {
  input.classList.remove(inputErrorClass)
}


function checkInputValidity(input, errorIdTemplate, activeErrorClass, inputErrorClass) {
  const errorTextElement = document.querySelector(`#${input.name}${errorIdTemplate}`)
  if (!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass)
    addInputClassError(input, inputErrorClass)
  } else {
    hideInputError(errorTextElement, activeErrorClass)
    removeInputClassError(input, inputErrorClass)
  }
}

function setEventListeners(inputList, errorIdTemplate, activeErrorClass, submitButton, inactiveButtonClass, inputErrorClass) {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorIdTemplate, activeErrorClass, inputErrorClass)
      toggleButtonState(submitButton, inactiveButtonClass, inputList)
    })
  })
}

function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector)
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(config.inputSelector)
    const submitButton = form.querySelector(config.submitButtonSelector)

    setEventListeners(inputList, config.errorIdTemplate, config.activeErrorClass, submitButton, config.inactiveButtonClass, config.inputErrorClass);
  })
}

enableValidation(config);
