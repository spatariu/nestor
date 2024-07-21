"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const init_1 = require("./models/init");
const groupRoutes_1 = __importDefault(require("./routes/groupRoutes"));
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/groups', groupRoutes_1.default);
app.use('/api/people', personRoutes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await init_1.sequelize.sync({ force: false }); // Sync models with database
        console.log('Database synced');
    }
    catch (error) {
        console.error('Unable to sync the database:', error);
    }
});
