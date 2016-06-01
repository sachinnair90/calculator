var keyMirror = require('keymirror');

module.exports = {
    events: keyMirror({
      INSERT_NUMBER: null,
      REMOVE_NUMBER: null,
      DO_OPERATION: null,
      CLEAR_DISPLAY: null,
      VIEW_HISTORY: null
    }),
    operations: keyMirror({
      ADDITION: null,
      SUBSTRACTION: null,
      MULTIPLICATION: null,
      DIVISION: null,
      EQUATE: null,
    }),
    buttonTypes: keyMirror({
      DIGIT: null,
      OPERATOR: null,
      EXTENSION: null
    })
};
