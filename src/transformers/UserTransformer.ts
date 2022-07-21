import { IUser } from '../../types';

class UserTransformer {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  transform(o: any): IUser {
    const user = { ...o };

    user.id = user._id || user.id;
    delete user._id;
    delete user.__v;

    return user;
  }
}

export default UserTransformer;
