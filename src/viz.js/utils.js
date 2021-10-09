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

const getStructsInfo = (structures) => {
  let structs = {};
  for (let struct in structures) {
    structs[struct] = structures[struct].fields;
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

const makePtrConnection = (from, to) => {
  if (from && to) {
    return `${from} -> ${to}`;
  }
  return "";
};

const createStructNode = (variable) => {
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

const createStackvar = (variable) => {
  if (variable.data_type.includes("struct")) {
    return createStructNode(variable);
  }
  const nodeName = `node${variable.id}`;
  const label = `<f0> ${variable.name}: ${variable.val}`;
  return createNode(nodeName, label);
};

const createStackPtr = (variable) => {
  const nodeName = `node${variable.id}`;
  let label = `<f0> ${variable.name}`;
  let ptrConnection = ``;
  switch (variable.val) {
    case "N":
      label += `: NULL`;
      break;
    case "U":
      label += `: Undefined`;
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

const getHeapNode = (data) => {
  let nodes = ``;
  for (let contentsIdx in data.Contents) {
    let structName = "struct node";
    let variable = data.Contents[contentsIdx];
    if (!variable.id) {
      continue;
    }
    let nodeName = `node${variable.id}`;
    let label = ``;
    for (let fieldNameIdx in variable.val) {
      for (let fieldName in variable.val[fieldNameIdx]) {
        if (label !== ``) {
          label += `|`;
        }
        label += `${fieldName}: ${variable.val[fieldNameIdx][fieldName]}`;
      }
    }
    let shape = `record`;
    let node = `"${nodeName}" [
            label = "${label}"
            shape = "${shape}"
        ];
        `;
    nodes += node;
  }
  return nodes;
};

const nodesAreDifferent = (nodeA, nodeB) => {
  // console.log(JSON.stringify(nodeA), JSON.stringify(nodeB));
  // console.log(JSON.stringify(nodeA) !== JSON.stringify(nodeB));
  return JSON.stringify(nodeA) !== JSON.stringify(nodeB);
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
          didHighlightNode = true;
          changingIds.push(prevNode.id);
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
    // if (prevLineData.type !== lineData.type) {
    //   return null;
    // }
    addChangingContentNodes(prevLineData[i]?.Contents, lineData[i]?.Contents);
  }
};

var structs;

const initialDigraph = `digraph g {
graph [
rankdir = "TB"
];
node [
fontsize = "16"
shape = "ellipse"
];
edge [
];
`;

// var editor = ace.edit("editor");
// var Range = ace.require("ace/range").Range;
// var range;
// var prevMarkerId = 0;
// export const highlightLine = (lineNo) => {
//   range = new Range(lineNo - 1, 0, lineNo - 1, 1);
//   prevMarkerId = editor.session.addMarker(range, "ace-marker", "fullLine");
// };
// export const dehighlightLine = () => {
//   editor.session.removeMarker(prevMarkerId);
// };

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
  for (let lineDataIdx in json.Lines_Data) {
    didHighlightNode = false;
    let lineData = json.Lines_Data[lineDataIdx];
    // console.log("linedata", lineData);
    let currLineNo = parseInt(lineData.LineNum);
    if (currLineNo !== prevLineNo) {
      if (prevLineDatas.length) {
        addChangingNodes(prevLineDatas, currLineDatas);
        if (didHighlightNode) {
          digraphs.push("highlightNode");
        }
      }
      // dehighlightLine();
      prevDigraph += `}`;
      digraphs.push(prevDigraph);
      lineNos.push(prevLineNo);
      prevLineNo = currLineNo;
      prevDigraph = initialDigraph;
      prevLineDatas = currLineDatas;
      currLineDatas = [];
    } else {
      currLineDatas.push(lineData);
      let node;
      switch (lineData.type) {
        case "StackFrame":
          node = getStackFrameNode(lineData);
          break;
        case "Heap":
          node = getStackFrameNode(lineData);
          break;
        default:
          node = "";
      }
      if (node) {
        prevDigraph += node;
      }
    }
    // console.log("prevDG", prevDigraph);
  }
  prevDigraph += `}`;
  digraphs.push(prevDigraph);
  lineNos.push(prevLineNo);
  // console.log(digraphs);
  return {
    digraphs: digraphs,
    lineNos: lineNos,
    highlightNodes: highlightNodes,
  };
};
