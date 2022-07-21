import { IAttachment } from '../../types';
import { MongooseDocument } from '../../types';

class AttachmentTransformer {
  transform(o: IAttachment & MongooseDocument): IAttachment {
    const attachment = { ...o };
    attachment.id = attachment.id || attachment._id;

    delete attachment._id;
    delete attachment.__v;

    return attachment;
  }
}

export default AttachmentTransformer;
