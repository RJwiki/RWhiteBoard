/*
RNavBar - Nav Bar Component
*/
import React from 'react'
import { Link } from 'react-router'
import RStore from './data/RStore.js'
import Ri18n from './Ri18n.js'

function getBaseUrl() {
	var re = new RegExp(/^.*\//);
	return ""+re.exec(window.location.pathname);
}

let BASE_URL = getBaseUrl();
if (_.endsWith(BASE_URL,'/')) BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1); //remove ending '/'


let RNavBar = React.createClass({

    getInitialState: function () {
        return { loginDisabled: false, loginText: Ri18n.login, loggedIn: false }
    },
    componentDidMount: function() {
        let oThis = this;
        // Result from Redirect auth flow.
        // [START getidptoken]
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                //var token = result.credential.accessToken;
                // [START_EXCLUDE]
                //alert(token);
                //document.getElementById('quickstart-oauthtoken').textContent = token;
            } else {
                //document.getElementById('quickstart-oauthtoken').textContent = 'null';
                // [END_EXCLUDE]
                //alert('no token');
            }
            // The signed-in user info.
            //var user = result.user;
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            //var errorMessage = error.message;
            // The email of the user's account used.
            v//ar email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            //var credential = error.credential;
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
                //alert('You have already signed up with a different auth provider for that email.');
            // If you are using multiple auth providers on your app you should handle linking
            // the user's accounts here.
            } else {
                console.error(error);
            }
            // [END_EXCLUDE]
        });
        // [END getidptoken]

        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.

                //alert(JSON.stringify(user, null, '  '));
                oThis.setState({ loginText: Ri18n.logout, loggedIn: true });
                RStore.setGoogleUserInfo(user);
                RStore.setLoggedIn(true);
                // [END_EXCLUDE]
            } else {
                // User is signed out.
                // [START_EXCLUDE]
                //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                // document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
                // document.getElementById('quickstart-account-details').textContent = 'null';
                //document.getElementById('quickstart-oauthtoken').textContent = 'null';
                // [END_EXCLUDE]
                //alert('Sign in with Google');
                oThis.setState({ loginText: Ri18n.login, loggedIn: false });
                RStore.setGoogleUserInfo({});
                RStore.setLoggedIn(false);
            }
            // [START_EXCLUDE]
            //document.getElementById('quickstart-sign-in').disabled = false;
            oThis.setState({ disabled: false });
            // [END_EXCLUDE]
        });
        // [END authstatelistener]

    },
    clickLogin: function() {
        if (!firebase.auth().currentUser) {
            // [START createprovider]
            var provider = new firebase.auth.GoogleAuthProvider();
            // [END createprovider]
            // [START addscopes]
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            // [END addscopes]
            // [START signin]
            firebase.auth().signInWithRedirect(provider);
            // [END signin]
        } else {
            // [START signout]
            firebase.auth().signOut();
            window.location.href = BASE_URL + '/#'; 
            // [END signout]
        }
        // [START_EXCLUDE]
        //document.getElementById('quickstart-sign-in').disabled = true;
        this.setState({ disabled: true });
        // [END_EXCLUDE]
    },
	render: function() {

    let { title, items } = this.props.data;
    const isLoggedIn = this.state.loggedIn;

		return (
<div className="container">
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">{title}</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
          {
            items.map(function(menuitem, idx) {
                if ( isLoggedIn || menuitem.allowAccessWithoutLogin) {
                    if (menuitem.items) {
                        return (<li  key = { 'mi' + idx } className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{menuitem.text} <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            {
                                menuitem.items.map(function(subitem, sidx){
                                    if (subitem.type == 'separator') return <li key = { 'mi' + idx + '-'  + sidx } role="separator" className="divider"></li>;
                                    else if (subitem.type == 'header') return <li key = { 'mi' + idx + '-'  + sidx } className="dropdown-header">{subitem.text}</li>;
                                    else return <li key = { 'mi' + idx + '-'  + sidx }><Link to={ BASE_URL + subitem.url }>{subitem.text}</Link></li>
                                })
                            }
                        </ul>
                        </li>)
                    }else{
                        return <li key = { 'mi' + idx }><Link to={ BASE_URL + menuitem.url }>{menuitem.text}</Link></li>
                    }
                }
            }) 
          }
          <li key = "rlogin_btn"><a href="#" onClick={ this.clickLogin } >{ this.state.loginText }</a></li>
          </ul></div></div></nav></div>
);
	}
});
  	
export default RNavBar