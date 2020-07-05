import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import { render, wait, screen } from '@testing-library/react';
import LatestPost, { GET_LATEST_POST_QUERY } from '../latestPost';

const mocks = [
  {
    request: {
      query: GET_LATEST_POST_QUERY,
    },
    result: {
      data: {
        getLatestPost: {
          content: 'Whats going on guys!',
          date: 'July 3, 2020 11:44 AM',
        },
      },
    },
  },
];

const noDataMocks = [
  {
    request: {
      query: GET_LATEST_POST_QUERY,
    },
    result: {
      data: {
        getLatestPost: null,
      },
    },
  },
];

describe('Test Latest Post Component', () => {
  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LatestPost />
      </MockedProvider>,
    );
  });

  it('should render loading state initially', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LatestPost />
      </MockedProvider>,
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
        <p>
          Loading...
        </p>
  `);

    expect(screen.queryByText('Loading...')).toBeInTheDocument();
    await wait();

    expect(screen.queryByText('Loading...')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('renders correct data', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LatestPost />
      </MockedProvider>,
    );

    await wait();

    expect(container.firstChild).toMatchInlineSnapshot(`
      <div>
        <div
          class="latestpost"
        >
          <div>
            <h1>
              Whats going on guys!
            </h1>
            <br />
            <br />
            <em>
              Date posted:
              July 3, 2020 11:44 AM
            </em>
          </div>
        </div>
      </div>
    `);
  });

  it('should render error when no query provided', async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <LatestPost />
      </MockedProvider>,
    );

    await wait();

    expect(container.firstChild).toMatchInlineSnapshot(`
          <p>
            Error :(
          </p>
      `);
  });

  it('should show nothing', async () => {
    const { container } = render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <LatestPost />
      </MockedProvider>,
    );

    await wait();

    expect(container.firstChild).toMatchInlineSnapshot(
      '<span />',
    );
  });
});
