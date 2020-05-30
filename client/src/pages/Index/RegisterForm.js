import React from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import history from "../../services/history";
import NumberFormat from "react-number-format";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", phoneNumber: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.NumberFormatCustom = this.NumberFormatCustom.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios
      .post(`/api/register`, {
        username: this.state.username,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber,
      })
      .then((res) => {
        this.props.auth.setToken(res.data.token);
        history.push("/");
      })
      .catch((e) => console.error(e));
    this.props.close();
    history.push("/");
  }

  componentDidMount() {
    if (this.props.auth.loggedIn()) history.replace("/");
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        format="(###) ###-####"
        isNumericString
      />
    );
  }

  render() {
    return (
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <DialogContentText>Register below!</DialogContentText>
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
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
            fullWidth
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            id="phoneNumber"
            label="Phone Number"
            type="text"
            onChange={this.handleChange}
            value={this.state.phoneNumber}
            fullWidth
            InputProps={{
              inputComponent: this.NumberFormatCustom,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleFormSubmit} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default RegisterForm;
