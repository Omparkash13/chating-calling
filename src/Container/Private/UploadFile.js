import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InnerSidebar from './InnerSidebar';
import '../../Container/container.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action';
import { Form, Button, Modal } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { Link } from 'react-router-dom';

function UploadFile() {
  console.log('EDITOR::::::::::::', DefaultEditor);
  // return DefaultEditor;
  const track = useRef();
  const dispatch = useDispatch();
  const userRow = useSelector((row) => row.user);
  console.log('UserRow Get user profile::::::', userRow);
  const [aboutMe, setAboutMe] = useState('');

  function onChange(e) {
    setAboutMe(e.target.value);
  }

  // console.log('ABOUT HTML::::::::::::;', dangerouslySetInnerHTML={__html:aboutMe});

  function handleChange(e) {
    dispatch(
      actions.uploadImage({
        picture: e.target.files[0],
        userToken: userRow.userToken,
        type: 'PROFILE',
      })
    );
  }
  useEffect(() => {
    dispatch(
      actions.getUserProfile({
        userToken: userRow.userToken,
      })
    );
  }, []);
  const chooseFile = () => {
    track.current.click();
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old password is required'),
    newPassword: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, reset, formState } = useForm(formOptions); // change password
  const { register: editUserDetails, handleSubmit: submitEditedDetails } =
    useForm({}); // edit profile
  const { errors } = formState;

  const onSubmit = (passwordPayload, e) => {
    if (passwordPayload.newPassword === passwordPayload.confirmPassword) {
      dispatch(
        actions.changePassword({
          password: passwordPayload,
          userToken: userRow.userToken,
        })
      );
      reset();
    }
  };

  const [toggleEditModel, settoggleEditModel] = useState(false);
  const editModelClose = () => settoggleEditModel(false);

  const onClickEdit = () => settoggleEditModel(true);

  const editProfile = (data) => {
    dispatch(
      actions.editUserProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        skills: data.skills,
        aboutMe: aboutMe,
        userToken: userRow.userToken,
      })
    );
    editModelClose();
  };

  const editUserProfile = userRow.editProfile?.aboutMe;
  const getUserProfile = userRow.getUserProfile?.aboutMe;

  const [showMore, setShowMore] = useState(false);

  const text = editUserProfile
    ? editUserProfile
    : getUserProfile
    ? getUserProfile
    : 'NA';
  const getText = () => {
    if (text.length <= 50)
      return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
    if (text.length > 50 && showMore) {
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: text }}></div>
          <a onClick={() => setShowMore(false)} className="See-more-link">
            Show Less
          </a>
        </>
      );
    }
    if (text.length > 50) {
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: text.slice(0, 50) }}></div>
          <a onClick={() => setShowMore(true)} className="See-more-link">
            Show More
          </a>
        </>
      );
    }
  };
  return (
    <>
      <InnerSidebar>
        <div className="headingsTitle">
          <h2>Profile</h2>
        </div>
        <hr></hr>
        <div className="main-upload-div">
          <div className="main-div d-flex justify-content-between">
            <div class="main">
              {/* <h4>User Information</h4> */}
              <div class="card">
                <div class="card-body">
                  <FontAwesomeIcon
                    onClick={onClickEdit}
                    icon={faPenToSquare}
                    size="2x"
                  />
                  <div className="editProfile-model">
                    <Modal
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      show={toggleEditModel}
                      onHide={editModelClose}
                      className="editProfile"
                      size="xl"
                    >
                      <Form onSubmit={submitEditedDetails(editProfile)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Group
                            className="mb-3"
                            // controlId="formBasicEmail"
                          >
                            <Form.Control
                              id="firstName"
                              {...editUserDetails('firstName')}
                              type="text"
                              defaultValue={userRow.getUserProfile?.firstName}
                              placeholder="First Name"
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            // controlId="formBasicPassword"
                          >
                            <Form.Control
                              id="lastName"
                              {...editUserDetails('lastName')}
                              type="text"
                              defaultValue={userRow.getUserProfile?.lastName}
                              placeholder="Last Name"
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            // controlId="formBasicPassword"
                          >
                            <Form.Control
                              id="email"
                              type="text"
                              defaultValue={userRow.getUserProfile?.email}
                              readOnly={true}
                              placeholder="Email"
                              required
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            // controlId="formBasicPassword"
                          >
                            <Form.Control
                              id="skill"
                              {...editUserDetails('skills')}
                              type="text"
                              defaultValue={userRow.getUserProfile?.skills}
                              placeholder="Skills"
                              required
                            />
                          </Form.Group>
                          <DefaultEditor
                            style={{ height: '200px' }}
                            value={
                              aboutMe
                                ? aboutMe
                                : userRow.getUserProfile?.aboutMe
                            }
                            onChange={onChange}
                          >
                            {/* <Form.Group className="mb-3"></Form.Group> */}
                          </DefaultEditor>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" type="submit">
                            Update
                          </Button>
                        </Modal.Footer>
                      </Form>
                    </Modal>
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>First Name</td>
                        <td>:</td>
                        {userRow.editProfile?.firstName ? (
                          <td>{userRow.editProfile?.firstName}</td>
                        ) : (
                          <td>{userRow.getUserProfile?.firstName}</td>
                        )}
                      </tr>
                      <tr>
                        <td>Last Name</td>
                        <td>:</td>
                        {userRow.editProfile?.lastName ? (
                          <td>{userRow.editProfile?.lastName}</td>
                        ) : (
                          <td>{userRow.getUserProfile?.lastName}</td>
                        )}
                      </tr>
                      <tr className="user-email">
                        <td>Email</td>
                        <td>:</td>
                        <td>{userRow.getUserProfile?.email}</td>
                      </tr>
                      <tr>
                        <td>Skills</td>
                        <td>:</td>
                        {userRow.editProfile?.skills ? (
                          <td>{userRow.editProfile?.skills}</td>
                        ) : userRow.getUserProfile?.skills ? (
                          userRow.getUserProfile?.skills
                        ) : (
                          <td>{'NA'}</td>
                        )}
                      </tr>
                      <tr>
                        <td>About</td>
                        <td>:</td>
                        <p>{getText(aboutMe)}</p>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td>:</td>
                        <td>{userRow.getUserProfile?.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="profile-pic">
              {userRow.getUserProfilePic?.picture ? (
                <div className="user-profile-pic" onClick={chooseFile}>
                  <img src={userRow.getUserProfilePic?.picture} />
                </div>
              ) : userRow.getUserProfile?.userMedia?.picture ? (
                <div className="user-profile-pic" onClick={chooseFile}>
                  <img src={userRow.getUserProfile.userMedia?.picture} />
                </div>
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  size="10x"
                  color="blue"
                  onClick={chooseFile}
                  cursor="pointer"
                  title="Click here to upload profile picture"
                ></FontAwesomeIcon>
              )}
            </div>
          </div>

          <div class="mb-3 d-none">
            <input
              ref={track}
              onChange={handleChange}
              class="form-control"
              type="file"
              id="formFile"
            />
          </div>
          {/* <hr></hr> */}
          <div className="headingsTitle">
            <h2>Change Password</h2>
          </div>
          <hr></hr>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                {...register('oldPassword')}
                className={`form-control ${
                  errors.oldPassword ? 'is-invalid' : ''
                }`}
                type="password"
                placeholder="Enter old password"
              />
              <p className="invalid-feedback">{errors.oldPassword?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                {...register('newPassword')}
                className={`form-control ${
                  errors.newPassword ? 'is-invalid' : ''
                }`}
                type="password"
                placeholder="Enter New password"
              />

              <p className="invalid-feedback">{errors.newPassword?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                {...register('confirmPassword')}
                className={`form-control ${
                  errors.confirmPassword ? 'is-invalid' : ''
                }`}
                type="password"
                placeholder="Confirm password"
              />
              <p className="invalid-feedback">
                {errors.confirmPassword?.message}
              </p>
            </Form.Group>
            <div className="btn-change-pswd">
              <Button variant="primary " type="submit">
                Change Password
              </Button>
            </div>
          </Form>
        </div>
      </InnerSidebar>
    </>
  );
}

export default UploadFile;
