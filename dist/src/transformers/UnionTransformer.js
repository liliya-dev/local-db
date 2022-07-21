"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnionTransformer {
    transform(o) {
        const union = { ...o };
        union.id = union._id || union.id;
        delete union._id;
        delete union.__v;
        if (union.whatTheyProvide) {
            union.whatTheyProvide.map((m) => {
                const entry = { ...m };
                entry.id = m._id || m.id;
                return entry;
            });
        }
        if (union.meetTheTeam) {
            union.meetTheTeam.forEach((m) => {
                const entry = { ...m };
                entry.id = m._id || m.id;
                return entry;
            });
        }
        if (union.recentArticles) {
            union.recentArticles.forEach((m) => {
                const entry = { ...m };
                entry.id = m._id || m.id;
                return entry;
            });
        }
        return union;
    }
}
exports.default = UnionTransformer;
