import React from "react";
import "./index.css";
import history from "../../services/history";
import Button from "@material-ui/core/Button";

class PageNotFound extends React.Component {
  render() {
    return (
      <body>
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404" />
            <h1>404</h1>
            <h2>Oops! Page Not Be Found</h2>
            <p>
              Sorry but the page you are looking for does not exist, has been
              removed, name changed, or is temporarily unavailable
            </p>
            <Button onClick={() => history.push("/")}>
              <span>Back to homepage</span>
            </Button>
          </div>
        </div>
      </body>
    );
  }
}

export default PageNotFound;
