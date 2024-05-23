import mongoose, { Document, Schema } from 'mongoose';

interface IAnswer {
  text: string;
  votes: number;
}

interface IQuestion extends Document {
  question: string;
  answers: IAnswer[];
  userId: string;
}

const AnswerSchema: Schema = new Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const QuestionSchema: Schema = new Schema({
  question: { type: String, required: true },
  answers: { type: [AnswerSchema], required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export default mongoose.model<IQuestion>('Question', QuestionSchema);
