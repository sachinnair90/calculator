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
        value: Store.getCurrentInput()
      });
    },

    render: function() {
      return (
        <div className={'calc-display'}>
          <input
            type='text'
            id='calc-input'
            className={'calc-display__input'}
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
