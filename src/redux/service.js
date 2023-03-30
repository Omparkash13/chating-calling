import { Status } from '../Components/Status';

async function signupAPI(payload) {
  console.log('This is payload::::', payload);
  let url = `http://10.1.4.88:3004/v1/user/register`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  var results = await result.json();
  console.log('RESULT :::::::', results);
  if (results.response.status === 200) {
    Status('success', results.response.message);
  } else {
    Status('error', results.response.data[0].message);
  }
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function loginAPI(payload) {
  console.log(payload);
  let url = `http://10.1.4.88:3004/v1/user/login`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  var results = await result.json();
  if (results.response.status === 200) {
    Status('success', results.response.message);
    // console.log('GET sock', socket);
    localStorage.setItem('localUserToken', results.response.data.token);
  } else {
    Status('error', results.response.data[0].message);
  }
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function searchFriendAPI(payload) {
  // console.log(payload, 'search friend api paylaod::::::::::::::::');
  let url = `http://10.1.4.88:3004/v1/user/searchFriend/${payload.value}`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  // console.log(result, '::::::::::::::::::::::');
  var results = await result.json();
  console.log(`Search message from api service::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function sendFriendsRequestAPI(payload) {
  console.log('SERVICE FILE SEND FRIEND EQUEST::::', payload);
  let url = `http://10.1.4.88:3004/v1/user/addFriend`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ toRequestId: payload.toRequestId }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  console.log('AFTER API Hit::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`Search message from api service::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function allUsers() {
  // console.log(payload, 'search friend api paylaod::::::::::::::::');
  let url = `http://10.1.4.88:3004/v1/user/getAllUser`;
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  // console.log(result, '::::::::::::::::::::::');
  var results = await result.json();
  console.log(`Get All user from api service::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function allUsersPostsAPI() {
  // console.log(payload, 'search friend api paylaod::::::::::::::::');
  let url = `http://10.1.4.88:3004/v1/user/getPosts/,/,`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  // console.log(result, '::::::::::::::::::::::');
  var results = await result.json();
  // console.log(`All users:::POST API::`, results);
  // console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getUserPostsByIdAPI(payload) {
  // console.log(payload, 'search payload for post api::::::::::::::::');
  let url = `http://10.1.4.88:3004/v1/user/getPostsByUserId/${payload.userId}`;

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  // console.log(result, '::::::::::::::::::::::');
  var results = await result.json();
  console.log(`All users:::POST API::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getPostsByIdAPI(payload) {
  console.log('SERVICE API PAYLOAD', payload);
  let url = `http://10.1.4.88:3004/v1/user/getPostsById/${payload.postId}`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(result, '::::::::::::::::::::::');
  var results = await result.json();
  console.log(`All users:::POST API::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getCommentsOnPostAPI(payload) {
  console.log('SERVICE API PAYLOAD for COmment', payload);
  let url = `http://10.1.4.88:3004/v1/user/getCommentById/${payload.postId} `;
  // let url = 'https://gorest.co.in/public/v2/posts/1950/comments';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  console.log(result, '::::::::::::::::::::::');
  var results = await result.json();
  console.log(`All users:::COMMENTS::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function cancelFriendRequestAPI(payload) {
  console.log('SERVICE API PAYLOAD for DELETE REQUEST', payload);
  let url = `http://10.1.4.88:3004/v1/user/cancelMyRequest/${payload.userId} `;
  // let url = 'https://gorest.co.in/public/v2/posts/1950/comments';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  console.log('::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`DELETE FRIEND REQUEST::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function removeFriendsRequestAPI(payload) {
  console.log('SERVICE API PAYLOAD for DELETE REQUEST', payload);
  let url = `http://10.1.4.88:3004/v1/user/cancelFriendRequest/${payload.userId} `;
  // let url = 'https://gorest.co.in/public/v2/posts/1950/comments';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  console.log('::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`DELETE FRIEND REQUEST::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function acceptFriendRequestAPI(payload) {
  console.log('SERVICE API PAYLOAD for ACCEPT REQUEST', payload);
  let url = `http://10.1.4.88:3004/v1/user/acceptRequest/${payload.userId}`;
  // let url = 'https://gorest.co.in/public/v2/posts/1950/comments';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  console.log('SERVICE RESULT::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`ACCEPT FRIEND REQUEST::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getAllFriendRequestAPI(payload) {
  console.log('SERVICE API PAYLOAD for GET ALL REQUEST', payload);
  let url = `http://10.1.4.88:3004/v1/user/getAllFriendRequests`;
  // let url = 'https://gorest.co.in/public/v2/posts/1950/comments';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload,
    },
  });
  console.log('SERVICE RESULT::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`ACCEPT FRIEND REQUEST::`, results);
  console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function sendMessageAPI(payload) {
  console.log('SERVICE FILE SEND Mesaa::::', payload);
  let url = `http://10.1.4.88:3004/v1/user/createMessage`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      toUserId: payload.toUserId,
      message: payload.message,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  console.log('AFTER API Hit::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`Search message from api service::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getAllMessageAPI(payload) {
  // console.log('SERVICE API PAYLOAD for GET ALL MESS', payload);
  let url = `http://10.1.4.88:3004/v1/user/getMessagesByUserId/${payload.limit}/${payload.offset}`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      toUserId: payload.toUserId,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  // console.log('AFTER API Hit::::::::::::::::::::::', result);
  var results = await result.json();
  // console.log(`GET message from api service::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getFriendsListAPI(payload) {
  const url = 'http://10.1.4.88:3004/v1/user/getAllFriendList';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload,
    },
  });

  var results = await result.json();
  // console.log(`GET message from api service::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function usersFollowingAPI(payload) {
  console.log('SERVICE API PAYLOAD for GET ALL FOLLOWING', payload);
  const url = 'http://10.1.4.88:3004/v1/user/getFollowings';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload,
    },
  });
  const results = await result.json();
  console.log(`GET FOllowing from api service::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}
async function followersAPI(payload) {
  console.log('SERVICE API PAYLOAD for followersAPI', payload);
  const url = 'http://10.1.4.88:3004/v1/user/getFollowers';
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload,
    },
  });
  const results = await result.json();
  console.log(`GET followersAPI from api service::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function uploadImageApi(payload) {
  console.log('SERVICE API PAYLOAD for UPLOAD IMAGE', payload);
  // console.log('upload Payload:::', payload.picture);
  let formData = new FormData();
  formData.append('picture', payload.picture);
  formData.append('type', payload.type);
  console.log('upload Payload:::', formData);
  let url;
  if (payload.type === 'PROFILE') {
    url = 'http://10.1.4.88:3004/v1/user/uploadProfilePic';
  } else {
    url = 'http://10.1.4.88:3004/v1/user/uploadAttachment';
  }

  const result = await fetch(url, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      'api-access-token': payload.userToken,
    },
  });
  var results = await result.json();
  // console.log('RESULT :::::::', results);
  if (results.response.status === 200) {
    Status('success', results.response.message);
  } else {
    Status('error', results.response.data[0].message);
  }
  // console.log(`RESULT::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getUserProfileAPI(payload) {
  console.log('SERVICE API PAYLOAD for user profile', payload);
  let url;
  payload.userId
    ? (url = `http://10.1.4.88:3004/v1/user/getUserById/${payload.userId}`)
    : (url = `http://10.1.4.88:3004/v1/user/getUserById`);

  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.userToken,
    },
  });
  const results = await result.json();
  console.log(`Results::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

async function changePasswordAPI(payload) {
  console.log('SERVICE API PAYLOAD chnage paswd', payload);
  let url = `http://10.1.4.88:3004/v1/user/changePassword`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      oldPassword: payload.password.oldPassword,
      newPassword: payload.password.newPassword,
      confirmPassword: payload.password.confirmPassword,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.userToken,
    },
  });
  // console.log('AFTER API Hit::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`GET change pass service::`, results);
  if (results.response.status === 200) {
    Status('success', results.response.message);
  } else {
    Status('error', results.response.message.message);
  }
  return Number(results?.response?.status) === 200 ? results : [];
}

