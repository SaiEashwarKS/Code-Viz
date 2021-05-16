function Example2(am, w, h) {
  this.init(am, w, h);
}

Example2.prototype = new Algorithm();
Example2.prototype.constructor = Example2;
Example2.superclass = Algorithm.prototype;

Example2.RECT_WIDTH = 63;
Example2.RECT_HEIGHT = 25;
Example2.INSERT_X = 300;
Example2.INSERT_Y = 50;
Example2.STARTING_X = 30;
Example2.STARTING_Y = 100;
Example2.FOREGROUND_COLOR = "#000055";
Example2.BACKGROUND_COLOR = "#AAAAFF";
Example2.VERT_COUNT = 0; //used to get y coordinate for objects
Example2.VERT_PADDING = 10; //verticle padding between objects
Example2.HORI_PADDING = 40;

Example2.prototype.init = function (am, w, h) {
  Example2.superclass.init.call(this, am, w, h);
  this.addControls();
  this.commands = [];
  this.json = {
    Lines_Data: [
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 0,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 0,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "0",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "4200640",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "0",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: "U",
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: "U",
            name: "a",
          },
        ],
      },
      {
        LineNum: 8,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 8,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 8,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "4200640",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "0",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: "U",
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: "U",
            name: "a",
          },
        ],
      },
      {
        LineNum: 9,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 9,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 9,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "20",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "0",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: "U",
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: "U",
            name: "a",
          },
        ],
      },
      {
        LineNum: 10,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 10,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 10,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "20",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "20",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: "U",
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: "U",
            name: "a",
          },
        ],
      },
      {
        LineNum: 11,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 11,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 11,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "20",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "20",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: 20,
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: "U",
            name: "a",
          },
        ],
      },
      {
        LineNum: 12,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 12,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 12,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "20",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "20",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: 30,
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: "U",
            name: "a",
          },
        ],
      },
      {
        LineNum: 13,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 13,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 13,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "20",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "20",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: 30,
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: 5,
            name: "a",
          },
        ],
      },
      {
        LineNum: 14,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
        FunctionId: 1,
        FunctionNameId: 2,
      },
      {
        LineNum: 14,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 10,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 14,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 20,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 30,
            val: "20",
            name: "y",
          },
          {
            data_type: "int",
            type: "var",
            id: 40,
            val: "20",
            name: "b",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 5,
            val: 40,
            name: "z",
          },
          {
            data_type: "int **",
            type: "ptr",
            id: 60,
            val: 5,
            name: "a",
          },
        ],
      },
    ],
  };
  this.objectList = []; //list of all the objects on the screen
  // format of the objects that will be inserted in this list : {data_type, type, id, val, name}
  this.objectIdList = []; //list of object IDs. need this list in addition to objectList because
  //    we constantly keep searching if an object to be inserted is already inserted.
  // this search is done based on ID's of the objects,
  //    but checking if the id already exists in the objectList is slow.
  //therefore having a seperate list with just the IDs will be more efficient to search if an ID already exists
  this.ptrList = []; //list of ptr objects inserted.
  // format of the objects that will be inserted in this list : {id, pointeeId}
  this.colObjList = {}; //dict of key-value pairs which has info about the columns in the visualisation
  // format of the key-value that will be inserted in this dict : x : [maxWidth, objIdList]
  this.funcList = {}; //dict of key-value pairs which has info about the functions, dimensions of the frame and the object ids in that function
  // format of the key-value that will be inserted in this dict : id : {funcName, funcNameId, funcHeight, funcWidth, objIdList}

  this.setup(); //show the initial stack contents
};

Example2.prototype.addControls = function () {
  this.controls = [];
  this.animateButton = addControlToAlgorithmBar("Button", "Visualise");
  this.animateButton.onclick = this.animateCallback.bind(this);
  this.controls.push(this.animateButton);
};

Example2.prototype.reset = function () {
  console.log("reset");
};

