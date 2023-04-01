import pubsub from "./pubsub";

const getPages = function (event) {
  const section = event.target.closest("a") ?? event.target.querySelector("a");
  const content = section.closest("#content");
  if (section) {
    const link = section.dataset.refference;
    pubsub.publish("pageChanged", content, link);
    // return href;
  }
};

// pubsub.subscribe("pageRequest", getPages);

export default getPages;
