function Example(am, w, h) {
  this.init(am, w, h);
}

Example.prototype = new Algorithm();
Example.prototype.constructor = Example;
Example.superclass = Algorithm.prototype;

Example.ELEMENT_WIDTH = 50;
Example.ELEMENT_HEIGHT = 30;
Example.INSERT_X = 30;
Example.INSERT_Y = 30;
Example.STARTING_X = 30;
Example.STARTING_Y = 100;
Example.FOREGROUND_COLOR = "#000055";
Example.BACKGROUND_COLOR = "#AAAAFF";

Example.prototype.init = function (am, w, h) {
  Example.superclass.init.call(this, am, w, h);
  this.addControls();
  this.activationRecordId = 1;
};

Example.prototype.addControls = function () {
  this.controls = [];
  this.animateButton = addControlToAlgorithmBar("Button", "Visualise");
  this.animateButton.onclick = this.animateCallback.bind(this);
  this.controls.push(this.animateButton);
};

Example.prototype.reset = function () {
  console.log("reset");
};

Example.prototype.animateCallback = function () {
  this.implementAction(this.animate.bind(this), "");
};

Example.prototype.animate = function () {
  this.commands = [];
  this.cmd(
    "CreateRectangle",
    this.activationRecordId,
    "int x		10",
    Example.ELEMENT_WIDTH,
    Example.ELEMENT_HEIGHT,
    Example.INSERT_X,
    Example.INSERT_Y
  );
  this.cmd("Step");
  this.cmd(
    "CreateRectangle",
    this.activationRecordId + 1,
    "int *p		",
    Example.ELEMENT_WIDTH,
    Example.ELEMENT_HEIGHT,
    Example.INSERT_X,
    Example.INSERT_Y + 2 * Example.ELEMENT_HEIGHT
  );
  this.cmd("Step");
  /*this.cmd(
    "Move",
    this.activationRecordId,
    Example.INSERT_X + 2 * Example.ELEMENT_WIDTH,
    Example.INSERT_Y
  );
  this.cmd(
    "Move",
    this.activationRecordId + 1,
    Example.INSERT_X,
    Example.INSERT_Y
  );
  this.cmd("Step");*/
  this.cmd("Connect", this.activationRecordId + 1, this.activationRecordId);
  return this.commands;
};

Example.prototype.disableUI = function (event) {
  for (var i = 0; i < this.controls.length; i++) {
    this.controls[i].disabled = true;
  }
};

Example.prototype.enableUI = function (event) {
  for (var i = 0; i < this.controls.length; i++) {
    this.controls[i].disabled = false;
  }
};

var currentAlg;

function init() {
  var animManag = initCanvas();
  currentAlg = new Example(animManag, canvas.width, canvas.height);
}
