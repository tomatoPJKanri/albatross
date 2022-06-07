import React from "react";
import styled from "styled-components";
import Button from "../common/Button";
import Responsive from "../common/Responsive";
import PostItem from "./PostItem";

const PostListBlock = styled(Responsive)`
  margin: 0 auto;
  margin-top: 3rem;
`;

const WriteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const Posts = ({ posts, loading, error, showBtn }) => {
  if (error) {
    return <PostListBlock>エラー</PostListBlock>;
  }

  return (
    <PostListBlock>
      <WriteButtonWrapper>
        {showBtn && (
          <Button teal to="/write">
            New Post
          </Button>
        )}
      </WriteButtonWrapper>

      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
};

export default Posts;
