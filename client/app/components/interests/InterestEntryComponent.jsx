import React from 'react';
import {browserHistory} from 'react-router';
import Seed from '../../seed.js'

class InterestEntry extends React.Component {
  
  doSomething () {
   console.log('this.props ', this.props )
    if (this.props.context === "edit") {
      browserHistory.push('/editInterest/' + this.props.id)
    }
    if (this.props.context === "view") {
      browserHistory.push('/viewInterest/' + this.props.id)
    }
  }

  render () {
    let count = 0
    let current = Seed.interests.filter((interest) => {
      //console.log('INTEREST ENTRY: ' ,++count, ' ', interest) //deleteME
      return interest.id === this.props.id
    })[0]

    //CSS STYLES
    let CSS_card = { 
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    borderRadius: '5px',
    paddingLeft:  '20px'
    }
    let CSS_category = {
      width: '250px',
      alignContent: 'center',
      color: '#3396FF',
      marginBottom: '5px'
    }

    return (
      <div style={CSS_card} onClick={this.doSomething.bind(this)}>
        <h3>{current.title}</h3>
        <p className="lead">{current.description}</p>
        <p style={CSS_category}><small>Category:</small> {current.category}</p>
        <p>@{current.user}</p>
      </div>
    )
  }
}

export default InterestEntry