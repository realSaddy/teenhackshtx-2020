import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import history from "../../services/history";
import { withStyles } from "@material-ui/core/styles";
import { PhotoCamera } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
});

class CreateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCapture = this.handleCapture.bind(this);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    this.props.auth.fetch(
      "/api/item",
      {
        method: "POST",
        body: JSON.stringify({
          name: this.state.name,
          description: this.state.description,
          image: this.state.image,
        }),
      },
      function (res) {
        if (res.success) history.push("/item?id=" + res.id);
      }
    );
  }

  handleCapture(target) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(target.target.files[0]);
    fileReader.onload = (e) => {
      this.setState({
        image: e.target.result,
      });
    };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog open={true}>
        <DialogTitle id="form-dialog-title">Create!</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the item details below!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="Name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
            fullWidth
          />
          <TextField
            margin="dense"
            name="description"
            id="description"
            label="Description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
            fullWidth
          />
          <input
            accept="image/*"
            className={classes.input}
            id="image"
            type="file"
            onChange={this.handleCapture}
          />
          <label htmlFor="image">
            <Button variant="contained" color="primary" component="span">
              <PhotoCamera /> Upload Image
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleFormSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CreateItem);