Example2.prototype.animateCallback = function () {
  this.implementAction(this.animate.bind(this), "");
};

Example2.prototype.setup = function () {
  //this.animationManager.setAllLayers([-1, 0]); //layers to be visible
  let linesData = this.json.Lines_Data;
  for (let linesDataIdx = 0; linesDataIdx < linesData.length; ++linesDataIdx) {
    let type = linesData[linesDataIdx].type;
    let line_no = linesData[linesDataIdx].LineNum;
    if (line_no == 0) {
      this.visualiseLine(linesData, linesDataIdx, line_no);
    } else {
      break;
    }
  }
  this.animationManager.StartNewAnimation(this.commands);
  this.animationManager.skipForward();
  this.animationManager.clearHistory();
};

Example2.prototype.getInsertY = function () {
  let insert_y =
    Example2.INSERT_Y +
    Example2.VERT_COUNT * (Example2.RECT_HEIGHT + Example2.VERT_PADDING);

  //height of the canvas is exceeded
  if (insert_y > 600 - 50) {
    Example2.INSERT_X += 2 * Example2.RECT_WIDTH + 2 * Example2.HORI_PADDING;
    Example2.VERT_COUNT = 0;
    insert_y = Example2.INSERT_Y;
  }
  return insert_y;
};

Example2.prototype.createVar = function (object, width, height, x, y, isDef) {
  this.cmd(
    "CreateLinkedList",
    object.id,
    object.data_type + " " + object.name,
    width,
    height,
    x,
    y,
    0,
    false,
    false,
    2
  );
  //let value = isDef === false ? "?" : object.val;
  //this.cmd("SetText", object.id, value, 1);
  this.cmd("SetText", object.id, object.val, 1);
  //console.log("inserted " + object.id);
};

Example2.prototype.setPtrVal = function (object) {
  if (object.val === "U") {
    this.cmd(
      "SetText",
      object.id,
      object.data_type + " " + object.name + " (U)",
      0
    );
  } else {
    if (object.val === "N") {
      this.cmd(
        "SetText",
        object.id,
        object.data_type + " " + object.name + " (N)",
        0
      );
      this.cmd("SetNull", object.id, 1);
    } else {
      if (this.objectIdList.includes(object.val)) {
        this.cmd("Connect", object.id, object.val);
      }
    }
  }
};

Example2.prototype.createPtr = function (object, width, height, x, y) {
  this.cmd(
    "CreateLinkedList",
    object.id,
    object.data_type + " " + object.name,
    width,
    height,
    x,
    y,
    0.25,
    0,
    1,
    1
  );
  this.modifyPtrVal(object);
};

Example2.prototype.createObj = function (object, isDef) {
  let object_type = object.type;
  this.objectIdList.push(object.id);
  let insert_y = this.getInsertY();
  Example2.VERT_COUNT++;
  object.y = insert_y;
  this.objectList.push(object);
  switch (object_type) {
    case "var":
      object.x = Example2.INSERT_X;
      this.createVar(
        object,
        this.getWidth(object),
        this.getHeight(object),
        object.x,
        object.y,
        isDef
      );
      Example2.VERT_COUNT++; //because height is 2 times RECT_HEIGHT
      break;
    case "ptr":
      object.x = Example2.INSERT_X - 10;
      let ptrObj = { id: object.id, pointeeId: object.val };
      this.createPtr(
        object,
        this.getWidth(object),
        this.getHeight(object),
        object.x,
        object.y
      );
      ptrObj.pointeeId = object.val;
      this.ptrList.push(ptrObj);
      //Example2.VERT_COUNT++; //because height is 2 times RECT_HEIGHT
      //console.log("inserted " + object.id);
      break;
  }
  this.insertIntoCol(object);
};

