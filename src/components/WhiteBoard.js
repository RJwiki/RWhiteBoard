import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { INITIAL_STATE, setBoard, loadBoard } from '../actions/board'
import DropCell from './DropCell'
import Ri18n from '../Ri18n.js'


class WhiteBoard extends Component{
    render(){ 
        const rThis = this;
        const { config, rows, columns, items, board } = this.props;
        return (
            <div className="container">
                <table className="table table-bordered">
					{
						(config.columnShowTitle) && <thead>
							<tr>
							(config.rowShowTitle) && <th />
							{
								Object.keys(columns).forEach(function (key) {
									return (
											<th>{ rThis.props.columns[key].name }</th>
										);
									}, this)
								}
							}
							</tr>
						</thead>
					}
                    <tbody>
                        {
                            Object.keys(board).forEach(function (rowId) {
                                return (<tr>
                                            (config.rowShowTitle) && <td>{rows[rowId].name}</td>
                                            {
                                                Object.keys(columns).forEach(function (rowId) {
                                                    return (
                                                            <DropCell rowId = {rowId} colId = {colId}>
                                                                {
                                                                    Object.keys(board[rowId][colId]).forEach(function (itemId) {
                                                                        return <DragItem rowId = {rowId} colId = {colId} itemId = {itemId} item = { items[itemId] } />;
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
    }),  // mapStateToProps
  { setBoard, loadBoard }  //mapDispatchToProps
)(WhiteBoard)