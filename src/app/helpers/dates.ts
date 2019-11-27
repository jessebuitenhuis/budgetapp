import * as moment from "moment";

type MomentFns =
  | "isBefore"
  | "isAfter"
  | "isSame"
  | "isSameOrAfter"
  | "isSameOrBefore";

function momentFnFactory(momentFn: MomentFns) {
  return (
    date1: Date,
    date2: Date,
    granularity?: moment.unitOfTime.StartOf
  ): boolean => {
    const moment1 = moment(date1);
    const moment2 = moment(date2);
    return moment1[momentFn](moment2, granularity);
  };
}

export const isBefore = momentFnFactory("isBefore");
export const isAfter = momentFnFactory("isAfter");
export const isSame = momentFnFactory("isSame");
export const isSameOrAfter = momentFnFactory("isSameOrAfter");
export const isSameOrBefore = momentFnFactory("isSameOrBefore");
