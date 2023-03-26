import pubsub from "./pubsub";

import runningHeader from "./runningHeader";

import homePage from "../templates/home-page.html";

import menu from "../templates/menu.html";

import contact from "../templates/contact.html";

import convertHtml from "./convertHtml";

import getPages from "./getPages";

runningHeader();

const pageHandler = {
  home: homePage,
  menu,
  contact,
};

document.querySelector("nav").addEventListener("click", getPages);
document.querySelector("nav").addEventListener("click", runningHeader);

const injectHtml = function (parent, target = "home") {
  const article = parent.querySelector("article");
  if (article) {
    article.remove();
  }
  parent.insertBefore(
    convertHtml(pageHandler[target]),
    parent.querySelector("nav")
  );
  pubsub.publish("checkHome");
};
pubsub.subscribe("pageChanged", injectHtml);

export default injectHtml;
