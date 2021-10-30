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

// const createStructNode = (variable) => {
//   if (graphs.includes(variable.data_type)) {
//     return createGraphNode(variable);
//   }
//   const structName = variable.data_type;
//   let nodeName = `node${variable.id}`;
//   let label = ``;
//   let ptrConnection = ``;
//   for (let fieldIdx in structs[structName]) {
//     if (label !== ``) {
//       label += `|`;
//     }
//     let field = variable.val[fieldIdx];
//     let fieldName = structs[structName][fieldIdx].name;
//     let fieldType = structs[structName][fieldIdx].type;
//     // label += `<f${fieldIdx}> ${fieldName}`;
//     label += `<f${fieldIdx}>`;
//     // let ptrConnection = ``;
//     switch (fieldType) {
//       case "var":
//         // label += `: ${field[fieldName]}`;
//         label += `${field[fieldName]}`;
//         break;
//       case "ptr":
//         switch (field[fieldName]) {
//           case "N":
//             // label += `: NULL`;
//             label += `Null`;
//             break;
//           case "U":
//             // label += `: Undefined`;
//             label += `Undef`;
//             break;
//           default:
//             ptrConnection += makePtrConnection(
//               `${nodeName}:f${fieldIdx}`,
//               // `${nodeName}:f0`,
//               // `node${field[fieldName]}:f0
//               `node${field[fieldName]}:f${fieldIdx}
//               `
//             );
//         }
//         break;
//       default:
//         break;
//     }
//   }
//   return createNode(nodeName, label, `record`, ptrConnection);
// };

const createGraphNode = (variable) => {
  const graphName = variable.data_type;
  graphIds[Number.parseInt(variable.id)] = graphName;
  let graph = `subgraph cluster_${graphName.replace(
    " ",
    ""
  )}{\ncolor=black;\nlabel="${graphName}";\n`;
  for (let valIdx in variable.val) {
    const vals = variable.val[valIdx];
    const vertexWeights = vals["vertex_weights"];
    const edgeWeights = vals["edge_weights"];
    for (const vertexIdx in vertexWeights) {
      const nodeName = getGraphNodeName(graphName, vertexIdx);
      graph += `${nodeName}[label="${vertexWeights[vertexIdx]}"];\n`;
      const edges = edgeWeights[vertexIdx];
      for (const edgeIdx in edges) {
        const weight = `${edges[edgeIdx]}`;
        if (weightIsNonEmpty(Number.parseFloat(weight))) {
          const toNode = getGraphNodeName(graphName, edgeIdx);
          graph += makePtrConnection(nodeName, toNode, weight);
          graph += `;\n`;
        }
      }
    }
  }
  graph += `}\n`;
  return graph;
};

const getGraphNodeName = (graphName, id) => {
  const graphNameNoSpace = graphName.replace(" ", "");
  return `node_${graphNameNoSpace}_${id}`;
};

const weightIsNonEmpty = (weight) => {
  return weight > 0;
};

// const createStackvar = (variable) => {
//   if (variable.data_type.includes("struct")) {
//     return createStructNode(variable);
//   }
//   const nodeName = `node${variable.id}`;
//   const label =
//     variable.name !== undefined
//       ? `<f0> ${variable.name}: ${variable.val}`
//       : `${variable.val}`;
//   return createNode(nodeName, label);
// };

const createStructNode = (variable) => {
  //const structName = variable.data_type;
  if (graphs.includes(variable.data_type)) {
    return createGraphNode(variable);
  }
  let nodeName = `node${variable.id}`;
  let label = ``;
  let ptrConnection = ``;

  for (let fieldIdx in variable.val) {
    if (label !== ``) {
      label += `|`;
    }
    let field = variable.val[fieldIdx];

    let fieldName = "";
    if ("name" in variable.val[fieldIdx]) {
      fieldName = variable.val[fieldIdx].name;
    }

    let fieldType = variable.val[fieldIdx].type;
    // label += `<f${fieldIdx}> ${fieldName}`;

    label += `<f${fieldIdx}>`;
    // let ptrConnection = ``;
    switch (fieldType) {
      case "var":
        // label += `: ${field[fieldName]}`;
        label += `${field.val}`;
        break;
      case "ptr":
        switch (field.val) {
          case "N":
            // label += `: NULL`;
            label += `⏚`;
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
              `node${field.val}
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

const createStackvar = (variable) => {
  if (
    ["int", "float", "char", "str"].find(
      (ele) => ele === variable.data_type
    ) === undefined
  ) {
    //add other basic types to the array
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
      label += `: ⏚`;
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

const getChangingVerticesIds = (nodeA, nodeB) => {
  const graphName = nodeA.data_type;
  const vertexWeightsA = nodeA.val[0].vertex_weights;
  const vertexWeightsB = nodeB.val[0].vertex_weights;
  let res = [];
  for (const vertexIdx in vertexWeightsA) {
    if (vertexWeightsA[vertexIdx] !== vertexWeightsB[vertexIdx]) {
      res.push(getGraphNodeName(graphName, vertexIdx));
    }
  }
  return res;
};

const getChangingEdgeWeightsIds = (nodeA, nodeB) => {
  const graphName = nodeA.data_type;
  const edgeWeightsA = nodeA.val[0].edge_weights;
  const edgeWeightsB = nodeB.val[0].edge_weights;
  let res = [];
  for (const fromId in edgeWeightsA) {
    for (const toId in edgeWeightsA[fromId]) {
      if (edgeWeightsA[fromId][toId] !== edgeWeightsB[fromId][toId]) {
        res.push(getGraphNodeName(graphName, fromId));
        res.push(getGraphNodeName(graphName, toId));
      }
    }
  }
  return res;
};

const graphChangingIds = (nodeA, nodeB) => {
  if (nodeA.data_type !== nodeB.data_type || nodeA.id !== nodeB.id) return null;
  let res = [];
  res = [...res, ...getChangingVerticesIds(nodeA, nodeB)];
  res = [...res, ...getChangingEdgeWeightsIds(nodeA, nodeB)];
  return res;
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
          let changingIdsInLine = [`node${prevNode.id}`];
          if (
            Object.keys(graphIds).includes(prevNode.id) ||
            Object.keys(graphIds).includes(prevNode.id.toString())
          ) {
            changingIdsInLine = graphChangingIds(prevNode, currNode);
          }
          if (changingIdsInLine?.length) {
            didHighlightNode = true;
            changingIds = [...changingIds, ...changingIdsInLine];
          }
        }
      }
    }
  }
  if (changingIds.length) {
    // console.log(changingIds);
    // console.log(prevContents, currContents, changingIds);
    highlightNodes.push(changingIds);
  }
};

const addChangingNodes = (prevLineData, lineData) => {
  for (let i = 0; i < prevLineData.length; ++i) {
    addChangingContentNodes(prevLineData[i]?.Contents, lineData[i]?.Contents);
  }
};

var structs;

export const initialDigraph = `digraph code_viz {
graph [
rankdir = "LR"
bgcolor="#F9F7F7"
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
