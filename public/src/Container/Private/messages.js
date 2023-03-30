import { useParams } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePdf,
  faFileWord,
  faCheckDouble,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action';
import { getElementError } from '@testing-library/react';
export default function Messages(props) {
  const dispatch = useDispatch();
  const userRow = useSelector((row) => row.user);
  //console.log('USer ROW::::', userRow);
  const ref = useRef(null);
  const [isScrollDown, setIsScrollDown] = useState(true);
  const scrollToBottom = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const allParams = useParams();
  // console.log(
  //   `ALL PROPS::::::::::::::::::::::::::::::::::::::::llll::::::::::`,
  //   props
  // );
  let finalMessages = [];
  finalMessages = props.getAllMessages;

  if (
    props.newMessage &&
    (Number(props?.newMessage?.toUserId) === Number(allParams.id) ||
      Number(props?.newMessage?.userId) === Number(allParams.id))
  ) {
    finalMessages.push(props.newMessage);
    props.clearOldMsgState();
  }
  useEffect(() => {
    finalMessages?.sort((newMessageDate, oldMessageData) =>
      newMessageDate.date.localeCompare(oldMessageData.date)
    );
    setIsScrollDown(props.isScroll);
    if (props.isScroll) {
      scrollToBottom();
    }
  }, [props]);

  useEffect(() => {
    setIsScrollDown(props.isScroll);
  });

  useEffect(() => {
    dispatch(
      actions.messageStatus({
        fromUserId: userRow.userId,
        toUserId: allParams.id,
        token: userRow.userToken,
      })
    );
  }, []);

  const doubleTick = () => {
    return <FontAwesomeIcon color="yellow" icon={faCheckDouble} />;
  };
  const singleTick = () => {
    return <FontAwesomeIcon icon={faCheck} />;
  };
  return (
    <div className="chat-container">
      {finalMessages?.map((row) => {
        return (
          <>
            {Number(row.userId) === Number(allParams.id) ? (
              <div ref={ref} className="left-side">
                {row.type == 'MESSAGE' ? (
                  <>
                    <p>{row.message}</p>
                  </>
                ) : (
                  <div>
                    {row.message.substring(row.message.lastIndexOf('.') + 1) ==
                    'pdf' ? (
                      <>
                        <a href={row.message} target="_blank" download>
                          <div
                            className="chat-icon"
                            // style={{ height: '200px' }}
                          >
                            <FontAwesomeIcon
                              // style={{ height: '200px' }}
                              size="10x"
                              color="blue"
                              icon={faFilePdf}
                            />
                          </div>
                        </a>
                      </>
                    ) : row.message.substring(
                        row.message.lastIndexOf('.') + 1
                      ) == 'docx' ? (
                      <>
                        <a href={row.message} target="_blank" download>
                          <FontAwesomeIcon
                            size="10x"
                            color="blue"
                            icon={faFileWord}
                          />
                        </a>
                      </>
                    ) : (
                      <>
                        <img
                          src={row.message}
                          max-width="100%"
                          height="auto"
                        ></img>
                      </>
                    )}
                  </div>
                )}
                <span className="time-right">
                  {new Date(row.date).toLocaleTimeString()}
                </span>
              </div>
            ) : (
              <div ref={ref} className="right-side">
                {row.type == 'MESSAGE' ? (
                  <>
                    <p>{row.message}</p>
                  </>
                ) : (
                  <div>
                    {row.message.substring(row.message.lastIndexOf('.') + 1) ==
                    'pdf' ? (
                      <>
                        <a href={row.message} target="_blank" download>
                          <FontAwesomeIcon
                            // style={{ height: '200px' }}
                            size="10x"
                            icon={faFilePdf}
                          />
                        </a>
                      </>
                    ) : row.message.substring(
                        row.message.lastIndexOf('.') + 1
                      ) == 'docx' ? (
                      <>
                        <a href={row.message} target="_blank" download>
                          <FontAwesomeIcon size="10x" icon={faFileWord} />
                        </a>
                      </>
                    ) : (
                      <>
                        <img
                          src={row.message}
                          max-width="100%"
                          height="auto"
                        ></img>
                      </>
                    )}
                  </div>
                )}
                <span className="time-left">
                  {new Date(row.date).toLocaleTimeString()} &nbsp;
                  {row.toStatus == 'READ' ? (
                    <p className="tickTick">{doubleTick()}</p>
                  ) : (
                    <p className="tickTick">{singleTick()}</p>
                  )}
                </span>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
