import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { INITIAL_STATE, setBoard, loadBoard } from '../actions/board'
import DropCell from './DropCell'
import DropContainer from './DropContainer'
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
        const { config, rows, columns, items, board, containers } = this.props;
        return (
            <div className="container">
                <table className="table table-bordered">
					{
						(config.columnShowTitle) && <thead>
							<tr>
                                { (config.rowShowTitle) && <th /> }
                                {
                                    Object.keys(columns).map(function (colId) {
                                        return <th key={ 'header_' + colId }>{ columns[colId].name }</th>;
                                    }, this)
                                }
							</tr>
						</thead>
					}
                    <tbody>
                        {
                            Object.keys(board).map(function (rowId) {
                                return (<tr key={ 'row_' + rowId } className="rj-droppable-tr">
                                            { (config.rowShowTitle) && <td className="rj-droppable-td">{rows[rowId].name}</td> }
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
                <br />
                <table className="table table-bordered">
					{
						<thead>
							<tr>
                                {
                                    Object.keys(containers).map(function (containerId) {
                                        return <th key={ 'header_' + containerId }>{ containers[containerId].name }</th>;
                                    }, this)
                                }
							</tr>
						</thead>
					}
                    <tbody>
                        <tr className="rj-droppable-tr">
                        {
                            Object.keys(containers).map(function (containerId) {
                                return (
                                        <DropContainer key={ 'cont_' + containerId } container = {containerId}>
                                            {
                                                (containers[containerId] && containers[containerId].items) &&
                                                Object.keys(containers[containerId].items).map(function (itemId) {
                                                    return <DragItem key={ 'citm_' + containerId + itemId } container = {containerId} itemId = {itemId} item = { items[itemId] } />;
                                                }, this)
                                            }
                                        </DropContainer>
                                    );
                             }, this)
                        }
                        </tr>
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
       board: state.board.board,
       containers: state.board.containers
    })//,  // mapStateToProps
  //{ setBoard, loadBoard }  //mapDispatchToProps
)(WhiteBoard)