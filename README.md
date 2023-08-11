tailwindCSS
npm i sass
npm install -D @tailwindcss/forms
npm install --save-dev tailwind-scrollbar
npm install --save-dev tailwind-scrollbar-hide 
npm install @heroicons/react
npm install --save-dev @faker-js/faker
npm install next-auth
npm install firebase
npm install recoil
npm install @headlessui/react@latest

.gitignore:
.env.local
firebase-config.js

Спева почистим проект и оставим только _app.tsx, index.tsx и глобальные стили.

Далее подумаем из каких основных частей будет состоять приложение. Будет состоять из хедера, новостной ленты (Feed), и модального окна. Начем с хедера.

Сперва займемся дизайном хедера. Хедер будет состоять из 3-х частей: лого, поиск и меню иконок. При чем работая с формой поиска, если мы хотим задать ей стили при помощи tailwind, то нам нужно установить доп библиотеку - @tailwindcss/forms. Она позволяет перезаписывать стили форм/инпутов при помощи tailwind. Без нее этого сделать нельзя. После ее установки, ее нужно добавить в tailwind.config.js, поле - plugins: [require("@tailwindcss/forms")].

Для хедера также создадим сustom tailwind utility class, под названием .navButton. Кастомные классы располагаются в globals.scss.

Далее займемся дизайном новостной ленты. Лента будет сосотоять из сторисов в верху ленты, из перечня постов под сторисами, мини профилем юзера справа от отновной ленты. И справа также будут распологаться рекомендации. Чтобы распредились компоненты мы воспользуемся css-grid. Для центровки будем использовать "mx-auto" -  since we're not using flex but grid.

Чтобы заполнить наше приложение реалистическим набором юзеров и информацией - мы воспользуемся библиотекой "faker". Спева применем "faker" для Srories. 

При стилизировании Srories можно воспользоваться небольшим трюком. Если мы хотим чтобы надпись текста под картинкой не был шире самой картинки, а весь текст, что не влез сократился до троеточия ("..."), то нужно сделать ширину `<p/>` такойже как и и картинки под ним, а также задать параметр truncate (для троеточия): className='text-xs w-14 truncate'.

Чтобы стилизировать кастомный скроллбар для наших Srories, нужно будет установить библиотеку 'tailwind-scrollbar'. После чего добавить ее в tailwind.config.js, в поле "plugins". После чего мы сможем применять такие новые стили, как например - "scrollbar-thin". Чтобы новые стили подгрузились, возможно прийдется перезапустить приложение. И также дополнительно установим "tailwind-scrollbar-hide", который даст нам возможность вообще скрывать скроллбар, там где мы этого хотим.

Далее займемся постами и создадим компонет - Posts. В нем будел использовать карточку для отрисовки отдельного поста. Пока займемся только визуальной частью, а функционал подключим позже.

После этого можно приступить к верстке мини профиля юзера (MiniProfile) и рекомендациям (Suggestions), что будут находится правее от основной ленты.

После завершения верстки основного дизайна, далее мы приступим к логике по аутентификации юзера. Для этого мы воспользуемся NextAuth.js и Firebase.

NextAuth инициализируем в 'pages/api/auth/[...nextauth].ts' файле. В NextAuth в качестве провайдера мы воспользыемся Гуглом. Google's authentication API мы возмем из созданого нами проекта на Firebase.

Firebase инициализируем в 'firebase-config.js' файле, и там же подтянем нужные нам SDK: getFirestore, getStorage. При инициализации Firebase соеденения в SSR среде (NextJS), нам дополнительно нужно будет воспользоваться getApps и getApp: `const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();`.

Далее на вебстранице Firebase, зайдем в созданный проект и выберем метод аунтефикации через Google. После чего из Sign-in провайдера скопируем 'Web SDK configuration' и сохраним его в глобальные переменные, в `.env.local`. Web SDK configuration мы используем в '[...nextauth].ts' файле.

LogIn/SignUp сраничка может быть двух видов. Стандартная страница от NextAuth "из коробки" и кастомная страница которую мы можем создать сами. В нашем случае мы создадим собственную кастомную страницу. Так как мы создаемя собственную страницу, впоследствии нам нужно будет указать к ней путь, чтобы NextAuth знал какая страница у нас отвечает за LogIn/SignUp.

NextJS рекомендует чтобы мы создали нашу кастомную LogIn/SignUp страницу по следующему пути 'pages/auth/signin.tsx'.

