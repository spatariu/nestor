"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
const groupRoutes_1 = __importDefault(require("./routes/groupRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use('/people', personRoutes_1.default); // Mount the person routes at /people
app.use('/groups', groupRoutes_1.default); // Mount the group routes at /groups
// Root route
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Error handling middleware
app.use((req, res) => {
    res.status(404).send('Not Found');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
