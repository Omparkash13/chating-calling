import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../Components/header.css';
import { HomeSidebar } from '../../Components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/action';

function SinglePost() {
  const allParams = useParams();
  const userRow = useSelector((row) => row.user);
  console.log('USER ROW FOR COMMENT:::::', userRow);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getCommentsOnPost(allParams));
    dispatch(actions.getPostById(allParams));
  }, [allParams]);

  return (
    <>
      <HomeSidebar>
        <div className="headingTitle">{userRow?.getPostById?.title}</div>
        <hr></hr>
        <div className="description">{userRow?.getPostById?.description} </div>

        <div className="allComments">
          <h3>Comments</h3>
          {userRow.getComments !== undefined &&
            Array.isArray(userRow.getComments.data) &&
            userRow?.getComments?.data?.map((row, index) => {
              return (
                <div key={index}>
                  <hr />
                  <p>
                    <strong>Comment:</strong> {row.comment}
                  </p>
                </div>
              );
            })}
        </div>
      </HomeSidebar>
    </>
  );
}

export default SinglePost;
