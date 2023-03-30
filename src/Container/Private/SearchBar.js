import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../container.css';
import {
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import defaultimg from '../../defaultImage.png';
import * as actions from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InnerSidebar from './InnerSidebar';

function SearchBar() {
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const userRow = useSelector((row) => row);
  const [allRequests, setAllRequests] = useState([]); // for All friend request

  // console.log('userRow ::::::::::::::::::::::', userRow);

  const userSearch = async (e) => {
    const token = userRow.user.userToken;
    const value = e.target.value.trim();
    if (value) {
      Dispatch(actions.searchFriends({ value, token }));
    }
  };

  const sendFriendRequest = (toRequestId) => {
    // console.log(toRequestId, ':::::::::::::::::');
    const token = userRow.user.userToken;
    Dispatch(actions.sendFriendRequest({ toRequestId, token }));
  };

  const cancelFriendRequest = (userId) => {
    const token = userRow.user.userToken;
    Dispatch(actions.cancelFriendRequest({ userId, token }));
  };

  const removeFriendRequest = (userId) => {
    const token = userRow.user.userToken;
    Dispatch(actions.removeFriendRequest({ userId, token }));
  };

  const confirmFriendRequest = (userId) => {
    const token = userRow.user.userToken;
    Dispatch(actions.acceptFriendRequest({ userId, token }));
  };

  const getAllFriendRequests = () => {
    const token = userRow.user.userToken;
    Dispatch(actions.getAllFriendRequests(token));
  };

  useEffect(() => {
    getAllFriendRequests();
  }, [
    userRow.user.cancelFriendRequest,
    userRow.user.addFriendRequest,
    userRow.user.acceptFriendRequest,
    userRow.user.removeFriendRequest,
  ]);

  useEffect(() => {
    setAllRequests(userRow.user.getAllFriendRequest?.data);
  }, [userRow.user]);

  return (
    <>
      <InnerSidebar>
        <div className="App">
          <div class="container h-50">
            <div class="row justify-content-center align-items-center"></div>
            <InputGroup className="col-4">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={userSearch}
                onBlur={userSearch}
                onFocus={userSearch}
              />
            </InputGroup>
          </div>
        </div>
        <div className="dashboardRightSide">
          <Row className="postCard">
            {userRow.user.usersData?.map((row, index) => {
              console.log('userRow.user.usersData', index);
              const sendRequests =
                allRequests?.find(
                  (ele) => ele.toRequestId === Number(row.id)
                ) || [];
              // console.log('SendREQUEST:::::::::::::', sendRequests);
              const getRequests =
                allRequests?.find(
                  (ele) => ele.fromRequestId === Number(row.id)
                ) || [];
              // console.log('getREQUEST:::::::::::::', getRequests);
              return (
                <Col sm={4} className="p-3">
                  <Card
                    style={{
                      width: '12rem',
                      height: '300px',
                      border: '1px solid blue',
                    }}
                  >
                    {row.picture ? (
                      <div className="default-userPic">
                        <div>
                          <img
                            src={row.picture}
                            onClick={() => navigate(`/userProfile/${row.id}`)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="default-userPic"
                        onClick={() => navigate(`/userProfile/${row.id}`)}
                      >
                        <div>
                          <img src={defaultimg} />
                        </div>
                      </div>
                    )}

                    <Card.Body>
                      <Card.Title className="innerCard">
                        {row.firstName + ' ' + row.lastName}
                        <div>{row.email}</div>
                      </Card.Title>
                      <Card.Text></Card.Text>
                      <div className="outerCard">
                        {(() => {
                          if (
                            Number(sendRequests.toRequestId) ===
                              Number(row.id) &&
                            sendRequests.status === 'PENDING'
                          ) {
                            return (
                              <div>
                                <Button
                                  onClick={() => cancelFriendRequest(row.id)} // cancel api
                                  className="allRequestsButtons"
                                  key={index}
                                  variant="outline-primary"
                                  size="sm"
                                >
                                  Cancel Request
                                </Button>
                              </div>
                            );
                          } else if (
                            Number(getRequests.fromRequestId) ===
                              Number(row.id) &&
                            getRequests.status === 'PENDING'
                          ) {
                            return (
                              <div className="buttons">
                                <div className="action_btn">
                                  <Button
                                    onClick={() => confirmFriendRequest(row.id)} // cancel api
                                    className="allRequestsButtons"
                                    key={index}
                                    variant="outline-primary"
                                    size="sm"
                                  >
                                    Confirm
                                  </Button>
                                  <Button
                                    onClick={() => removeFriendRequest(row.id)} // cancel api
                                    className="allRequestsButtons"
                                    key={index}
                                    variant="outline-primary"
                                    size="sm"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            );
                          } else if (
                            (Number(sendRequests.toRequestId) ===
                              Number(row.id) &&
                              sendRequests.status === 'ACCEPTED') ||
                            (Number(getRequests.fromRequestId) ===
                              Number(row.id) &&
                              getRequests.status === 'ACCEPTED')
                          ) {
                            return (
                              <div>
                                <Button
                                  onClick={() => navigate(`/chat/${row.id}`)}
                                  className="allRequestsButtons"
                                  key={index}
                                  variant="outline-primary"
                                  size="sm"
                                >
                                  Message
                                </Button>
                              </div>
                            );
                          } else {
                            return (
                              <div>
                                <Button
                                  onClick={() => sendFriendRequest(row.id)}
                                  className="allRequestsButtons"
                                  key={index}
                                  variant="outline-primary"
                                  size="sm"
                                >
                                  Add Friend
                                </Button>
                              </div>
                            );
                          }
                        })()}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </InnerSidebar>
    </>
  );
}

export default SearchBar;
