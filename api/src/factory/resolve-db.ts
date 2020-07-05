import Local from './local';

// Add new drivers here and implement there classes inside factory
const mapper = {
  local: Local,
};

const resolve = driver => mapper[driver];

export default resolve;
