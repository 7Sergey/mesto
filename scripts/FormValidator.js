class FormValidator {
  constructor(config, form) {
    // const {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, activeErrorClass, errorIdTemplate} = config СДЕЛАТЬ ДЕСТРУКТУРИЗАЦИЮ
    this._form = document.querySelector(form)
    this._inputList = this._form.querySelectorAll(config.inputSelector)
    this._submitButton = this._form.querySelector(config.submitButtonSelector)
    this._inactiveButtonClass = config.inactiveButtonClass
    this._inputErrorClass = config.inputErrorClass
    this._activeErrorClass = config.activeErrorClass
    this._errorIdTemplate = config.errorIdTemplate
  }

  enableValidation() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(
          input,
          this._errorIdTemplate,
          this._activeErrorClass,
          this._inputErrorClass
        )
        this._toggleButtonState(
          this._submitButton,
          this._inactiveButtonClass,
          this._inputList
        )
      })
    })
  }

  _checkInputValidity(
    input,
    errorIdTemplate,
    activeErrorClass,
    inputErrorClass
  ) {
    this._errorTextElement = document.querySelector(
      `#${input.name}${errorIdTemplate}`
    )
    if (!input.validity.valid) {
      this._showInputError(
        this._errorTextElement,
        input.validationMessage,
        activeErrorClass
      )
      this._addInputClassError(input, inputErrorClass)
    } else {
      this._hideInputError(this._errorTextElement, activeErrorClass)
      this._removeInputClassError(input, inputErrorClass)
    }
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some((input) => !input.validity.valid)
  }

  _toggleButtonState(submitButton, inactiveButtonClass, inputList) {
    if (!this._hasInvalidInput(inputList)) {
      this._enableButton(submitButton, inactiveButtonClass)
    } else {
      this._disabledButton(submitButton, inactiveButtonClass)
    }
  }

  _showInputError(errorTextElement, validationMessage, activeErrorClass) {
    errorTextElement.textContent = validationMessage
    errorTextElement.classList.add(activeErrorClass)
  }

  _hideInputError(errorTextElement, activeErrorClass) {
    errorTextElement.textContent = ''
    errorTextElement.classList.remove(activeErrorClass)
  }

  _addInputClassError(input, inputErrorClass) {
    input.classList.add(inputErrorClass)
  }

  _removeInputClassError(input, inputErrorClass) {
    input.classList.remove(inputErrorClass)
  }

  _disabledButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass)
    submitButton.disabled = true
  }

  _enableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass)
    submitButton.disabled = false
  }
}

export default FormValidator
