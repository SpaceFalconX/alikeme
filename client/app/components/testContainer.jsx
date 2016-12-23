import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import submitAction from '../actions/submitAction.jsx'
import formUpdateAction from '../actions/formUpdateAction.jsx'

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

        <p onClick={() => this.props.submitAction(this.props.formText, "CLICKED")}>CLICK TO CHANGE STATE</p>

        <form onSubmit={e => {
          e.preventDefault();
          this.props.submitAction(this.props.formText, "FORM SUBMITTED")
        }}>
          <input type="text" value={this.props.formText} onChange={this.handleInputChange.bind(this)}/>
          <input type="submit" value="CHANGE STATE WITH FORM" />
        </form>
      </div>
    );
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
  return bindActionCreators({submitAction: submitAction, formUpdateAction: formUpdateAction}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Demo);