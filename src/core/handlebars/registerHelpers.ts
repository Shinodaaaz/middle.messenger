import Handlebars from "handlebars";
import { helpers } from "./helpers";

export function registerHelpers() {
  Object.entries(helpers).forEach(([name, fn]) => {
    Handlebars.registerHelper(name, fn);
  });
}
