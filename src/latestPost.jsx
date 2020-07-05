import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import './index.css';

export const GET_LATEST_POST_QUERY = gql`
  {
    getLatestPost {
      content
      date
     }
  }
`;

export default function LatestPost() {
  const { loading, error, data = {} } = useQuery(GET_LATEST_POST_QUERY);

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error :(</p>; }

  if (!data.getLatestPost) {
    return <span />;
  }

  const {
    getLatestPost: {
      content: latestPostContent,
      date: latestPostDate,
    },
  } = data;

  return (
    <div>
      <div className="latestpost">
        <div>
          <h1>{latestPostContent}</h1>
          <br />
          <br />
          <em>
            Date posted:
            {latestPostDate}
          </em>
        </div>
      </div>
    </div>
  );
}
