import React from "react";
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();

    // set up the base url instead of localhost:3000
    axios.defaults.baseURL = "http://localhost:5000";

    this.state = {
      message: {}
    }
    }
  
  componentDidMount() {
    axios.get('/api/v1/print-hello').then(res => this.setState({ message: res.data }));
  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.message.body}</h1>
      </div>);
  }
}

export default App;
