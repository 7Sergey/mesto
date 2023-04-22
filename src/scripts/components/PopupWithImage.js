import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._zoomImage = this._popup.querySelector('.popup-zoom__image')
    this._zoomTitle = this._popup.querySelector('.popup-zoom__title')
  }
  open(name, image) {
    super.open()
    this._name = name
    this._image = image

    this._zoomImage.src = this._image
    this._zoomImage.alt = `Увеличенное изображение ${this._name}`
    this._zoomTitle.textContent = this._name
  }
}
