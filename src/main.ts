import Handlebars from "handlebars";
import * as Components from './components';
import * as Pages from './pages';
import './styles/main.styl'

// @ts-ignore
const pages = {
  'sign-in': [Pages.SignInPage],
  'sign-in-errors': [Pages.SignInPage, {
    loginError: 'Invalid login',
  }],
  'sign-up': [Pages.SignUpPage],
  'sign-up-errors': [Pages.SignUpPage, {
    passwordError: 'Passwords don\'t match'
  }],
  'not-found': [Pages.NotFoundPage],
  'server-error': [Pages.ServerErrorPage],
  'chat': [Pages.ChatPage, {
    chatList: [
      {
        nickName: 'Alex',
        online: true,
        hasStatus: true,
        lastMessageCount: 3,
      },
      {
        nickName: 'Sonia',
        message: 'Meow',
        online: true,
        hasStatus: true,
        avatarUrl: "https://image.winudf.com/v2/image/bW9iaS5hbmRyb2FwcC5wcm9zcGVyaXR5YXBwcy5jNTExMV9zY3JlZW5fN18xNTI0MDQxMDUwXzAyMQ/screen-7.jpg?fakeurl=1&type=.jpg",
        activeCard: true,
        lastMessageCount: 3,
      },
      {
        nickName: 'Norman',
        message: 'Hello? World?',
        hasStatus: true,
        avatarUrl: 'https://avatars.mds.yandex.net/i?id=4fcc0778aea0031dc42a9069daf3afeb_l-5409727-images-thumbs&n=13',
        yourMessage: true,
      },
      {
        nickName: 'Aaron',
        message: 'Sharingan?!',
        hasStatus: true,
        isOnline: false,
        avatarUrl: "https://i.pinimg.com/736x/a2/be/84/a2be8451ee40d2d46448df6346a52edf.jpg"

      }
    ],
    selectedDialog: 1,
    dialogMessages: [
      {
        incoming: true,
        messageText: 'Lorem ipsum dolor sit amet...'
      },
      {
        outgoing: true,
        messageText: 'Ok'
      }
    ]
  }],
  'chat-empty': [Pages.ChatPage],
  'chat-with-popup':[Pages.ChatPage, {
    chatList: [
      {
        nickName: 'Alex',
        online: true,
        hasStatus: true,
        lastMessageCount: 3,
      },
      {
        nickName: 'Sonia',
        message: 'Meow',
        online: true,
        hasStatus: true,
        avatarUrl: "https://image.winudf.com/v2/image/bW9iaS5hbmRyb2FwcC5wcm9zcGVyaXR5YXBwcy5jNTExMV9zY3JlZW5fN18xNTI0MDQxMDUwXzAyMQ/screen-7.jpg?fakeurl=1&type=.jpg",
        activeCard: true,
        lastMessageCount: 3,
      },
      {
        nickName: 'Norman',
        message: 'Hello? World?',
        hasStatus: true,
        avatarUrl: 'https://avatars.mds.yandex.net/i?id=4fcc0778aea0031dc42a9069daf3afeb_l-5409727-images-thumbs&n=13',
        yourMessage: true,
      },
      {
        nickName: 'Aaron',
        message: 'Sharingan?!',
        hasStatus: true,
        isOnline: false,
        avatarUrl: "https://i.pinimg.com/736x/a2/be/84/a2be8451ee40d2d46448df6346a52edf.jpg"

      }
    ],
    selectedDialog: 1,
    dialogMessages: [
      {
        incoming: true,
        messageText: 'Lorem ipsum dolor sit amet...'
      },
      {
        outgoing: true,
        messageText: 'Ok'
      }
    ],
    popupActive: true,
  }],
  'settings-account-details': [Pages.SettingsAccountDetailsPage,
    {
      title: 'Account',
      avatarUrl: '',
      mainHeaderIcon: "user-avatar",
      userName: 'Сергей',
      online: true,
      size: 'l',
      accountSettingsActive: true,
      popupActive: null,
      avatarUploaded: null,
    },
  ],
  'settings-change-password': [Pages.SettingsChangePage,
    {
      title: 'Security',
      avatarUrl: '',
      mainHeaderIcon: "security",
      userName: 'Сергей',
      online: true,
      size: 'l',
      securitySettingsActive: true,
    },
  ],
  'nav': [ Pages.NavigatePage],
};

Object.entries(Components).forEach(([name, template]) => {
  Handlebars.registerPartial(name, template);
});

Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});
function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app');

  const templatingFunction = Handlebars.compile(source);
  //@ts-ignore
  container.innerHTML = templatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});