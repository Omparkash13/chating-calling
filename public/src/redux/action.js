async function login(payload) {
  console.log(`SECOND STEP (ACTIONS AND ADD TYPE INTO PAYLOAD)::`, payload);
  return { type: 'USER_LOGIN_REQUESTED', payload };
}

function signUp(payload) {
  console.log('SECOND STEP (ACTION AND ADD TYPE INTO PAYLOAD)::', payload);

  return { type: 'USER_SIGNUP_REQUESTED', payload };
}

function searchFriends(payload) {
  console.log(`SECOND STEP (Seaching friends ::)`, payload);
  return { type: 'SEARCH_FRIENDS_REQUESTED', payload };
}

function allUsers(payload) {
  console.log(`SECOND STEP (Check Users ::), ${payload}`);
  return { type: 'HOME_BAR_USERS_REQUESTED' };
}
function allUsersPosts() {
  console.log(`SECOND STEP (Check Posts::::::)`);
  return { type: 'ALL_USERS_POSTS_REQUESTED' };
}

function sendFriendRequest(payload) {
  console.log(`SECOND STEP (SEND FRIEND REQUEST ::)`, payload);
  return { type: 'SEND_FRIEND_REQUEST', payload };
}

function userPostById(payload) {
  console.log(`SECOND STEP (GET POST ID::)`, payload);
  return { type: 'GET_USER_POST_REQUESTED', payload };
}

function getPostById(payload) {
  console.log(`SECOND STEP (GET POST ID::)`, payload);
  return { type: 'GET_POST_ID_REQUESTED', payload };
}
function getCommentsOnPost(payload) {
  console.log(`SECOND STEP (GET POST COMMENTs::)`, payload);
  return { type: 'GET_COMMENTS_REQUESTED', payload };
}

const cancelFriendRequest = (payload) => {
  console.log(`SECOND STEP (CANCEL FRIEND REQUEST::)`, payload);
  return { type: 'CANCEL_FRIEND_REQUESTED', payload };
};

const removeFriendRequest = (payload) => {
  console.log(`SECOND STEP (remve FRIEND REQUEST::)`, payload);
  return { type: 'REMOVE_FRIEND_REQUESTED', payload };
};

const acceptFriendRequest = (payload) => {
  console.log(`SECOND STEP (CONFIRM FRIEND REQUEST::)`, payload);
  return { type: 'CONFIRM_FRIEND_REQUESTED', payload };
};

const getAllFriendRequests = (payload) => {
  console.log(`SECOND STEP (getAllFriendRequests FRIEND REQUEST::)`, payload);
  return { type: 'GET_ALL_FRIEND_REQUESTED', payload };
};

const userMessages = (payload) => {
  // i have deleted this function
  console.log(`SECOND STEP ( send messages to user::)`, payload);
  return { type: 'SEND_MESSAGES_REQUESTED', payload }; // depricated
};

function getUserMessages(payload) {
  console.log(`SECOND STEP ( Get messages to user::)`, payload);
  return { type: 'GET_MESSAGES_REQUESTED', payload };
}
function getFriendsList(payload) {
  // console.log(`SECOND STEP ( Get Friend List::)`, payload);
  return { type: 'GET_FRIENDSLIST_REQUESTED', payload };
}

function usersFollowing(payload) {
  console.log(`SECOND STEP ( Get User Followings:::)`, payload);
  return { type: 'USER_FOLLOWINGS_REQUESTED', payload };
}
function followers(payload) {
  console.log(`SECOND STEP ( Get User Followings:::)`, payload);
  return { type: 'FOLLOWERS_REQUESTED', payload };
}

function uploadImage(payload) {
  // console.log(`SECOND STEP ( Get User upoadImages:::)`, payload);
  return { type: 'UPLOAD_IMAGE_REQUESTED', payload };
}

function getUserProfile(payload) {
  console.log(`SECOND STEP ( Get User Profile:::)`, payload);
  return { type: 'USER_PROFILE_REQUESTED', payload };
}

function changePassword(payload) {
  console.log(`SECOND STEP ( change password:::)`, payload);
  return { type: 'CHANGE_PASSWORD_REQUESTED', payload };
}

function editUserProfile(payload) {
  console.log(`SECOND STEP ( EDIT user profile:::)`, payload);
  return { type: 'EDIT_PROFILE_REQUESTED', payload };
}
function messageStatus(payload) {
  console.log(`SECOND STEP ( Message status:::)`, payload);
  return { type: 'MESSAGE_STATUS_REQUESTED', payload };
}
function getAllNotifications(payload) {
  // console.log(`SECOND STEP ( GET Notification:::)`, payload);
  return { type: 'NOTIFICATIONS_REQUESTED', payload };
}
function readNotifications(payload) {
  console.log(`SECOND STEP ( READ Notification:::)`, payload);
  return { type: 'READ_NOTIFICATIONS_REQUESTED', payload };
}

export {
  login,
  signUp,
  searchFriends,
  allUsers,
  sendFriendRequest,
  allUsersPosts,
  userPostById,
  getPostById,
  getCommentsOnPost,
  cancelFriendRequest,
  acceptFriendRequest,
  getAllFriendRequests,
  userMessages,
  removeFriendRequest,
  getUserMessages,
  getFriendsList,
  usersFollowing,
  followers,
  uploadImage,
  getUserProfile,
  changePassword,
  editUserProfile,
  messageStatus,
  getAllNotifications,
  readNotifications,
};
