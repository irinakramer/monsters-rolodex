import React, {Component} from 'react';
import logo from './logo.svg';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // empty array here, because we're getting our users from fetch
      monsters: [],
      searchField: ''
    }; 
  }

  // using lifecycle method
  // componentDidMount() - Called immediately before mounting occurs, and before Component#render
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    // taking response and converting them into json format
      .then(response => response.json())
      // take our users that we got from json and set that monsters 
      // array to these users
      .then(users => this.setState({monsters: users}))
      .catch(error => console.log("I have failed"))
            // we get list of users in the front end
  }

  handleChange = e => {
    this.setState({ searchField: e.target.value });
  }

  render () {
    const {monsters, searchField} = this.state;
    // this is the same as:
    // const monsters = this.state.monsters;
    // const searchField = this.state.searchField;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()))
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        {/* get the value inside the search field */}
        {/* <input type="search" placeholder="Search monsters" onChange={e => console.log(e.target.value)}/> */}
        <SearchBox 
          placeholder="Search monsters" 
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}>
        
        </CardList>        
      </div>
    );
  }
}

export default App;
