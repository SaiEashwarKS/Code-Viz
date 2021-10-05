import Viz from "./viz.js/viz.es.js";
import { input } from "./viz.js/input.js";
import { getDigraphs, highlightLine, dehighlightLine } from "./viz.js/utils.js";

var viz = new Viz({ workerURL: "./viz.js/full.render.js" });
const { digraphs, lineNos, highlightNodes } = getDigraphs(input);
const canvas = document.getElementById("canvass");

const visualise = async () => {
  let i = 1;
  let lineIdx = 1;
  while (i < digraphs.length) {
    canvas.innerHTML = "";
    let digraph = digraphs[i];
    dehighlightLine();
    highlightLine(lineNos[lineIdx]);
    viz.renderSVGElement(digraph).then(async function (element) {
      canvas.appendChild(element);
    });
    await new Promise((resolve) => setTimeout(resolve, 2500));
    if (digraphs[i + 1] === "highlightNode") {
      canvas.innerHTML = "";
      let coloredDigraph = colorNodes(digraph);
      dehighlightLine();
      highlightLine(lineNos[lineIdx + 1]);
      viz.renderSVGElement(coloredDigraph).then(async function (element) {
        canvas.appendChild(element);
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      i++;
    }
    i++;
    lineIdx++;
  }
};

const addHighlightedNodes = (nodeIds) => {
  let res = ``;
  console.log(nodeIds);
  nodeIds.forEach((nodeId) => {
    res += `node${nodeId}[
  color="green"
]
`;
  });
  return res;
};

var highlightNodesIdx = 0;
const colorNodes = (digraph) => {
  digraph = digraph.slice(0, -1);
  digraph += addHighlightedNodes(highlightNodes[highlightNodesIdx]) + `}`;
  highlightNodesIdx += 1;
  // console.log(digraph);
  return digraph;
};

const visualiseInitialStack = () => {
  if (lineNos[0] === 0) {
    viz.renderSVGElement(digraphs[0]).then(async function (element) {
      canvas.appendChild(element);
    });
  }
};
visualiseInitialStack();

export const startVisualisation = () => {
  // console.log("highlightNodes", highlightNodes);
  visualise();
};

// visualise();
