import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { INITIAL_STATE, setBoard, loadBoard, addRow, addColumn, addItem } from '../actions/board'
import DropCell from './DropCell'
import DropContainer from './DropContainer'
import DropDelete from './DropDelete'

import DragItem from './DragItem'
import RowHeader from './RowHeader'
import ColumnHeader from './ColumnHeader'
import ContainerHeader from './ContainerHeader'

class WhiteBoard extends Component{
	constructor(){ 
		super(); 
        this.loadBoard = this.loadBoard.bind(this);
        this.addItemClick = this.addItemClick.bind(this);
	}
    loadBoard(){
		//const { dispatch, name } = this.props;
		//dispatch(loadBoard(name)); 
    }
	componentDidMount(){ 
		//this.loadBoard();
	}
    addItemClick() {
        const { config } = this.props;
        addItem(config.defaultContainer, config.type);
    }
    render(){
        const { config, rows, columns, items, board, containers } = this.props;
        const { addRowClick, addColumnClick, addItemClick } = this;

        return (
            <div className="container">
                <p>
                    { (config.rowFix < 0 ) && <button type="button" className="btn btn-default rj-btns" onClick = { addRow }>Add Row</button> }
                    { (config.columnFix < 0 ) && <button type="button" className="btn btn-default rj-btns" onClick = { addColumn }>Add Column</button> }
                    <button type="button" className="btn btn-default rj-btns" onClick = { addItemClick }>Add Item</button> 
                </p>
                <br />
                <table className="table table-bordered">
					{
						(config.columnShowTitle) && <thead>
							<tr>
                                { (config.rowShowTitle) && <th /> }
                                {
                                    (columns) && Object.keys(columns).map(function (colId) {
                                        return <ColumnHeader key={ 'header_' + colId } colId = {colId} item = {columns[colId]} ></ColumnHeader>;
                                    }, this)
                                }
							</tr>
						</thead>
					}
                    <tbody>
                        {
                            (rows) && Object.keys(rows).map(function (rowId) {
                                return (<tr key={ 'row_' + rowId } className="rj-droppable-tr">
                                            { (config.rowShowTitle) && <RowHeader rowId = {rowId} item = {rows[rowId]}></RowHeader> }
                                            {
                                                (columns) && Object.keys(columns).map(function (colId) {
                                                    return (
                                                            <DropCell key={ 'cell_' + rowId + colId } rowId = {rowId} colId = {colId}>
                                                                {
                                                                    (board && board[rowId] && board[rowId][colId]) &&
                                                                    Object.keys(board[rowId][colId]).map(function (itemId) {
                                                                        if (items && items[itemId]) return <DragItem key={ 'itm_' + rowId + colId + itemId } rowId = {rowId} colId = {colId} itemId = {itemId} item = { items[itemId] } />;
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
                                    (containers) && Object.keys(containers).map(function (containerId) {
                                        return <ContainerHeader key={ 'header_' + containerId } containerId = {containerId} item = {containers[containerId]}></ContainerHeader>;
                                    }, this)
                                }
							</tr>
						</thead>
					}
                    <tbody>
                        <tr className="rj-droppable-tr">
                        {
                            (containers) && Object.keys(containers).map(function (containerId) {
                                return (
                                        <DropContainer key={ 'cont_' + containerId } container = {containerId}>
                                            {
                                                (containers[containerId] && containers[containerId].items) &&
                                                Object.keys(containers[containerId].items).map(function (itemId) {
                                                    if (items && items[itemId]) return <DragItem key={ 'citm_' + containerId + itemId } container = {containerId} itemId = {itemId} item = { items[itemId] } />;
                                                }, this)
                                            }
                                        </DropContainer>
                                    );
                             }, this)
                        }
                        </tr>
                    </tbody>
                </table>
                <br />
                <DropDelete />
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