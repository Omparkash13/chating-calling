import React, { useEffect, useState } from 'react';
import '../../Container/container.css';
import { HomeSidebar, Header, Footer } from '../../Components';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action';

function Theme() {
  const userRow = useSelector((row) => row.user.usersPosts);
  // console.log('USER row in THEME:::::::::::', userRow);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(actions.allUsersPosts());
  }, []);

  return (
    <>
      <HomeSidebar>
        <div className="headingsTitle">All Posts</div>
        <hr></hr>
        <div className="userPosts">
          <div className="button">
            <Row className="postCard">
              {userRow?.map((row, index) => {
                // console.log('ROW:::::::::::', row);
                return (
                  <Col sm={4} style={{ padding: '2px 10px 10px 10px' }}>
                    <a href={`/post/${row.id}`}>
                      <Card
                        style={{
                          width: '12rem',
                          height: '13rem',
                          border: '1px solid blue',
                          color: 'black',
                        }}
                      >
                        <Card.Img
                          style={{
                            height: '7rem',
                          }}
                          variant="top"
                          src="http://m.web.umkc.edu/mkakh3/assignment3/images/nature_300x300.jpg"
                        />
                        <Card.Body>
                          <Card.Title className="card-font-size">
                            {row.title}
                            {/* <p>{row.description}</p> */}
                          </Card.Title>
                          <Card.Text></Card.Text>
                        </Card.Body>
                      </Card>
                    </a>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      </HomeSidebar>
    </>
  );
}

export default Theme;
