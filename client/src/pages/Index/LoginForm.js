import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import history from "../../services/history";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.props.auth
      .login(this.state.username, this.state.password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        alert(err);
      });
    this.props.close();
  }

  componentDidMount() {
    if (this.props.auth.loggedIn()) history.replace("/");
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your login details!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            id="username"
            label="Username"
            type="text"
            onChange={this.handleChange}
            value={this.state.username}
            fullWidth
          />
          <TextField
            margin="dense"
            name="password"
            id="password"
            label="Password"
            type="text"
            onChange={this.handleChange}
            value={this.state.password}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleFormSubmit} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LoginForm;
