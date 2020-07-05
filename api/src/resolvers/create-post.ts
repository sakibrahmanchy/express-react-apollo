import moment from 'moment';
import { v1 as uuid } from 'uuid';

export default async (obj, { content }, context) => {
  const post = {
    content,
    id: uuid(),
    date: moment().format('LLL'),
  };

  const { db } = await context();
  return db.add(post);
};
