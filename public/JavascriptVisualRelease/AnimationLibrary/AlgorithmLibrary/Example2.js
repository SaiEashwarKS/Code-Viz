function Example2(am, w, h) {
  this.init(am, w, h);
}

Example2.prototype = new Algorithm();
Example2.prototype.constructor = Example2;
Example2.superclass = Algorithm.prototype;

Example2.RECT_WIDTH = 80;
Example2.RECT_HEIGHT = 30;
Example2.INSERT_X = 150;
Example2.INSERT_Y = 50;
Example2.STARTING_X = 30;
Example2.STARTING_Y = 100;
Example2.FOREGROUND_COLOR = "#000055";
Example2.BACKGROUND_COLOR = "#AAAAFF";
Example2.VERT_COUNT = 0; //used to get y coordinate for objects
Example2.VERT_PADDING = 10; //verticle padding between objects
Example2.HORI_PADDING = 30;
Example2.marker = 0;

Example2.prototype.init = function (am, w, h) {
  Example2.superclass.init.call(this, am, w, h);
  this.addControls();
  this.customId = 1;
  this.json = {
    Lines_Data: [
      {
        LineNum: 20,
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
        LineNum: 20,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "4200768",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "0",
            name: "y",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 4,
            val: "N",
            name: "z",
          },
        ],
      },
      {
        LineNum: 21,
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
        LineNum: 21,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "0",
            name: "y",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 4,
            val: "U",
            name: "z",
          },
        ],
      },
      {
        LineNum: 22,
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
        LineNum: 22,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "20",
            name: "y",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 4,
            val: "U",
            name: "z",
          },
        ],
      },
      {
        LineNum: 23,
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
        LineNum: 23,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "20",
            name: "y",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 4,
            val: 2,
            name: "z",
          },
        ],
      },
      {
        LineNum: 25,
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
        LineNum: 25,
        type: "StackFrame",
        Contents: [
          {
            data_type: "int",
            type: "var",
            id: 2,
            val: "10",
            name: "x",
          },
          {
            data_type: "int",
            type: "var",
            id: 3,
            val: "20",
            name: "y",
          },
          {
            data_type: "int *",
            type: "ptr",
            id: 4,
            val: 3,
            name: "z",
          },
        ],
      },
    ],
  };
  this.ptrList = [];
  this.objectIds = [];
  this.objectList = [];
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

Example2.prototype.visualizeObj = function (object) {
  let object_type = object.type;
  if (!this.objectIds.includes(object.id)) {
    this.objectIds.push(object.id);
    let insert_y =
      Example2.INSERT_Y +
      Example2.VERT_COUNT * (Example2.RECT_HEIGHT + Example2.VERT_PADDING);
    Example2.VERT_COUNT++;
    if (insert_y > 600 - 50) {
      Example2.INSERT_X += 2 * Example2.RECT_WIDTH + 2 * Example2.HORI_PADDING;
      Example2.VERT_COUNT = 0;
      insert_y = Example2.INSERT_Y;
    }
    object.x = Example2.INSERT_X;
    object.y = insert_y;
    this.objectList.push(object);
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
        console.log(
          object.id,
          object.data_type,
          object.name,
          insert_y,
          Example2.INSERT_X
        );
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
        //console.log("inserted " + object.id);
        Example2.VERT_COUNT++; //because height is 2 times RECT_HEIGHT
        break;
      case "ptr":
        let ptrObj = { id: object.id, pointeeId: object.val };
        this.cmd(
          "CreateLinkedList",
          object.id,
          object.data_type + " " + object.name,
          Example2.RECT_WIDTH,
          Example2.RECT_HEIGHT * 2,
          Example2.INSERT_X - 10,
          insert_y,
          0.25,
          0,
          1,
          1
        );
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
            if (this.objectIds.includes(object.val)) {
              ptrObj.pointeeId = object.val;
              this.cmd("Connect", object.id, object.val);
            }
          }
        }
        this.ptrList.push(ptrObj);
        Example2.VERT_COUNT++;
        //console.log("inserted " + object.id);
        break;
    }
  } else {
    switch (object_type) {
      case "var":
        for (
          let objectIdx = 0;
          objectIdx < this.objectList.length;
          ++objectIdx
        ) {
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

        break;
      case "ptr":
        for (let ptrIdx = 0; ptrIdx < this.ptrList.length; ++ptrIdx) {
          let insertedPtr = this.ptrList[ptrIdx];
          if (insertedPtr.id === object.id) {
            if (insertedPtr.pointeeId !== object.val) {
              if (
                insertedPtr.pointeeId !== "U" &&
                insertedPtr.pointeeId !== "N"
              ) {
                this.cmd("Disconnect", object.id, insertedPtr.pointeeId);
              }
              insertedPtr.pointeeId = object.val;
              this.cmd("SetHighlight", object.id, 1);
              this.cmd("Step");
              if (object.val == "N") {
                this.cmd(
                  "SetText",
                  object.id,
                  object.data_type + " " + object.name + " (N)",
                  0
                );
                this.cmd("SetNull", object.id, 1);
              } else {
                this.cmd("SetNull", object.id, 0);
                if (object.val == "U") {
                  this.cmd(
                    "SetText",
                    object.id,
                    object.data_type + " " + object.name + " (U)",
                    0
                  );
                } else {
                  if (this.objectIds.includes(object.val)) {
                    for (
                      let insertedObjId = 0;
                      insertedObjId < this.objectList.length;
                      ++insertedObjId
                    ) {
                      if (this.objectList[insertedObjId].id === object.val) {
                        let x = this.objectList[insertedObjId].x;
                        let y = this.objectList[insertedObjId].y;
                        this.cmd(
                          "Move",
                          object.id,
                          x - Example2.RECT_WIDTH - Example2.HORI_PADDING,
                          y
                        );
                      }
                    }
                    this.cmd(
                      "SetText",
                      object.id,
                      object.data_type + " " + object.name,
                      0
                    );
                    this.cmd("SetText", object.id, "", 1);
                    this.cmd("Connect", object.id, object.val);
                  }
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
  var stackHasChanged = 1;

  linesData = this.json.Lines_Data;
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
        // if (stackHasChanged) {
        //   let stackHeight =
        //     Example2.VERT_COUNT *
        //     (Example2.RECT_HEIGHT + Example2.VERT_PADDING);
        //   this.cmd("CreateRectangle, ");
        // }
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
  console.log(this.objectList);
  console.log(this.ptrList);
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