Example2.prototype.modifyVar = function (object) {
  for (let objectIdx = 0; objectIdx < this.objectList.length; ++objectIdx) {
    let insertedObject = this.objectList[objectIdx];
    if (insertedObject.id === object.id) {
      if (insertedObject.val !== object.val) {
        insertedObject.val = object.val;
        this.cmd("SetHighlight", object.id, 1);
        this.cmd("Step");
        this.cmd("SetText", object.id, object.val, 1);
        this.cmd("Step");
        this.cmd("SetHighlight", object.id, 0);
      }
    }
  }
};

Example2.prototype.getObj = function (id) {
  for (
    let insertedObjIdx = 0;
    insertedObjIdx < this.objectList.length;
    ++insertedObjIdx
  ) {
    if (this.objectList[insertedObjIdx].id === id) {
      return this.objectList[insertedObjIdx];
    }
  }
};

Example2.prototype.movePtr = function (ptrObj, pointeeObj) {
  //returns new coordinates of the pointer object
  let new_x;
  //new_x = pointeeObj.x - this.colObjList[pointeeObj.x].maxWidth / 2 - Example2.RECT_WIDTH - Example2.HORI_PADDING;
  new_x = pointeeObj.x - this.getWidth(pointeeObj) / 2 - this.getWidth(ptrObj) / 2 - Example2.HORI_PADDING;
  this.cmd("Move", ptrObj.id, new_x - 10, pointeeObj.y); // -10 because pointer onjects are offset to the right by 10 pixels by default (don't know why)
  return [new_x, pointeeObj.y];
};

Example2.prototype.modifyPtrCoords = function (ptrId, x, y) {
  for (
    let pointerObjIdx = 0;
    pointerObjIdx < this.objectList.length;
    ++pointerObjIdx
  ) {
    if (this.objectList[pointerObjIdx].id === ptrId) {
      this.objectList[pointerObjIdx].x = x;
      this.objectList[pointerObjIdx].y = y;
    }
  }
};

Example2.prototype.changeObjCol = function (objId, new_col_x) {
  let colExists = Object.keys(this.colObjList).includes(new_col_x);
  if (!colExists) {
    //console.log("created new col", new_col_x);
    this.insertNewCol(new_col_x);
  }
  this.colObjList[new_col_x].objIds.push(objId);
  //console.log(this.colObjList);
};

Example2.prototype.removeFromCol = function (col_x, objId) {
  let col = this.colObjList[col_x];
  //console.log(col);
  let objIds = col.objIds;
  objIds = objIds.filter((item) => item !== objId);
  col.objIds = objIds;
};

Example2.prototype.resetCol = function (col_x) {
  this.colObjList[col_x].maxWidth = 0;
  this.colObjList[col_x].objIds = [];
};

Example2.prototype.movePointeeCol = function (col_x, ptrObj) {
  //add the pointee obj ids to the new col
  //this should be done from the rightmost col to easily carry the maxWidth attribute of one col to the next col

  //ASSUMPTION : KEYS IN COLOBJLIST ARE IN ASCENDING ORDER

  let colKeys = Object.keys(this.colObjList);
  let col;

  //1. remove the objects from the old col
  //2. add them to the new col
  //3. move the object
  //4. delete the old col
  for (let keyIdx = colKeys.length - 1; keyIdx >= 0; --keyIdx) {
    if (colKeys[keyIdx] >= col_x) {
      col = this.colObjList[colKeys[keyIdx]];
      let oldMaxWidth = col.maxWidth;
      let objIds = col.objIds;
      for (let objIdx = 0; objIdx < objIds.length; ++objIdx) {
        let objId = objIds[objIdx];
        if (objId !== ptrObj.id) {
          let obj = this.getObj(objId);
          obj.x += oldMaxWidth;
          this.removeFromCol(colKeys[keyIdx], objId); //1
          this.changeObjCol(objId, obj.x); //2
          this.cmd("Move", objId, obj.x, obj.y); //3
        }
      }
      let new_x = parseInt(colKeys[keyIdx]) + parseInt(oldMaxWidth);
      // console.log("newx", new_x);
      //delete the col - make its maxWidth = 0 and objIds = []. we are not actually deleting the key because that would break the ascending order of the keys
      this.resetCol(colKeys[keyIdx]); //4
      //change maxWidth of the new column
      this.colObjList[new_x].maxWidth = oldMaxWidth;
    }
  }
};

