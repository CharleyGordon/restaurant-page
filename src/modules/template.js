import pubsub from "./pubsub";

import runningHeader from "./runningHeader";

import homePage from "../templates/home-page.html";

import menu from "../templates/menu.html";

import menuOverview from "../templates/menu-overview.html";

import dishes from "./dishes";

import contact from "../templates/contact.html";

import convertHtml from "./convertHtml";

import getPages from "./getPages";

import adjustNav from "./adjustNav";

import distinctCurrent from "./distinctCurrent";

import restoreUrl from "./restoreUrl";

const nav = document.querySelector("#content nav");

adjustNav();

runningHeader();

const pageHandler = {
  home: homePage,
  menu,
  contact,
  menuOverview,
};

const injectHtml = function (parent, target = "home") {
  const article = parent.querySelector("article");
  if (article) {
    if (article.id === target) return;
    article.remove();
  }
  parent.insertBefore(
    convertHtml(pageHandler[target]),
    parent.querySelector("nav")
  );
  pubsub.publish("newCurrent", nav, target);
};
pubsub.subscribe("pageChanged", injectHtml);

const inserOverview = function (event) {
  const menuObj = event.target.closest("#menu");
  const summary = event.target.closest("summary");
  if (menuObj && summary) {
    const sibling = summary.nextElementSibling;
    if (sibling) return;
    const details = summary.closest("details");
    const dishName = summary.querySelector(".dish-name").textContent.trim();
    const menuOverviewObj = convertHtml(menuOverview);
    const ingredients = "ingredients: ".concat(
      dishes.getIngredients(dishName).join(", ")
    );
    menuOverviewObj.querySelector("img").src = dishes[dishName].image;
    menuOverviewObj.querySelector("figcaption").textContent = ingredients;
    details.appendChild(menuOverviewObj);
  }
};

document.querySelector("nav").addEventListener("click", getPages);
document.querySelector("nav").addEventListener("click", runningHeader);
document.body.addEventListener("click", inserOverview);
window.addEventListener("popstate", () => restoreUrl(pageHandler));

export { restoreUrl, pageHandler };
