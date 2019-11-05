import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Peer from '../peerjs';
import { setPeer } from '../actions/sessionActions';
import Share from './Share';
import Watch from './Watch';
import Root from './Root';

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  padding: 0;
`;

type AppProps = {
  setPeer: (peer: Peer, id: string) => void;
};

type AppState = {
  isPeerOpen: boolean;
};

class App extends React.Component<AppProps, AppState> {
  dismissToast: () => void;

  constructor(props: AppProps) {
    super(props);
    this.state = {
      isPeerOpen: false,
    };

    this.dismissToast = () => {};
  }

  componentDidMount() {
    // Check compatibility
    const _navigator: any = navigator;
    if (
      !navigator ||
      !navigator.mediaDevices ||
      !_navigator.mediaDevices.getDisplayMedia
    ) {
      toast.error('Use google chrome!');
      return;
    }

    const { setPeer: psetPeer } = this.props;
    // Connect peer
    const peer = new Peer(process.env.NODE_ENV === 'production');
    peer.on('open', (id) => {
      psetPeer(peer, id);
      console.log(id);
      this.setState({ isPeerOpen: true });
      this.dismissToast();
    });

    peer.on('error', (error) => {
      toast.error(`Peerjs: ${error.type}`);
    });

    const toastId = toast.info('Loading...', {
      autoClose: false,
      closeOnClick: false,
    });
    this.dismissToast = () => setTimeout(() => toast.dismiss(toastId), 500);
  }

  render() {
    const AppSwitch = (props: { isloading: boolean }) => {
      if (props.isloading) {
        return null;
      }
      return (
        <Switch>
          <Route exact path='/watch/:id' component={Watch} />
          <Route exact path='/share' component={Share} />
          <Route exact path='/' component={Root} />
          <Route>404</Route>
        </Switch>
      );
    };

    return (
      <Container>
        <ToastContainer />
        <AppSwitch isloading={!this.state.isPeerOpen} />
      </Container>
    );
  }
}

const dispatchProps = {
  setPeer,
};

export default connect(
  null,
  dispatchProps
)(App);
