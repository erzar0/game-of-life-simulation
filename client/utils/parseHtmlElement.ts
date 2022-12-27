function parseHtmlElement(htmlString: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = htmlString;
  return wrapper.firstChild as HTMLElement;
}

export default parseHtmlElement;
