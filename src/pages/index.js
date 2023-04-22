// import 'core-js/actual'
import './index.css'

import initialCards from '../scripts/data/initialCards.js'
import validationConfig from '../scripts/data/validationConfig.js'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button')
const userNameInput = document.querySelector('.popup__input_type_name') //поля в форме
const userJobInput = document.querySelector('.popup__input_type_job')
const buttonOpenPopupNewCard = document.querySelector('.profile__add-button')

const cardFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_new-card'
)

const profileFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_profile'
)
const popupNewCard = new PopupWithForm({
  selector: '.popup_new-card',
  handleFormSubmit: (data) => {
    cardList.addItem(createCardElement(data))

    popupNewCard.close()
    popupNewCard.disableButton()
  },
})

const cardList = new Section( //создаю секцию отрисовки, передавая функцию отрисовки одной карточки, создавая класс Card и вызывая его метод
  {
    items: initialCards,
    renderer: (card) => {
      const cardElement = createCardElement(card)
      cardList.addItem(cardElement)
    },
  },
  '.elements'
)
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle',
})
cardList.renderItems()

buttonOpenPopupProfile.addEventListener('click', () => {
  //открытие попапа профиля
  const dataUser = userInfo.getUserInfo()

  popupProfile.open()
  userNameInput.value = dataUser.profile
  userJobInput.value = dataUser.job
})

const popupProfile = new PopupWithForm({
  selector: '.popup_profile',
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data)
  },
})
const popupZoom = new PopupWithImage('.popup-zoom')

popupZoom.setEventListeners()

export function openImagePopup({ name, image }) {
  popupZoom.open(name, image)
}
function createCardElement(card) {
  //создание карточки
  const cardNew = new Card(
    card,
    () => {
      openImagePopup(card)
    },
    '.template'
  ) //создал экземпляр класса
  const cardElement = cardNew.generateCard() //сгенерироал готовый элемент

  return cardElement
}

buttonOpenPopupNewCard.addEventListener('click', () => {
  //открытие попапа добавления карточки
  popupNewCard.open()
})
popupNewCard.setEventListeners()
popupProfile.setEventListeners()

profileFormValidator.enableValidation() //валидации форм
cardFormValidator.enableValidation()
