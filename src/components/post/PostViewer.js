import React from "react";
import styled from "styled-components";
import palette from "../../lib/palette";
import Responsive from "../common/Responsive";
import EditDeleteButton from "./EditDeleteButton";
import SubInfo from "./SubInfo";
import { Helmet } from "react-helmet-async";

const PostViewerBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.teal[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.teal[6]};
    }
  }
`;

const PostContent = styled.div`
  font-size: 1.13rem;
  color: ${palette.gray[9]};
`;

const PostViewer = ({ post, error, loading, actionButtons }) => {
  if (error) return <PostViewerBlock>ポストが存在しない</PostViewerBlock>;

  if (loading || !post) return null;

  return (
    <PostViewerBlock>
      <Helmet>
        <title>{post.title} - ALBATROSS</title>
      </Helmet>

      <PostHeader>
        <h1>{post.title}</h1>
        <SubInfo
          username={post.user.username}
          publishedDate={post.publishedDate}
        />
        <Tags>
          <span className="tag">tag1</span>
          <span className="tag">tag2</span>
          <span className="tag">tag3</span>
        </Tags>
      </PostHeader>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: post.body }} />
    </PostViewerBlock>
  );
};

export default PostViewer;
