import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from '@apollo/react-hooks';

export const POSTS = gql`
  {
    getPreviousPosts {
      content
      date
     }
  }
`;

export default function Posts() {
  const {
    loading, error, data = {},
  } = useQuery(POSTS);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error!</p>; }

  const { getPreviousPosts: posts } = data;

  if (!posts || !posts.length) {
    return <span />;
  }

  return posts.map(({ content, date }) => (
    <p key={`${date}`}>
      {content}
      <br />
      <br />
      <em>
        {' '}
        Date posted:
        {date}
      </em>
    </p>
  ));
}
