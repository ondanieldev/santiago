"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _EnrollmentsController = _interopRequireDefault(require("../controllers/EnrollmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { celebrate, Joi, Segments } from 'celebrate';
const enrollmentsRouter = (0, _express.Router)();
const enrollmentsController = new _EnrollmentsController.default();
enrollmentsRouter.post('/', (req, res, next) => (0, _ensureAuthenticated.default)(['create_new_enrollments_permiss'])(req, res, next), // celebrate({
//     [Segments.BODY]: Joi.object().keys({
//         financial_responsible: Joi.object().keys({
//             name: Joi.string().required(),
//             birth_date: Joi.date().required(),
//             nacionality: Joi.string().required(),
//             civil_state: Joi.string()
//                 .valid(
//                     'single',
//                     'married',
//                     'divorced',
//                     'widower',
//                     'separeted',
//                 )
//                 .required(),
//             profission: Joi.string().required(),
//             cpf: Joi.string().length(11).required(),
//             rg: Joi.string().required(),
//             address_street: Joi.string().required(),
//             address_number: Joi.string().required(),
//             address_complement: Joi.string(),
//             address_neighborhood: Joi.string().required(),
//             address_city: Joi.string().required(),
//             address_cep: Joi.string().length(8).required(),
//             residencial_phone: Joi.string().required(),
//             commercial_phone: Joi.string().required(),
//             personal_phone: Joi.string().required(),
//             education_level: Joi.string()
//                 .valid(
//                     'elementary_incompleted',
//                     'elementary_completed',
//                     'highschool_incompleted',
//                     'highschool_completed',
//                     'university_incompleted',
//                     'university_completed',
//                 )
//                 .required(),
//             workplace: Joi.string().required(),
//             monthly_income: Joi.string()
//                 .valid(
//                     'a_class',
//                     'b_class',
//                     'c_class',
//                     'd_class',
//                     'e_class',
//                 )
//                 .required(),
//             income_tax: Joi.boolean().required(),
//             email: Joi.string().email().required(),
//             kinship: Joi.string().required(),
//         }),
//         supportive_responsible: Joi.object().keys({
//             name: Joi.string().required(),
//             birth_date: Joi.date().required(),
//             nacionality: Joi.string().required(),
//             civil_state: Joi.string()
//                 .valid(
//                     'single',
//                     'married',
//                     'divorced',
//                     'widower',
//                     'separeted',
//                 )
//                 .required(),
//             profission: Joi.string().required(),
//             cpf: Joi.string().length(11).required(),
//             rg: Joi.string().required(),
//             address_street: Joi.string().required(),
//             address_number: Joi.string().required(),
//             address_complement: Joi.string(),
//             address_neighborhood: Joi.string().required(),
//             address_city: Joi.string().required(),
//             address_cep: Joi.string().length(8).required(),
//             residencial_phone: Joi.string().required(),
//             commercial_phone: Joi.string().required(),
//             personal_phone: Joi.string().required(),
//             education_level: Joi.string()
//                 .valid(
//                     'elementary_incompleted',
//                     'elementary_completed',
//                     'highschool_incompleted',
//                     'highschool_completed',
//                     'university_incompleted',
//                     'university_completed',
//                 )
//                 .required(),
//             workplace: Joi.string().required(),
//             monthly_income: Joi.string()
//                 .valid(
//                     'a_class',
//                     'b_class',
//                     'c_class',
//                     'd_class',
//                     'e_class',
//                 )
//                 .required(),
//             income_tax: Joi.boolean().required(),
//             email: Joi.string().email().required(),
//             kinship: Joi.string().required(),
//         }),
//         grade: Joi.object().keys({
//             id: Joi.string().uuid().required(),
//         }),
//         student: Joi.object().keys({
//             name: Joi.string().required(),
//             father_name: Joi.string().required(),
//             mother_name: Joi.string().required(),
//             birth_date: Joi.date().required(),
//             nacionality: Joi.string().required(),
//             birth_city: Joi.string().required(),
//             birth_state: Joi.string().length(2).required(),
//             gender: Joi.string().valid('male', 'female').required(),
//             race: Joi.string()
//                 .valid('white', 'brown', 'black', 'indigenous', 'yellow')
//                 .required(),
//             ease_relating: Joi.boolean().required(),
//             origin_school: Joi.string(),
//             health_plan: Joi.string(),
//             food_alergy: Joi.string(),
//             medication_alergy: Joi.string(),
//             health_problem: Joi.string(),
//             special_necessities: Joi.string(),
//         }),
//         financial_responsible_id: Joi.string().uuid(),
//         supportive_responsible_id: Joi.string().uuid(),
//     }),
// }),
enrollmentsController.create);
var _default = enrollmentsRouter;
exports.default = _default;