/*
RGoogleInfo - RGoogleInfo Component
*/
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setLoggedIn, setUserInfo, setDisable, INITIAL_STATE } from '../actions/RGoogleInfo'
import Ri18n from '../Ri18n.js'


class RGoogleInfo extends Component {
    componentDidMount() {
        let oThis = this;
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                /*
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                */
                //alert(JSON.stringify(user, null, '  '));
                oThis.props.setLoggedIn({ loggedIn:true, userInfo: user });

            } else {
                oThis.props.setLoggedIn({ loggedIn:false, userInfo: INITIAL_STATE });
            }
        });
    }

	render() {
		return ((this.props.loggedIn) ? 
        <div >
            <h4>User Info from your Google Account</h4>
            <br />
            <div className="form-group">
                <img src = { this.props.photoURL } style={{maxHeight: 100, maxWidth: 100}} />
            </div>
            <div className="form-group">
                <label>User Name:</label>
                <input readOnly type="text" value={this.props.displayName} className="form-control" />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input readOnly type="text" value={this.props.email} className="form-control" />
            </div>
        </div> 
        : 
        <h4>{ Ri18n.not_login }</h4> );
	}
}
  	
/*
RGoogleInfo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}
*/

// Connect to Redux
function mapStateToProps(state) {
   //console.log('Redux state - RGoogleInfo');
    //console.log(state);
  return {
    loginDisabled: state.RGoogleInfo.loginDisabled,
    loggedIn: state.RGoogleInfo.loggedIn,
    uid: state.RGoogleInfo.uid,
    displayName: state.RGoogleInfo.displayName,
    email: state.RGoogleInfo.email,
    photoURL: state.RGoogleInfo.photoURL
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setLoggedIn(dispObj) {
       // console.log('setLoggedIn');
       // console.log(dispObj);
        dispatch(setLoggedIn(dispObj.loggedIn));
        dispatch(setUserInfo(dispObj.userInfo));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RGoogleInfo);
