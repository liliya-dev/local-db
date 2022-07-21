// cache
import { Document } from 'mongoose';
export type CacheConfig = {
  host: string;
  port: string;
  password?: string;
};

// express
export type ExpressBodyConfig = {
  limit: string;
};
export type ExpressCorsConfig = {
  origin?: string;
};
export type ExpressCorpConfig = {
  resourcePolicy?: string;
};
export type ExpressRateLimitConfig = {
  rateLimitReset: number;
  rateLimitMax: number;
};
export type ExpressJwtConfig = {
  secret?: string;
  expiresIn: number;
};
export type ExpressNetworkConfig = {
  port: number;
};
export type ExpressConfig = ExpressBodyConfig &
  ExpressCorsConfig &
  ExpressCorpConfig &
  ExpressRateLimitConfig &
  ExpressJwtConfig &
  ExpressNetworkConfig;

export type OptionalExpressBodyConfig = {
  limit?: string;
};
export type OptionalExpressCorsConfig = {
  origin?: string;
};
export type OptionalExpressCorpConfig = {
  resourcePolicy?: string;
};
export type OptionalExpressRateLimitConfig = {
  rateLimitReset?: number;
  rateLimitMax?: number;
};
export type OptionalExpressJwtConfig = {
  secret?: string;
  expiresIn?: number;
};
export type OptionalExpressNetworkConfig = {
  port?: number;
};
export type OptionalExpressConfig = OptionalExpressBodyConfig &
  OptionalExpressCorsConfig &
  OptionalExpressCorpConfig &
  OptionalExpressRateLimitConfig &
  OptionalExpressJwtConfig &
  OptionalExpressNetworkConfig;

// logging
export type LoggingConfig = {
  level: string;
};

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

export type AWSConfig = {
  s3region?: string;
};

export type Auth0Config = {
  issuerBaseURL?: string;
  audience?: string;
};

export type SearchConfig = {
  index: string;
  scheme: string;
  host: string;
  port: string;
  auth?: {
    username?: string;
    password?: string;
  };
};

export type RevolutConfig = {
  api?: string;
  apiKey?: string;
};

export type Config = {
  express: ExpressConfig;
  logging: LoggingConfig;
  cache: CacheConfig;
  db: DatabaseConfig;
  aws: AWSConfig;
  auth0: Auth0Config;
  search: SearchConfig;
  env?: string;
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
export interface IRevolutPurchaseOrder {
  id?: string;
  amountUSD: number;
  buyerEmail?: string;
  created?: Date;
  datasets: string[];
  revolutOrderId?: string;
  revolutPublicId?: string;
}

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

export interface IFiles {
  [key: string]: Express.Multer.File[];
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

export type ElasticsearchConfig = {
  node: string;
  auth?: {
    username?: string;
    password?: string;
  };
};



