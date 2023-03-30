import React from 'react';
import '../../Container/container.css';
import { Col, Button, Card } from 'react-bootstrap';
import * as actions from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import defaultimg from '../../defaultImage.png';
import { useNavigate } from 'react-router-dom';

function UserCard(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRow = useSelector((row) => row.user);
  console.log('USER ROW----------::', props);
  // console.log(props, 'posps inside card');

  const cancelFriendRequest = async (userId) => {
    const token = userRow.userToken;
    dispatch(actions.cancelFriendRequest({ userId, token }));
    // props.handleCallbck(true);
    // setTimeout(() => {
    //   props.handleCallbck();
    // }, 500);
  };

  const removeFriendRequest = async (userId) => {
    const token = userRow.userToken;
    dispatch(actions.removeFriendRequest({ userId, token }));
    // props.handleCallbck(true);
    // setTimeout(() => {
    //   props.handleCallbck();
    // }, 500);
  };

  const confirmFriendRequest = async (userId) => {
    const token = userRow.userToken;
    dispatch(actions.acceptFriendRequest({ userId, token }));
    // // props.handleCallbck(true);
    // setTimeout(() => {
    //   props.handleCallbck();
    // }, 500);
  };

  return (
    <>
      <Col
        sm={4}
        style={{ padding: '2px 10px 10px 10px', margin: '11px 0px 20px 20px' }}
      >
        <Card
          style={{
            width: '12rem',
            height: '15rem',
            border: '1px solid blue',
            color: 'black',
          }}
        >
          {props.picture ? (
            <div className="default-userPic">
              <div>
                <img
                  src={props.picture}
                  onClick={() => navigate(`/userProfile/${props.userId}`)}
                />
              </div>
            </div>
          ) : (
            <div className="default-userPic">
              <div>
                <img
                  src={defaultimg}
                  onClick={() => navigate(`/userProfile/${props.userId}`)}
                />
              </div>
            </div>
          )}

          <Card.Body>
            <Card.Title className="innerCard">
              {props.firstName + ' ' + props.lastName}
              <div>{props.email}</div>
            </Card.Title>
            <Card.Text></Card.Text>
            <div className="buttons">
              <div className="action_btn">
                <Button
                  onClick={() =>
                    props.pending ? '' : confirmFriendRequest(props.userId)
                  }
                  className="allRequestsButtons"
                  variant="outline-primary"
                  size="sm"
                >
                  {props.pending ? 'Pending' : 'Accept'}
                </Button>
                <Button
                  onClick={() =>
                    props.pending
                      ? cancelFriendRequest(props.userId)
                      : removeFriendRequest(props.userId)
                  }
                  className="allRequestsButtons"
                  variant="outline-primary"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}

export default UserCard;
