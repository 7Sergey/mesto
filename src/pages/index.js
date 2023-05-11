import './index.css'

import validationConfig from '../scripts/data/validationConfig.js'
import Card from '../scripts/components/Card.js'
import FormValidator from '../scripts/components/FormValidator.js'
import Section from '../scripts/components/Section.js'
import PopupWithImage from '../scripts/components/PopupWithImage.js'
import PopupWithForm from '../scripts/components/PopupWithForm.js'
import UserInfo from '../scripts/components/UserInfo.js'
import { api } from '../scripts/components/Api'
import PopupConfirm from '../scripts/components/PopupConfirm.js'

const buttonOpenPopupProfile = document.querySelector('.profile__edit-button')
const userNameInput = document.querySelector('.popup__input_type_profile') //поля в форме
const userJobInput = document.querySelector('.popup__input_type_about')
const buttonOpenPopupNewCard = document.querySelector('.profile__add-button')
const profileAvatar = document.querySelector('.profile__avatar')

let userId

api.getProfile().then((res) => {
  userInfo.setUserInfo(res)
  userId = res._id

  api.getCards().then((cards) => {
    cards.forEach((data) => {
      renderCard(data)
    })
  })
})

const cardFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_new-card'
)

const profileFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_profile'
)

const avatarFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_avatar'
)
const popupNewCard = new PopupWithForm({
  selector: '.popup_new-card',
  handleFormSubmit: (data) => {
    popupNewCard.setButtonText('Сохранение...')

    api.addCard(data).then((res) => {
      renderCard(res)
      popupNewCard.setButtonText('Создать')

      popupNewCard.close()
      popupNewCard.disableButton()
    })
  },
})

const popupConfirmDelete = new PopupConfirm('.popup_confirm-delete')

const cardList = new Section( //создаю секцию отрисовки, передавая функцию отрисовки одной карточки, создавая класс Card и вызывая его метод
  {
    items: [],
    renderer: (card) => {
      renderCard(card)
    },
  },
  '.elements'
)
const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar',
})

const popupAvatar = new PopupWithForm({
  selector: '.popup_avatar',
  handleFormSubmit: (data) => {
    popupAvatar.setButtonText('Сохранение...')
    api.editAvatar(data.avatar).then((res) => {
      userInfo.setUserInfo(res) //после отправки данных на сервер, отрисовываем их на странице
      popupAvatar.setButtonText('Сохранить')
      popupAvatar.close()
    })
  },
})

const popupProfile = new PopupWithForm({
  selector: '.popup_profile',
  handleFormSubmit: (data) => {
    popupProfile.setButtonText('Сохранение...')

    api.editProfile(data).then((res) => {
      userInfo.setUserInfo(res) //после отправки данных на сервер, отрисовываем их на странице
      popupProfile.setButtonText('Сохранить')

      popupProfile.close()
    })
  },
})
const popupZoom = new PopupWithImage('.popup-zoom')

function renderCard(data) {
  const cardElement = createCardElement(data)
  cardList.addItem(cardElement)
}

export function openImagePopup({ name, link }) {
  popupZoom.open(name, link)
}
function createCardElement(card) {
  //создание карточки
  const cardNew = new Card(
    card,
    () => {
      openImagePopup(card)
    },
    (id) => {
      popupConfirmDelete.open()
      popupConfirmDelete.submitHandler(() => {
        api.deleteCard(id).then((res) => {
          cardNew.deleteCard()
          popupConfirmDelete.close()
        })
      })
    },
    (id) => {
      if (cardNew.isLiked()) {
        api.deleteLike(id).then((res) => {
          cardNew.setLikes(res.likes)
        })
      } else {
        api.setLike(id).then((res) => {
          cardNew.setLikes(res.likes)
        })
      }
    },
    userId,
    '.template'
  ) //создал экземпляр класса
  const cardElement = cardNew.generateCard() //сгенерироал готовый элемент

  return cardElement
}

buttonOpenPopupNewCard.addEventListener('click', () => {
  //открытие попапа добавления карточки
  popupNewCard.open()
})

buttonOpenPopupProfile.addEventListener('click', () => {
  //открытие попапа профиля
  const dataUser = userInfo.getUserInfo()

  popupProfile.open()
  userNameInput.value = dataUser.profile
  userJobInput.value = dataUser.job
})

profileAvatar.addEventListener('click', () => {
  popupAvatar.open()
})

popupNewCard.setEventListeners()
popupProfile.setEventListeners()
popupConfirmDelete.setEventListeners()
popupZoom.setEventListeners()
popupAvatar.setEventListeners()

profileFormValidator.enableValidation() //валидации форм
cardFormValidator.enableValidation()
avatarFormValidator.enableValidation()
