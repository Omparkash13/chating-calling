import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as callApi from '../service';
function* login(action) {
  try {
    console.log(`ACTION::`, action.payload);
    const user = yield call(callApi.loginAPI, action.payload);
    yield put({
      type: 'USER_LOGIN',
      userToken: user?.response.data.token,
      userFirstName: user?.response.data.firstName,
      userLastName: user?.response.data.lastName,
      userId: user?.response.data.id,
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}
function* signUp(action) {
  try {
    console.log(`ACTION::`, action.payload);
    const user = yield call(callApi.signupAPI, action.payload);
    console.log('user', user);
    yield put({ type: 'USER_SIGNUP', userToken: user?.response.data.token });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* seachFriends(action) {
  try {
    console.log(`SERCH FRIEND ACTION::`, action.payload);
    const users = yield call(callApi.searchFriendAPI, action.payload);
    console.log('user', users);
    yield put({
      type: 'SEARCH_USERS',
      usersData: users.response.data.data ? users.response.data.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* homeAllUsers(action) {
  try {
    console.log(`ACTION all user::`, action);
    const users = yield call(callApi.allUsers);
    console.log('MY Saga ALLuser', users);
    yield put({
      type: 'HOME_BAR_ALL_USERS',
      allUsers: users.response.data.data ? users.response.data.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* allUsersPosts(action) {
  try {
    // console.log(`ACTION::`, action);
    const users = yield call(callApi.allUsersPostsAPI);
    // console.log('user', users);
    yield put({
      type: 'ALL_USERS_POSTS',
      usersPosts: users.response.data.data ? users.response.data.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* userPostById(action) {
  try {
    console.log(`POST ACTION::`, action.payload);
    // const users = yield call(callApi.getPostsByIdAPI, action.payload);
    const users = yield call(callApi.getUserPostsByIdAPI, action.payload);
    // console.log('user DATA::::', users.response.data);
    yield put({
      type: 'GET_USER_POST',
      usersPostsById: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* getPostById(action) {
  try {
    console.log(`POST ACTION to GET POST BYID::`, action.payload);
    // const users = yield call(callApi.getPostsByIdAPI, action.payload);
    const users = yield call(callApi.getPostsByIdAPI, action.payload);
    console.log('user DATA post Id::::', users);
    yield put({
      type: 'GET_POST_ID',
      getPostsById: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* getCommentsOnPost(action) {
  try {
    console.log(`MYSAGA COMMENT::`, action.payload);
    // const users = yield call(callApi.getPostsByIdAPI, action.payload);
    const users = yield call(callApi.getCommentsOnPostAPI, action.payload);
    console.log('user DATA post Id::::', users);
    yield put({
      type: 'POSTS_COMMENTS',
      getPostComment: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* sendFriendRequest(action) {
  try {
    // console.log(`ACTION::::::-----:`, action);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.sendFriendsRequestAPI, action.payload);
    // console.log('user::::::::::::::::::::::', users);
    yield put({
      type: 'ADD_FRIEND',
      addFriendRequest: users.response.data.data,
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* cancelRequest(action) {
  try {
    console.log(`CANCEL ::::ACTION::::::-----:`, action.payload);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.cancelFriendRequestAPI, action.payload);
    console.log('USER FROM MYSAGA CANCEL REQ::', users);
    yield put({
      type: 'CANCEL_REQUEST',
      cancelRequest: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* removeRequest(action) {
  try {
    console.log(`CANCEL ::::ACTION::::::-----:`, action.payload);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.removeFriendsRequestAPI, action.payload);
    console.log('USER FROM MYSAGA REMOVE REQ::', users);
    yield put({
      type: 'REMOVE_REQUEST',
      removeRequest: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* acceptRequest(action) {
  try {
    console.log(`ACCEPT ::::ACTION::::::-----:`, action.payload);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.acceptFriendRequestAPI, action.payload);
    console.log('USER FROM MYSAGA ACCEPT REQ::', users);
    yield put({
      type: 'ACCEPT_REQUEST',
      acceptRequest: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* sendMessage(action) {
  try {
    console.log(`Send mess ::::ACTION::::::-----:`, action.payload);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.sendMessageAPI, action.payload);
    console.log('USER FROM MYSAGA SEND mess::', users);
    yield put({
      type: 'SEND_MESSAGE',
      sendMessage: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* getAllRequest(action) {
  try {
    console.log(`GET ALL REQUEST ::::ACTION::::::-----:`, action.payload);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.getAllFriendRequestAPI, action.payload);
    console.log('USER FROM MYSAGA GET ALL REQ::', users);
    yield put({
      type: 'GET_ALL_FRIEND_REQUEST',
      getAllRequest: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* getAllMessages(action) {
  try {
    // console.log(`GET ALL MESSAGE ::::ACTION::::::-----:`, action.payload);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.getAllMessageAPI, action.payload);
    console.log('USER FROM MYSAGA GET MESSA:::::::::::::::::::::', users);
    yield put({
      type: 'GET_ALL_MESSAGES',
      getAllMessages: users.response.data ? users.response.data : [],
      totalResults: users.response.totalResults
        ? users.response.totalResults
        : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* getFriendsList(action) {
  try {
    console.log(`GET LIST ::::ACTION::::::-----:`, action.payload);
    // console.log(`ACTION: pay:::::-----:`, action.payload);

    const users = yield call(callApi.getFriendsListAPI, action.payload);
    console.log('USER FROM MYSAGA GET LIST USER::', users);
    yield put({
      type: 'GET_FRIENDS_LIST',
      getFriendsList: users.response.data ? users.response.data : [],
    });
  } catch (e) {
    yield put({ type: 'USER_FAILED', message: e.message });
  }
}

function* usersFollowing(action) {
  try {
    console.log(`GET LIST ::::ACTION USERFOLLO::::::-----:`, action);
    const users = yield call(callApi.usersFollowingAPI, action.payload);
    console.log('USER FROM MYSAGA GET USER FOLLOWING::', users);
    yield put({
      type: 'GET_USERS_FOllOWING',
      getUsersFollowing: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

function* followers(action) {
  try {
    console.log(`GET LIST ::::ACTION getFollowers::::::-----:`, action);
    const users = yield call(callApi.followersAPI, action.payload);
    console.log('USER FROM MYSAGA GET getFollowers::', users);
    yield put({
      type: 'GET_FOLLOWERS',
      getFollowers: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

function* uploadImage(action) {
  try {
    // console.log(`GET Image mysaga::::::-----:`, action);
    const users = yield call(callApi.uploadImageApi, action.payload);
    // console.log('USImage mysaga::', users.response.data.type);
    if (users.response.data.type === 'PROFILE') {
      yield put({
        type: 'PROFILE_IMAGE',
        uploadProfilePic: users.response.data ? users.response.data : [],
      });
    } else {
      console.log('UPLOAD_FILE_MESSAGE', users.response.data);
      yield put({
        type: 'UPLOAD_FILE_MESSAGE',
        uploadFiles: users.response.data ? users.response.data : [],
      });
    }
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

function* getUserProfile(action) {
  try {
    console.log(`GET user Profile mysaga::::::-----:`, action);
    const users = yield call(callApi.getUserProfileAPI, action.payload);
    console.log('userProfile mysaga::', users);
    yield put({
      type: 'USER_PROFILE',
      getUserProfile: users.response.data ? users.response.data : [],
      // userDetails: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

function* changePassword(action) {
  try {
    console.log(`GET chnage password res mysaga::::::-----:`, action);
    const users = yield call(callApi.changePasswordAPI, action.payload);
    console.log('userProfile mysaga::', users);
    yield put({
      type: 'CHNAGE_PASSWORD',
      changePassword: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

function* editProfile(action) {
  try {
    console.log(`Edit user profile res mysaga::::::-----:`, action);
    const users = yield call(callApi.editUserProfileAPI, action.payload);
    console.log(' edit userProfile mysaga::', users);
    yield put({
      type: 'EDIT_PROFILE',
      editProfile: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

function* messageStatus(action) {
  try {
    console.log(`Message status res mysaga::::::-----:`, action);
    const users = yield call(callApi.messageStatusAPI, action.payload);
    console.log(' message status mysaga::', users);
    yield put({
      type: 'MESSAGE_STATUS',
      messageStatus: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

function* getAllNotifications(action) {
  try {
    // console.log(`get all noti res mysaga::::::-----:`, action);
    const users = yield call(callApi.getAllNotificationsAPI, action.payload);
    // console.log(' Noti mysaga::', users);
    yield put({
      type: 'GET_ALL_NOTIFICATION',
      getAllNotifications: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}
function* readNotifications(action) {
  try {
    // console.log(`get all noti res mysaga::::::-----:`, action);
    const users = yield call(callApi.readNotificationsAPI, action.payload);
    // console.log(' Noti mysaga::', users);
    yield put({
      type: 'READ_ALL_NOTIFICATION',
      readNotifications: users.response.data ? users.response.data : [],
    });
  } catch (error) {
    yield put({ type: 'USER_FAILED', message: error.message });
  }
}

// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* mySaga() {
  yield takeEvery('USER_LOGIN_REQUESTED', login);
  yield takeEvery('USER_SIGNUP_REQUESTED', signUp);
  yield takeEvery('SEARCH_FRIENDS_REQUESTED', seachFriends);
  yield takeEvery('HOME_BAR_USERS_REQUESTED', homeAllUsers);
  yield takeEvery('SEND_FRIEND_REQUEST', sendFriendRequest);
  yield takeEvery('ALL_USERS_POSTS_REQUESTED', allUsersPosts);
  yield takeEvery('GET_USER_POST_REQUESTED', userPostById);
  yield takeEvery('GET_POST_ID_REQUESTED', getPostById);
  yield takeEvery('GET_COMMENTS_REQUESTED', getCommentsOnPost);
  yield takeEvery('CANCEL_FRIEND_REQUESTED', cancelRequest);
  yield takeEvery('REMOVE_FRIEND_REQUESTED', removeRequest);
  yield takeEvery('CONFIRM_FRIEND_REQUESTED', acceptRequest);
  yield takeEvery('GET_ALL_FRIEND_REQUESTED', getAllRequest);
  yield takeEvery('SEND_MESSAGES_REQUESTED', sendMessage);
  yield takeEvery('GET_MESSAGES_REQUESTED', getAllMessages);
  yield takeEvery('GET_FRIENDSLIST_REQUESTED', getFriendsList);
  yield takeLatest('USER_FOLLOWINGS_REQUESTED', usersFollowing);
  yield takeEvery('FOLLOWERS_REQUESTED', followers);
  yield takeEvery('UPLOAD_IMAGE_REQUESTED', uploadImage);
  yield takeEvery('USER_PROFILE_REQUESTED', getUserProfile);
  yield takeEvery('CHANGE_PASSWORD_REQUESTED', changePassword);
  yield takeEvery('EDIT_PROFILE_REQUESTED', editProfile);
  yield takeEvery('MESSAGE_STATUS_REQUESTED', messageStatus);
  yield takeEvery('NOTIFICATIONS_REQUESTED', getAllNotifications);
  yield takeEvery('READ_NOTIFICATIONS_REQUESTED', readNotifications);
}
