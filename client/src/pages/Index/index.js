import React from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AuthService from "../../services/AuthService";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      enableLoginForm: false,
      enableRegisterForm: false,
    };
    this.toggleLoginButton = this.toggleLoginButton.bind(this);
    this.toggleRegisterButton = this.toggleRegisterButton.bind(this);
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

  toggleLoginButton() {
    this.setState({ enableLoginForm: !this.state.enableLoginForm });
  }

  toggleRegisterButton() {
    this.setState({ enableRegisterForm: !this.state.enableRegisterForm });
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

  render() {
    return (
      <React.Fragment>
        <Header
          registerButton={this.toggleRegisterButton}
          loginButton={this.toggleLoginButton}
          auth={this.Auth}
          search={this.search}
        />
        {this.state.enableLoginForm ? (
          <LoginForm auth={this.Auth} close={this.toggleLoginButton} />
        ) : null}
        {this.state.enableRegisterForm ? (
          <RegisterForm auth={this.Auth} close={this.toggleRegisterButton} />
        ) : null}
        <Grid justify="space-evenly" container spacing={3}>
          {this.state.items.map((v, i) => {
            return (
              <Grid key={i} item xs={4}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      image={
                        v["image"] ||
                        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._n-qAq6XNFrd6xkEiHbdWgHaHa%26pid%3DApi&f=1"
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {v.name}
                      </Typography>
                      <Typography component="h5">Creator: {v.owner}</Typography>
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
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
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
