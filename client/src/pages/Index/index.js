import React from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import AuthService from "../../services/AuthService";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import history from "../../services/history";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      enableLoginForm: false,
      enableRegisterForm: false,
    };
    this.claim = this.claim.bind(this);
    this.search = this.search.bind(this);
    this.getPage = this.getPage.bind(this);
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.getPage(0);
  }

  getPage(page) {
    axios
      .get("/api/page/" + page)
      .then((res) => this.setState({ items: res.data.res }))
      .catch((e) => console.error(e));
  }

  search(search) {
    if (search === "") return this.getPage(0);
    axios
      .post("/api/search", {
        search: search,
      })
      .then((res) => {
        this.setState({ items: res.data.docs });
      })
      .catch((e) => console.error(e));
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
      () => history.push("/item?id=" + id)
    );
  }

  render() {
    return (
      <React.Fragment>
        <Header auth={this.Auth} search={this.search} />
        <Grid justify="space-evenly" container spacing={3}>
          {this.state.items.map((v, i) => {
            return (
              <Grid style={{ paddingTop: "2%" }} key={i} item md={4} xl={3}>
                <Card>
                  <CardActionArea>
                    {v.image === undefined ? (
                      <CardMedia
                        style={{ height: 240, width: "100%" }}
                        image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._n-qAq6XNFrd6xkEiHbdWgHaHa%26pid%3DApi&f=1"
                      />
                    ) : (
                      <img
                        style={{ height: 240, width: "100%" }}
                        src={v.image}
                        alt="The item"
                      />
                    )}

                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {v.name}
                      </Typography>
                      <Typography component="h5">
                        Creator: {v.ownerName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {v.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {v.taker === undefined && this.Auth.loggedIn() ? (
                      <Button
                        onClick={() => this.claim(v._id)}
                        size="small"
                        color="primary"
                      >
                        Claim
                      </Button>
                    ) : null}
                    {v.taker !== undefined ? (
                      <Button size="small" color="secondary">
                        Claimed
                      </Button>
                    ) : null}
                    <Button
                      onClick={() => history.push("/item?id=" + v._id)}
                      size="small"
                      color="primary"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </React.Fragment>
    );
  }
}

export default Index;
