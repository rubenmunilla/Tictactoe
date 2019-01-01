import React from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { deleteSavedGame } from './../reducers/actions';
import { Link } from 'react-router-dom';

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
          row.push(<td><Link to={'../continue/'+i}><Button bsStyle="success" type="button" >Continue</Button></Link></td>);
          row.push(<td><Button bsStyle="danger" type="button" onClick={() => {this.deleteItem(this.props.save_list[i])}}>Delete</Button></td>);
          table.push(<tr>{row}</tr>);
        }
        return table;
      }
    render() {
        if(this.props.save_list.length>0){
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
        } else {
            return(
            <div>
                <h3>List of Saved Games</h3>
                <div>No saves yet</div>
            </div>
            )
        }
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