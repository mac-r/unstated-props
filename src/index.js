import React, { Clone, Component } from 'react';
import { Provider, Subscribe } from 'unstated';

const wrapperFunction = (WrappedComponent, config = {}) => {
  const { root, _containerNames, _containerValues } = config;
  class ResComponent extends Component {
    constructor(props) {
      super(props);
      this.renderChildren = this.renderChildren.bind(this);
      this.subscribers = this.subscribers.bind(this);
    }

    renderChildren() {
      let contrs = {}; _containerNames.forEach((el, i) => { contrs[el] = arguments[i] });
      return <WrappedComponent {...this.props} containers={contrs} />
    }

    subscribers() {
      return (
        <Subscribe to={_containerValues}>
          {this.renderChildren}
        </Subscribe>
      )
    }

    render() {
      if (root) {
        return (<Provider>{this.subscribers()}</Provider>);
      } else {
        return this.subscribers();
      }
    }
  };

  return ResComponent;
}

const connect = (containers) => {
  return (WrappedComponent, config) => {
    let filteredContainers = {}
    const { only } = config; if (only && only.length > 0) {
      only.forEach((key) => { filteredContainers[key] = containers[key] });
      containers = filteredContainers;
    }

    const _containerNames = Object.keys(containers);
    const _containerValues = Object.values(containers);
    return wrapperFunction(WrappedComponent, { ...config, _containerNames, _containerValues });
  };
}

export { connect };
