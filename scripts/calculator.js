document.addEventListener("DOMContentLoaded", function() {
  // Переменные для взаимодействия с элементами HTML
  const merchForm = document.getElementById('merch-form'); // Получаем саму форму
  const calculateButton = document.getElementById('calculate'); // Кнопка для расчета
  const quantityInput = document.getElementById('quantity'); // Поле ввода количества
  const productSelect = document.getElementById('product'); // Селектор для выбора товара
  const resultDisplay = document.getElementById('result'); // Элемент для отображения результата
  const productImage = document.getElementById('product-image'); // Изображение товара

  // Изменение изображения при выборе товара
  productSelect.addEventListener('change', function() {
      const selectedOption = productSelect.options[productSelect.selectedIndex]; // Текущий выбранный пункт
      const imageSrc = selectedOption.getAttribute('data-image'); // Получение пути к изображению из атрибута 'data-image'
      productImage.src = imageSrc; // Изменение изображения товара
  });

  // Обработчик для кнопки расчета
  merchForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Предотвращает перезагрузку страницы при отправке формы
      const quantity = quantityInput.value.trim(); // Получение и очистка от лишних пробелов введенного количества
      const price = parseFloat(productSelect.value); // Получение цены выбранного товара, преобразованной в число с плавающей точкой

      // Проверка, что количество введено корректно (положительное целое число)
      const quantityRegex = /^[1-9][0-9]*$/; // Регулярное выражение для проверки количества (начинается с цифры от 1 до 9, затем ноль или больше цифр)
      if (!quantityRegex.test(quantity)) {
          resultDisplay.textContent = "Ошибка: введите корректное количество."; // Сообщение об ошибке
          resultDisplay.classList.add('show'); // Показать результат с анимацией
          return; // Останавливает дальнейшее выполнение, если количество некорректно
      }

      // Вычисление общей стоимости
      const totalCost = price * parseInt(quantity); // Общая стоимость как произведение цены и количества
      resultDisplay.textContent = 'Общая стоимость: ' + totalCost + 'Р'; // Отображение результата

      // Добавляем класс для активации анимации
      resultDisplay.classList.add('show'); // Показать результат с анимацией
  });
});
