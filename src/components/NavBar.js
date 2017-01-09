/*
Nav Bar Component
*/
import React from 'react'
import { browserHistory, Link } from 'react-router'

import i18n from '../i18n'
import { getBaseUrl } from '../utils'
import { connect } from 'react-redux'
import { loadMenu } from '../actions/mainmenu'


const BASE_URL = getBaseUrl(true);

let NavBar = React.createClass({
    getInitialState: function () {
        return { loginDisabled: false, loginText: i18n.login, loggedIn: false }
    },
    componentDidMount: function() {
        let oThis = this;
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
            }
        }).catch(function(error) {
            var errorCode = error.code;
            if (errorCode === 'auth/account-exists-with-different-credential') {
                //alert('You have already signed up with a different auth provider for that email.');
            } else {
                console.error(error);
            }
        });
        
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                oThis.setState({ loginText: i18n.logout, loggedIn: true });
            } else {;
                oThis.setState({ loginText: i18n.login, loggedIn: false });
            }
            oThis.setState({ disabled: false });
        });
        loadMenu();
    },
    clickLogin: function() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            firebase.auth().signInWithRedirect(provider);
        } else {
            firebase.auth().signOut();
            browserHistory.push(BASE_URL + '/');
        }
        this.setState({ disabled: true });
    },
    render: function () {

        let { title, items } = this.props;
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
                                    items.map(function (menuitem, idx) {
                                        if (isLoggedIn || menuitem.allowAccessWithoutLogin) {
                                            if (menuitem.items) {
                                                return (<li key={'mi' + idx} className="dropdown">
                                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{menuitem.text} <span className="caret"></span></a>
                                                    <ul className="dropdown-menu">
                                                        {
                                                            menuitem.items.map(function (subitem, sidx) {
                                                                if (subitem.type == 'separator') return <li key={'mi' + idx + '-' + sidx} role="separator" className="divider"></li>;
                                                                else if (subitem.type == 'header') return <li key={'mi' + idx + '-' + sidx} className="dropdown-header">{subitem.text}</li>;
                                                                else return <li key={'mi' + idx + '-' + sidx}><Link to={BASE_URL + subitem.url}>{subitem.text}</Link></li>
                                                            })
                                                        }
                                                    </ul>
                                                </li>)
                                            } else {
                                                return <li key={'mi' + idx}><Link to={BASE_URL + menuitem.url}>{menuitem.text}</Link></li>
                                            }
                                        }
                                    })
                                }
                                <li key="rlogin_btn"><a href="#" onClick={this.clickLogin} >{this.state.loginText}</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
});

export default connect(
  state => ({
       title: state.mainmenu.title,
       items: state.mainmenu.items
    })//,  
    // mapStateToProps
  //{ setBoard, loadBoard }  //mapDispatchToProps
)(NavBar)