Example2.prototype.modifyPtrVal = function (object) {
  //change the text inside the ptr
  this.setPtrVal(object);

  //get pointee object
  let pointeeObj;
  if (this.objectIdList.includes(object.val)) {
    pointeeObj = this.getObj(object.val);

    //this.movePointeeCol(pointeeObj.id);

    //move the ptr
    let new_x, new_y;
    [new_x, new_y] = this.movePtr(object, pointeeObj);

    //move the column of pointee and all the columns to the right of it
    // if (new_x !== object.x) {
    //   this.movePointeeCol(pointeeObj.id, object);
    // }

    //change the coordinates of the pointer object
    this.modifyPtrCoords(object.id, new_x, new_y);

    //remove any (U) or (N) in the name of the ptr object
    this.cmd("SetText", object.id, object.data_type + " " + object.name, 0);
    this.cmd("SetText", object.id, "", 1);
  }
};

Example2.prototype.modifyPtr = function (object) {
  for (let ptrIdx = 0; ptrIdx < this.ptrList.length; ++ptrIdx) {
    let insertedPtr = this.ptrList[ptrIdx];
    if (insertedPtr.id === object.id) {
      if (insertedPtr.pointeeId !== object.val) {
        if (insertedPtr.pointeeId !== "U" && insertedPtr.pointeeId !== "N") {
          this.cmd("Disconnect", object.id, insertedPtr.pointeeId);
        }
        insertedPtr.pointeeId = object.val;
        this.cmd("SetHighlight", object.id, 1);
        this.cmd("Step");
        this.modifyPtrVal(object);
        this.cmd("Step");
        this.cmd("SetHighlight", object.id, 0);
      }
    }
  }
};

Example2.prototype.modifyWidth = function (object) {
  this.cmd("SetWidth", this.getWidth(object));
};

Example2.prototype.modifyObject = function (object) {
  switch (object.type) {
    case "var":
      this.modifyVar(object);
      break;
    case "ptr":
      this.modifyPtr(object);
      break;
  }
  this.modifyWidth(object);
};

Example2.prototype.getWidthVar = function (length) {
  if (length < 18) return 10 * length;
  return 7 * length;
};

Example2.prototype.getWidthPtr = function (length) {
  return 10.5 * (length + 4); //4 extra chars for " (U)" or " (N)"
};

Example2.prototype.getWidth = function (object) {
  switch (object.type) {
    case "var":
      return this.getWidthVar(
        Math.max((object.type + " " + object.name).length, object.val.toString(10).length)
      );
      break;
    case "ptr":
      return this.getWidthPtr((object.type + " " + object.name).length);
      break;
  }
};

Example2.prototype.getHeight = function (object) {
  switch (object.type) {
    case "var":
      return 2 * Example2.RECT_HEIGHT;
      break;
    case "ptr":
      return Example2.RECT_HEIGHT;
      break;
  }
};

Example2.prototype.insertNewCol = function (x) {
  this.colObjList[x] = { maxWidth: 0, objIds: [] };
};

Example2.prototype.insertIntoCol = function (object) {
  let x = Example2.INSERT_X;
  let colExists = x in this.colObjList;

  //new column
  if (!colExists) {
    this.insertNewCol(Example2.INSERT_X);
  }

  let colEntry = this.colObjList[x];

  //add the obj id
  colEntry.objIds.push(object.id);

  //change maxWidth if needed
  let objWidth = this.getWidth(object);
  let widthIsGreater = objWidth > colEntry.maxWidth;
  colEntry.maxWidth = widthIsGreater ? objWidth : colEntry.maxWidth;
};

