import { MockedProvider } from '@apollo/react-testing';
import React from 'react';
import { render, wait, screen } from '@testing-library/react';
import Posts, { POSTS } from '../Posts';

const mocks = [
  {
    request: {
      query: POSTS,
    },
    result: {
      data: {
        getPreviousPosts: [
          { content: 'Whats going on guys!', date: 'July 3, 2020 11:44 AM' },
        ],
      },
    },
  },
];

const noDataMocks = [
  {
    request: {
      query: POSTS,
    },
    result: {
      data: {
        getPreviousPosts: [],
      },
    },
  },
];

describe('Test Posts Component', () => {
  it('renders without error', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Posts />
      </MockedProvider>,
    );
  });

  it('should render loading state initially', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Posts />
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
        <Posts />
      </MockedProvider>,
    );

    await wait();

    expect(container.firstChild).toMatchInlineSnapshot(`
    <p>
      Whats going on guys!
      <br />
      <br />
      <em>
         
        Date posted:
        July 3, 2020 11:44 AM
      </em>
    </p>
  `);
  });

  it('should render error when no query provided', async () => {
    const { container } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Posts />
      </MockedProvider>,
    );

    await wait();

    expect(container.firstChild).toMatchInlineSnapshot(`
       <p>
         Error!
       </p>
  `);
  });

  it('should show empty span when there is no data', async () => {
    const { container } = render(
      <MockedProvider mocks={noDataMocks} addTypename={false}>
        <Posts />
      </MockedProvider>,
    );

    await wait();

    expect(container.firstChild).toMatchInlineSnapshot('<span />');
  });
});
