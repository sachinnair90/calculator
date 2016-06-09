var React = require('react');
var Display = require('./display.react.js');
var CalcButton = require('./button.react.js');
var Store = require('../stores/calcStore.react.js');
var Actions = require('../actions/calcActions.react.js');
var constants = require('../constants/calcConstants.js');

var app = React.createClass({
  getInitialState: function () {
    var state = {
      buttonsConfig: Store.getButtonConfig(),
    };

    return state;
  },

  render: function () {
    var digits = [], extensions = [], operators = [];
    var digitConfig = this.state.buttonsConfig.filter(function (button) {
      return button.type === constants.buttonTypes.DIGIT;
    });
    var operatorConfig = this.state.buttonsConfig.filter(function (button) {
      return button.type === constants.buttonTypes.OPERATOR;
    });
    var extensionConfig = this.state.buttonsConfig.filter(function (button) {
      return button.type === constants.buttonTypes.EXTENSION;
    });

    var template = [];

    for (var index = 1, button = digitConfig[index - 1]; index <= digitConfig.length; index++, button = digitConfig[index - 1]) {
      template.push(<CalcButton buttonConfig={button} click={Actions.insertNumber} key={Store.newUUID()}/>);

      if(index % 3 === 0){
        digits.push(
          <div className={'calc-digit-buttons__row row'}>
            {template}
          </div>
        );

        template = [];
      }
    }

    for (var index = 0, button = extensionConfig[index]; index < extensionConfig.length; index++, button = extensionConfig[index]) {
      var action = null;
      if(button.name === 'Delete'){
        action = Actions.removeNumber;
      }else if (button.name === 'Clear') {
        action = Actions.clearDisplay;
      }

      extensions.push(
        <CalcButton buttonConfig={button} click={action} key={Store.newUUID()} />
      );
    }

    for (var index = 0, button = operatorConfig[index]; index < operatorConfig.length; index++, button = operatorConfig[index]) {
      operators.push(
        <div className={'calc-operator-buttons__row row center-align'}>
          <CalcButton buttonConfig={button} click={Actions.doOperation} key={Store.newUUID()}/>
        </div>
      );
    }

    return (
      <div className={'calc__main-wrapper container'}>
        <Display className={'row'} />
        <div className={'calc-buttons__wrapper row'}>
          <div className={'calc-buttons__panel--first col s8 offset-s1'}>
            <div className={'calc-extension-buttons__panel section'}>
              <div className={'calc-extension-buttons__row row'}>
                {extensions}
              </div>
            </div>
            <div className={'calc-digit-buttons__panel section'}>
              {digits}
            </div>
          </div>
          <div className={'calc-buttons__panel--second col s3'}>
            <div className={'calc-operator-buttons__panel section'}>
              {operators}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = app;
