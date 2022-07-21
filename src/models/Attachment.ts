import mongoose, { Schema, Model } from 'mongoose';

import AttachmentTransformer from '../transformers/AttachmentTransformer';
import { IAttachment } from '../../types';

export const AttachmentSchema: Schema = new Schema<IAttachment>({
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  originalname: { type: String, required: true },
  encoding: { type: String, required: true },
  mimetype: { type: String, required: true },
  destination: { type: String, required: true },
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
});

export type AttachmentModel = Model<IAttachment>;

AttachmentSchema.virtual('id').get(function getId() {
  // @ts-ignore
  return this._id.toHexString();
});

AttachmentSchema.set('toJSON', {
  transform(doc, res) {
    return new AttachmentTransformer().transform(res);
  },
});

export default mongoose.model<IAttachment & mongoose.Document, AttachmentModel>(
  'Attachment',
  AttachmentSchema
);
