function createSvgElement(elem: string) {
  return document.createElementNS("http://www.w3.org/2000/svg", elem);
}


function createSvgLine(x1: number, x2: number, y1: number, y2: number) {
  const line = createSvgElement("line");
  line.setAttribute("x1", x1.toString());
  line.setAttribute("x2", x2.toString());
  line.setAttribute("y1", y1.toString());
  line.setAttribute("y2", y2.toString());
  line.style.stroke = "gray";
  line.style.strokeWidth = "1";
  return line;
}

function createSvgRectangle(
  x: number,
  y: number,
  width: number,
  height: number,
  color: string
) {
  const rect = createSvgElement("rect");
  rect.setAttribute("x", x.toString());
  rect.setAttribute("y", y.toString());
  rect.setAttribute("width", width.toString());
  rect.setAttribute("height", height.toString());
  rect.style.fill = color;
  return rect;
}

export { createSvgElement, createSvgRectangle, createSvgLine };
