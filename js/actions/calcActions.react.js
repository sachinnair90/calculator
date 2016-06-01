var constants = require('../constants/calcConstants.js');
var dispatcher = require('../dispatcher/appDispatcher.react.js');

var calcActions = {
  insertNumber: function (button, event) {
    dispatcher.dispatch({
      actionType: constants.events.INSERT_NUMBER,
      button: button
    });
  },
  removeNumber: function (button, event) {
    dispatcher.dispatch({
      actionType: constants.events.REMOVE_NUMBER,
      button: button
    });
  },
  doOperation: function (button, event) {
    dispatcher.dispatch({
      actionType: constants.events.DO_OPERATION,
      button: button
    });
  },
  clearDisplay: function (button, event) {
    dispatcher.dispatch({
      actionType: constants.events.CLEAR_DISPLAY,
      button: button
    });
  }
};

module.exports = calcActions;
