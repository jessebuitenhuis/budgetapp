import * as moment from "moment";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { groupBy, Dictionary } from "underscore";
import { sortObject } from "./helpers";
import { getDateRange } from "./dates";

type MomentFns =
  | "isBefore"
  | "isAfter"
  | "isSame"
  | "isSameOrAfter"
  | "isSameOrBefore";

const momentPipeFactory = (
  momentFn: MomentFns
) => /**
 * Filters all items based on a momentFn. If no compareDate is
 provided, the filter is not executed
 */ <
  T
>(
  dateFn: (item: T) => Date,
  compareDate?: Date,
  granularity?: moment.unitOfTime.StartOf
) =>
  pipe(
    map((list: T[]) => {
      if (!compareDate) {
        return list;
      }

      return list.filter(item => {
        const itemMoment = moment(dateFn(item));
        return itemMoment[momentFn](moment(compareDate), granularity);
      });
    })
  );

export const isBeforeDate = momentPipeFactory("isBefore");
export const isAfterDate = momentPipeFactory("isAfter");
export const isSameDate = momentPipeFactory("isSame");
export const isSameOrAfterDate = momentPipeFactory("isSameOrAfter");
export const isSameOrBeforeDate = momentPipeFactory("isSameOrBefore");

export const groupByMonth = <T>(
  dateFn: (item: T) => Date,
  fillEmptyMonths: boolean = true
) =>
  pipe(
    map((list: T[]) => {
      const dateFormat = "YYYY-MM";

      const grouped = groupBy(list, x => {
        const date = dateFn(x);
        const _moment = moment(date);
        return _moment.format(dateFormat);
      });

      const sorted = sortObject(grouped);

      if (fillEmptyMonths) {
        const sortedMonths = Object.keys(sorted);
        const range = getDateRange(
          sortedMonths[0],
          sortedMonths[sortedMonths.length - 1],
          "month",
          dateFormat
        );
        const sortedAndFilled = {} as Dictionary<T[]>;
        range.forEach(date => {
          sortedAndFilled[date] = grouped[date] || [];
        });
        return sortedAndFilled;
      }

      return sorted;
    })
  );
