import React, { Component } from 'react';
import { observe } from './observe';

export const withStore = (WrappedComponent, store) => {
  return class extends Component {
    constructor(props) {
      super(props);

      observe(() => this.setState({}));
    }
    
    render() {
      return <WrappedComponent />;
    }
  }
}
