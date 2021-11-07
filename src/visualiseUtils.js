import Viz from "./viz.js/viz.es.js";
import { input } from "./viz.js/input.js";
// import { getDigraphs, highlightLine, dehighlightLine } from "./viz.js/utils.js";
import { getDigraphs } from "./viz.js/utils.js";
import { Colors } from "./colors.js";
import { defaultConfig } from "./config";

var viz = new Viz({ workerURL: "./viz.js/full.render.js" });
const { digraphs, lineNos, highlightNodes } = getDigraphs(input);
// const canvas = document.getElementById("canvas");
var canvas;
var highlightLine;
let idx = 0;
let line_idx = 1;

let max_line_idx = 0;
let max_line_idx_h = 0;
for (let t = 0; t < digraphs.length; t++) {
  if (digraphs[t] !== "highlightNode") ++max_line_idx;
  else max_line_idx_h += 1;
}

// const visualise = async () => {
//   if (!canvas) return;
//   let i = 1;
//   let lineIdx = 1;
//   while (i < digraphs.length) {
//     canvas.innerHTML = "";
//     let digraph = digraphs[i];
//     // dehighlightLine();
//     // highlightLine(lineNos[lineIdx]);
//     highlightLine?.(lineNos[lineIdx]);
//     viz.renderSVGElement(digraph).then(async function (element) {
//       canvas.appendChild(element);
//     });
//     await new Promise((resolve) => setTimeout(resolve, 2500));
//     if (digraphs[i + 1] === "highlightNode") {
//       canvas.innerHTML = "";
//       let coloredDigraph = colorNodes(digraph);
//       // dehighlightLine();
//       // highlightLine(lineNos[lineIdx + 1]);
//       highlightLine?.(lineNos[lineIdx + 1]);
//       viz.renderSVGElement(coloredDigraph).then(async function (element) {
//         canvas.appendChild(element);
//       });
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       i++;
//     }
//     i++;
//     lineIdx++;
//   }
// };

const visualise_1 = async () => {
  // console.log("digraphs after",digraphs)
  if (!canvas) return;
  // console.log("visualise1 idx=", idx, " line_idx=", line_idx);
  canvas.innerHTML = "";
  let digraph = digraphs[idx];
  // dehighlightLine();
  highlightLine?.(lineNos[line_idx]);
  visualiseDigraph(digraph);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  // console.log("middle");
  if (digraphs[idx + 1] === "highlightNode") {
    canvas.innerHTML = "";
    let coloredDigraph = colorNodes(digraph);
    // dehighlightLine();
    highlightLine?.(lineNos[line_idx + 1]);
    visualiseDigraph(coloredDigraph);
    await new Promise((resolve) => setTimeout(resolve, 500));
    idx++;
  }
  idx++;
  line_idx++;
};

const visualiseDigraph = (digraph) => {
  digraph = addConfigDigraph(digraph);
  // console.log(digraph);
  viz.renderSVGElement(digraph).then(async function (element) {
    canvas.appendChild(element);
  });
};

export const step_forward = async () => {
  if (idx < digraphs.length) {
    // console.log("vis forward idx=", idx, " line_idx=", line_idx);
    
    if(digraphs[idx]!=="highlightNode")
    {
    canvas.innerHTML = "";
    let digraph = digraphs[idx];
    // dehighlightLine();
    highlightLine(lineNos[line_idx]);
    visualiseDigraph(digraph);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    }
  
    if (digraphs[idx + 1] === "highlightNode") {
      highlightNodesIdx += 1;
      idx++;
    }
    idx++;
    line_idx++;
  }
};

export const step_backward = async () => {
  if (idx > 1) {
    // console.log("vis backward 1 idx=",idx," line_idx=",line_idx);
    if (digraphs[idx - 1] === "highlightNode") {
      idx -= 2;
      highlightNodesIdx -= 1;
    } else idx -= 1;
    line_idx--;
    if (digraphs[idx - 1] === "highlightNode") {
      idx -= 2;
      highlightNodesIdx -= 1;
    } else idx -= 1;
    line_idx--;
    // console.log("vis backward 2 idx=",idx," line_idx=",line_idx);
    step_forward();
  }
};

let play = 0;
export const vis_play = async () => {
  console.log("digraphs :",digraphs)
  // console.log("vis play idx=", idx, " line_idx=", line_idx);
  if (play === 0) play = 1;
  while (idx < digraphs.length && play) {
    canvas.innerHTML = "";
    let digraph = digraphs[idx];
    highlightLine(lineNos[line_idx]);
    visualiseDigraph(digraph);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    if (digraphs[idx + 1] === "highlightNode") {
      canvas.innerHTML = "";
      let coloredDigraph = colorNodes(digraph);
      // console.log('prev\n', digraphs[idx], 'curr\n',  digraphs[idx+2], 'color\n', coloredDigraph)
      // dehighlightLine();
      highlightLine(lineNos[line_idx + 1]);
      visualiseDigraph(coloredDigraph);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      idx++;
    }
    idx++;
    line_idx++;
  }
  play = 0;
};

