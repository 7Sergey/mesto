// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  // delete
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



function checkInputValidity(input, errorIdTemplate, activeErrorClass) {
  const errorTextElement = document.querySelector(`#${input.name}${errorIdTemplate}`)
  if (!input.validity.valid) {
    showInputError(errorTextElement, input.validationMessage, activeErrorClass)
  } else {
    hideInputError(errorTextElement, activeErrorClass)
  }
}

function setEventListeners(inputList, errorIdTemplate, activeErrorClass, submitButton, inactiveButtonClass) {
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, errorIdTemplate, activeErrorClass)
      toggleButtonState(submitButton, inactiveButtonClass, inputList)
    })
  })
}

function enableValidation(obj) {
  const formList = document.querySelectorAll(obj.formSelector)
  formList.forEach((form) => {
    const inputList = form.querySelectorAll(obj.inputSelector)
    const submitButton = form.querySelector(obj.submitButtonSelector)

    setEventListeners(inputList, obj.errorIdTemplate, obj.activeErrorClass, submitButton, obj.inactiveButtonClass);
  })
}

enableValidation(obj);
