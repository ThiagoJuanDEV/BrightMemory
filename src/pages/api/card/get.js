import { connectToDatabase } from "../../../util/mongodb";
import { isSameDay } from "date-fns";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const cards = await db
    .collection("cards")
    .find({ deckId: req.body.deckId })
    .toArray();

  const today = new Date();

  const cardsToReview = cards.filter((card) => {
    if(isSameDay(card.reviewWhen, today) || card.isNew) {
      return true;
    }
  });

  res.json(cardsToReview);
  res.status(200);
  res.end();
};
