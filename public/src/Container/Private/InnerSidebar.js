import { React } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBIcon,
  CDBContainer,
} from 'cdbreact';
import FontAwesomeIcon from 'react-fontawesome';
import { Header, Footer } from '../../Components';
import { Container } from 'react-bootstrap';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InnerSidebar = ({ children }) => {
  const userRow = useSelector((row) => row);
  // console.log('user row after login:::::::::', userRow);
  const navigate = useNavigate();
  return (
    <div className="Theme">
      <Header />
      <Container className="container">
        <div
          style={{
            display: 'flex',
            overflow: 'scroll initial',
          }}
        >
          <CDBSidebar
            textColor="#fff"
            backgroundColor="#1c316c"
            style={{ height: '700px' }}
          >
            <CDBSidebarHeader
              prefix={<i className="fa fa-bars fa-large"></i>}
              style={{ textTransform: 'capitalize' }}
            >
              Welcome, {userRow.user.userFirstName}
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <CDBSidebarMenuItem icon="columns">
                  <a href="http://localhost:3000/dashboard"> Dashboard</a>
                </CDBSidebarMenuItem>

                <CDBSidebarMenuItem icon="user">
                  <a href="http://localhost:3000/addfriend"> Add Friend</a>
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem icon="table">
                  <a href="http://localhost:3000/allfriends"> chat</a>
                </CDBSidebarMenuItem>
                <CDBSidebarMenuItem icon="chart-line">
                  <a href="http://localhost:3000/setting"> Settings</a>
                </CDBSidebarMenuItem>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBContainer>
              <CDBIcon fab spin icon="stack-overflow" />
              <CDBIcon fab spin icon="facebook" />
              <CDBIcon fab spin icon="reddit" />
              <CDBIcon fab spin icon="twitter" />
              <CDBIcon fab spin icon="instagram" />
              <CDBIcon fab spin icon="google" />
            </CDBContainer>
          </CDBSidebar>
          <div className="rightSide">{children}</div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default InnerSidebar;
