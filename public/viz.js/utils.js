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
    label += `<f${fieldIdx}> ${fieldName}`;
    // let ptrConnection = ``;
    switch (fieldType) {
      case "var":
        label += `: ${field[fieldName]}`;
        break;
      case "ptr":
        switch (field[fieldName]) {
          case "N":
            label += `: NULL`;
            break;
          case "U":
            label += `: Undefined`;
            break;
          default:
            ptrConnection += makePtrConnection(
              `${nodeName}:f${fieldIdx}`,
              `node${field[fieldName]}:f0
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

var structs;

export const getDigraphs = (input) => {
  const json = JSON.parse(input);
  structs = getStructsInfo(json.Structures);
  let digraphs = [];
  let prevLineNo = 0;
  let prevDigraph = `digraph g {
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
  for (let lineDataIdx in json.Lines_Data) {
    let lineData = json.Lines_Data[lineDataIdx];
    let currLineNo = parseInt(lineData.LineNum);
    if (currLineNo !== prevLineNo) {
      prevDigraph += `}`;
      digraphs.push(prevDigraph);
      prevLineNo = currLineNo;
      prevDigraph = `digraph g {
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
    } else {
      let node;
      console.log(lineData);
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
      console.log("prevDG", prevDigraph);
    }
  }

  //   console.log(digraphs);
  return digraphs;
};
