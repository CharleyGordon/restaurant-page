const adjustNav = function () {
  const nav = document.querySelector("#content nav");
  const root = document.querySelector(":root");
  root.style.setProperty("--nav-height", `${nav.offsetHeight}px`);
};
window.addEventListener("resize", adjustNav);
export default adjustNav;
