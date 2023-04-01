import pubsub from "./pubsub";

const restoreUrl = function (source) {
  const url = window.location.href.split("#").at(-1);
  console.dir(url);
  if (url in source) {
    return pubsub.publish(
      "pageChanged",
      document.querySelector("#content"),
      url
    );
  }
  return pubsub.publish(
    "pageChanged",
    document.querySelector("#content"),
    "home"
  );
};
export default restoreUrl;