async function editUserProfileAPI(payload) {
  console.log('SERVICE API PAYLOAD chnage paswd', payload);
  let url = `http://10.1.4.88:3004/v1/user/editProfileById`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      firstName: payload.firstName,
      lastName: payload.lastName,
      skills: payload.skills,
      aboutMe: payload.aboutMe,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.userToken,
    },
  });
  // console.log('AFTER API Hit::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`GET change pass service::`, results);
  if (results.response.status === 200) {
    Status('success', results.response.message);
  } else {
    Status('error', results.response.message.message);
  }
  return Number(results?.response?.status) === 200 ? results : [];
}

async function messageStatusAPI(payload) {
  console.log('SERVICE API PAYLOAD messageStatus', payload);
  let url = `http://10.1.4.88:3004/v1/user/updateMessageStatus`;
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      fromUserId: payload.fromUserId,
      toUserId: payload.toUserId,
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  // console.log('AFTER API Hit::::::::::::::::::::::', result);
  var results = await result.json();
  console.log(`MESSAGE STATUS SERVICE RESULT::`, results);
  // if (results.response.status === 200) {
  //   Status('success', results.response.message);
  // } else {
  //   Status('error', results.response.message.message);
  // }
  return Number(results?.response?.status) === 200 ? results : [];
}

async function getAllNotificationsAPI(payload) {
  // console.log('SERVICE API PAYLOAD for NOtif', payload);
  const url = `http://10.1.4.88:3004/v1/user/getAllNotifications`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  const results = await result.json();
  // console.log(`Results::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}
async function readNotificationsAPI(payload) {
  // console.log('SERVICE API PAYLOAD for NOtif', payload);
  const url = `http://10.1.4.88:3004/v1/user/updateNotificationStatus`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'api-access-token': payload.token,
    },
  });
  const results = await result.json();
  // console.log(`Results::`, results);
  return Number(results?.response?.status) === 200 ? results : [];
}

export {
  loginAPI,
  signupAPI,
  searchFriendAPI,
  allUsers,
  sendFriendsRequestAPI,
  allUsersPostsAPI,
  getUserPostsByIdAPI,
  getPostsByIdAPI,
  getCommentsOnPostAPI,
  cancelFriendRequestAPI,
  acceptFriendRequestAPI,
  getAllFriendRequestAPI,
  removeFriendsRequestAPI,
  sendMessageAPI,
  getAllMessageAPI,
  getFriendsListAPI,
  usersFollowingAPI,
  followersAPI,
  uploadImageApi,
  getUserProfileAPI,
  changePasswordAPI,
  editUserProfileAPI,
  messageStatusAPI,
  getAllNotificationsAPI,
  readNotificationsAPI,
};
