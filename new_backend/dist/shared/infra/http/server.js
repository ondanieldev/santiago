"use strict";

require("dotenv/config");

require("reflect-metadata");

require("express-async-errors");

require("../../container");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

var _mail = _interopRequireDefault(require("../../../config/mail"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _routes = _interopRequireDefault(require("./routes"));

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _handleClientErrors = _interopRequireDefault(require("./middlewares/handleClientErrors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
(0, _typeorm.default)();
const app = (0, _express.default)();
const port = process.env.APP_API_PORT || 3333;
app.use((0, _cors.default)());
app.use(_express.default.json()); // app.use(rateLimiter);

app.use('/files', _express.default.static(_upload.default.uploadFolder), _express.default.static(_mail.default.imagesFolder));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use(_handleClientErrors.default);
app.listen(port, () => {
  console.log(`Backend running on port ${port}!`);
});