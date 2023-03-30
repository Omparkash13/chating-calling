import React from 'react';
import { Post, Userpost, Theme } from './Container/public';
import {
  Dashboard,
  SearchBar,
  FriendsList,
  Chat,
  UploadFile,
  UserProfile,
} from './Container/Private';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PublicRoute from './Routes/PublicRoute';
// import { HomeSidebar } from './Components';
import PrivateRoute from './Routes/PrivateRoute';
import { SocketContext, socket } from '../src/context/socket';
import Notification from './Container/Private/Notification';
import { VideoPlayer, Sidebar, Notifications } from './Components';
// const Route = require('react-router-dom').Route;
function App() {
  return (
    <>
      <Router>
        <SocketContext.Provider value={socket} exact>
          <Routes>
            <Route path="/*" element={<Theme />} />
            {/* <Route path="/home" element={<HomeSidebar />} /> */}
            <Route element={<Post />} path="/post/:postId" />
            <Route element={<Userpost />} path="/userposts/:userId" />
            <Route element={<PrivateRoute />}>
              <Route path="/addfriend" element={<SearchBar />} />
              <Route path="/allfriends" element={<FriendsList />} />
              <Route path="/setting" element={<UploadFile />} />
              <Route path="/chat/:id" element={<Chat />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/userProfile/:id" element={<UserProfile />} />
              <Route path="/video" element={<VideoPlayer />} />
              {/* <Route path="/side" element={<Sidebar />} /> */}
              <Route path="/noti" element={<Notifications />} />
              <Route element={[<Dashboard />]} path="/dashboard" />
            </Route>
          </Routes>
        </SocketContext.Provider>
      </Router>
      {/* <Status /> */}
    </>
  );
}

export default App;
