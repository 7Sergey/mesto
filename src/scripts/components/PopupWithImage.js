import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(selector, name, image) {
    super(selector)
    this._name = name
    this._image = image
  }
  open() {
    super.open()

    const zoomImage = this._popup.querySelector('.popup-zoom__image')
    const zoomTitle = this._popup.querySelector('.popup-zoom__title')

    zoomImage.src = this._image
    zoomImage.alt = `Увеличенное изображение ${this._name}`
    zoomTitle.textContent = this._name
  }
}
