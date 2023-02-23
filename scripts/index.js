const openPopup = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__button-close');

// Находим форму в DOM
const formElement = document.querySelector('.popup__form')
// находим элементы с именем и работой пользователя
const userNameElement = document.querySelector('.profile__title')
const userJobElement = document.querySelector('.profile__subtitle')
// находим инпуты имени и работы в форме
const userNameInput = document.querySelector('.popup__input_type_name')
const userJobInput = document.querySelector('.popup__input_type_job')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  userNameElement.textContent = userNameInput.value;//запись в профиль значений из инпутов
  userJobElement.textContent = userJobInput.value;
  toggleClass();//закрытие попапа
}

function toggleClass() {//параметр event передается с addEventListener. 
  userNameInput.value = userNameElement.textContent;
  userJobInput.value = userJobElement.textContent;
  popup.classList.toggle('popup_opened');// .toggle() позволяет отобразить или скрыть выбранные элементы. 
  // Если элемент изначально отображается, то он будет скрыт, если элемент скрыт, то он будет отображен.
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);//слушатель сохранения изменений в форме
openPopup.addEventListener('click', toggleClass)//пишем функцию без скобок, чтобы она сразу не вызвалась
closePopup.addEventListener('click', toggleClass)//слушатель закрытия попапа

//  ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОБЛАСТЬ ВНЕ ПОПАПА
popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    toggleClass();
  }
})