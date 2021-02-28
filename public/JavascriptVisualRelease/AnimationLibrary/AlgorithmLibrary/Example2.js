function Example2(am, w, h) {
  this.init(am, w, h);
}

Example2.prototype = new Algorithm();
Example2.prototype.constructor = Example2;
Example2.superclass = Algorithm.prototype;

Example2.RECT_WIDTH = 80;
Example2.RECT_HEIGHT = 30;
Example2.INSERT_X = 50;
Example2.INSERT_Y = 50;
Example2.STARTING_X = 30;
Example2.STARTING_Y = 100;
Example2.FOREGROUND_COLOR = "#000055";
Example2.BACKGROUND_COLOR = "#AAAAFF";
Example2.VERT_COUNT = 0; //used to get y coordinate for objects
Example2.VERT_PADDING = 10; //verticle padding between objects
Example2.marker = 0;

Example2.prototype.init = function (am, w, h) {
  Example2.superclass.init.call(this, am, w, h);
  this.addControls();
  this.objectId = 1;
  this.json = {
    Lines_data: [
      {
        LineNum: 0,
        type: "StackFrame",
        Contents: [
          {
            id: 1,
            type: "var",
            data_type: "int",
            name: "z",
            val: "0",
          },
          {
            id: 2,
            type: "ptr",
            data_type: "int *",
            name: "l",
            val: "0",
          },
          {
            id: 3,
            type: "var",
            data_type: "int",
            name: "k",
            val: "0",
          },
          {
            id: 4,
            type: "ptr",
            data_type: "int *",
            name: "p",
            val: "0",
          },
          {
            id: 5,
            type: "var",
            data_type: "int",
            name: "x",
            val: "4200640",
          },
        ],
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            id: 6,
            type: "var",
            data_type: "int",
            name: "g",
            val: "0",
          },
        ],
      },
      {
        LineNum: 9,
        type: "StackFrame",
        Contents: [
          {
            id: 1,
            type: "var",
            data_type: "int",
            name: "z",
            val: "0",
          },
          {
            id: 2,
            type: "ptr",
            data_type: "int *",
            name: "l",
            val: "0",
          },
          {
            id: 3,
            type: "var",
            data_type: "int",
            name: "k",
            val: "5",
          },
          {
            id: 4,
            type: "ptr",
            data_type: "int *",
            name: "p",
            val: "0",
          },
          {
            id: 5,
            type: "var",
            data_type: "int",
            name: "x",
            val: "4200640",
          },
        ],
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            id: 6,
            type: "var",
            data_type: "int",
            name: "g",
            val: "0",
          },
        ],
      },
      {
        LineNum: 10,
        type: "StackFrame",
        Contents: [
          {
            id: 1,
            type: "var",
            data_type: "int",
            name: "z",
            val: "0",
          },
          {
            id: 2,
            type: "ptr",
            data_type: "int *",
            name: "l",
            val: "0",
          },
          {
            id: 3,
            type: "var",
            data_type: "int",
            name: "k",
            val: "5",
          },
          {
            id: 4,
            type: "ptr",
            data_type: "int *",
            name: "p",
            val: "3",
          },
          {
            id: 5,
            type: "var",
            data_type: "int",
            name: "x",
            val: "4200640",
          },
        ],
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            id: 6,
            type: "var",
            data_type: "int",
            name: "g",
            val: "0",
          },
        ],
      },
      {
        LineNum: 11,
        type: "StackFrame",
        Contents: [
          {
            id: 1,
            type: "var",
            data_type: "int",
            name: "z",
            val: "0",
          },
          {
            id: 2,
            type: "ptr",
            data_type: "int *",
            name: "l",
            val: "3",
          },
          {
            id: 3,
            type: "var",
            data_type: "int",
            name: "k",
            val: "5",
          },
          {
            id: 4,
            type: "ptr",
            data_type: "int *",
            name: "p",
            val: "3",
          },
          {
            id: 5,
            type: "var",
            data_type: "int",
            name: "x",
            val: "4200640",
          },
        ],
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            id: 6,
            type: "var",
            data_type: "int",
            name: "g",
            val: "0",
          },
        ],
      },
      {
        LineNum: 12,
        type: "StackFrame",
        Contents: [
          {
            id: 1,
            type: "var",
            data_type: "int",
            name: "z",
            val: "0",
          },
          {
            id: 2,
            type: "ptr",
            data_type: "int *",
            name: "l",
            val: "3",
          },
          {
            id: 3,
            type: "var",
            data_type: "int",
            name: "k",
            val: "5",
          },
          {
            id: 4,
            type: "ptr",
            data_type: "int *",
            name: "p",
            val: "3",
          },
          {
            id: 5,
            type: "var",
            data_type: "int",
            name: "x",
            val: "1",
          },
        ],
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            id: 6,
            type: "var",
            data_type: "int",
            name: "g",
            val: "0",
          },
        ],
      },
      {
        LineNum: 13,
        type: "StackFrame",
        Contents: [
          {
            id: 1,
            type: "var",
            data_type: "int",
            name: "z",
            val: "0",
          },
          {
            id: 2,
            type: "ptr",
            data_type: "int *",
            name: "l",
            val: "3",
          },
          {
            id: 3,
            type: "var",
            data_type: "int",
            name: "k",
            val: "5",
          },
          {
            id: 4,
            type: "ptr",
            data_type: "int *",
            name: "p",
            val: "5",
          },
          {
            id: 5,
            type: "var",
            data_type: "int",
            name: "x",
            val: "1",
          },
        ],
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            id: 6,
            type: "var",
            data_type: "int",
            name: "g",
            val: "0",
          },
        ],
      },
      {
        LineNum: 14,
        type: "StackFrame",
        Contents: [
          {
            id: 1,
            type: "var",
            data_type: "int",
            name: "z",
            val: "10",
          },
          {
            id: 2,
            type: "ptr",
            data_type: "int *",
            name: "l",
            val: "3",
          },
          {
            id: 3,
            type: "var",
            data_type: "int",
            name: "k",
            val: "5",
          },
          {
            id: 4,
            type: "ptr",
            data_type: "int *",
            name: "p",
            val: "5",
          },
          {
            id: 5,
            type: "var",
            data_type: "int",
            name: "x",
            val: "1",
          },
        ],
      },
      {
        LineNum: 0,
        type: "GlobalVariables",
        Contents: [
          {
            id: 6,
            type: "var",
            data_type: "int",
            name: "g",
            val: "0",
          },
        ],
      },
    ],
  };
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

