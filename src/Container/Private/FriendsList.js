import React, { useEffect } from 'react';
import InnerSidebar from './InnerSidebar';
import '../../Container/container.css';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../redux/action';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

function FriendsList() {
  const dispatch = useDispatch();
  const userRow = useSelector((row) => row.user);
  console.log('USER ROW::', userRow);
  const token = userRow.userToken;
  useEffect(() => {
    dispatch(action.getFriendsList(token));
  }, []);
  return (
    <>
      <InnerSidebar>
        <div className="friends-div">Friends List</div>
        <ul id="friend-list">
          {userRow.getFriendsList?.map((row, index) => {
            if (Number(userRow.userId) === Number(row.fromRequestId)) {
              return (
                <Link to={`/chat/${row.toRequestId}`}>
                  <li class="friend">
                    {/* {console.log('::::::::::::', row)} */}
                    {row.toprofilepic != null ? (
                      <div className="profile-pic-friendList">
                        <img src={row.toprofilepic} />
                      </div>
                    ) : (
                      <FontAwesomeIcon
                        className="userDefaultIcon"
                        icon={faUserSecret}
                      />
                    )}
                    <div class="name">
                      {row.tofirstname} {row.tolastname}
                      <div className="message">{row.lastmessage}</div>
                    </div>
                  </li>
                </Link>
              );
            } else {
              return (
                <Link to={`/chat/${row.fromRequestId}`}>
                  <li class="friend">
                    {row.fromprofilepic != null ? (
                      <div className="profile-pic-friendList">
                        <img src={row.fromprofilepic} />
                      </div>
                    ) : (
                      <FontAwesomeIcon
                        className="userDefaultIcon"
                        icon={faUserSecret}
                      />
                    )}
                    <div class="name">
                      {row.fromfirstname} {row.fromlastname}
                      <div className="message">{row.lastmessage}</div>
                    </div>
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      </InnerSidebar>
    </>
  );
}

export default FriendsList;
