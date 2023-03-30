import { React, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../Container/container.css';
import { Header } from '../../Components';
import { Footer } from '../../Components';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import defaultimg from '../../defaultImage.png';
import { Button } from 'react-bootstrap';

// import { Dispatch } from 'redux';
import * as actions from '../../redux/action';
function UserProfile() {
  const navigate = useNavigate();
  const userRow = useSelector((row) => row.user);
  const allParams = useParams();
  const dispatch = useDispatch();
  // console.log('USER ROW::::', userRow);
  const aboutMe = userRow.getUserProfile?.aboutMe;
  const token = userRow.userToken;
  useEffect(() => {
    dispatch(
      actions.getUserProfile({
        userToken: userRow.userToken,
        userId: allParams.id,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(actions.getFriendsList(token));
  }, []);
  return (
    <>
      <Header />
      <div className="out-side-div">
        <Row className="user-profile-row">
          <Col md="4">
            <div className="card1">
              <div>
                <img
                  src={
                    userRow.getUserProfile?.userMedia?.picture
                      ? userRow.getUserProfile?.userMedia?.picture
                      : defaultimg
                  }
                />
              </div>
              <hr className="hr-tag"></hr>
              <h2>
                {userRow.getUserProfile?.firstName}{' '}
                {userRow.getUserProfile?.lastName}
              </h2>
              <p className="title">Email: {userRow.getUserProfile?.email}</p>
              <p>Skills: {userRow.getUserProfile?.skills}</p>
            </div>

            {userRow.getFriendsList?.map((row) => {
              if (
                allParams.id == row.fromRequestId ||
                allParams.id == row.toRequestId
              ) {
                return (
                  <>
                    <Button
                      className="profile-message-btn"
                      onClick={() => navigate(`/chat/${allParams.id}`)}
                    >
                      Message
                    </Button>
                  </>
                );
              }
            })}
          </Col>
          <Col md="8" className="user-profile-col">
            <div>
              <h4>About</h4>

              <hr></hr>
              <p dangerouslySetInnerHTML={{ __html: aboutMe }}></p>
            </div>
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  );
}

export default UserProfile;
