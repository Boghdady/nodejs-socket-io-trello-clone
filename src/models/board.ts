import { Schema, model } from 'mongoose';
import { BoardDocument } from '../types/board.interface';

const boardSchema = new Schema<BoardDocument>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User that create a board is required'],
    },
  },
  { timestamps: true }
);

export default model('Board', boardSchema);
