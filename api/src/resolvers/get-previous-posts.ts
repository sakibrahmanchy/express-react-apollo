export default async (obj, args, context) => {
  const { db } = await context();
  const allPosts = await db.getAll();

  if (!allPosts || !allPosts.length) {
    return [];
  }

  const [_, ...previousPosts] = allPosts;
  return previousPosts;
};
