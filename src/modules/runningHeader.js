import pubsub from "./pubsub";

let currentInterval;

const runningHeader = () => {
  clearInterval(currentInterval);
  if (document.querySelector("#home")) {
    const slogan = document.querySelector(".slogan");
    const sloganWords = "Fresh Nutricious Delicious".split(" ");

    const createWords = () => {
      sloganWords.forEach((word) => {
        const span = document.createElement("span");
        span.classList.add("word");
        span.textContent = word;
        slogan.append(span);
      });
    };

    const loopHeader = () => {
      const word = slogan.querySelector(".word");
      if (!word) {
        createWords();
      }
      const words = slogan.querySelectorAll(".word");
      const current = slogan.querySelector(".current") ?? words[0];
      const next = current.nextElementSibling ?? words[0];
      current.classList.remove("current");
      next.classList.add("current");
    };
    loopHeader();
    currentInterval = setInterval(loopHeader, 5000);
  }
};
pubsub.subscribe("checkHome", runningHeader);
export default runningHeader;
