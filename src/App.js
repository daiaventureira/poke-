import React, { Component, Fragment } from "react";
import "./App.css";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";

class App extends Component {
  constructor(props) {
    super(props);
    this.getSearch = this.getSearch.bind(this);
    // this.getApi = this.getApi.bind(this);

    this.state = {
      data: {},
      search: "",
    };
  }
  getSearch(e) {
    this.setState({ search: e.target.value });
  }

  componentDidMount() {
    axios
      .get("https://pokemon-go1.p.rapidapi.com/pokemon_names.json", {
        headers: {
          "x-rapidapi-key":
            "de7d3ec1a8msh3bc84c33055ffddp1bb764jsn2cb9f2b3b03a",
          "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({ data });
      })
      .catch((error) => {
        console.log(error, "erro");
      });
  }
  render() {
    const requests = [];
    const data = this.state.data;
    const keys = Object.keys(data);
    const requestsSorted = [];

    for (let i = 0; i < keys.length; i++) {
      const x = data[keys[i]];
      const names = x.name.toUpperCase();
      if (
        names.slice(0, this.state.search.length) ===
          this.state.search.toUpperCase() &&
        this.state.search.length >= 1
      ) {
        requests.push(x.name);
        requests.sort();
      }
    }
    for (let j = 0; j < requests.length; j++) {
      requestsSorted.push(
        <Chip
          id="chip"
          size="medium"
          avatar={
            <img
              src={`https://img.pokemondb.net/sprites/sword-shield/icon/${requests[
                j
              ].toLowerCase()}.png`}
              alt=""
            />
          }
          key={j}
          label={requests[j]}
          variant="outlined"
        />
      );
    }
    return (
      <>
        <div className="content">
          <header className="App-header">
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                id="standard-basic"
                label="type here"
                onChange={this.getSearch}
              />
            </form>
          </header>
          <div>
            <div id="title">Pokemons:</div>
            <div>there are {requestsSorted.length} pokemons</div>
            <div>{requestsSorted}</div>
          </div>
        </div>
      </>
    );
  }
}
export default App;
