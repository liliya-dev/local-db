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
exports.UnionSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const UnionTransformer_1 = __importDefault(require("../transformers/UnionTransformer"));
const Dataset_1 = __importDefault(require("./Dataset"));
exports.UnionSchema = new mongoose_1.Schema({
    created: { type: Date, required: true, default: Date.now },
    updated: { type: Date, required: true, default: Date.now },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    logoUrl: { type: String },
    backgroundUrl: { type: String },
    teaser: { type: String, required: true },
    summary: { type: String, required: true },
    body: { type: String, required: true },
    safes: [
        {
            address: { type: String, required: true },
            chainId: { type: String, required: true },
            created: { type: Date, required: true, default: Date.now },
            owner: { type: String, required: false },
        },
    ],
    whatTheyProvide: [
        {
            title: String,
            icon: String,
        },
    ],
    recentArticles: [
        {
            title: String,
            youTubeVideoId: String,
            imageUrl: String,
            url: String,
        },
    ],
    meetTheTeam: [
        {
            firstName: String,
            lastName: String,
            title: String,
            url: String,
        },
    ],
});
exports.UnionSchema.virtual('id').get(function getId() {
    // @ts-ignore
    return this._id.toHexString();
});
exports.UnionSchema.virtual('datasets').get(async function getDatasets() {
    const id = this._id;
    const datasets = await Dataset_1.default.find({ union: id });
    if (datasets && datasets.length) {
        return datasets;
    }
    return [];
});
exports.UnionSchema.set('toJSON', {
    transform(doc, res) {
        return new UnionTransformer_1.default().transform(res);
    },
    virtuals: true,
});
exports.UnionSchema.set('toObject', {
    transform(doc, res) {
        return new UnionTransformer_1.default().transform(res);
    },
    virtuals: true,
});
exports.default = mongoose_1.default.model('Union', exports.UnionSchema);
