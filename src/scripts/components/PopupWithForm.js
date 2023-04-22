import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector)
    this._form = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
  }

  close() {
    super.close()
    this._form.reset()
  }
  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()

      const inputValues = this._getInputValues() //получил объект с данными инпутов

      console.log(inputValues)
      this._handleFormSubmit(inputValues) //передал объект с данными инпутов в колбек
      this.close()
    })
  }
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input')
    const formValues = {}
    this._inputList.forEach((input) => {
      const name = input.name
      const value = input.value

      formValues[name] = value
    })

    return formValues
  }
}