В 'pages/auth/signin.tsx' нам нужно будет воспользоваться `getServerSideProps()`. В последней версии NextJS (которую я и использую), появилась возможность фетчить данные напрямую, без надобности использовать `getServerSideProps()`. Нам просто нужно сделать наш компонент асинхронным: `const signInPage = async () => {}`. Однако, это доступно только используя новую систему роутинга - App Router. А так как я использую /pages вместо /app, то мне на данный момент данный функционал недоступен. Хоть, повторюсь, я и использую последнюю версию NextJS. 

Если же попытатья применить новый синтаксис к /pages, то получим [Error: Objects are not valid as a React child (found: [object Promise]).](https://flaviocopes.com/fix-the-objects-are-not-valid-as-a-react-child-error/).

После того как мы дописали 'signin.tsx', при нажатии "Войти с Гугл" у нас выбъет ошибку. Это нормально. Нам просто нужно будет настроить API ключи на Google Cloud для OAuth 2.0 Client IDs. Сперва нам нужно зайти в Google Cloud под тем же аккаунтом, под которым мы создавали проект на Firebase. После этого в списке проектов мы увидем имя нашего проекта из Firebase. Выбираем его. Переходим в раздел APIs & Services. А далее в Credentials. В поле OAuth 2.0 Client IDs выбираем редактирование ключа. И добавляем URL и URI по которому распологается наше приложение, чтобы гугл мог добавить эти ссылки как разрешенные для аунтефикации. URI мы можем взять из окна ошибки которая отображалась ранее (redirect_uri: ... ). Кликаем "Сохранить" и все должно работать.

Теперь обернем самы родительский компонент "_app.tsx", в `<SessionProvider session={session}>`, чтобы мы могли считавать состояния сессии во всем нашем приложении. Теперь в любой части приложения мы имеем доступ к сессии: `const { data: session } = useSession()`. 'data: session' - renaming 'data' to 'session'. Also NextAuth goes with pre-build signIn, signOut functions - `import { useSession, signIn, signOut } from "next-auth/react"`.

Чтобы заредеректить юзера на домашнюю страницу после Логина/Логаута, согласно документации, в '[...nextauth].ts' я добавил следующее поле:
```
callbacks: {
  async redirect() {
    return '/'
  }
}
```

Также в корне папки '/src', я создам 'middleware.ts' файл. В этой файле мы укажем к каким страницам будет иметь доступ незарегестрированный юзер, а к каким нет. И если юзер не имеет доступ, то на какую страницу его нужно будет его заредеректить.

Более детальные заметки о редиректе и защищенных страницах указаны в middleware.ts.

Далее мы расширим/кастомизируем перечень информации которую мы получаем с бека. И которую мы в последствии вытягиваем из `const { data: session } = useSession()`. Для этого мы модифицируем session колбек в [...nextauth].ts. В параметре "callbacks" мы возьмем session информацию и добавим новое поле - session.user.username. Это будет наше имя, которое мы вручную переделали в никнейм.

После чего обновим наши данные в Srories.tsx и MiniProfile.tsx, там где они ранее были захардкожены.

Повесим роутинг на кнопку Домой и Лого приложения в хедере.

Далее установим глобальный стейт под названием 'recoil'. Он поможет нам в дальнейшем в реализации кнопки по загрузки фотографий юзера. Отдельные слайсы/атомы стейта мы будем хранить в папке store. Чтобы пользоваться стейтом нужно воспользоваться хуком- `const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);`. Чтобы не возникало ошибок, в .env нужно добаваить - RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED=false.

Далее займемся модальным окном и создадим Modal.tsx.

За дизайн окна будет отвечать @headlessui/react@latest. P.S. При нажатии на выбраную картинку сделаем так, чтобы она очищалась и мы могли выбрать другую.

После верстки Модального окна, внутри модального компонента, также добавим функцию по выгрузке всей собраной инфы на Firestore DB. Чтобы впоследствии мы могли отобразить новый пост в новостной ленте. Сперва создадим DB в Firestore.
 
1) create a post and add it to 'firestore store' 'posts' collection
2) get the post ID for the newly created post
3) upload the image to 'firebase storage' with the post ID
4) get a download URL from firebase storage and update the original post with URL of our image

await new Promise((resolve) => {
  setTimeout(() => {
    console.log('Yooooooooo!'); // This will be called after 3 seconds
    resolve();
  }, 3000);
});

const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files) return;
  // setSelectegImg(URL.createObjectURL(e.target.files[0]))

  const reader = new FileReader();
  reader.readAsDataURL(e.target.files[0])
  reader.onload = (readerEvent) => {
    setSelectegImg(readerEvent?.target?.result)
  }
}