import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class NamePage extends Component {
  render() {
    return (
      <div className="page">
        <p>
          Greetings, traveler! What is your name?
          <br />
          <input
            type="text"
            value={this.props.data.name}
            onChange={event =>
              this.props.setStateFunction("name", event.target.value)
            }
          />
        </p>
        <button onClick={() => this.props.goFunction(StartPage)}>
          Continue...
        </button>
      </div>
    );
  }
}

class StartPage extends Component {
  render() {
    return (
      <div className="page">
        <p>
          Welcome, {this.props.data.name}! How would you like to get to your
          destination?
        </p>
        <button onClick={() => this.props.goFunction(TrainPage)}>Train</button>
        <button onClick={() => this.props.goFunction(ShipPage)}>Ship</button>
      </div>
    );
  }
}

class TrainPage extends Component {
  render() {
    return (
      <div className="page">
        <p>
          Welcome aboard the choo-choo train! Please make your way to your seat.
          What is the number?
          <br />
          <input
            type="text"
            value={this.props.data.seat}
            onChange={event =>
              this.props.setStateFunction("seat", event.target.value)
            }
          />
        </p>

        <button onClick={() => this.props.goFunction(SeatPage)}>
          Continue...
        </button>
      </div>
    );
  }
}
class ShipPage extends Component {
  render() {
    return (
      <div className="page">
        <p>
          Welcome aboard the Whoo-Whoo ship! Please make your way to your seat.
          What is the number?
          <br />
          <input
            type="text"
            value={this.props.data.seat}
            onChange={event =>
              this.props.setStateFunction("seat", event.target.value)
            }
          />
        </p>

        <button onClick={() => this.props.goFunction(SeatPage)}>
          Continue...
        </button>
      </div>
    );
  }
}

class SeatPage extends Component {
  render() {
    var nextPage = ShipPage;
    if (this.props.data.answer === "yes") {
      nextPage = TrainPage;
    }

    if (this.props.data.answer === "maybe") {
      nextPage = MaybePage;
    }

    return (
      <div className="page">
        <p>
          As you wished, {this.props.data.seat} is your seat!
          <br />
          Would you like to to change your seat?
        </p>
        <select
          value={this.props.data.answer}
          onChange={event =>
            this.props.setStateFunction("answer", event.target.value)
          }
        >
          <option value="yes">yes</option>
          <option value="maybe">maybe</option>
          <option value="no">no</option>
        </select>
        <button onClick={() => this.props.goFunction(nextPage)}>
          Continue...
        </button>
      </div>
    );
  }
}

class MaybePage extends Component {
  render() {
    return (
      <div className="page">
        <p>You are dead because of your indecisiveness...</p>
        <button onClick={() => this.props.goFunction(NamePage)}>Restart</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageClass: NamePage
    };
  }

  goToPage(pageClass) {
    this.setState({
      pageClass: pageClass
    });
  }

  render() {
    var app = this;

    function setState(key, value) {
      let newState = {};
      newState[key] = value;
      app.setState(newState);
    }

    function goFunction(pageClass) {
      app.goToPage(pageClass);
    }

    return (
      <div className="App">
        <this.state.pageClass
          data={this.state}
          setStateFunction={setState}
          goFunction={goFunction}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
