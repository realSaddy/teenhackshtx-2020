import React from "react";
import axios from "axios";
import queryString from "query-string";
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
  }

  componentDidMount() {
    axios
      .get("/api/item/" + queryString.parse(this.props.location.search).id)
      .then((res) => {
        this.setState(res.data);
      })
      .catch(() => {
        history.push("/404");
      });
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
          <button style={buttonStyle}>Claim</button>
          <button style={buttonStyle}>Contact Owner</button>

          <p>{this.state.description}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Item;