Example2.prototype.visualizeObj = function (object, isDef) {
  //isDef : is the object defined or undefined
  if (!this.objectIdList.includes(object.id)) {
    this.createObj(object, isDef);
    this.addObjToFunc(func, object);
  } else {
    this.modifyObject(object);
    this.modifyFunc(func, object);
  }
};

Example2.prototype.modifyFunc = function (func, object) {
  let obj = this.getObj(object.id);
  let xDiff = Math.abs(func.x - obj.x);
  //this.increaseFuncWidth(func, this.funcList[func.id].funcWidth + xDiff);
  //console.log(xDiff);
};

Example2.prototype.addObjIdToFunc = function (objId, func) {
  let funcInList = this.funcList[func.id];
  let objExistsInFunc = funcInList.objIdList.includes(objId);
  if (!objExistsInFunc) {
    this.funcList[func.id].objIdList.push(objId);
    //console.log(objId, id);
  }
};

Example2.prototype.createFunc = function (func) {
  this.funcList[func.id] = func;
  //console.log("added func", currFunc);

  //create rectangle frame for function
  let x = Example2.INSERT_X;
  let y = this.getInsertY();
  func.x = x;
  func.y = y;
  this.cmd(
    "CreateRectangle",
    func.id,
    "",
    func.funcWidth,
    func.funcHeight,
    x,
    y
  );

  //insert function name
  this.cmd("CreateLabel", func.funcNameId, func.funcName, 0, 0);
  this.cmd("AlignTop", func.funcNameId, func.id);

  //slightly increase y for the next objects
  Example2.INSERT_Y += 30;

  //add the func to colObjList
  this.insertIntoCol(func);
};

Example2.prototype.increaseFuncWidth = function (func, newWidth) {
  this.funcList[func.id].funcWidth = newWidth + 20; // empty space to right and left
  this.cmd("SetWidth", func.id, this.funcList[func.id].funcWidth);
};

Example2.prototype.increaseFuncHeight = function (func, newHeight) {
  let oldHeight = this.funcList[func.id].funcHeight;
  let offset = newHeight - oldHeight;
  this.cmd("SetHeight", func.id, newHeight);
  this.funcList[func.id].funcHeight = newHeight;

  this.funcList[func.id].y += offset / 2;
  this.cmd("Move", func.id, this.funcList[func.id].x, this.funcList[func.id].y);
  Example2.VERT_COUNT += 1;
};

Example2.prototype.getNewHeightFunc = function (func, object) {
  let objHeight = this.getHeight(object);
  let newOffset = objHeight + Example2.VERT_PADDING;
  if (object.type === "var") {
    newOffset += Example2.VERT_PADDING;
  }
  let newHeight = this.funcList[func.id].funcHeight + newOffset;
  return newHeight;
};

Example2.prototype.addObjToFunc = function (func, object) {
  if (func.id === 0) {
    return;
  }
  let funcInList = this.funcList[func.id];
  let objExistsInFunc = funcInList.objIdList.includes(object.id);
  if (!objExistsInFunc) {
    //add objectId to this.funcList
    this.addObjIdToFunc(object.id, func);

    //change dimensions of the function frame
    let objWidth = this.getWidth(object);
    //console.log(this.funcList[func.id].funcWidth - 20, objWidth);
    funcWidthIsGreater = this.funcList[func.id].funcWidth - 20 >= objWidth; //-20 to account for empty spaces in left and right
    if (!funcWidthIsGreater) {
      let newWidth = this.getWidth(object);
      this.increaseFuncWidth(func, newWidth);
    }

    let newHeight = this.getNewHeightFunc(func, object);
    this.increaseFuncHeight(func, newHeight);
  }
};

Example2.prototype.deleteFuncObjs = function (funcId) {
  let objIds = this.funcList[funcId].objectIdList;
  console.log(objIds);
  for (let objIdIDx = 0; objIdIDx < objIds.length; ++objIdIDx) {
    this.cmd("Delete", objIds[objIdIDx]);
  }
};

