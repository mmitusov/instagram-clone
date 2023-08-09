tailwindCSS
npm i sass
npm install -D @tailwindcss/forms
npm install --save-dev tailwind-scrollbar
npm install --save-dev tailwind-scrollbar-hide 
npm install @heroicons/react
npm install --save-dev @faker-js/faker
npm install next-auth
npm install firebase

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

***What are providers in NextAuth and why should I use them?***
In the context of the NextAuth library you're using for authentication in your Next.js app, the providers are configurations that define the authentication methods or strategies you want to make available for users to log in to your application.

Each authentication provider represents a specific authentication service or platform (like Google, GitHub, Facebook, etc.), and it allows users to use their credentials from those platforms to authenticate with your application. These providers handle the authentication flow, token exchange, and other necessary steps behind the scenes.

In your provided code snippet, you've imported the GoogleProvider from NextAuth and added it to the providers array. This configuration specifies that you want to enable Google-based authentication in your app. You've also provided the clientId and clientSecret which are required for communicating with Google's authentication API.

For example, if you later decide to enable GitHub-based authentication in your app, you would import the GitHubProvider from NextAuth and add it to the providers array alongside the GoogleProvider. This way, your app will offer both Google and GitHub as authentication options.

By using authentication providers, you can offer users a variety of ways to log in to your app without having to implement the intricate details of each authentication service yourself. NextAuth abstracts the complexities of authentication flows, token management, and user data retrieval, making it much easier to integrate various authentication methods into your application.

In summary, the providers array in NextAuth's configuration is where you define which external authentication services your app will support, and by setting up these providers, you allow your users to log in using their existing accounts on platforms like Google, GitHub, and more.