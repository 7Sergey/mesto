import Popup from './Popup.js'

export default class PopupConfirm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector)
    this._form = this._popup.querySelector('.popup__form')
    this._handleFormSubmit = handleFormSubmit
    this._button = this._form.querySelector('.popup__button')
  }

  submitHandler(newSubmitHandler) {
    this._handleFormSubmit = newSubmitHandler
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this._handleFormSubmit() //передал объект с данными инпутов в колбек
      // this.close()
    })
  }
}
