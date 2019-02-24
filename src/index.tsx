import * as React from 'react'
import { Provider, Subscribe, Container } from 'unstated'

type WrappedComponentType = new(...args: any[]) => React.Component<any>

interface WrapperFuncConfig {
  root: boolean;
  _containerNames: string[];
  _containerValues: Container<any>[];
}

interface ConnectConfigObj {
  [key:string]: Container<any>
}

interface SubscribeConfig {
  root: boolean
}

const wrapperFunction = (WrappedComponent: WrappedComponentType, config: WrapperFuncConfig={
  root: false,
  _containerNames: [],
  _containerValues: []
}) => {
  const { root, _containerNames, _containerValues } = config
  return class extends React.Component<any> {
    constructor(props: any) {
      super(props)
      this.renderChildren = this.renderChildren.bind(this)
      this.subscribers = this.subscribers.bind(this)
    }

    renderChildren() {
      let contrs:ConnectConfigObj = {}
      const functionArguments = arguments
      _containerNames.forEach(function(el, i) { contrs[el] = functionArguments[i] })
      return (<WrappedComponent {...this.props} containers={contrs} />)
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
  }
}

const connect = (containers: ConnectConfigObj) => {
  return (WrappedComponent: WrappedComponentType, config: SubscribeConfig={ root: false }) => {
    const _containerNames = Object.keys(containers)
    const _containerValues = Object.values(containers)
    return wrapperFunction(WrappedComponent, { ...config, _containerNames, _containerValues })
  };
}

export { connect };
