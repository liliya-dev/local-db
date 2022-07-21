"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserTransformer {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    transform(o) {
        const user = { ...o };
        user.id = user._id || user.id;
        delete user._id;
        delete user.__v;
        return user;
    }
}
exports.default = UserTransformer;
