import React from "react";
import Header from "./Header";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header />
        Hello!
      </div>
    );
  }
}

export default Index;
