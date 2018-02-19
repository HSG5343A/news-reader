import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'AngularJS',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
];

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        list,
      };
      this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss(id) {
      function isNotId(item) {
          return item.objectID !== id;
      }
      const updatedList = this.state.list.filter(isNotId);
      this.setState({ list: updatedList });
  }

  render() {
    return (
      <div className="App">
        <Table
          list={this.state.list}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Table = ({ list, onDismiss }) =>
  <table className="table">
    <tbody>
    {list.map(item =>
      <tr key={item.objectID} className="table-row">
        <td style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </td>
        <td style={{ width: '30%' }}>
          {item.author}
        </td>
        <td style={{ width: '10%' }}>
          {item.num_comments}
        </td>
        <td style={{ width: '10%' }}>
          {item.points}
        </td>
        <td>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </td>
      </tr>
    )}
    </tbody>
  </table>

const Button = ({ onClick, children }) =>
  <button onClick={onClick} type="button">
    {children}
  </button>

export default App;
