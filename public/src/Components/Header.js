import React, { useState, useContext, useEffect } from 'react';
import './header.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/action';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Status } from './Status';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faIdCard,
  faUserSecret,
} from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { SocketContext } from '../context/socket';
import { useParams, Link } from 'react-router-dom';

function Header() {
  const {
    register: signUpValidation,
    formState: { errors: signUpErrors },
    handleSubmit: handleSubmitSignup,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRow = useSelector((row) => row);

  async function manageDashboard() {}

  async function manageLogout() {
    localStorage.clear();
    window.localStorage.clear();
    window.location.href = '/';
  }
  async function manageLogin(event) {
    const payload = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
    };
    if (payload.email == '' && payload.password == '') {
      console.log('Input Field should not be empty');
    } else {
      dispatch({ type: 'USER_LOGIN_REQUESTED', payload: payload });

      loginModelClose();

      setTimeout(() => {
        navigate(`/dashboard`);
        const token = localStorage.getItem('localUserToken');
      }, 1000);
    }
  }

  function manageSignUp(event) {
    console.log(`FIRST STEP (DISPATCHED)::`, event);
    const payload = {
      firstName: document.getElementById('formBasicFName').value,
      lastName: document.getElementById('formBasicName').value,
      email: document.getElementById('formBasicEmail').value,
      password: document.getElementById('formBasicPassword').value,
      confirmPassword: document.getElementById('formBasicCpassword').value,
    };
    if (payload.password === payload.confirmPassword) {
      console.log(payload, 'signup successfully');
      dispatch(actions.signUp(payload));
      signupModelClose();
    } else {
      Status('password mismatch', 'Password is mismatched');
    }
  }

  const [toggleLoginModel, settoggleLoginModel] = useState(false);
  const [toggleSignupModel, settoggleSignupModel] = useState(false);
  const [toggleForgotPassword, setForgotPassword] = useState(false);

  const loginModelOpen = () => settoggleLoginModel(true);
  const loginModelClose = () => settoggleLoginModel(false);

  const signupModelOpen = () => settoggleSignupModel(true);
  const signupModelClose = () => settoggleSignupModel(false);

  const forgotPasswordModelOpen = () => {
    setForgotPassword(true);
    settoggleLoginModel(false);
  };
  const forgotPasswordModelClose = () => setForgotPassword(false);
  const totalNotification = 3;
  const allParams = useParams();
  const [getLatestThreeMessage, setGetLatestThreeMessage] = useState({});
  const socket = useContext(SocketContext);
  // console.log('socket:::::::::::;', socket);
  useEffect(() => {
    socket.emit('join', { userId: userRow.user.userId });
  }, [allParams.id]);
  useEffect(() => {
    socket.emit('requestNotification', {
      //requestNotification is request all notification with respect to userId message
      userId: userRow.user.userId,
      limit: totalNotification,
    });
  }, [socket]);

  useEffect(() => {
    socket.on('notificationListener', (data) => {
      //notificationListener is used to get notification message
      if (data.notificationCount > 0) {
        setGetLatestThreeMessage(data);
      } else {
        setGetLatestThreeMessage(false);
      }
    });
  }, []);
  // console.log('get count:::::::::::', getLatestThreeMessage);
  return (
    <div className="headerOuter">
      <div className="headerLeft">
        <a href="/">
          <img className="img-logo" src="/mlogo.png" />
        </a>
      </div>
      <div className="headerRight">
        {userRow?.user.isLoggedIn ? (
          // <div>
          <div className="loginSignup">
            <a href="/setting" onClick={manageDashboard}>
              <FontAwesomeIcon icon={faIdCard} />
            </a>
            <a href="/dashboard" onClick={manageDashboard}>
              Dashboard
            </a>
            <span>|</span>
            <a onClick={manageLogout}>Logout</a>
            <span>|</span>
            <a>
              <Dropdown as={ButtonGroup} style={{ backgroundColor: 'none' }}>
                <Dropdown.Toggle id="dropdown-custom-1">
                  <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors">
                  {getLatestThreeMessage?.notifications?.map((row, index) => (
                    <>
                      {/* {console.log('ROW:::::::::::::::::::', row)} */}
                      {row.type == 'MESSAGE' ? (
                        <li class="main-notification-list-dropDown">
                          {row.picture ? (
                            <div className="profile-pic-friendList">
                              <img src={row.picture} />
                            </div>
                          ) : (
                            <FontAwesomeIcon
                              className="userDefaultNotificationIcon"
                              color="white"
                              icon={faUserSecret}
                            />
                          )}
                          <Link to={`/chat/${row.fromUserId}`}>
                            <div class="notification-list-dropDown">
                              {row.message}
                              {/* <hr></hr> */}
                            </div>
                          </Link>
                        </li>
                      ) : (
                        <li class="main-notification-list-dropDown">
                          {row.picture ? (
                            <div className="profile-pic-friendList">
                              <img src={row.picture} />
                            </div>
                          ) : (
                            <FontAwesomeIcon
                              className="userDefaultNotificationIcon"
                              color="white"
                              icon={faUserSecret}
                            />
                          )}
                          <Link to={`/dashboard`}>
                            <div class="notification-list-dropDown">
                              {row.message}
                            </div>
                          </Link>
                        </li>
                      )}
                    </>
                  ))}
                  <Dropdown.Item
                    style={{ textAlign: 'center' }}
                    eventKey="4"
                    href="http://localhost:3000/notification"
                  >
                    See All
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {getLatestThreeMessage?.notificationCount > 0 ? (
                <div className="notification-count">
                  {getLatestThreeMessage?.notificationCount}
                </div>
              ) : (
                []
              )}
            </a>
            {/* </p> */}
          </div>
        ) : (
          <p className="loginSignup">
            <a onClick={loginModelOpen}>Login</a> <span>|</span>
            <a onClick={signupModelOpen}>SignUp</a>
          </p>
        )}
      </div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={toggleLoginModel}
        onHide={loginModelClose}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                id="email"
                type="email"
                placeholder="Email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                id="password"
                type="password"
                placeholder="Password"
                required
              />
              <div className="forgotPassword">
                <a onClick={forgotPasswordModelOpen}>Forgot Password?</a>
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="button"
              onClick={(e) => {
                manageLogin(e);
              }}
            >
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={toggleSignupModel}
        onHide={signupModelClose}
      >
        <Form onSubmit={handleSubmitSignup(manageSignUp)}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicFName">
              <Form.Control
                {...signUpValidation('firstName', { required: true })}
                type="text"
                placeholder="First Name"
              />
              <p className="errors">
                {signUpErrors.firstName ? 'First Name is required' : ''}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                {...signUpValidation('lastName')}
                type="text"
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                {...signUpValidation('email')}
                type="email"
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                {...signUpValidation('password')}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCpassword">
              <Form.Control
                {...signUpValidation('confirmPassword')}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              // type="submit"
              type="button"
              onClick={(e) => {
                manageSignUp(e);
              }}
            >
              SignUp
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={toggleForgotPassword}
        onHide={forgotPasswordModelClose}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Forgot Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Header;
