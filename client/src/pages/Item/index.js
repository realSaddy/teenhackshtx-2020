import React from "react";
import axios from "axios";
import queryString from "query-string";
import history from "../../services/history";

let name = "Toilet Paper";
let image =
  "https://images.squarespace-cdn.com/content/v1/5d716b6832e14f0001f75af4/1587063146356-UT1W87T2WYDR2G7HFOV3/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/IMG_3672.jpg";
let owner = "shudoijd";
let description =
  "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway. Because bees don’t care what humans think is impossible.” SEQ. 75 - “INTRO TO BARRY” INT. BENSON HOUSE - DAY ANGLE ON: Sneakers on the ground. Camera PANS UP to reveal BARRY BENSON’S BEDROOM ANGLE ON: Barry’s hand flipping through different sweaters in his closet. BARRY Yellow black, yellow black, yellow black, yellow black, yellow black, yellow black...oohh, black and yellow... ANGLE ON: Barry wearing the sweater he picked, looking in the mirror. BARRY (CONT’D) Yeah, let’s shake it up a little.";

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
      .catch((err) => {
        console.error(err);
        history.push("/");
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
