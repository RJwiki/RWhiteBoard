import React, { Component, PropTypes } from 'react'
import WhiteBoard from '../components/WhiteBoard'
import NavBar from '../components/NavBar'
import { setCurrentBoard,loadBoard } from '../actions/board'
import { connect } from 'react-redux'

let currentBoardName = '';

class board extends Component{
    constructor(){ 
		super(); 
        this.loadBoard = this.loadBoard.bind(this);
        this.state = {
            name: 'demo'
        };
	}
    loadBoard(name){
		const { dispatch } = this.props;
		dispatch(loadBoard(name)); 
    }
	componentDidMount(){ 
		//this.loadBoard();
        

	}
    render(){ 
        let boardName = 'demo';
        if (this.props.params && this.props.params.board) boardName = this.props.params.board;
        if (currentBoardName != boardName) {
            setCurrentBoard(boardName);
            this.loadBoard(boardName);
            //this.setState({ name: boardName });
            currentBoardName = boardName;
        }

        return (<div>
            <NavBar />
            <WhiteBoard />
        </div>
            );
    }
}
 

export default connect(
  state => ({
       name: state.board.name
    })
)(board)