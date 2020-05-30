import React from "react";
import queryString from "query-string";
import AuthService from "../../services/AuthService";
import Header from "../Index/Header";
import Button from "@material-ui/core/Button";
import history from "../../services/history";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      phoneNumber: "",
      claimedItems: [],
      listedItems: [],
      image:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Frounded-flat-country-flag-collection-1%2F2000%2F_Unknown.png&f=1&nofb=1",
    };
    this.Auth = new AuthService();
  }

  componentDidMount() {
    this.Auth.fetch(
      "/api/user/" + queryString.parse(this.props.location.search).id,
      {},
      (res) => {
        if (res.error) return history.push("/");
        this.setState(res);
      }
    );
  }

  render() {
    let cardMediaStyle = {
      height: "240px",
      width: "auto",
    };
    return (
      <React.Fragment>
        <Header auth={this.Auth} />
        <Grid justify="space-evenly" container spacing={3}>
          <Grid item xs={3}>
            <Card>
              <CardActionArea>
                <CardMedia
                  style={cardMediaStyle}
                  image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._n-qAq6XNFrd6xkEiHbdWgHaHa%26pid%3DApi&f=1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {this.state.username}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card style={{ width: "100%" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Listed items:
                  </Typography>
                  {this.state.listedItems.map((v, i) => {
                    return (
                      <List key={i}>
                        <ListItemAvatar>
                          <Avatar src={v.image} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={v.name}
                          secondary={v.description}
                        />
                      </List>
                    );
                  })}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card style={{ width: "100%" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Claimed items:
                  </Typography>
                  {this.state.claimedItems.map((v, i) => {
                    return (
                      <Button
                        onClick={() => history.push("/item?id=" + v._id)}
                        key={i}
                      >
                        <List>
                          <ListItemAvatar>
                            <Avatar src={v.image} />
                          </ListItemAvatar>
                          <ListItemText
                            style={{ textTransform: "none" }}
                            primary={v.name}
                            secondary={v.description}
                          />
                        </List>
                      </Button>
                    );
                  })}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default User;
