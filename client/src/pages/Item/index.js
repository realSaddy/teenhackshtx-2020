import React from "react";
import axios from "axios";
import queryString from "query-string";
import history from "../../services/history";
import AuthService from "../../services/AuthService";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "No description",
      owner: "",
      phoneNumber: "",
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Frounded-flat-country-flag-collection-1%2F2000%2F_Unknown.png&f=1&nofb=1",
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.fetch(
      "/api/item/" + queryString.parse(this.props.location.search).id,
      {},
      (res) => {
        this.setState(res);
      }
    );
  }

  render() {
    let divStyle = {
      padding: "20px",
      alignContent: "center",
      color: "#312F2F",
      backgroundColor: "#939EBF",
    };
    let secondStyle = {
      padding: "10px",
    };
    let imageStyle = {
      height: "500px",
    };
    let buttonStyle = {
      backgroundColor: "#BBCDF2",
      height: "25px",
      border: "none",
    };

    return (
      <React.Fragment>
        <div style={divStyle}>
          <h1>{this.state.name}</h1>
          <img src={this.state.image} style={imageStyle} />
        </div>
        <div style={secondStyle}>
          <h2>Owner: {this.state.owner}</h2>
          {this.state.taker === undefined ? (
            <button style={buttonStyle}>Claim</button>
          ) : (
            <button style={buttonStyle}>Claimed by {this.state.taker}</button>
          )}
          {this.state.phone !== undefined ? (
            <button style={buttonStyle}>
              Phone number:{" "}
              {this.state.phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
            </button>
          ) : null}
          <p>{this.state.description}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Item;
