import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { TICKET_URL } from '../constants'
import i18n from '../i18n'
import { updateItem } from '../actions/board'

class Ticket extends Component{
    constructor(){ 
		super(); 
        // Set up initial state
        this.state = {
            isEdit: false
        };

        this.onEditClick = this.onEditClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onOKClick = this.onOKClick.bind(this);
	}
    onEditClick(){
        const { itemId, item, dispatch } = this.props; 

        dispatch(change('Ticket', 'itemId', itemId));
        dispatch(change('Ticket', 'ticketType', item.ticketType));
        dispatch(change('Ticket', 'ticketNum', item.ticketNum));
        dispatch(change('Ticket', 'name', item.name));
        dispatch(change('Ticket', 'storyPoint', item.storyPoint));
        this.setState({ isEdit: true });
    }
    onCancelClick(){
        this.setState({ isEdit: false });
    }
    onOKClick(){
        //console.log('onOkClick');
        const { formValue, itemId } = this.props; 
        console.log(formValue);

        updateItem(Object.assign({}, formValue, { tyep: 0, itemId: itemId}));
        
        this.setState({ isEdit: false });
    }
	componentDidMount(){
	}

    render(){ 
        const { itemId, item } = this.props; 
        const { onEditClick, onOKClick, onCancelClick } = this;
        let classType = "improvement";

        if (this.state.isEdit) classType = this.props.selectedTicketType;
        else if (item.ticketType === 'improvement' || item.ticketType === 'bug' || item.ticketType === 'story' || item.ticketType === 'task') classType = item.ticketType;

        const ticketClass = ((this.state.isEdit) ? 'rj-ticket-edit' : "card") +  " card-inverse rj-ticket-"+classType;
        return (
                <div className={ticketClass} >
                        {
                            (this.state.isEdit) ? 
                            <div className="card-block">   
                                <div className="form-group">
                                    <label className="control-label">{ i18n.ticketType }</label>
                                    <div className="selectContainer">
                                        <Field name="ticketType" component="select" >
                                            <option value="improvement">{ i18n.improvement }</option>
                                            <option value="bug">{ i18n.bug }</option>
                                            <option value="story">{ i18n.story }</option>
                                            <option value="task">{ i18n.task }</option>
                                        </Field>
                                    </div>
                                </div>            
                                <div className="form-group">
                                    <label>{ i18n.ticketNum }</label>
                                    <Field name="ticketNum" component="input" type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>{ i18n.ticketName }</label>
                                    <Field name="name" component="input" type="text" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>{ i18n.storyPoint }</label>
                                    <Field name="storyPoint" component="input" type="number" className="form-control" />
                                </div>
                                <p className="rj-ticket-btn"><a href = "#" onClick = {onOKClick}>OK</a>&nbsp;<a href = "#" onClick = {onCancelClick} >Cancel</a></p>
                            </div>
                             : 
                            <div className="card-block">                        
                                { (item.ticketNum) && <p  className="card-title"><a className="card-title rj-ticket-title" href = { TICKET_URL + item.ticketNum} target="_blank">{ item.ticketNum }</a></p> }
                                { (item.name) && <p className="card-text">{ item.name }</p> }
                                { (item.storyPoint) && <p className="card-text rj-text-center">{ item.storyPoint }</p> }
                                <p className="rj-ticket-btn"><a href = "#" onClick = {onEditClick}>Edit</a></p>
                            </div>
                        }
                </div>
        );
    }
}

Ticket.propTypes = { 
    itemId: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
} 

 //export default RAccountForm
//Convert to Redux-Form
Ticket = reduxForm({
    form: 'Ticket',
    onSubmit: function(fields, dispatch){
        console.log('onSubmit------------');
        console.log(fields);
        console.log(dispatch);
    }
})(Ticket)


const selector = formValueSelector('Ticket')

export default connect(
  state => ({
       formValue: selector(state, 'ticketType', 'ticketNum', 'name', 'storyPoint'),
       selectedTicketType: selector(state, 'ticketType'),
    })
)(Ticket)
