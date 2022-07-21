import {
  IUnion,
  IUnionArticle,
  IUnionProvide,
  IUnionTeamMember,
} from '../../types';

import { MongooseDocument } from '../../types';

type MongooseUnionArticle = IUnionArticle & MongooseDocument;
type MongooseUnionProvide = IUnionProvide & MongooseDocument;
type MongooseUnionTeamMember = IUnionTeamMember & MongooseDocument;

class UnionTransformer {
  transform(o: IUnion & MongooseDocument): IUnion {
    const union = { ...o };

    union.id = union._id || union.id;

    delete union._id;
    delete union.__v;

    if (union.whatTheyProvide) {
      union.whatTheyProvide.map((m: MongooseUnionProvide) => {
        const entry = { ...m };
        entry.id = m._id || m.id;

        return entry;
      });
    }

    if (union.meetTheTeam) {
      union.meetTheTeam.forEach((m: MongooseUnionTeamMember) => {
        const entry = { ...m };
        entry.id = m._id || m.id;

        return entry;
      });
    }

    if (union.recentArticles) {
      union.recentArticles.forEach((m: MongooseUnionArticle) => {
        const entry = { ...m };
        entry.id = m._id || m.id;

        return entry;
      });
    }

    return union;
  }
}

export default UnionTransformer;
