import initialCards from './data/initialCards.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import validationConfig from './data/validationConfig.js'

// //попап профиля
const popupProfile = document.querySelector('.popup_profile')
const popupProfileOpen = document.querySelector('.profile__edit-button')
const userNameInput = popupProfile.querySelector('.popup__input_type_name') //поля в форме
const userJobInput = popupProfile.querySelector('.popup__input_type_job')
const profileForm = document.forms['profile-form'] //обращение к форме через аттрибут 'name'

//попап зум
const popupZoom = document.querySelector('.popup-zoom')
const zoomImage = popupZoom.querySelector('.popup-zoom__image') //добавление аттрибута для картинки
const zoomTitle = popupZoom.querySelector('.popup-zoom__title')

//ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupNewCard = document.querySelector('.popup_new-card')
const popupNewCardOpen = document.querySelector('.profile__add-button')
const formNewCard = document.forms['new-card-form'] //обращение к форме через аттрибут 'name'
const nameCard = formNewCard.querySelector('.popup__input_type_name')
const imageCard = formNewCard.querySelector('.popup__input_type_image')
const buttonSubmitNewCard = formNewCard.querySelector('.popup__button') //кнопка сабмита новой карточки

const userNameElement = document.querySelector('.profile__title') // Заголовок и подзаголовок на странице
const userJobElement = document.querySelector('.profile__subtitle')

const popups = document.querySelectorAll('.popup') //все попапы
const cardsContainer = document.querySelector('.elements')

const cardFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_new-card'
)

const profileFormValidator = new FormValidator(
  validationConfig,
  '.popup__form_profile'
)

export function openImagePopup(name, image) {
  // настраиваем попап
  openPopup(popupZoom)
  zoomImage.src = image
  zoomImage.alt = `Увеличенное изображение ${name}`
  zoomTitle.textContent = name
}

function closePopupEscape(e) {
  //закрытие попапа по Escape
  if (e.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}

export default function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEscape) //слушатель для закрытия
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEscape) // снятие слушателя для закрытия
}

function handleProfileFormSubmit(evt) {
  //отправка формы профиля evt -- параметр, передаваемый кликом
  evt.preventDefault() // Отмена дефолтной отправки формы с перезагрузкой страницы
  userNameElement.textContent = userNameInput.value //запись в профиль значений из инпутов
  userJobElement.textContent = userJobInput.value
  closePopup(popupProfile)
}

function createCardElement(card) {
  const cardNew = new Card(card, '.template') //создал экземпляр класса
  const cardElement = cardNew.generateCard() //сгенерироал готовый элемент

  return cardElement
}

function createCard(card) {
  const cardElement = createCardElement(card)
  cardsContainer.prepend(cardElement)
}

function handleformNewCardSubmit(event) {
  event.preventDefault()
  const card = {
    name: nameCard.value,
    image: imageCard.value,
  }
  createCard(card)
  closePopup(popupNewCard)
  event.target.reset() //обнуление значений полей формы(импутов)
  cardFormValidator.disableButton()
}

popupNewCardOpen.addEventListener('click', () => {
  //открытие попапа добавления карточки
  openPopup(popupNewCard)
})

formNewCard.addEventListener('submit', handleformNewCardSubmit) //отправка формы новой карточки

profileFormValidator.enableValidation()

cardFormValidator.enableValidation()

initialCards.forEach(createCard) //перебор массива объектов с созданием карточек

popupProfileOpen.addEventListener('click', () => {
  //открытие попапа профиля
  userNameInput.value = userNameElement.textContent
  userJobInput.value = userJobElement.textContent
  openPopup(popupProfile)
})

profileForm.addEventListener('submit', handleProfileFormSubmit) // сохранения изменений в форме профиля

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      //если цель -- вне попапа -- закрываем
      closePopup(popup)
    } else if (evt.target.classList.contains('popup__close')) {
      // если цель -- кнопка закрытия, закрыть попап
      closePopup(popup)
    }
  })
})
