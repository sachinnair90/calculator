var constants = require('../constants/calcConstants.js');
var dispatcher = require('../dispatcher/appDispatcher.react.js');
var eventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _inputs = [];
var _history = [];
var _currentInput = '';
var _currentOperation = '';
var isRecentlyEvaluated = false;

var buttonsConfig = [
  {
    name: 'Seven',
    value: 7,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Eight',
    value: 8,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Nine',
    value: 9,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Four',
    value: 4,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Five',
    value: 5,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Six',
    value: 6,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'One',
    value: 1,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Two',
    value: 2,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Three',
    value: 3,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Zero',
    value: 0,
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'Decimal',
    value: '.',
    type: constants.buttonTypes.DIGIT
  },
  {
    name: 'TwoZeros',
    value: '00',
    type: constants.buttonTypes.DIGIT
  },
  {
    name: constants.operations.MULTIPLICATION,
    value: '*',
    type: constants.buttonTypes.OPERATOR
  },
  {
    name: constants.operations.DIVISION,
    value: '/',
    type: constants.buttonTypes.OPERATOR
  },
  {
    name: constants.operations.ADDITION,
    value: '+',
    type: constants.buttonTypes.OPERATOR
  },
  {
    name: constants.operations.SUBSTRACTION,
    value: '-',
    type: constants.buttonTypes.OPERATOR
  },
  {
    name: constants.operations.EQUATE,
    value: '=',
    type: constants.buttonTypes.OPERATOR
  },
  {
    name: 'History',
    value: 'Hist',
    type: constants.buttonTypes.EXTENSION
  },
  {
    name: 'Clear',
    value: 'C',
    type: constants.buttonTypes.EXTENSION
  },
  {
    name: 'Delete',
    value: 'Del',
    type: constants.buttonTypes.EXTENSION
  }
];

var calculateValues = function () {
  var query = _inputs.map(function (_input) { return _input.input; }).join('');
  var result = (new Function('return ' + query))();
  _currentInput = result + '';
  _history.concat(_inputs);
  //_inputs.length = 0;
  isRecentlyEvaluated = true;
};

var CalcStore = assign({}, eventEmitter.prototype, {
  getButtonConfig: function () {
    return buttonsConfig;
  },

  getCurrentInput: function () {
    return _currentInput;
  },

  setCurrentInput: function (input) {
    _currentInput = input;
  },

  getAllInputs: function () {
    return _inputs;
  },

  addNewInput: function (input, type) {
    if(input !== ''){
      _inputs.push({type: type, input: input});
    }
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  newUUID: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  },

  setCurrentOperation: function (operation) {
    _currentOperation = operation;
  },

  getCurrentOperation: function () {
    return _currentOperation;
  },

  performOperation: function (operationButton) {
    if(operationButton.name === constants.operations.EQUATE){
      this.addNewInput(_currentOperation, constants.buttonTypes.OPERATOR);
      this.setCurrentOperation('');
      this.addNewInput(_currentInput, constants.buttonTypes.DIGIT);
      this.setCurrentInput('');
      calculateValues();
    }else{
      this.setCurrentOperation(operationButton.value);
      this.addNewInput(_currentInput, constants.buttonTypes.DIGIT);
      this.setCurrentInput('');
    }
  }
});

dispatcher.register(function(action) {
  switch(action.actionType) {
    case constants.events.INSERT_NUMBER:
      if(!isRecentlyEvaluated){
        var input = CalcStore.getCurrentInput();
        var operation = CalcStore.getCurrentOperation();
        // add current operation to list of inputs when next number is fed
        if(input === '' && operation !== ''){
          CalcStore.addNewInput(operation, constants.buttonTypes.OPERATOR);
          CalcStore.setCurrentOperation('');
        }

        CalcStore.setCurrentInput(input + action.button.value);
      }else{
        _inputs.length = 0;
        CalcStore.setCurrentInput(action.button.value + '');
        isRecentlyEvaluated = false;
      }
      CalcStore.emitChange();
      break;

    case constants.events.REMOVE_NUMBER:
      var input = CalcStore.getCurrentInput();
      CalcStore.setCurrentInput(input.slice(0, input.length - 1));
      CalcStore.emitChange();
      break;

    case constants.events.CLEAR_DISPLAY:
      CalcStore.setCurrentInput('');
      CalcStore.emitChange();
      break;

    case constants.events.DO_OPERATION:
      CalcStore.performOperation(action.button);
      CalcStore.emitChange();
      break;

    default:
      // no operation
  }
});

module.exports = CalcStore;
