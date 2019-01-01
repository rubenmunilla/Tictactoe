import React from 'react';
import { Button } from 'react-bootstrap';

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);
    }
    render() {
        return (
          <div>
          <form onSubmit={this.props.handleSaveGameSubmit}>
              <label>
                Save Name:
                <input type="text" value={this.props.state.save_name} onChange={this.props.handleSaveGameNameChange} />
                <Button bsStyle="warning" type="submit">Save</Button>
              </label>
            </form>
          </div>
        );
    }
}
