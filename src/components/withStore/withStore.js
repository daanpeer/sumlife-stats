import React, { Component } from "react";
import { observe } from "../../helpers";

export default (WrappedComponent, store) => {
  return class extends Component {
    constructor(props) {
      super(props);

      observe(() => this.setState({}));
    }

    render() {
      return <WrappedComponent />;
    }
  };
};
