Тестовое задание необходимо выполнить только с указанным стэком и прислать две ссылки. Работа с только ссылкой на гитхаб рассматриваться не будет.

Задача: 
Создать SPA со списком карточек, на каждой из которых выводится картинка и любая информация на ваш вкус, которая пришла с эндпоинта или созданная пользователем. 

Дизайн не важен, главное, чтобы было просто и аккуратно. По стэку ориентируемся на список ниже. Остальные решения на вас. 
Стэк: Typescript \ React/Next  \ Redux || Zustand

Для задачи можно выбрать любое публичное api, например, отсюда https://github.com/public-apis/public-apis Все полученные и созданные данные хранить во внутреннем store


Можно использовать ui библиотеки, библиотеки для работы с формой. 
Будет оцениваться подход к заданию, качество и структура кода.
Задача 1. Вывести список продуктов
На странице /products 
вывести весь список продуктов
на карточке должна быть иконка лайка. При нажатии на которую, ставится или убирается like. Иконка должна подкрашиваться, когда проставлен like. 
на карточке должна быть иконка удаления. При нажатии на которую, карточка удаляется.
добавить фильтр для просмотра всех карточек и карточек, добавленных в избранное
контент карточки(текст) должен быть урезан, чтобы у карточек была одинаковая высота
при клике на любом месте карточки (кроме иконки лайка и кнопки удаления) мы должно попадать на отдельную страницу карточки.
Задача 2. Страница продукта
На странице /products/:id 
вывести более подробную информацию о продукте. 
сделать кнопку для перехода на основную страницу
Задача 3. Создание продукта
На отдельной странице /create- product реализовать создание продукта
создать форму с полями. Поля обязательные и с минимальной валидацией.
при отправке формы, сохранить данные в общий store.


Бонусы
Реализовать пагинацию списка
Реализовать возможность редактирования карточки продукта
Реализовать дополнительную фильтрацию
Реализовать поиск (без кнопки отправки) 

В каком формате сдавать?
Ссылка на GitHub + проект, выложенный на GitHub Pages (ВНИМАНИЕ! Работа будет приниматься только с ссылкой на деплой).
Сроки - до 7 дней.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
