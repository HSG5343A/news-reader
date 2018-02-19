import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'reactjs';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        result: null,
        searchTerm: DEFAULT_QUERY,
      };
      this.onDismiss = this.onDismiss.bind(this);
      this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }
  
  setSearchTopStories(result) {
      this.setState({ result });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
  
  onDismiss(id) {
      function isNotId(item) {
          return item.objectID !== id;
      }
      const updatedList = this.state.result.hits.filter(isNotId);
      this.setState({
          result: Object.assign({}, this.state.result, { hits: updatedList })
      });
  }

  render() {
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    return (
      <div className="App">
        <Table
          list={result.hits}
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
