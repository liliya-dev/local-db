import mongoose, { Schema, Model } from 'mongoose';

import UnionTransformer from '../transformers/UnionTransformer';
import { IUnion } from '../../types';

import Dataset from './Dataset';

export const UnionSchema: Schema = new Schema<IUnion>({
  created: { type: Date, required: true, default: Date.now },
  updated: { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  logoUrl: { type: String },
  backgroundUrl: { type: String },
  teaser: { type: String, required: true },
  summary: { type: String, required: true },
  body: { type: String, required: true },
  safes: [
    {
      address: { type: String, required: true },
      chainId: { type: String, required: true },
      created: { type: Date, required: true, default: Date.now },
      owner: { type: String, required: false },
    },
  ],
  whatTheyProvide: [
    {
      title: String,
      icon: String,
    },
  ],
  recentArticles: [
    {
      title: String,
      youTubeVideoId: String,
      imageUrl: String,
      url: String,
    },
  ],
  meetTheTeam: [
    {
      firstName: String,
      lastName: String,
      title: String,
      url: String,
    },
  ],
});

export type UnionModel = Model<IUnion>;

UnionSchema.virtual('id').get(function getId() {
  // @ts-ignore
  return this._id.toHexString();
});

UnionSchema.virtual('datasets').get(async function getDatasets() {
  const id = this._id;
  const datasets = await Dataset.find({ union: id });
  if (datasets && datasets.length) {
    return datasets;
  }
  return [];
});

UnionSchema.set('toJSON', {
  transform(doc, res) {
    return new UnionTransformer().transform(res);
  },
  virtuals: true,
});

UnionSchema.set('toObject', {
  transform(doc, res) {
    return new UnionTransformer().transform(res);
  },
  virtuals: true,
});

export default mongoose.model<IUnion & mongoose.Document, UnionModel>(
  'Union',
  UnionSchema
);
