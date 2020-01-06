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

export function getDateRange(
  start: Date,
  end: Date,
  granularity: moment.DurationInputArg2
): Date[];
export function getDateRange(
  start: string,
  end: string,
  granularity: moment.DurationInputArg2,
  dateFormat: string
): string[];
export function getDateRange(
  start: moment.Moment,
  end: moment.Moment,
  granularity: moment.DurationInputArg2
): Date[];
export function getDateRange(
  start: string | Date | moment.Moment,
  end: string | Date | moment.Moment,
  granularity: moment.DurationInputArg2,
  dateFormat?: string
): Array<Date> | Array<moment.Moment> | Array<string> {
  const startMoment = moment.isMoment(start)
    ? start
    : moment(start, dateFormat);
  const endMoment = moment.isMoment(end) ? end : moment(end, dateFormat);

  const range: moment.Moment[] = [];

  while (startMoment.isSameOrBefore(endMoment, granularity)) {
    range.push(startMoment.clone());
    startMoment.add(1, granularity);
  }

  if (moment.isMoment(start)) {
    return range;
  }

  if (start instanceof Date) {
    return range.map(x => x.toDate());
  }

  return range.map(x => x.format(dateFormat));
}
