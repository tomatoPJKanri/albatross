import qs from "qs";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Posts from "../components/post/Posts";
import HeaderContainer from "../containers/HeaderContainer";
import PaginationContainer from "../containers/PaginationContainer";
import { fetchPostList } from "../modules/postlist";

const PostList = () => {
  const location = useLocation();
  const { username } = useParams();

  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ postList, loading, user }) => ({
      posts: postList.posts,
      error: postList.error,
      loading: loading["postList/POST_LIST"],
      user: user.user,
    })
  );

  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(fetchPostList({ username, tag, page }));
  }, [dispatch, username, location.search]);

  return (
    <>
      <HeaderContainer />
      <Posts loading={loading} error={error} posts={posts} showBtn={user} />
      <PaginationContainer />
    </>
  );
};

export default PostList;
