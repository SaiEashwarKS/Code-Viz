// const getStructsInfo = (structures) => {
//   let structs = [];
//   for (let struct in structures) {
//     let structObj = {};
//     structObj["structName"] = struct;
//     structObj["fields"] = structures[struct].fields;
//     structs.push(structObj);
//   }
//   return structs;
// };

// import ace from "react-ace";

var graphs = [];
var graphIds = {};
const getStructsInfo = (structures) => {
  let structs = {};
  for (let struct in structures) {
    structs[struct] = structures[struct].fields;
    if (structures[struct]["datastructure"] === "graph") {
      graphs.push(struct);
    }
  }
  return structs;
};

const createNode = (nodeName, label, shape = `record`, connection = "") => {
  return `"${nodeName}" [
            label = "${label}"
            shape = "${shape}"
        ];
        ${connection}
        `;
};

const makePtrConnection = (from, to, label = "") => {
  if (from && to) {
    return `${from} -> ${to}[label="${label}"]`;
  }
  return "";
};

const createStructNode = (variable) => {
  if (graphs.includes(variable.data_type)) {
    return createGraphNode(variable);
  }
  const structName = variable.data_type;
  let nodeName = `node${variable.id}`;
  let label = ``;
  let ptrConnection = ``;
  for (let fieldIdx in structs[structName]) {
    if (label !== ``) {
      label += `|`;
    }
    let field = variable.val[fieldIdx];
    let fieldName = structs[structName][fieldIdx].name;
    let fieldType = structs[structName][fieldIdx].type;
    // label += `<f${fieldIdx}> ${fieldName}`;
    label += `<f${fieldIdx}>`;
    // let ptrConnection = ``;
    switch (fieldType) {
      case "var":
        // label += `: ${field[fieldName]}`;
        console.log(field)
        label += `${field[fieldName]}`;
        break;
      case "ptr":
        switch (field[fieldName]) {
          case "N":
            // label += `: NULL`;
            label += `Null`;
            break;
          case "U":
            // label += `: Undefined`;
            label += `Undef`;
            break;
          default:
            ptrConnection += makePtrConnection(
              `${nodeName}:f${fieldIdx}`,
              // `${nodeName}:f0`,
              // `node${field[fieldName]}:f0
              `node${field[fieldName]}:f${fieldIdx}
              `
            );
        }
        break;
      default:
        break;
    }
  }
  return createNode(nodeName, label, `record`, ptrConnection);
};

const createGraphNode = (variable) => {
  const graphName = variable.data_type;
  graphIds[Number.parseInt(variable.id)] = graphName;
  const graphNameNoSpace = graphName.replace(" ", "");
  let graph = `subgraph cluster_${graphNameNoSpace}{\ncolor=black\n`;
  for (let valIdx in variable.val) {
    const vals = variable.val[valIdx];
    const vertexWeights = vals["vertex_weights"];
    // console.log('vertexWeights', vertexWeights);
    const edgeWeights = vals["edge_weights"];
    // console.log('edgeWeights', edgeWeights)
    for (const vertexIdx in vertexWeights) {
      const nodeId = `${graphNameNoSpace}${vertexIdx}`;
      const nodeName = `node_${nodeId}`;
      // console.log(nodeName);
        graph += `${nodeName}[label="${vertexWeights[vertexIdx]}"];\n`;
        const edges = edgeWeights[vertexIdx];
        for (const edgeIdx in edges) {
          const weight = `${edges[edgeIdx]}`;
          if (weightIsNonEmpty(Number.parseFloat(weight))) {
            const toNode = `node_${graphNameNoSpace}${edgeIdx}`;
            graph += makePtrConnection(nodeName, toNode, weight);
            graph += `;\n`;
          }
        }
    }
  }
  graph += `}\n`;
  return graph;
};

const weightIsNonEmpty = (weight) => {
  return weight > 0;
};

const createStackvar = (variable) => {
  if (variable.data_type.includes("struct")) {
    return createStructNode(variable);
  }
  const nodeName = `node${variable.id}`;
  const label =
    variable.name !== undefined
      ? `<f0> ${variable.name}: ${variable.val}`
      : `${variable.val}`;
  return createNode(nodeName, label);
};

