import Handlebars from 'handlebars';
import renderDOM from '@/core/rendoDom';
import { registerHelpers } from '@/core/handlebars/registerHelpers';
import * as Components from './components';
import * as Pages from './pages';
import './styles/main.styl';

const pages = {
  signIn: [Pages.SignInPage],
  signUp: [Pages.SignUpPage],
  notFound: [Pages.NotFoundPage],
  serverError: [Pages.ServerErrorPage],
  chat: [Pages.ChatPage],
  settingsAccountDetails: [Pages.SettingsAccountDetailsPage],
  settingsChange: [Pages.SettingsChangePage],
  navigate: [Pages.NavigatePage],
};

registerHelpers();

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  // @ts-expect-error: pages[page] может быть undefined, но мы это контролируем
  const [source, context] = pages[page];
  if (typeof source === 'function') {
    // eslint-disable-next-line new-cap
    renderDOM(new source({}));
    return;
  }

  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('navigate'));

document.addEventListener('click', (e) => {
  // @ts-expect-error: getAttribute может вернуть null, но мы проверяем наличие
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
