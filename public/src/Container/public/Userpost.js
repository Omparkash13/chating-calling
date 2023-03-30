import React, { useEffect, useState } from 'react';
import '../../Components/header.css';
import { HomeSidebar, Header, Footer } from '../../Components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action';

import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function Userpost() {
  const userRow = useSelector((row) => row.user.usersPostsById);
  // console.log('USER ROW DATA IN POST::', userRow.user.usersPosts);
  const Dispatch = useDispatch();
  const allParams = useParams();
  // const [results, setResult] = useState([]);
  useEffect(() => {
    Dispatch(actions.userPostById(allParams));
  }, [allParams]);

  return (
    <>
      <HomeSidebar>
        <div className="headingTitle">User's Posts</div>
        <Row className="postCard">
          {userRow?.map((row, index) => {
            return (
              <Col sm={4} className="p-3">
                <a href={`/post/${row.id}`}>
                  <Card
                    style={{
                      width: '12rem',
                      height: '13rem',
                      border: '1px solid blue',
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
                      </Card.Title>
                      <Card.Text></Card.Text>
                      {/* <Button
                      className="homeBtn"
                      key={index}
                      variant="outline-primary"
                    >
                      <a href={`/post/${row.id}`}>Post Id: {row.id}</a>
                      &nbsp;&nbsp;
                    </Button> */}
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            );
          })}
        </Row>
      </HomeSidebar>
    </>
  );
}

export default Userpost;
