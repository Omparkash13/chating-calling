// import { act } from '@testing-library/react';

const initialState = {
  userToken: false,
  isLoggedIn: false,
  getAllMessages: {
    allMessages: [],
    messageCount: 0,
  },
  sendFileInMessage: {
    picture: '',
    type: '',
  },
};
function commonReducer(userObj = initialState, action) {
  // console.log('THIRD STEP (REDUCER TO STORAGE)::', action);
  // console.log('reducer call count :::::::::::::::', action);
  // console.log('REDUCER CHECKING:::::', userObj.sendFileInMessage);
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...userObj,
        userToken: action.userToken ? action.userToken : false,
        isLoggedIn: action.userToken ? true : false,
        userFirstName: action.userFirstName,
        userLastName: action.userLastName,
        userId: action.userId,
      };
    case 'SEARCH_USERS':
      // console.log(action, 'readucer actions:::::::::::::::::');
      return {
        ...userObj,
        usersData: action.usersData,
      };
    case 'HOME_BAR_ALL_USERS':
      console.log(
        // action,
        'readucer actions for ALLusers:::::::::::::::::',
        action
      );
      return {
        ...userObj,
        allUsers: action.allUsers,
      };
    case 'ALL_USERS_POSTS':
      // console.log(action, 'readucer actions:::::::::::::::::');
      return {
        ...userObj,
        usersPosts: action.usersPosts,
      };
    case 'ADD_FRIEND':
      // console.log(action, 'readucer actions:::::::::::::::::');
      return {
        ...userObj,
        addFriendRequest: action.addFriendRequest,
      };
    case 'GET_USER_POST':
      return {
        ...userObj,
        usersPostsById: action.usersPostsById,
      };
    case 'GET_POST_ID':
      return {
        ...userObj,
        getPostById: action.getPostsById,
      };
    case 'POSTS_COMMENTS':
      return {
        ...userObj,
        getComments: action.getPostComment,
      };
    case 'CANCEL_REQUEST':
      return {
        ...userObj,
        cancelFriendRequest: action.cancelRequest,
      };
    case 'REMOVE_REQUEST':
      return {
        ...userObj,
        removeFriendRequest: action.removeRequest,
      };
    case 'ACCEPT_REQUEST':
      return {
        ...userObj,
        acceptFriendRequest: action.acceptRequest,
      };
    case 'GET_ALL_FRIEND_REQUEST':
      return {
        ...userObj,
        getAllFriendRequest: action.getAllRequest,
      };
    case 'SEND_MESSAGE':
      return {
        ...userObj,
        sendMessage: action.sendMessage,
      };
    case 'GET_ALL_MESSAGES':
      return {
        ...userObj,
        getAllMessages: {
          allMessages: action.getAllMessages,
          messageCount: action.totalResults,
        },
      };
    case 'GET_FRIENDS_LIST':
      return {
        ...userObj,
        getFriendsList: action.getFriendsList,
      };
    case 'GET_USERS_FOllOWING':
      console.log('REDUCER::', action.getUsersFollowing);
      return {
        ...userObj,
        getUsersFollowing: action.getUsersFollowing,
      };
    case 'GET_FOLLOWERS':
      console.log('REDUCER::', action.getFollowers);
      return {
        ...userObj,
        getFollowers: action.getFollowers,
      };
    case 'PROFILE_IMAGE':
      // console.log('REDUCER::', action);
      return {
        ...userObj,
        getUserProfilePic: action.uploadProfilePic,
      };
    case 'UPLOAD_FILE_MESSAGE':
      return {
        ...userObj,
        sendFileInMessage: action.uploadFiles,
      };
    case 'USER_PROFILE':
      // console.log('REDUCER::', action);
      return {
        ...userObj,
        getUserProfile: action.getUserProfile,
      };
    case 'CHNAGE_PASSWORD':
      // console.log('REDUCER::', action);
      return {
        ...userObj,
        changePassword: action.changePassword,
      };
    case 'EDIT_PROFILE':
      // console.log('REDUCER::', action);
      return {
        ...userObj,
        editProfile: action.editProfile,
      };
    case 'GET_ALL_NOTIFICATION':
      // console.log('REDUCER::______', action.getAllNotifications);
      return {
        ...userObj,
        getAllNotifications: action.getAllNotifications,
      };
    case 'READ_ALL_NOTIFICATION':
      // console.log('REDUCER::', action);
      return {
        ...userObj,
        readNotifications: action.readNotifications,
      };

    default:
      return userObj;
  }
}
function signUpProcess(userObj = initialState, action) {
  console.log('THIRD STEP (REDUCER TO STORAGE)::', action);
  switch (action.type) {
    case 'USER_SIGNUP':
      return {
        ...userObj,
        userToken: action.userToken ? action.userToken : false,
        isSignedUp: action.userToken ? true : false,
      };
    default:
      return userObj;
  }
}

export { commonReducer, signUpProcess };
