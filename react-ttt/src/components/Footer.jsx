import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
          <header className="footer">
            {this.props.text}
          </header>
        );
    }

}
