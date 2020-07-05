import React from 'react';
import './App.css';
import Posts from './Posts';
import CreatePosts from './createPosts';
import LatestPost from './latestPost';

function App() {
  return (
    <div className="flexwrapper">
      <div className="wrapper">
        <CreatePosts />
        <LatestPost />
      </div>
      <div className="posts">
        <h2>Previous Posts</h2>
        <Posts />
      </div>
    </div>
  );
}

export default App;
