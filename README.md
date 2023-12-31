tailwindCSS
npm install sass
npm install -D @tailwindcss/forms
npm install --save-dev tailwind-scrollbar
npm install --save-dev tailwind-scrollbar-hide 
npm install @heroicons/react
npm install --save-dev @faker-js/faker
npm install next-auth
npm install firebase
npm install recoil
npm install @headlessui/react@latest
npm install react-moment - for time stamps

!!! NEXTAUTH_URL inside .env and URL spesified on the Google Cloud should always be the same as your currecnt domain, e.g.: http://localhost:3000. Otherwise app NextAuth will not run.

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

После верстки Модального окна, внутри модального компонента, также добавим функцию по выгрузке всей собраной инфы на Firestore DB. Чтобы впоследствии мы могли отобразить новый пост в новостной ленте. Сперва создадим DB в Firestore. Создание нового поста состоит из следующих этапов:
1. create a post and add it to 'firestore store' 'posts' collection
2. get the post ID for the newly created post
3. upload the image to 'firebase storage' with the post ID
4. get a download URL from firebase storage and update the original post with URL of our image

Теперь мы подвяжем firebase базу данных к нашему Posts.tsx. При чем посты будут подгружаться в реальном времени для всех юзеров. За подгрузку в реальном времени отвечает WebSocket со стороны firebase. Мы вешаем этот слушатель изменений при помощи "snapshot". И так как мы имеем дело с тем что мы вешаем слушатель событий на useEffect, то нам также нужно вызывать clean-up фунцкцию. clean-up фунцкция уже встроена в onSnapshot. Поэтому нам достаточно просто ее вернуть "return onSnapshot".
```
useEffect(() => {
  return onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), 
    snapshot => {setPosts(snapshot.docs)})
}, [db])
```

Далее приступим к кнопкам "Лайк" и "Комментарии" в 'Posts.tsx'.

Сперва сделаем так, чтобы незарегестрированный юзер не видел секцию с коментариями и лайками.

Приступим к Комментариям. И начнем с генерации коллекции коментариев на firebase. После этого в режиме реального времени будем их отрендривать. При ренедере постов дополнительно воспользуемся библиотекой "react-moment". Это нам позволит отображать как довно был загружен тот или иной пост.

Приступим к Лайкам. При нажатии на лайк мы будем создавать новый документ в БД с ID юзера как основной ключ, а если мы захотим убрать лайк, то мы просто удалим этот документ. И так как он хранится под ID юзера, нам всегда легко узнать иммется ли лайк в БД или нет.

Также добавим возможность удалять пост при клики на троеточие вверху него.

Все, на этом основной функционал дописан!

***P.S. Типизация кастомной session из [...nextauth].ts***
Когда мы мутируем базовую сессмю в nextauth, нам нужно [указать типизацию новых хранимых данных](https://stackoverflow.com/questions/69602694/how-to-update-the-type-of-session-in-session-callback-in-next-auth-when-using-ty). Для этого создадим новый файл "next-auth.d.ts" и в нем укажем тип новых данных. Далее, если "next-auth.d.ts" находится не в корне проекта, то нужно не забыть указать к нему путь в tsconfig.json ("include": [...]). Таким образом мы глобально подтянем новые созданные типы.