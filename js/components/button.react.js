var React = require('react');

var CalcButton = React.createClass({
    buttonClick: function () {
      this.props.click(this.props.buttonConfig);
    },

    render: function() {
      return (
        <div className={'calc-button col s4 center-align'}>
          <button
            id={'calc-button_' + this.props.buttonConfig.name}
            className={'calc-button__button waves-effect waves-light grey darken-4 btn-large'}
            value={this.props.buttonConfig.value}
            onClick={this.buttonClick}>
          {this.props.buttonConfig.value}
          </button>
        </div>
      );
    }
});

module.exports = CalcButton;
