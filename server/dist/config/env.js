"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.PORT = void 0;
// env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3001;
exports.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/devolpex-auth';
