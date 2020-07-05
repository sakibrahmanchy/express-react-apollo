export default async (obj, args, context) => {
  const { db } = await context();
  return db.getAll();
};
