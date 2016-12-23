import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <h1>TEST</h1>
        <br />
        {this.props.text}
        <h4>{this.props.other}</h4>

        <p onClick={() => this.props.testAction("PARAGRAPH TEXT", "P")}>CLICK TO CHANGE STATE</p>

        <form onSubmit={e => {
          e.preventDefault();
          this.props.testAction("FORM SUBMISSION TEXT", "FORM")
        }}>
          <input type="text" defaultValue={this.props.text} />
          <input type="submit" value="CHANGE STATE WITH FORM" />
        </form>
      </div>
    );
  }
}

function testAction(text, other) {
    return {
        type: 'TEST_ACTION',
        payload: {
          text: text,
          other: other
        }
    }
}

function mapStateToProps(state) {
  return {
    text: state.text,
    other: state.other
  };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({testAction: testAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Demo);