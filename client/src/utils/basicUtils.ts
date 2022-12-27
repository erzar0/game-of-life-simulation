function parseHtmlString(htmlString: string): Node {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = htmlString;
  return wrapper.firstChild as Node;
}

export { parseHtmlString };