export const vis_pause = async () => {
  // console.log("vis pause idx=", idx, " line_idx=", line_idx);
  play = 0;
};

export const skip_to_beginning = async () => {
  // idx = 1;
  // line_idx = 1;
  //  =highlightNodesIdx 0;

  // console.log("vis skip backward before idx=", idx, " line_idx=", line_idx);
  idx = 1;
  line_idx = 1;
  highlightNodesIdx = 0;
  if (digraphs[idx] === "highlightNode") {
    idx++;
    highlightNodesIdx += 1;
  }
  line_idx++;
  // visualiseInitialStack();
  step_forward();
  // startVisualisation();
  // visualise_1();
  // console.log("vis skip backward after idx=", idx, " line_idx=", line_idx);
};

export const skip_to_end = async () => {
  // console.log("vis skip forward before idx=", idx, " line_idx=", line_idx);
  idx = digraphs.length - 1;
  line_idx = max_line_idx;
  let highlightNodesIdx_difference = max_line_idx_h - highlightNodesIdx;
  highlightNodesIdx += highlightNodesIdx_difference;
  step_forward();
  // console.log("vis skip forward after idx=", idx, " line_idx=", line_idx);
};

const addConfigDigraph = (digraph) => {
  const { Colors, fontSize } = config;
  let newDigraph = digraph.replaceAll(`$fontColor`, Colors.black);
  newDigraph = newDigraph.replaceAll(`$edgeColor`, Colors.black);
  newDigraph = newDigraph.replaceAll(`$bgColor`, Colors.white_2);
  newDigraph = newDigraph.replaceAll(`$fontSize`, fontSize);
  return newDigraph;
};

const addHighlightedNodes = (nodeIds) => {
  let res = ``;
  nodeIds?.forEach((nodeId) => {
    res += `${nodeId}[
  color="${config.Colors.primary_1}"
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

export const visualiseInitialStack = async (canvasRef) => {
  canvas = canvasRef.current;
  if (!canvas) return;
  if (lineNos[0] === 0 && digraphs[0] !== "highlightNode") {
    viz
      .renderSVGElement(addConfigDigraph(digraphs[0]))
      .then(async function (element) {
        canvas.appendChild(element);
      });
    idx++;
    if (digraphs[1] === "highlightNode") {
      idx++;
      highlightNodesIdx += 1;
    }
  }
};

export const startVisualisation = () => {
  if (!canvas) return;
  visualise_1();
};

var config = defaultConfig;
export const setConfig = (newConfig) => {
  config = newConfig;
  if (idx > 0) {
    if (digraphs[idx] === "highlightNode"){console.log("Stopped at highlightNode!");}
    if (play) {
      //TODO : pause
      vis_pause();
      //TODO: go to the idx of the digraph currently displayed
      // idx is pointing to the next frame to be visualised
      if (digraphs[idx - 1] === "highlightNode") {
        //if next frame to be visualised is a highlightNode, need to decrement idx twice
        if (digraphs[idx] === "highlightNode"){console.log("Never Stopped at highlightNode!");}
        idx -= 2;
        highlightNodesIdx -= 1;
      } else idx -= 1;
      line_idx--;
      // Now idx is at currently visualised frame, along with highlightNodesIdx and line_idx
      // TODO: call visualiseDigraph(prevDigraph)
      console.log(idx, digraphs[idx]);
      visualiseDigraph(digraphs[idx]);
      //TODO: play
      vis_play();
    } else {
      //TODO :go to the idx of the digraph currently displayed
      // idx is pointing to the next frame to be visualised
      if (digraphs[idx - 1] === "highlightNode") {
        //if next frame to be visualised is a highlightNode, need to decrement idx twice
        idx -= 2;
        highlightNodesIdx -= 1;
      } else idx -= 1;
      line_idx--;
      // Now idx is at currently visualised frame, along with highlightNodesIdx and line_idx
      // TODO: call visualiseDigraph(prevDigraph)
      console.log(idx, digraphs[idx]);
      visualiseDigraph(digraphs[idx]);
    }
  }
};

export const init_variables = (canvasRef, setMarker, config) => {
  canvas = canvasRef.current;
  highlightLine = setMarker;
  config = config;
};
