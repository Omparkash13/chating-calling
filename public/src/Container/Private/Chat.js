import React, { useContext, useEffect, useState, useRef } from 'react';
import '../../Container/container.css';
import InnerSidebar from './InnerSidebar';
import { faBars, faL } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action';
import { useParams } from 'react-router-dom';
import Messages from './messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faUserSecret,
  faCircleChevronUp,
  faSpinner,
  faFaceSmile,
  faFileExport,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';

import { SocketContext, socketIo } from '../../context/socket';
import Picker from 'emoji-picker-react';

function Chat() {
  const allParams = useParams();
  const navigate = useNavigate();
  const userRow = useSelector((row) => row.user);
  const [isloading, setIsLoading] = useState(false);
  const socket = useContext(SocketContext);
  const [scroll, setScroll] = useState(true);
  const dispatch = useDispatch();
  const [getAllMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const offset = 0;
  const [limit, setLimit] = useState(10);
  const messageCount = userRow.getAllMessages?.messageCount;

  useEffect(() => {
    socket.emit('join', { userId: userRow.userId });
  }, [allParams.id]);

  const doubleTick = () => {
    return `<i style="color:yellow" class="fas">
        &#xf560;
      </i>`;
  };

  const handleKeyDown = async (event) => {
    if (event.key === 'Enter' && event.target.value.trim().length >= 2) {
      socket.emit('sendMessageEmit', {
        message: event?.target?.value,
        toUserId: allParams.id,
        userId: userRow.userId,
        type: 'MESSAGE',
      });

      const msg = {
        date: new Date().toISOString(),
        message: event?.target?.value,
        toUserId: allParams.id,
        userId: userRow.userId,
        type: 'MESSAGE',
        toStatus: 'UNREAD',
      };
      setNewMessage(msg);

      event.target.value = '';
      setScroll(true);
    }
  };

  const sendFileClick = async (data) => {
    socket.emit('sendMessageEmit', {
      message: data?.picture,
      toUserId: allParams.id,
      userId: userRow.userId,
      type: 'MEDIA',
    });
    const msg = {
      date: new Date().toISOString(),
      message: data?.picture,
      toUserId: allParams.id,
      userId: userRow.userId,
      type: 'MEDIA',
      toStatus: 'UNREAD',
    };
    setNewMessage(msg);
  };

  // ***************************pagination**********************

  const onArrowClick = () => {
    setScroll(false);
    if (messageCount > limit) {
      setLimit(limit + 10);
      setIsLoading(true);
    }
  };

  const getMessages = () => {
    dispatch(
      actions.getUserMessages({
        toUserId: allParams.id,
        token: userRow.userToken,
        offset,
        limit,
      })
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getMessages();
  }, [limit]);

  const toUserName = userRow.getFriendsList?.find((index) => {
    if (
      Number(index.toRequestId) == Number(allParams.id) ||
      Number(index.fromRequestId) == Number(allParams.id)
    ) {
      if (allParams.id == index.toRequestId) {
        return index;
      } else {
        return index;
      }
    }
  });

  useEffect(() => {
    setAllMessages(
      userRow?.getAllMessages?.allMessages.sort(
        (newMessageDate, oldMessageData) =>
          newMessageDate.date.localeCompare(oldMessageData.date)
      )
    );
  }, [userRow.getAllMessages?.allMessages]);

  useEffect(() => {
    socket.on('sendMessageListen', (data) => {
      const msg = {
        date: new Date().toISOString(),
        message: data.message,
        toUserId: data.toUserId,
        userId: data.userId,
        type: data.type,
        toStatus: 'UNREAD',
      };
      setNewMessage(msg);
      socket.emit('messageRead', msg); // when both user is on same page
    });
  }, [socket]);

  // before messageReadListen, messageRead will run. If messageRead will not run than messageReadListen will not run
  useEffect(() => {
    socket.on('messageReadListen', (data) => {
      // it notify the sender to the receiver is saw his message
      const rawTicks = Array.from(document.getElementsByClassName('tickTick'));
      rawTicks.map((ele) => {
        return (ele.innerHTML = doubleTick());
      });
    });
  }, [socket]);

  // it will work when user is on another page or offline and see msg late then this useEffect send read check on msg sender side
  const userLastMessage =
    userRow.getAllMessages.allMessages[
      [userRow.getAllMessages.allMessages.length - 1]
    ];
  useEffect(() => {
    if (userLastMessage?.toUserId != allParams.id) {
      socket.emit('messageRead', userLastMessage);
    }
  }, [socket]);

  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    const target = document.getElementById('messageKey');
    target.value = target.value + emojiObject.emoji;
  };

  // ************************* file upload*************************************

  const track = useRef();

  function onFileSubmit(e) {
    dispatch(
      actions.uploadImage({
        picture: e.target.files[0],
        userToken: userRow.userToken,
        type: 'MEDIA',
      })
    );
    track.current.value = '';
  }

  useEffect(() => {
    if (userRow?.sendFileInMessage?.picture !== undefined) {
      sendFileClick({ picture: userRow?.sendFileInMessage?.picture });
      dispatch({
        type: 'UPLOAD_FILE_MESSAGE',
        uploadFiles: {
          picture: undefined,
          type: '',
        },
      });
    }
  }, [userRow]);

  // console.log('NEW MESSAGE:::::::::::', newMessage);
  // // socket.emit('messageRead', newMessage);

  // useEffect(() => {
  //   socket.emit('messageRead', newMessage);
  // }, [socket]);

  const chooseFile = () => {
    track.current.click();
  };

  function ClearNewMsgState() {
    setNewMessage('');
  }
  return (
    <>
      <InnerSidebar>
        <div className="chat-header">
          {allParams.id == toUserName?.fromRequestId ? (
            <div className="profile-pic-friendList">
              <img
                src={toUserName.fromprofilepic}
                onClick={() =>
                  navigate(`/userProfile/${toUserName?.fromRequestId}`)
                }
              />
            </div>
          ) : allParams.id == toUserName?.toRequestId ? ( // else if in ternary
            <div className="profile-pic-friendList">
              <img
                src={toUserName.toprofilepic}
                onClick={() =>
                  navigate(`/userProfile/${toUserName?.toRequestId}`)
                }
              />
            </div>
          ) : (
            <FontAwesomeIcon
              className="userDefaultIconWhite"
              icon={faUserSecret}
              // onClick={() => navigate(`/userProfile/${row.id}`)}
            />
          )}

          <div class="name">
            {allParams.id == toUserName?.toRequestId
              ? toUserName?.tofirstname + ' ' + toUserName?.tolastname
              : toUserName?.fromfirstname + ' ' + toUserName?.fromlastname}
          </div>
          <div className="chat-menu">
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>

        <div className="outerChat">
          {isloading ? (
            <FontAwesomeIcon
              className="load-message"
              icon={faSpinner}
              spin
              size="2x"
            />
          ) : (
            []
          )}
          {limit < messageCount ? (
            <FontAwesomeIcon
              className="load-message"
              title="Check previous messages"
              icon={faCircleChevronUp}
              onClick={onArrowClick}
              size="2x"
            />
          ) : (
            ''
          )}
          {newMessage ? (
            <Messages
              getAllMessages={getAllMessages}
              newMessage={newMessage}
              isScroll={scroll}
              clearOldMsgState={ClearNewMsgState}
            />
          ) : (
            <Messages getAllMessages={getAllMessages} isScroll={scroll} />
          )}
        </div>
        {/* **********This is file Attechment icon*********************** */}

        <div class="mb-3 d-none">
          <input
            ref={track}
            onChange={onFileSubmit}
            class="form-control"
            type="file"
            id="formFile"
          />
        </div>
        {/* ********************************************************** */}

        <div className="inputMesg">
          <input
            // className="textMessage-area"
            placeholder="Enter message here"
            class="form-control"
            id="messageKey"
            rows="3"
            onKeyDown={handleKeyDown}
          ></input>

          <FontAwesomeIcon
            icon={faFaceSmile}
            className="emoji-section"
            title="Select your emojis"
            size="1x"
            onClick={() => {
              {
                showEmoji ? setShowEmoji(false) : setShowEmoji(true);
              }
            }}
          />
        </div>
        <div className="send-file">
          <FontAwesomeIcon
            icon={faFileExport}
            size="3x"
            onClick={() => chooseFile()}
          />
        </div>
        <div className="emojidiv">
          {showEmoji ? (
            <Picker
              onEmojiClick={onEmojiClick}
              pickerStyle={{ width: '100%', float: 'left', marginTop: '5px' }}
              searchPlaceholder="Search your favourite emoji here..."
            />
          ) : (
            ''
          )}
        </div>
      </InnerSidebar>
    </>
  );
}

export default Chat;