Example2.prototype.deleteFunc = function (funcId) {
  //remove the function frame
  this.cmd("Delete", funcId);

  //delete all the objects in the functions
  this.deleteFuncObjs(funcId);

  //remove func from funcList
  delete this.funcList[funcID];

  //move the objects below them upwards

  //!!!!!!!!!!!!!!!!!!!!!! IMPLEMENT THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!
};

var func = {
  funcName: "",
  id: 0,
  funcNameId: 0,
  funcHeight: 20,
  funcWidth: 50,
  objIdList: [],
  x: 0,
  y: 0,
}; //global because 1.it has a single value 2.that value must be shared among iterations 3.used by different functions
var prevFunc;
Example2.prototype.visualiseFunc = function (linesData, linesDataIdx) {
  let funcName = linesData[linesDataIdx].FunctionName;
  let id = parseInt(linesData[linesDataIdx].FunctionId);
  let funcNameId = parseInt(linesData[linesDataIdx].FunctionNameId);
  if (funcName && func.id !== id) {
    prevFunc = func;
    delete func;
    func = {
      funcName: funcName,
      id: id,
      funcNameId: funcNameId,
      funcHeight: 20,
      funcWidth: 50,
      objIdList: [],
      x: 0,
      y: 0,
    };
    let funcExists = false;
    let funcListKeys = Object.keys(this.funcList);
    if (funcListKeys) {
      for (
        let funcListIdx = 0;
        funcListIdx < funcListKeys.length;
        ++funcListIdx
      ) {
        if (funcListKeys[funcListIdx] == func.id) {
          funcExists = true;
          break;
        }
      }
    }
    if (func && !funcExists) {
      //console.log("creating function", func.funcName, func.id);
      this.createFunc(func);
    }
  }
};

Example2.prototype.visualiseVar = function (linesData, linesDataIdx) {
  let type = linesData[linesDataIdx].type;
  switch (type) {
    case "StackFrame":
      for (
        let contentsIdx = 0;
        contentsIdx < linesData[linesDataIdx].Contents.length;
        ++contentsIdx
      ) {
        //console.log(linesData[linesDataIdx].Contents[contentsIdx]);
        let object = linesData[linesDataIdx].Contents[contentsIdx];
        this.visualizeObj(object);
        //this.modifyFunc(object, func);
      }
      break;
    case "GlobalVariables":
      for (
        let contentsIdx = 0;
        contentsIdx < linesData[linesDataIdx].Contents.length;
        ++contentsIdx
      ) {
        let object = linesData[linesDataIdx].Contents[contentsIdx];
        this.visualizeObj(object);
      }
      break;
  }
};

Example2.prototype.visualiseLine = function (linesData, linesDataIdx, line_no) {
  //handling highlighting code
  this.cmd("RemoveAceMarker");
  this.cmd("AddAceMarker", line_no);

  //handling function
  //this.visualiseFunc(linesData, linesDataIdx);

  //handling the variable
  this.visualiseVar(linesData, linesDataIdx);

  this.cmd("Step");
};

Example2.prototype.animate = function () {
  this.commands = [];

  let linesData = this.json.Lines_Data;
  for (let linesDataIdx = 0; linesDataIdx < linesData.length; ++linesDataIdx) {
    let line_no = linesData[linesDataIdx].LineNum;
    if (line_no != 0) {
      this.visualiseLine(linesData, linesDataIdx, line_no);
    }
  }
  console.log(this.objectList);
  //console.log(this.ptrList);
  //console.log(this.colObjList);
  console.log(this.funcList);
  return this.commands;
};

Example2.prototype.disableUI = function (event) {
  for (var i = 0; i < this.controls.length; i++) {
    this.controls[i].disabled = true;
  }
};

Example2.prototype.enableUI = function (event) {
  for (var i = 0; i < this.controls.length; i++) {
    this.controls[i].disabled = false;
  }
};

var currentAlg;

function init() {
  var animManag = initCanvas();
  currentAlg = new Example2(animManag, canvas.width, canvas.height);
}
