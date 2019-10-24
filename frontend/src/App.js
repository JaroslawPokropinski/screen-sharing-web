import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import Peer from './peerjs';
import { setPeer, setSession } from './actions/sessionActions';
import Share from './views/Share';
import Watch from './views/Watch';
import Root from './views/Root';


const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  padding: 0;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPeerOpen: false
    };

    this.dismissToast = () => { };
    this.isloading = () => {
      const { isPeerOpen } = this.state;
      return !isPeerOpen;
    };
  }

  componentDidMount() {
    // Check compatibility
    if (!navigator || !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      toast.error(`Use google chrome!`);
      return;
    }

    const { setPeer: psetPeer } = this.props;
    // Connect peer
    const peer = new Peer();
    peer.on('open', (id) => {
      psetPeer(peer, id);
      this.setState({ isPeerOpen: true });
      this.dismissToast();
    });

    peer.on('error', (error) => {
      toast.error(`Peerjs: ${error.type}`);
    });

    const toastId = toast.info('Loading...', { autoClose: false, closeOnClick: false });
    this.dismissToast = () => setTimeout(() => toast.dismiss(toastId), 500);
  }

  render() {
    const AppSwitch = (props) => {
      if (props.isloading) {
        return null;
      }
      return (
        <Switch>
          <Route exact path="/watch/:id" component={Watch} />
          <Route exact path="/share" component={Share} />
          <Route exact path="/" component={Root} />
          <Route>
            404
          </Route>
        </Switch>
      );
    }

    return (
      <Container>
        <ToastContainer />
        <AppSwitch isloading={!this.state.isPeerOpen} />
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSession: (login) => {
    dispatch(setSession(login));
  },
  setPeer: (peer, peerId) => {
    dispatch(setPeer(peer, peerId));
  },
});

App.propTypes = {
  setPeer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
