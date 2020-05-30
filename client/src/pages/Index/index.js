import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";

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

  render() {
    const gridStyle = {
      alignItems: "stretch",
    };
    return (
      <React.Fragment>
        <Header />
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
