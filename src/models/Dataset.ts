import mongoose, { Schema, Model, Document } from 'mongoose';

import DatasetTransformer from '../transformers/DatasetTransformer';
import { IDataset } from '../../types';
import { AttachmentSchema } from './Attachment';

export const DatasetSchema: Schema = new Schema<IDataset>({
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  union: { type: Schema.Types.ObjectId, ref: 'Union' },
  title: { type: String },
  shortDescription: { type: String },
  longDescription: { type: String },
  duration: { type: String },
  region: { type: String },
  pricePerDay: { type: Number },
  pricePerWeek: { type: Number },
  pricePerSubscription: { type: Number },
  tags: [{ type: String }],
  categories: [{ type: String }],
  samples: [{ type: AttachmentSchema }],
  metadata: [{ type: AttachmentSchema }],
  data: [{ type: AttachmentSchema }],
});

export type DatasetModel = Model<IDataset>;

DatasetSchema.virtual('id').get(function getId() {
  // @ts-ignore
  return this._id.toHexString();
});

DatasetSchema.set('toJSON', {
  transform(doc, res) {
    return new DatasetTransformer().transform(res);
  },
});

export default mongoose.model<IDataset & mongoose.Document, DatasetModel>(
  'Dataset',
  DatasetSchema
);
