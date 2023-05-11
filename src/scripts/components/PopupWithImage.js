import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._zoomImage = this._popup.querySelector('.popup-zoom__image')
    this._zoomTitle = this._popup.querySelector('.popup-zoom__title')
  }
  open(name, link) {
    super.open()
    this._name = name
    this._image = link

    this._zoomImage.src = this._image
    this._zoomImage.alt = `Увеличенное изображение ${this._name}`
    this._zoomTitle.textContent = this._name
  }
}
