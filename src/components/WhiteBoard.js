import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { INITIAL_STATE, setBoard, loadBoard } from '../actions/board'
import DropCell from './DropCell'
import DragItem from './DragItem'


class WhiteBoard extends Component{
	constructor(){ 
		super(); 
	}
	componentDidMount(){ 
		const { dispatch } = this.props; 
		dispatch(loadBoard()); 
	}
    render(){ 
        const rThis = this;
        const { config, rows, columns, items, board } = this.props;
        return (
            <div className="container">
                <table className="table table-bordered">
					{
						(config.columnShowTitle) && <thead>
							<tr>
                                { (config.rowShowTitle) && <th /> }
                                {
                                    Object.keys(columns).map(function (colId) {
                                        return <th key={ 'header_' + colId }>{ rThis.props.columns[colId].name }</th>;
                                    }, this)
                                }
							</tr>
						</thead>
					}
                    <tbody>
                        {
                            Object.keys(board).map(function (rowId) {
                                return (<tr key={ 'row_' + rowId }>
                                            { (config.rowShowTitle) && <td>{rows[rowId].name}</td> }
                                            {
                                                Object.keys(columns).map(function (colId) {
                                                    return (
                                                            <DropCell key={ 'cell_' + rowId + colId } rowId = {rowId} colId = {colId}>
                                                                {
                                                                    (board[rowId] && board[rowId][colId]) &&
                                                                    Object.keys(board[rowId][colId]).map(function (itemId) {
                                                                        return <DragItem key={ 'itm_' + rowId + colId + itemId } rowId = {rowId} colId = {colId} itemId = {itemId} item = { items[itemId] } />;
                                                                    }, this)
                                                                }
                                                            </DropCell>
                                                        );
                                                }, this)
                                            }
                                        </tr>
                                    );
                                }, this)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(
  state => ({
       config: state.board.config,
       rows: state.board.rows,
       columns: state.board.columns,
       items: state.board.items,
       board: state.board.board
    })//,  // mapStateToProps
  //{ setBoard, loadBoard }  //mapDispatchToProps
)(WhiteBoard)