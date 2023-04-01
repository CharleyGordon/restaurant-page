const convertHtml = function (source) {
  const component = document.createElement("template");
  component.innerHTML = source;
  const page = component.content.cloneNode("true");
  return page;
};
export default convertHtml;
