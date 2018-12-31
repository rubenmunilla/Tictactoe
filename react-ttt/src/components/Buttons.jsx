import React from 'react';
import { Button } from 'react-bootstrap';

export default class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.buttonReset = this.buttonReset.bind(this);
    }
    buttonReset() {
        console.log("reset");
        this.props.appReset();
    }
    render() {
        return (
          <Button bsStyle="danger" onClick={this.buttonReset}>Reset</Button>
        );
    }

}
