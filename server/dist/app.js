"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const env_1 = require("./config/env");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// Connect to MongoDB (replace 'your_mongo_connection_string' with your actual connection string)
mongoose_1.default.connect(env_1.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use('/', routes_1.default);
app.listen(env_1.PORT, () => {
    console.log(`App run in http://ocalhost:${env_1.PORT}`);
});
