import '../../Container/container.css';
import InnerSidebar from './InnerSidebar';
import { SocketContext } from '../../context/socket';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button } from 'react-bootstrap';
import * as action from '../../redux/action';
import UserCard from '../public/Card';

function Dashboard() {
  const userRow = useSelector((row) => row.user);
  console.log('USER ROW:::;;;;;', userRow);
  const token = userRow.userToken;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(action.followers(token));
    dispatch(action.usersFollowing(token));
  }, []);

  const socket = useContext(SocketContext);
  useEffect(() => {
    console.log(`SOCKET INIT::`);
    socket.emit('join', { userId: userRow.userId });
    // socket.off('sendMessageListen');
  });

  return (
    <>
      <InnerSidebar>
        <div className="headingsTitle">Dashboard</div>
        <hr></hr>

        <Row className="postCard">
          {userRow?.getFollowers?.data?.length ? (
            <div className="heading-followings">
              <p>Followers</p>
            </div>
          ) : (
            []
          )}
          {userRow.getFollowers?.data?.map((row, index) => {
            return (
              <>
                <UserCard
                  firstName={row.fromfirstname}
                  lastName={row.fromlastname}
                  email={row.email}
                  userId={row.fromRequestId}
                  picture={row.profilepic}
                  pending={false}
                  // handleCallbck={setCallapi}
                />
                <hr></hr>
              </>
            );
          })}

          {/* {console.log('userRow.getUsersFollowing', userRow.getUsersFollowing)} */}

          {userRow?.getUsersFollowing?.data?.length ? (
            <div className="heading-followings">
              <p>Followings</p>
            </div>
          ) : (
            []
          )}

          {userRow.getUsersFollowing?.data?.map((row, index) => {
            return (
              <>
                <UserCard
                  firstName={row.tofirstname}
                  lastName={row.tolastname}
                  email={row.email}
                  userId={row.toRequestId}
                  picture={row.profilepic}
                  pending={true}
                  // handleCallbck={setCallapi}
                />
              </>
            );
          })}
        </Row>
      </InnerSidebar>
    </>
  );
}

export default Dashboard;

// const [callapi, setCallapi] = useState(false);
// function callback() {
//   dispatch(action.usersFollowing(token));
//   // dispatch(action.followers(token));
// }

// useEffect(() => {
//   dispatch(action.followers(token));
// }, [callapi]);

// console.log(`USER ROW DASH::`, userRow);
