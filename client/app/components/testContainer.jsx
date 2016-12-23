import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Demo extends React.Component {

  handleInputChange(e){
    this.props.formUpdateAction(e.target.value)
  }

  render() {
    return (
      <div>
        <h1>TEST</h1>
        <br />
        {this.props.text}
        <h4>{this.props.other}</h4>

        <p onClick={() => this.props.testAction(this.props.formText, "CLICKED")}>CLICK TO CHANGE STATE</p>

        <form onSubmit={e => {
          e.preventDefault();
          this.props.testAction(this.props.formText, "FORM SUBMITTED")
        }}>
          <input type="text" value={this.props.formText} onChange={this.handleInputChange.bind(this)}/>
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
          other: other,
          formText: ""
        }
    }
}

function formUpdateAction(formText) {
    return {
        type: 'FORMUPDATE_ACTION',
        payload: formText
    }
}

function mapStateToProps(state) {
  return {
    text: state.text,
    other: state.other,
    formText: state.formText
  };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({testAction: testAction, formUpdateAction: formUpdateAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Demo);