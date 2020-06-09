import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

//import Radium, {StyleRoot} from 'radium';

class App extends Component{
  state = {
    persons: [
      { id: 'p1', name: "Amy", age: 16 },
      { id: 'p2', name: "Bob", age: 20 },
      { id: 'p3', name:"Calvin", age: 9 }
    ],
    otherState: 'Other values',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    // Should not change state directly like this, React can't recgonised it.
    // DON'T DO THIS: this.state.persons[0].name = 'Daisy';

    this.setState({
      persons: [
        { name: newName, age: 16 },
        { name: "Bob", age: 20 },
        { name: "Calvin", age: 9 }
      ]
    })
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    // NOT GOOD: const person = this.state.persons[personIndex];
    const person = { ...this.state.persons[personIndex] }; // OR const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex) => {
    // JS objects are reference types so should not mutate them directly (i.e change the original state).
    // Instead we should create a copy of the original state and change that copy.
    // so NOT GOOD: const newPersons = this.state.persons;

    const newPersons = [...this.state.persons]; // OR const newPersons = this.state.persons.slice();
    newPersons.splice(personIndex, 1);  //To remove 1 element from the array
    this.setState({persons: newPersons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render(){

    let persons = null;
    let btnClass = "";

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              name={person.name} 
              age={person.age}
              key={person.id}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
             })}
        </div>
      );

      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); //assignedClasses=["red"]
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); //assignedClasses=["red", "bold"]
    }

    return (
        <div className={classes.App}>
          <h1>hello</h1>
          <p className={assignedClasses.join(" ")}> this is working</p> 
          <button 
            className={btnClass}
            onClick={this.togglePersonsHandler}> Toggle Persons</button>
          {persons}
          </div>
    );

    // This works but not recommended when there are many nested components.
    // return React.createElement('div', {className: "App"}, React.createElement('h1', null, 'Hi!!!!'));
  }
}

export default App;
// export default Radium(App);
