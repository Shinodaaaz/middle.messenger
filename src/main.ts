import Handlebars from "handlebars";
import * as Components from "./components";
import * as Pages from "./pages";
import renderDOM from "@/core/rendoDom.ts";
import './styles/main.styl'
import {registerHelpers} from "@/core/handlebars/registerHelpers.ts";

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
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  if (typeof source === "function") {
    renderDOM(new source({}));
    return;
  }

  const container = document.getElementById("app")!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("navigate"));

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target.getAttribute("page");
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
