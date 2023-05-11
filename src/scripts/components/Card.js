// import { openImagePopup } from '../../pages/index.js'

class Card {
  constructor(
    data,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    userId,
    cardTemplateSelector
  ) {
    this._name = data.name
    this._image = data.link
    this._likes = data.likes //массив с пользователями, которые лайкнули карточку
    this.id = data._id

    this._ownerId = data.owner._id //айди создателя карточки
    this._userId = userId //айди пользователя
    this._isOwner = this._ownerId === this._userId

    this._cardTemplateSelector = cardTemplateSelector
    this._element = undefined //тут будет храниться результат функции getTemplate
    this._handleCardClick = handleCardClick
    this._handleDeleteClick = handleDeleteClick
    this._handleLikeClick = handleLikeClick
  }

  isLiked() {
    const isUserLikedCard = this._likes.find(
      (user) => user._id === this._userId
    )
    return isUserLikedCard
  }

  deleteCard() {
    this._element.remove()
  }

  // _handleCardLike() {
  //   this._buttonLike.classList.toggle('elements__button_active')
  // }

  _getTemplate() {
    const cardTemplate = document.querySelector(
      this._cardTemplateSelector
    ).content
    const cardElement = cardTemplate
      .querySelector('.elements__item')
      .cloneNode(true)

    return cardElement
  }

  _handleCardDelete() {
    this._handleDeleteClick(this.id)
  }

  //слушатели
  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeClick(this.id)
    })

    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete()
    })

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, image: this._image })
    })
  }

  setLikes(newLikes) {
    this._likes = newLikes
    const counterLikesElement = this._element.querySelector(
      '.card__likes-counter'
    )
    counterLikesElement.textContent = this._likes.length

    if (this.isLiked()) {
      this._setLikeIcon()
    } else {
      this._deleteLikeIcon()
    }
  }

  _setLikeIcon() {
    this._buttonLike.classList.add('elements__button_active')
  }
  _deleteLikeIcon() {
    this._buttonLike.classList.remove('elements__button_active')
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

    // скрываем корзину, если карточка не пользователя
    if (!this._isOwner) {
      this._element.querySelector('.card__trash-button').style.display = 'none' //скрываем кнопку, если не карточка не владельца
    }

    this.setLikes(this._likes)
    this._setEventListeners()

    return this._element
  }
}

export default Card
