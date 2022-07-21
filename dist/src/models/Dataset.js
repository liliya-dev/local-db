"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasetSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DatasetTransformer_1 = __importDefault(require("../transformers/DatasetTransformer"));
const Attachment_1 = require("./Attachment");
exports.DatasetSchema = new mongoose_1.Schema({
    created: { type: Date, required: true, default: Date.now },
    updated: { type: Date, required: true, default: Date.now },
    union: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Union' },
    title: { type: String },
    shortDescription: { type: String },
    longDescription: { type: String },
    duration: { type: String },
    region: { type: String },
    pricePerDay: { type: Number },
    pricePerWeek: { type: Number },
    pricePerSubscription: { type: Number },
    tags: [{ type: String }],
    categories: [{ type: String }],
    samples: [{ type: Attachment_1.AttachmentSchema }],
    metadata: [{ type: Attachment_1.AttachmentSchema }],
    data: [{ type: Attachment_1.AttachmentSchema }],
});
exports.DatasetSchema.virtual('id').get(function getId() {
    // @ts-ignore
    return this._id.toHexString();
});
exports.DatasetSchema.set('toJSON', {
    transform(doc, res) {
        return new DatasetTransformer_1.default().transform(res);
    },
});
exports.default = mongoose_1.default.model('Dataset', exports.DatasetSchema);
