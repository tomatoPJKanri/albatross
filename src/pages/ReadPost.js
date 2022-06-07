import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../api/posts";
import EditDeleteButton from "../components/post/EditDeleteButton";
import PostViewer from "../components/post/PostViewer";
import HeaderContainer from "../containers/HeaderContainer";
import { unloadPost, readPost } from "../modules/post";
import { setOriginalPost } from "../modules/write";

const ReadPost = () => {
  const { postId } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading["post/READ"],
      user: user.user,
    })
  );

  const ownPost = (user && user._id) === (post && post.user._id);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history("/write");
  };

  const onDelete = async () => {
    try {
      await deletePost(postId);
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //databaseからpostを取得する
    dispatch(readPost(postId));

    return () => {
      //unmountされる時、stateを初期化
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  return (
    <>
      <HeaderContainer />
      <PostViewer
        post={post}
        error={error}
        loading={loading}
        actionButtons={
          ownPost && <EditDeleteButton onEdit={onEdit} onDelete={onDelete} />
        }
      />
    </>
  );
};

export default ReadPost;
