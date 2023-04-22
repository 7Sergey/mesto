// import 'core-js/actual'
import './index.css'

import initialCards from '../scripts/data/initialCards.js'
import validationConfig from '../scripts/data/validationConfig.js'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import Popup from '../scripts/components/Popup.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'

// //попап профиля
// const popupProfile1 = document.querySelector('.popup_profile')
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button')
const userNameInput = document.querySelector('.popup__input_type_name') //поля в форме
const userJobInput = document.querySelector('.popup__input_type_job')
// // const profileForm = document.forms['profile-form'] //обращение к форме через аттрибут 'name'

//попап зум
// const popupZoom = document.querySelector('.popup-zoom')
// const zoomImage = popupZoom.querySelector('.popup-zoom__image') //добавление аттрибута для картинки
// const zoomTitle = popupZoom.querySelector('.popup-zoom__title')

//ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const buttonOpenPopupNewCard = document.querySelector('.profile__add-button')
const formNewCard = document.forms['new-card-form'] //обращение к форме через аттрибут 'name'
const nameCard = formNewCard.querySelector('.popup__input_type_name')
const imageCard = formNewCard.querySelector('.popup__input_type_image')

// const userNameElement = document.querySelector('.profile__title') // Заголовок и подзаголовок на странице
// const userJobElement = document.querySelector('.profile__subtitle')

const cardFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_new-card'
)

const profileFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_profile'
)
//----------------------------------------------------------------=------------------------------------------------------------------

//клики закрытия будут общими в одном общем экземпляре попапа

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
cardList.renderItems()

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle',
})

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
popupProfile.setEventListeners()

const popupNewCard = new PopupWithForm({
  selector: '.popup_new-card',
  handleFormSubmit: (data) => {
    cardList.addItem(createCardElement(data))
    popupNewCard.close()
  },
})
popupNewCard.setEventListeners()
//--------------------------------------------------------------------------------------------------

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

// function handleformNewCardSubmit(event) {
//   event.preventDefault()
//   const card = {
//     name: nameCard.value,
//     image: imageCard.value,
//   }
//   const cardElement = createCardElement(card) //создал новую карточку
//   cardList.addItem(cardElement) //отрисовал ее с помощью метода класса
//   event.target.reset() //обнуление значений полей формы(импутов)
//   cardFormValidator.disableButton() //дизейбл кнопки
//   popupNEWCARD.close()
// }

export function openImagePopup({ name, image }) {
  const popupZoom = new PopupWithImage('.popup-zoom', name, image)
  popupZoom.open()
  popupZoom.setEventListeners()
}

//  function openPopup(popup) {
//   popup.classList.add('popup_opened')
//   document.addEventListener('keydown', closePopupEscape) //слушатель для закрытия
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened')
//   document.removeEventListener('keydown', closePopupEscape) // снятие слушателя для закрытия
// }

// function handleProfileFormSubmit(evt) {
//   //отправка формы профиля evt -- параметр, передаваемый кликом
//   evt.preventDefault() // Отмена дефолтной отправки формы с перезагрузкой страницы
//   userNameElement.textContent = userNameInput.value //запись в профиль значений из инпутов
//   userJobElement.textContent = userJobInput.value
//   popupPROFILE.close()
// }

buttonOpenPopupNewCard.addEventListener('click', () => {
  //открытие попапа добавления карточки
  popupNewCard.open()
})

// formNewCard.addEventListener('submit', handleformNewCardSubmit) //отправка формы новой карточки
// profileForm.addEventListener('submit', handleProfileFormSubmit) // сохранения изменений в форме профиля

profileFormValidator.enableValidation() //валидации форм

cardFormValidator.enableValidation()
