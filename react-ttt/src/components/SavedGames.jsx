import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { deleteSavedGame } from './../reducers/actions';

export class SavedGames extends React.Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
      }
      deleteItem(item){
        console.log('Delete: ' + item);
        this.props.dispatch(deleteSavedGame(item));
        this.forceUpdate()
      }
      createTable = () => {
        let table = [];
        for (let i = 0; i < this.props.save_list.length; i++) {
          let row = [];
          row.push(<td>{this.props.save_list[i].name}</td>);
          row.push(<td><Button bsStyle="success" type="button">Continue</Button></td>);
          row.push(<td><Button bsStyle="danger" type="button" onClick={() => {this.deleteItem(this.props.save_list[i])}}>Delete</Button></td>);
          table.push(<tr>{row}</tr>);
        }
        return table;
      }
    render() {
        return(
              <div>
                <h3>List of Saved Games</h3>
                <Table>
                  <tbody>
                    {this.createTable()}
                  </tbody>
                </Table>
              </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        values: state.values,
        turn: state.turn,
        fetch: state.fetch,
        save_list: state.save_list,
        last_saved_game: state.last_saved_game
    };
}
export default connect(mapStateToProps)(SavedGames);