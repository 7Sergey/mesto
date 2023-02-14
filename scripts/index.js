// console.log('hello');
const openPopup = document.querySelector('.profile__popup-open');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__button-close');

openPopup.addEventListener('click', toggleClass)//пишем функцию без скобок, чтобы она сразу не вызвалась


closePopup.addEventListener('click', () => popup.classList.toggle('popup_opened'))//можно сделать при помощи стрелочной функции в качестве кол-бека. 

function toggleClass() {//параметр event передается с addEventListener. 
  popup.classList.toggle('popup_opened');// .toggle() позволяет отобразить или скрыть выбранные элементы. 
  // Если элемент изначально отображается, то он будет скрыт, если элемент скрыт, то он будет отображен.
}


//  ЗАКРЫТИЕ ПОПАПА ПРИ НАЖАТИИ НА ОБЛАСТЬ ВНЕ ПОПАПА
popup.addEventListener('click', function (event) {
  console.log('target :', event.target);//сюда попадает тот элемент, по которому кликнули
  console.log('currentTarget :', event.currentTarget);//тот элемент, на который мы повесили addEventListener. То есть класс .popup, который лежит в переменной popup
  if (event.target === event.currentTarget) {
    toggleClass();
  }
})



// Находим форму в DOM
let formElement = document.querySelector('.popup__form')
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__name')
let jobInput = formElement.querySelector('.popup__job')


const userName = 'Жак-Ив Кусто'
const userJob = 'Исследователь океана'


const userNameElement = document.querySelector('.profile__title')
userNameElement.textContent = userName;

const userJobElement = document.querySelector('.profile__subtitle')
userJobElement.textContent = userJob;

const userNameInput = document.querySelector('.popup__name')
userNameInput.value = userName;

const userJobInput = document.querySelector('.popup__job')
userJobInput.value = userJob;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  // const userNameElement = document.querySelector('.profile__title')
  userNameElement.textContent = nameInput.value;

  // const userJobElement = document.querySelector('.profile__subtitle')
  userJobElement.textContent = jobInput.value;

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
formElement.addEventListener('submit', toggleClass);




