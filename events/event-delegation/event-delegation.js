/**
 https://jasonformat.com/event-delegation-vs-direct-binding/
*/

/**
 * textContent:= is all text contained by an element and all its children that are for formatting purposes only.
 * innerText:= returns all text contained by an element and all its child elements.
 * innerHtml:= returns all text, including html tags, that is contained by an element.
 * */

(() => {
  const D = document;
  const listViewContainer = D.getElementById("list-view");

  const handleListClick = (e) => {
    const selectedElm = e.target;

    if (selectedElm === listViewContainer) {
      e.stopPropagation();
    }
    // https://stackoverflow.com/a/4878963/6191368
    if (selectedElm.tagName == "LI") {
      const headElm = D.querySelector("h2");
      headElm.textContent = selectedElm.textContent;
      e.stopPropagation();
    }
  };

  listViewContainer.addEventListener("click", handleListClick);
})();
