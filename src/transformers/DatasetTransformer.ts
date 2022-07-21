import { IAttachment, IDataset } from '../../types';

import AttachmentTransformer from './AttachmentTransformer';

import UnionTransformer from './UnionTransformer';

import { MongooseDocument } from '../../types';

class DatasetTransformer {
  transform(o: IDataset & MongooseDocument): IDataset {
    const dataset = { ...o };
    dataset.id = dataset._id || dataset.id;

    delete dataset._id;
    delete dataset.__v;

    if (dataset.union) {
      if (typeof dataset.union === 'string') {
        const id = dataset.union;
        dataset.union = { id };
      } else if (typeof dataset.union === 'object') {
        if (Object.keys(dataset.union).length) {
          dataset.union = new UnionTransformer().transform(dataset.union);
          if (dataset.union.logoUrl) {
            dataset.logoUrl = dataset.union.logoUrl;
          }
        } else {
          // clear empty union i.e. {}
          delete dataset.union;
        }
      }
    }

    if (dataset.samples) {
      dataset.samples = this.transformAttachments(
        dataset.id ?? '',
        dataset.samples
      );
    }

    if (dataset.metadata) {
      dataset.metadata = this.transformAttachments(
        dataset.id ?? '',
        dataset.metadata
      );
    }

    if (dataset.data) {
      dataset.data = this.transformAttachments(dataset.id ?? '', dataset.data);
    }

    return dataset;
  }

  transformAttachments(id: string, files: IAttachment[]): IAttachment[] {
    if (files) {
      const attachments = [];

      for (const file of files) {
        const attachment = new AttachmentTransformer().transform(file);
        attachment.url = `/api/v1/datasets/${id}/files/${attachment.originalname}`;

        attachments.push(attachment);
      }

      return attachments;
    }
    return [];
  }
}

export default DatasetTransformer;
