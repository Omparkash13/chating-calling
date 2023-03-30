import React, { useEffect, useState } from 'react';
import '../Components/header.css';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBIcon,
  CDBContainer,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { Header, Footer } from '../Components';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/action';
function HomeSidebar({ children }) {
  // console.log('HOMESIDEBAR::::', children);
  const Dispatch = useDispatch();
  const userRow = useSelector((row) => row.user);
  // console.log('ALL userRow in sidebar:::::', userRow);
  // const [results, setResult] = useState([]);

  useEffect(() => {
    Dispatch(actions.allUsers());
  }, []);

  return (
    <div className="Theme">
      <Header />
      <Container className="container">
        <div
          style={{
            display: 'flex',
            height: 'inherit',
            overflow: 'scroll initial',
          }}
        >
          <CDBSidebar textColor="#fff" backgroundColor="#1c316c">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: 'inherit' }}
              >
                All Users
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                {/* <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Home</CDBSidebarMenuItem>
            </NavLink> */}
                {userRow.allUsers?.map((row, index) => {
                  return (
                    <div key={index}>
                      <NavLink
                        exact
                        to={`/userposts/${row.id}`}
                        activeClassName="activeClicked"
                      >
                        <CDBSidebarMenuItem className="capCase" icon="user">
                          {row.firstName}
                        </CDBSidebarMenuItem>
                      </NavLink>
                    </div>
                  );
                })}
              </CDBSidebarMenu>
            </CDBSidebarContent>
          </CDBSidebar>
          <div className="rightSide">{children}</div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default HomeSidebar;
