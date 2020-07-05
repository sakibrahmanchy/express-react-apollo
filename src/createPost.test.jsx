import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import {
  render, fireEvent, wait, act,
} from '@testing-library/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { createMockClient } from 'mock-apollo-client';
import Posts, { POSTS } from './Posts';
import CreatePosts, { CREATE_POST_MUTATION } from './createPosts';
import { GET_LATEST_POST_QUERY } from './latestPost';

const mockClient = createMockClient();

const post = { content: 'What a day!', date: 'July 3, 2020 11:44 AM' };
const mutationHandler = jest.fn().mockResolvedValue({
  data: {
    createPost: post,
  },
});

const getPreviousPostsQueryHandler = jest.fn().mockResolvedValue({
  data: {
    getPreviousPosts: [],
  },
});

const getLatestPostQueryHandler = jest.fn().mockResolvedValue({
  data: {
    getLatestPost: post,
  },
});

mockClient.setRequestHandler(CREATE_POST_MUTATION, mutationHandler);
mockClient.setRequestHandler(POSTS, getPreviousPostsQueryHandler);
mockClient.setRequestHandler(GET_LATEST_POST_QUERY, getLatestPostQueryHandler);

describe('Test Create Post Component', () => {
  it('should render without error', async () => {
    await act(async () => {
      render(
        <MockedProvider mocks={[]}>
          <div>
            <CreatePosts />
            <Posts />
          </div>
        </MockedProvider>,
      );

      // await wait();
    });
  });

  it('should render mutation behavior with refetchQueries', async () => {
    const content = 'What a day!';
    const { container } = render(
      <ApolloProvider client={mockClient}>
        <CreatePosts />
      </ApolloProvider>,
    );
    const input = container.querySelector('#text');
    const createButton = container.querySelector('#button');

    // Fill in the content field
    fireEvent.change(input, {
      target: {
        value: content,
      },
    });

    // Click the create button
    await wait(async () => {
      fireEvent.click(createButton);
    });

    expect(mutationHandler).toBeCalledWith({
      content,
    });

    expect(getPreviousPostsQueryHandler).toBeCalledTimes(1);
    expect(getLatestPostQueryHandler).toBeCalledTimes(1);
  });
});
