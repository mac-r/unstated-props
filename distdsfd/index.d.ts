import * as React from 'react';
import { Container } from 'unstated';
declare type WrappedComponentType = new (...args: any[]) => React.Component<any>;
interface ConnectConfigObj {
    [key: string]: Container<any>;
}
interface SubscribeConfig {
    root: boolean;
}
declare const connect: (containers: ConnectConfigObj) => (WrappedComponent: WrappedComponentType, config?: SubscribeConfig) => {
    new (props: any): {
        renderChildren(): JSX.Element;
        subscribers(): JSX.Element;
        render(): JSX.Element;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<any>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
export { connect };
