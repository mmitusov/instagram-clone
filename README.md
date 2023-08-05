tailwindCSS
npm i sass
npm install -D @tailwindcss/forms
npm install @heroicons/react

Спева почистим проект и оставим только _app.tsx, index.tsx и глобальные стили.

Далее подумаем из каких основных частей будет состоять приложение. Будет состоять из хедера, новостной ленты (feed), и модального окна. Начем с хедера.

Сперва займемся дизайном хедера. Хедер будет состоять из 3-х частей: лого, поиск и меню иконок. При чем работая с формой поиска, если мы хотим задать ей стили при помощи tailwind, то нам нужно установить доп библиотеку - @tailwindcss/forms. Она позволяет перезаписывать стили форм/инпутов при помощи tailwind. Без нее этого сделать нельзя. После ее установки, ее нужно добавить в tailwind.config.js, поле - plugins: [require("@tailwindcss/forms")].

Для хедера также создадим сustom tailwind utility class, под названием .navButton. Кастомные классы располагаются в globals.scss.

Далее займемся дизайном новостной ленты.