const createStackPtr = (variable) => {
  const nodeName = `node${variable.id}`;
  let label = `<f0> ${variable.name}`;
  let ptrConnection = ``;
  switch (variable.val) {
    case "N":
      label += `: Null`;
      break;
    case "U":
      label += `: Undef`;
      break;
    default:
      ptrConnection = makePtrConnection(
        `${nodeName}:f0`,
        `node${variable.val}:f0`
      );
  }
  return createNode(nodeName, label, `record`, ptrConnection);
};

const getStackFrameNode = (data) => {
  var nodes = ``;
  for (let contentsIdx in data.Contents) {
    let variable = data.Contents[contentsIdx];
    switch (variable.type) {
      case "var":
        nodes += createStackvar(variable);
        break;
      case "ptr":
        nodes += createStackPtr(variable);
        break;
      default:
        nodes += ``;
    }
    nodes += `\n`;
  }
  return nodes;
};

const nodesAreDifferent = (nodeA, nodeB) => {
  return JSON.stringify(nodeA) !== JSON.stringify(nodeB);
};

const graphChangingId = (nodeA, nodeB) => {
  if (nodeA.id !== nodeB.id) return null;
  return null;
};

/**
 * @description compares contents (On^2) and returns an array of ids of changing nodes
 */
const addChangingContentNodes = (prevContents, currContents) => {
  let changingIds = [];
  for (let prevIdx in prevContents) {
    var prevNode = prevContents[prevIdx];
    for (let currIdx in currContents) {
      var currNode = currContents[currIdx];
      if (prevNode?.id === currNode?.id) {
        if (nodesAreDifferent(prevNode, currNode)) {
          let changingId = prevNode.id;
          if (
            Object.keys(graphIds).includes(prevNode.id) ||
            Object.keys(graphIds).includes(prevNode.id.toString())
          ) {
            changingId = graphChangingId(prevNode, currNode);
          }
          if (changingId !== null) {
            didHighlightNode = true;
            changingIds.push(changingId);
          }
        }
      }
    }
  }
  if (changingIds.length) {
    // console.log(changingIds);
    highlightNodes.push(changingIds);
  }
};

const addChangingNodes = (prevLineData, lineData) => {
  for (let i = 0; i < prevLineData.length; ++i) {
    addChangingContentNodes(prevLineData[i]?.Contents, lineData[i]?.Contents);
  }
};

var structs;

const initialDigraph = `digraph code_viz {
graph [
rankdir = "LR"
];
node [
fontsize = "16"
shape = "ellipse"
];
edge [
];
`;

var highlightNodes = []; //each elelment of the array is an array of ids of nodes whose values are changing from one line to another
var didHighlightNode = false;

export const getDigraphs = (input) => {
  const json = JSON.parse(input);
  structs = getStructsInfo(json.Structures);
  let digraphs = [];
  let lineNos = [];
  let prevLineNo = 0;
  let prevDigraph = initialDigraph;
  let prevLineDatas = [];
  let currLineDatas = [];
  let lineDataIdx = 0;
  while (lineDataIdx < json.Lines_Data.length) {
    didHighlightNode = false;
    let lineData = json.Lines_Data[lineDataIdx];
    // console.log(lineData)
    let currLineNo = parseInt(lineData.LineNum);
    if (currLineNo !== prevLineNo) {
      // if (prevLineDatas.length) {
      addChangingNodes(prevLineDatas, currLineDatas);
      if (didHighlightNode) {
        digraphs.push("highlightNode");
      }
      // dehighlightLine();
      prevDigraph += `}`;
      digraphs.push(prevDigraph);
      lineNos.push(prevLineNo);
      prevLineNo = currLineNo;
      prevDigraph = initialDigraph;
      prevLineDatas = currLineDatas;
      currLineDatas = [];
      // }
    } else {
      currLineDatas.push(lineData);
      const node = getStackFrameNode(lineData);
      // console.log(lineData, node)
      if (node) {
        prevDigraph += node;
      }
      ++lineDataIdx;
    }
    // console.log("prevDG", prevDigraph);
  }
  prevDigraph += `}`;
  // console.log(prevDigraph);
  digraphs.push(prevDigraph);
  lineNos.push(prevLineNo);
  // console.log(digraphs);
  return {
    digraphs: digraphs,
    lineNos: lineNos,
    highlightNodes: highlightNodes,
  };
};
