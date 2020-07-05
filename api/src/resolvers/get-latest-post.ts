export default async (obj, args, context) => {
  const { db } = await context();
  const posts = await db.getAll();

  if (posts.length === 0) {
    return null;
  }

  const [latestPost] = posts;
  return latestPost;
};
