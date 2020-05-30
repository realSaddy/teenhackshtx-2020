import React from "react";
import queryString from "query-string";
import AuthService from "../../services/AuthService";
import Header from "../Index/Header";
import Button from "@material-ui/core/Button";
import history from "../../services/history";

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
    this.claim = this.claim.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo() {
    this.Auth.fetch(
      "/api/item/" + queryString.parse(this.props.location.search).id,
      {},
      (res) => {
        this.setState(res);
      }
    );
  }

  claim(id) {
    this.Auth.fetch(
      "/api/claim",
      {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
      },
      () => this.getInfo()
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
        <Header auth={this.Auth} />
        <div style={divStyle}>
          <h1>{this.state.name}</h1>
          <img alt="The item" src={this.state.image} style={imageStyle} />
        </div>
        <div style={secondStyle}>
          <Button>
            <h2
              onClick={() => history.push("/user?id=" + this.state.owner)}
              style={{ textTransform: "none" }}
            >
              Created by {this.state.owner}
            </h2>
          </Button>
          <br />
          {this.state.taker === undefined && this.Auth.loggedIn() ? (
            <Button
              onClick={() => this.claim(this.state._id)}
              size="small"
              color="primary"
            >
              Claim
            </Button>
          ) : null}
          {this.state.taker !== undefined ? (
            <Button size="small" color="secondary">
              Claimed
            </Button>
          ) : null}
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
