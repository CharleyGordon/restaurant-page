import pubsub from "./pubsub";

const distinctCurrent = function (nav, current) {
  const anchors = nav.querySelectorAll("a");
  anchors.forEach((item) => {
    item.classList.remove("current");
  });
  nav.querySelector(`[href="#${current}"]`).classList.add("current");
};
pubsub.subscribe("newCurrent", distinctCurrent);
export default distinctCurrent;
