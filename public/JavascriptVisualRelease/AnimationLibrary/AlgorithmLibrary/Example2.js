var editor = ace.edit("editor");
editor.setTheme("ace/theme/xcode");
editor.session.setMode("ace/mode/c_cpp");
editor.setReadOnly("true");

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
Example2.HORI_PADDING = 30;

Example2.prototype.init = function (am, w, h) {
  Example2.superclass.init.call(this, am, w, h);
  this.addControls();
  this.customId = 1;
  this.json = {
    Lines_Data: [
      {
        LineNum: 0,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 0,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "7049240",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "0",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "0",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 7,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 7,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 7,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "0",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "0",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 9,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 9,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "1",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "0",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 12,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 12,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "1",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "0",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 13,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 13,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "1",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 9,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 9,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "2",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 12,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 12,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "2",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 9,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 9,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "3",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 12,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 12,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "3",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 9,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 9,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "4",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 12,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 12,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "4",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 9,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 9,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "5",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 12,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 12,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "5",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "1",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 13,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 13,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "5",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "5",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 9,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 9,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
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
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "6",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "5",
            name: "gcd",
          },
        ],
      },
      {
        LineNum: 16,
        FunctionName: "main",
        FunctionAddress: "(int (*)()) 0x400b6d <main>",
      },
      {
        LineNum: 16,
        type: "GlobalVariables",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 1,
            val: "0",
            name: "g",
          },
        ],
      },
      {
        LineNum: 16,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "5",
            name: "n1",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "10",
            name: "n2",
          },
          {
            data_type: "int",
            type: "var",
            id: 4,
            val: "6",
            name: "i",
          },
          {
            data_type: "int",
            type: "var",
            id: 5,
            val: "5",
            name: "gcd",
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

Example2.prototype.createVar = function (object, width, height, x, y) {
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
  this.setPtrVal(object);
};

Example2.prototype.createObj = function (object) {
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
        Example2.RECT_HEIGHT * 2,
        object.x,
        object.y
      );
      Example2.VERT_COUNT++; //because height is 2 times RECT_HEIGHT
      break;
    case "ptr":
      object.x = Example2.INSERT_X - 10;
      let ptrObj = { id: object.id, pointeeId: object.val };
      this.createPtr(
        object,
        this.getWidth(object),
        Example2.RECT_HEIGHT * 1,
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
  new_x = pointeeObj.x - Example2.RECT_WIDTH - Example2.HORI_PADDING;
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

Example2.prototype.getWidthVar = function (text) {
  return 10 * text.length;
};

Example2.prototype.getWidthPtr = function (text) {
  return 8 * (text.length + 4); //4 extra chars for " (U)" or " (N)"
};

Example2.prototype.getWidth = function (object) {
  switch (object.type) {
    case "var":
      return this.getWidthVar(object.type + " " + object.name);
      break;
    case "ptr":
      return this.getWidthPtr(object.type + " " + object.name);
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

Example2.prototype.visualizeObj = function (object) {
  if (!this.objectIdList.includes(object.id)) {
    this.createObj(object);
  } else {
    this.modifyObject(object);
  }
};

Example2.prototype.animate = function () {
  this.commands = [];

  let linesData = this.json.Lines_Data;
  for (let linesDataIdx = 0; linesDataIdx < linesData.length; ++linesDataIdx) {
    let type = linesData[linesDataIdx].type;
    let line_no = linesData[linesDataIdx].LineNum;
    this.cmd("RemoveAceMarker");
    // editor.session.removeMarker(marker);
    // range = new Range(line_no - 1, 0, line_no - 1, 1);
    // marker = editor.session.addMarker(range, "ace-marker", "fullLine");
    this.cmd("AddAceMarker", line_no); //-1 because the backend sends line_no after the operation is completed
    //console.log("highlighted", line_no - 1);
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
    this.cmd("Step");
  }
  //console.log(this.objectList);
  //console.log(this.ptrList);
  //console.log(this.colObjList);
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
