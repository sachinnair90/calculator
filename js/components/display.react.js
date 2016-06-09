var React = require('react');
var Store = require('../stores/calcStore.react.js');

var Display = React.createClass({
    getInitialState: function(){
      return {
        value: Store.getCurrentInput() || ''
      };
    },

    componentDidMount: function(){
      Store.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
      Store.removeChangeListener(this._onChange);
    },

    _onChange: function (event) {
      this.setState({
        value: Store.getCurrentInput(),
        inputs: Store.getAllInputs().map(function(input){ return input.input; }).join(' ')
      });
    },

    render: function() {
      return (
        <div className={'calc-display col s12'}>
          <div className={'calc-display__div row'}>
            {this.state.inputs}
          </div>
          <input
            type='text'
            id='calc-input'
            className={'calc-display__input row'}
            placeholder='Feed in value..'
            autoFocus={true}
            onChange={this._onChange}
            value={this.state.value}
            />
        </div>
      );
    }
});

module.exports = Display;
