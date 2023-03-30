
import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { VideoCallContext } from '../../context/webRtc';
import Sidebar from './Sidebar';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(VideoCallContext);
  return (
    <>
    <Sidebar>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <h1>{call.name} is calling:</h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
      </Sidebar>
    </>
  );
};

export default Notifications;
