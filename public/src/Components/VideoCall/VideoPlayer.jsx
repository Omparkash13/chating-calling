import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography, Paper, makeStyles, Button } from '@material-ui/core';
import '../header.css';
import { VideoCallContext } from '../../context/webRtc';
import Notifications from './Notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophoneLinesSlash,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';
const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, call, getStream } =
    useContext(VideoCallContext);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const offVideo = () => {
    setIsVideoOn(!isVideoOn);
  };
  const offMic = () => {
    setIsAudioOn(!isAudioOn);
  };
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: isVideoOn, audio: isAudioOn })
      .then((currentStream) => {
        getStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
  }, [isVideoOn]);
  const classes = useStyles();
  return (
    <>
      <div className="main-container-video">
        <Grid container className={classes.gridContainer}>
          {/* {stream && ( */}
          <Paper className={classes.paper}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {name || 'Name'}
              </Typography>
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className={classes.video}
              />
            </Grid>
            <div>
              <FontAwesomeIcon
                icon={faVideoSlash}
                onClick={offVideo}
                size="2x"
              />
              <FontAwesomeIcon
                icon={faMicrophoneLinesSlash}
                onClick={offMic}
                size="2x"
              />
            </div>
          </Paper>
          {/* )} */}
          {callAccepted && !callEnded && (
            <Paper className={classes.paper}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" gutterBottom>
                  {call.name || 'Name'}
                </Typography>
                <video
                  playsInline
                  ref={userVideo}
                  autoPlay
                  className={classes.video}
                />
              </Grid>
            </Paper>
          )}
        </Grid>
        <Notifications />
      </div>
    </>
  );
};

export default VideoPlayer;
