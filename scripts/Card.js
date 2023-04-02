import { openImagePopup } from './index.js'

class Card {
  constructor(data, cardTemplateSelector) {
    this._name = data.name
    this._image = data.image
    this._cardTemplateSelector = cardTemplateSelector
    this._element = undefined //тут будет храниться результат функции getTemplate
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(
      this._cardTemplateSelector
    ).content
    const cardElement = cardTemplate
      .querySelector('.elements__item')
      .cloneNode(true)

    return cardElement
  }

  _handleCardLike() {
    this._buttonLike.classList.toggle('elements__button_active')
  }

  _handleCardDelete() {
    this._element.remove()
  }

  _handleCardImageOpen() {
    // открытие зума
    openImagePopup(this._name, this._image)
  }

  //слушатели
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike()
    })

    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete()
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardImageOpen()
    })
  }

  //создание карточки
  generateCard() {
    this._element = this._getTemplate() //получение шаблона
    this._cardTitle = this._element.querySelector('.card__title')
    this._cardTitle.textContent = this._name
    this._cardImage = this._element.querySelector('.card__image')
    this._cardImage.alt = this._name
    this._cardImage.src = this._image
    this._buttonDelete = this._element.querySelector('.card__trash-button') //кнопка удаления
    this._buttonLike = this._element.querySelector('.card__button') //лайки

    this._setEventListeners()

    return this._element
  }
}

export default Card
