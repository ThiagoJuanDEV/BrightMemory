import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  console.log(req.body.id);

  const allDecks = await db
    .collection("decks")
    .find({ userId: req.body.id })
    .toArray();

  console.log(allDecks);

  res.json(allDecks);
  res.end();
};
