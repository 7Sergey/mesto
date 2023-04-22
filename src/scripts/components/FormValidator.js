class FormValidator {
  constructor(config, selector) {
    const {
      inputSelector,
      buttonSubmitSelector,
      inactiveButtonClass,
      inputErrorClass,
      activeErrorClass,
      errorIdTemplate,
    } = config
    this._form = document.querySelector(selector)
    this._inputList = this._form.querySelectorAll(inputSelector)
    this._buttonSubmit = this._form.querySelector(buttonSubmitSelector)
    this._inactiveButtonClass = inactiveButtonClass
    this._inputErrorClass = inputErrorClass
    this._activeErrorClass = activeErrorClass
    this._errorIdTemplate = errorIdTemplate
    this._errorTextElement = undefined
  }
  enableValidation() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._toggleButtonState()
      })
    })
  }

  _checkInputValidity(input) {
    this._errorTextElement = document.querySelector(
      `#${input.name}${this._errorIdTemplate}`
    )
    if (!input.validity.valid) {
      this._showInputError(input.validationMessage)
      this._addInputClassError(input)
    } else {
      this._hideInputError()
      this._removeInputClassError(input)
    }
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.validity.valid)
  }

  _toggleButtonState() {
    if (!this._hasInvalidInput(this._inputList)) {
      this._enableButton()
    } else {
      this.disableButton()
    }
  }

  _showInputError(validationMessage) {
    this._errorTextElement.textContent = validationMessage
    this._errorTextElement.classList.add(this._activeErrorClass)
  }

  _hideInputError() {
    this._errorTextElement.textContent = ''
    this._errorTextElement.classList.remove(this._activeErrorClass)
  }

  _addInputClassError(input) {
    input.classList.add(this._inputErrorClass)
  }

  _removeInputClassError(input) {
    input.classList.remove(this._inputErrorClass)
  }

  disableButton() {
    this._buttonSubmit.classList.add(this._inactiveButtonClass)
    this._buttonSubmit.disabled = true
  }

  _enableButton() {
    this._buttonSubmit.classList.remove(this._inactiveButtonClass)
    this._buttonSubmit.disabled = false
  }
}

export default FormValidator
