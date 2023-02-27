const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupProfileClose = popupProfile.querySelector('.popup__button-close');

const userNameElement = document.querySelector('.profile__title')//на странице
const userJobElement = document.querySelector('.profile__subtitle')

const formProfile = popupProfile.querySelector('.popup__form')//форму в переменную для обработки сабмита
const userNameInput = popupProfile.querySelector('.popup__input_type_name')//поля в форме
const userJobInput = popupProfile.querySelector('.popup__input_type_job')



//функция переключения класса видимости для всех попапов
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function handleFormSubmit(evt) {//отправка формы профиля evt -- параметр, передаваемый кликом
  evt.preventDefault(); // Отмена дефолтной отправки формы с перезагрузкой страницы
  userNameElement.textContent = userNameInput.value;//запись в профиль значений из инпутов
  userJobElement.textContent = userJobInput.value;
  togglePopup(popupProfile);
}


popupProfileOpen.addEventListener('click', () => {//открытие попапа профиля
  userNameInput.value = userNameElement.textContent;
  userJobInput.value = userJobElement.textContent;
  togglePopup(popupProfile);
})

formProfile.addEventListener('submit', handleFormSubmit);// сохранения изменений в форме профиля

popupProfileClose.addEventListener('click', () => {//закрытие попапа профиля
  togglePopup(popupProfile)
})

popupProfile.addEventListener('click', (event) => {//  ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОБЛАСТЬ ВНЕ ПОПАПА
  if (event.target === event.currentTarget) {
    togglePopup(popupProfile);
  }
})



//ПРОЕКТНАЯ РАБОТА 5

const initialCards = [
  {
    name: 'Архыз',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    image: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const elements = document.querySelector('.elements');

function createCard(card) {//создание карточек
  const newCard = document.querySelector('.template').content.cloneNode(true);
  const cardTitleTemplate = newCard.querySelector('.card__title');
  cardTitleTemplate.textContent = card.name
  const cardImageTemplate = newCard.querySelector('.card__image')
  cardImageTemplate.setAttribute('src', card.image)
  cardImageTemplate.setAttribute('alt', card.name)



  cardImageTemplate.addEventListener('click', openImagePopup);//открытие попапа зума
  const buttonDelete = newCard.querySelector('.card__trash-button')//удаление
  buttonDelete.addEventListener('click', handleDeleteButtonClick)
  const likeButton = newCard.querySelector('.card__button')//лайки
  likeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('elements__button_active');
  });

  elements.prepend(newCard)//добавление карточки в начало
}

initialCards.forEach(createCard);//перебор массива объектов с созданием карточек

function openImagePopup(event) {
  const popupZoom = document.querySelector('.popup-zoom')
  popupZoom.classList.toggle('popup-zoom_opened');
  const zoomImage = popupZoom.querySelector('.popup-zoom__image')//добавление аттрибута для картинки
  const image = event.target.getAttribute('src')
  zoomImage.setAttribute("src", image)
  const title = popupZoom.querySelector('.popup-zoom__title')
  const zoomTitle = event.target.parentNode.querySelector('.card__title').textContent // обращаюсь через родителя таргетного элемента
  title.textContent = zoomTitle

}

const popupZoom = document.querySelector('.popup-zoom')
const closeZoom = popupZoom.querySelector('.popup-zoom__button-close')

closeZoom.addEventListener('click', () => {
  popupZoom.classList.toggle('popup-zoom_opened');
})

function handleDeleteButtonClick(event) {//удаление карточки
  const button = event.target;
  const card = button.closest('.card')
  card.remove()
}

//ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupNewCard = document.querySelector('.popup_new-card');
const popupNewCardOpen = document.querySelector('.profile__add-button');
const popupNewCardClose = popupNewCard.querySelector('.popup__button-close');

popupNewCardOpen.addEventListener('click', () => {//открытие попапа добавления карточки
  togglePopup(popupNewCard);
})

popupNewCardClose.addEventListener('click', () => {//закрытие попапа добавления карточки
  togglePopup(popupNewCard)
})

popupNewCard.addEventListener('click', (event) => {//  ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОБЛАСТЬ ВНЕ ПОПАПА
  if (event.target === event.currentTarget) {
    togglePopup(popupNewCard);
  }
})


const form = popupNewCard.querySelector('.popup__form')

form.addEventListener('submit', submit);//отправка формы новой карточки

function submit(event) {
  event.preventDefault()
  const form = event.target
  const name = form.querySelector('.popup__input_type_name').value
  const image = form.querySelector('.popup__input_type_image').value

  if (name && image) {
    const card = {
      name: name,
      image: image
    }
    createCard(card)
    togglePopup(popupNewCard)
    form.querySelector('.popup__input_type_name').value = ''//обнуление инпутов
    form.querySelector('.popup__input_type_image').value = ''
  } else alert('Введите данные в поля')
}
