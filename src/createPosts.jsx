import { gql } from 'apollo-boost';
import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { POSTS } from './Posts';
import { GET_LATEST_POST_QUERY } from './latestPost';
import './index.css';

export const CREATE_POST_MUTATION = gql`
mutation CreatePost($content: String) {
  createPost(content: $content) {
    content,
    date
  }
}`;

export default function CreatePosts() {
  const input = useRef();
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    awaitRefetchQueries: true,
    refetchQueries: [{
      query: POSTS,
    }, {
      query: GET_LATEST_POST_QUERY,
    }],
  });

  if (loading) { return <p>Loading...</p>; }

  const handleClickEvent = () => {
    const content = input.current.value;
    createPost({ variables: { content } });
  };

  return (
    <div>
      <textarea
        placeholder="Share whats on your mind."
        id="text"
        name="text"
        rows="4"
        ref={input}
        style={{
          height: '300px',
          overflow: 'scroll',
          resize: 'none',
          wordWrap: 'break-word',
        }}
      />
      <br />
      <input id="button" type="button" onClick={handleClickEvent} value="Create" />
    </div>
  );
}
