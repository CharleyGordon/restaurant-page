import pubsub from "./pubsub";

import homePage from "../templates/home-page.html";

import menu from "../templates/menu.html";

import contact from "../templates/contact.html";

import convertHtml from "./convertHtml";

import getPages from "./getPages";

const pageHandler = {
  home: homePage,
  menu,
  contact,
};

document.querySelector("nav").addEventListener("click", getPages);

const injectHtml = function (parent, target = "home") {
  console.dir(pageHandler);
  console.dir(pageHandler[target]);
  const article = parent.querySelector("article");
  if (article) {
    article.remove();
  }
  parent.append(convertHtml(pageHandler[target]));
};
pubsub.subscribe("pageChanged", injectHtml);

export default injectHtml;
