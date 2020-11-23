"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = recursiveReturnNextBusinessDay;

var _dateFns = require("date-fns");

async function recursiveReturnNextBusinessDay(date, holidays) {
  try {
    if ((0, _dateFns.isWeekend)(date)) {
      return await recursiveReturnNextBusinessDay((0, _dateFns.addDays)(date, 1), holidays);
    }

    for (const holiday of holidays) {
      const [day, month, year] = holiday.date.split('/');

      if ((0, _dateFns.isEqual)(new Date(Number(year), Number(month) - 1, Number(day)), date)) {
        return await recursiveReturnNextBusinessDay((0, _dateFns.addDays)(date, 1), holidays);
      }
    }
  } catch {}

  return date;
}