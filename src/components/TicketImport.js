import React, { Component, PropTypes } from 'react'
import { Field, reduxForm, submit, change, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import i18n from '../i18n'
import { importTicket } from '../actions/board'
import { browserHistory, Link } from 'react-router'
import { IMPORT_TICKET_JSON_URL } from '../constants'
import { getBaseUrl, isBlankString } from '../utils'

const BASE_URL = getBaseUrl(true);

class TicketImport extends Component{
    constructor(){ 
		super(); 
        this.onImportClick = this.onImportClick.bind(this);
	}
	componentDidMount(){
        const { dispatch } = this.props;
        
        dispatch(change('TicketImport', 'epic', "保守"));
	}
    onImportClick(){
        const { dispatch, formValue, container } = this.props;
        if (!isBlankString(formValue.json)){
            try{
                let json = JSON.parse(formValue.json);
                console.log(json);
                if (_.isArray(json.issues)) {
                    importTicket(json.issues, formValue.epic, container)
                }else{
                    toastr.warning(i18n.msg_invalid_json); 
                }
            }catch (exc){
                toastr.warning(i18n.msg_invalid_json); 
            }
        }else{
            toastr.warning(i18n.msg_invalid_json); 
        }
        
    }

    render(){ 
        const { list, rowFix, columnFix } = this.props; 
        return (
            <div>
                <div className="form-group">
                    <label>{ i18n.epicToImport }:</label>
                    <Field name="epic" component="input" type="text" className="form-control" />
                </div>
                <div className="form-group">
                    <label>{ i18n.jsonToImport }:</label>
                    <Field name="json" component="textarea" rows="5"  type="text" className="form-control" />
                </div>
                <button onClick={ this.onImportClick } className="btn btn-default">{ i18n.import }</button>&nbsp;&nbsp;
                <a href={IMPORT_TICKET_JSON_URL} target="_blank" className="btn btn-default">{ i18n.getJIRAJson }</a>
            </div>
        );
    }
}

TicketImport = reduxForm({
    form: 'TicketImport'
})(TicketImport)

const selector = formValueSelector('TicketImport')

export default connect(
  state => ({
       formValue: selector(state, 'epic', 'json')
    })
)(TicketImport)
