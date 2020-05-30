import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import AuthService from "../../services/AuthService";

class Index extends React.Component {
  formRow() {
    const paperStyle = {
      padding: "10px",
      textAlign: "center",
      backgroundColor: "grey",
      alignItems: "stretch",
    };
    return (
      <React.Fragment>
        <Grid justify="space-evenly" item md={4}>
          <Paper style={paperStyle}>item</Paper>
        </Grid>
        <Grid justify="space-evenly" item md={4}>
          <Paper style={paperStyle}>item</Paper>
        </Grid>
        <Grid justify="space-evenly" item md={4}>
          <Paper style={paperStyle}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  constructor(props) {
    super(props);
    this.state = { enableLoginForm: false, enableRegisterForm: false };
    this.formRow = this.formRow.bind(this);
    this.toggleLoginButton = this.toggleLoginButton.bind(this);
    this.toggleRegisterButton = this.toggleRegisterButton.bind(this);
    this.Auth = new AuthService();
  }

  toggleLoginButton() {
    this.setState({ enableLoginForm: !this.state.enableLoginForm });
  }

  toggleRegisterButton() {
    this.setState({ enableRegisterForm: !this.state.enableRegisterForm });
  }

  render() {
    return (
      <React.Fragment>
        <Header
          registerButton={this.toggleRegisterButton}
          loginButton={this.toggleLoginButton}
        />
        {this.state.enableLoginForm ? (
          <LoginForm auth={this.Auth} close={this.toggleLoginButton} />
        ) : null}
        {this.state.enableRegisterForm ? (
          <RegisterForm auth={this.Auth} close={this.toggleRegisterButton} />
        ) : null}
        <Grid justify="space-evenly" container spacing={1}>
          <Grid justify="space-evenly" container item md={12} spacing={1}>
            {this.formRow()}
          </Grid>
          <Grid justify="space-evenly" container item md={12} spacing={1}>
            {this.formRow()}
          </Grid>
          <Grid justify="space-evenly" container item md={12} spacing={1}>
            {this.formRow()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Index;
