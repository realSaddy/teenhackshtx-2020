import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade, withStyles } from "@material-ui/core/styles";
import history from "../../services/history";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  section: {
    display: "flex",
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillMount() {
    this.timer = null;
  }

  handleChange(event) {
    clearTimeout(this.timer);
    this.setState({ searchText: event.target.value });
    this.timer = setTimeout(this.triggerChange, 1000);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      clearTimeout(this.timer);
      this.triggerChange();
    }
  }

  triggerChange() {
    this.props.search(this.state.searchText);
  }
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            Title Here
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              placeholder="Search…"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              value={this.state.searchText}
            />
          </div>
          <div className={classes.grow} />
          {!this.props.auth.loggedIn() ? (
            <div className={classes.section}>
              <Button
                onClick={this.props.registerButton}
                style={{ marginLeft: "auto" }}
                color={"inherit"}
              >
                Register
              </Button>
              <Button
                onClick={this.props.loginButton}
                style={{ marginLeft: "auto" }}
                color="inherit"
              >
                Login
              </Button>
            </div>
          ) : (
            <div>
              <div>Welcome back {this.props.auth.getProfile().username}</div>
              <div className={classes.section}>
                <Button
                  onClick={() => {
                    this.props.auth.logout();
                    history.replace("/");
                  }}
                  style={{ marginLeft: "auto" }}
                  color="inherit"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);