var objectIds = [];
var objectList = [];
var ptrList = [];

Example2.prototype.visualizeObj = function (object) {
  let object_type = object.type;
  if (!objectIds.includes(object.id)) {
    objectIds.push(object.id);
    objectList.push(object);
    let insert_y =
      Example2.INSERT_Y +
      Example2.VERT_COUNT * (Example2.RECT_HEIGHT + Example2.VERT_PADDING);
    Example2.VERT_COUNT++;
    switch (object_type) {
      case "var":
        // this.cmd(
        //   "CreateRectangle",
        //   object.id,
        //   object.data_type + " " + object.name + "\t" + object.val,
        //   Example2.RECT_WIDTH,
        //   Example2.RECT_HEIGHT,
        //   Example2.INSERT_X,
        //   insert_y
        // );
        this.cmd(
          "CreateLinkedList",
          object.id,
          object.data_type + " " + object.name,
          Example2.RECT_WIDTH,
          Example2.RECT_HEIGHT * 2,
          Example2.INSERT_X,
          insert_y,
          0,
          false,
          false,
          2
        );
        this.cmd("SetText", object.id, object.val, 1);
        Example2.VERT_COUNT++; //because height is 2 times RECT_HEIGHT
        break;
      case "ptr":
        let ptrObj = { id: object.id, pointeeId: 0 };
        this.cmd(
          "CreateLinkedList",
          object.id,
          object.data_type + " " + object.name,
          Example2.RECT_WIDTH,
          Example2.RECT_HEIGHT * 2,
          Example2.INSERT_X,
          insert_y,
          0.25,
          false,
          false,
          1
        );
        if (object.val == "0") {
          this.cmd("SetText", object.id, "NULL", 1);
        } else {
          if (objectIds.includes(parseInt(object.val))) {
            ptrObj.pointeeId = parseInt(object.val);
            this.cmd("Connect", object.id, parseInt(object.val));
          }
        }
        ptrList.push(ptrObj);
        Example2.VERT_COUNT++;
        break;
    }
  } else {
    switch (object_type) {
      case "var":
        for (let objectIdx = 0; objectIdx < objectList.length; ++objectIdx) {
          let insertedObject = objectList[objectIdx];
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

        break;
      case "ptr":
        for (let ptrIdx = 0; ptrIdx < ptrList.length; ++ptrIdx) {
          let insertedPtr = ptrList[ptrIdx];
          if (insertedPtr.id === object.id) {
            if (insertedPtr.pointeeId !== parseInt(object.val)) {
              if (insertedPtr.pointeeId !== 0) {
                this.cmd("Disconnect", object.id, insertedPtr.pointeeId);
              }
              insertedPtr.pointeeId = parseInt(object.val);
              this.cmd("SetHighlight", object.id, 1);
              this.cmd("Step");
              if (object.val == "0") {
                this.cmd("SetText", object.id, "NULL", 1);
              } else {
                if (objectIds.includes(parseInt(object.val))) {
                  this.cmd("SetText", object.id, "", 1);
                  this.cmd("Connect", object.id, parseInt(object.val));
                }
              }
              this.cmd("Step");
              this.cmd("SetHighlight", object.id, 0);
            }
          }
        }

        break;
    }
  }
};

Example2.prototype.animate = function () {
  this.commands = [];

  linesData = this.json.Lines_data;
  for (let linesDataIdx = 0; linesDataIdx < linesData.length; ++linesDataIdx) {
    //console.log(linesData[linesDataIdx]);
    let lineNum = linesData[linesDataIdx].LineNum;
    let type = linesData[linesDataIdx].type;
    //console.log(type, lineNum);
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
  console.log(ptrList);
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
