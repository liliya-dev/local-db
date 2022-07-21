"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttachmentTransformer {
    transform(o) {
        const attachment = { ...o };
        attachment.id = attachment.id || attachment._id;
        delete attachment._id;
        delete attachment.__v;
        return attachment;
    }
}
exports.default = AttachmentTransformer;
