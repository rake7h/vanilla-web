(() => {
  const D = document;
  const listViewContainer = D.getElementById("list-view");

  listViewContainer.addEventListener("click", (e) => {
    const elm = e.target;
    // https://stackoverflow.com/a/4878963/6191368
    if (elm.tagName == "LI") {
      const headElm = D.querySelector("h2");
      /**
       * textContent:= is all text contained by an element and all its children that are for formatting purposes only.
       * innerText:= returns all text contained by an element and all its child elements.
       * innerHtml:= returns all text, including html tags, that is contained by an element.
       * */
      headElm.innerHTML = elm.textContent;
    }
  });
})();
