// db
export type DatabaseConfig = {
  scheme: string;
  host: string;
  port: string;
  name: string;
  username?: string;
  password?: string;
  caFile?: string;
  queryString?: string;
  uri?: string;
};

/**
 * Representation of user account data.
 * @property {string} operatorOfUnion - String hash ID linking union to user.
 */
 export interface IUser {
  id?: string;
  email: string;
  operatorOfUnion: string;
}

/**
 * A buyer purchase order with details about the purchase, linking Revolut data.
 *
 * @property {string} revolutOrderId - Order id of the generated purchahse.
 * @property {string} revolutOrderPublicId - Public Order id of the generated purchahse.
 * @property {number} amountUSD - Amount of this purchase in USD.
 * @property {string} buyerEmail - Email of the user making the purchase.
 * @property {string} created - Time the order was created.
 * @property {string} datasets - List of ids of datasets being purchased.
 * @see {@link https://developer.revolut.com/docs/revolut-checkout-js/initialize-widget/instance/instance-pay-with-popup}
 */

export interface IAttachment {
  id?: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  filepath: string;
  path: string;
  size: number;
  url?: string;
  created?: Date;
  updated?: Date;
}

export interface IDataset extends MongooseDocument {
  id?: string;
  union?: IUnion;
  title?: string;
  shortDescription?: string;
  longDescription?: string;
  duration?: string;
  region?: string;
  pricePerDay?: number;
  pricePerWeek?: number;
  pricePerSubscription?: number;
  tags?: string[];
  categories?: string[];
  created?: Date;
  updated?: Date;
  samples?: IAttachment[];
  data?: IAttachment[];
  metadata?: IAttachment[];
  logoUrl?: string;
}

export type IUnionProvide = {
  id?: string;
  title: string;
  icon: string;
};

export type IUnionArticle = {
  id?: string;
  title: string;
  youTubeVideoId: string;
  imageUrl: string;
  url: string;
};

export type IUnionTeamMember = {
  id?: string;
  firstName: string;
  lastName: string;
  title?: string;
  url: string;
};

/**
 * Data union web3 safe information.
 *
 * @property {string} address -  Address of the stored on chain Safe.
 * @property {string} chainId - Chain ID. See {@link https://chainlist.org/}
 * @property {IUnion} union - Linked Union information.
 */
export interface IUnionSafe {
  created?: Date;
  address: string;
  chainId: string;
  owner?: string;
}

export type IUnion = {
  created?: Date;
  updated?: Date;
  id?: string;
  title?: string;
  subtitle?: string;
  logoUrl?: string;
  backgroundUrl?: string;
  teaser?: string;
  summary?: string;
  body?: string;
  whatTheyProvide?: IUnionProvide[];
  recentArticles?: IUnionArticle[];
  meetTheTeam?: IUnionTeamMember[];
  datasets?: IDataset[];
  safes?: IUnionSafe[];
};

export type MongooseDocument = {
  _id?: string;
  __v?: string;
};


