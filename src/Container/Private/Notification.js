import { React, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InnerSidebar from './InnerSidebar';
import * as actions from '../../redux/action';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Notification() {
  const userRow = useSelector((row) => row.user);
  // console.log('userRow:::::::::::;', userRow);
  const dispatch = useDispatch();

  const token = userRow.userToken;
  useEffect(() => {
    dispatch(actions.getAllNotifications({ token }));
  }, []);

  useEffect(() => {
    dispatch(actions.readNotifications({ token }));
  }, []);

  return (
    <>
      <InnerSidebar>
        <div className="friends-div">Notifications</div>
        <hr></hr>
        <div className="all-notification">
          <div class="list-group">
            {userRow?.getAllNotifications?.map((row) => (
              <>
                <li class="main-notification-list">
                  {row.picture ? (
                    <div className="profile-pic-friendList">
                      <img src={row.picture} />
                    </div>
                  ) : (
                    <FontAwesomeIcon
                      className="userDefaultIcon"
                      icon={faUserSecret}
                    />
                  )}
                  {row.type == 'MESSAGE' ? (
                    <Link to={`/chat/${row.fromUserId}`}>
                      <div class="notification-list">{row.message}</div>
                    </Link>
                  ) : (
                    <Link to={`/dashboard`}>
                      <div class="notification-list">{row.message}</div>
                    </Link>
                  )}
                </li>
              </>
            ))}
          </div>
        </div>
      </InnerSidebar>
    </>
  );
}

export default Notification;
