import * as moment from "moment";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

type MomentFns =
  | "isBefore"
  | "isAfter"
  | "isSame"
  | "isSameOrAfter"
  | "isSameOrBefore";

const momentPipeFactory = (momentFn: MomentFns) => /**
 * Filters all items based on a momentFn. If no compareDate is provided, the filter is not executed
 */ <T>(
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
