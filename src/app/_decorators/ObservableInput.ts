import { ReplaySubject, BehaviorSubject, Subscription } from "rxjs";
import { OnDestroy, EventEmitter } from "@angular/core";

export function ObservableInput<T>(value?: T): PropertyDecorator {
  const subjectSymbol = Symbol();

  return (target: any, key: string | number | symbol) => {
    const subject = (target[subjectSymbol] = new ReplaySubject<T>(1));
    let subscription: Subscription | undefined;

    if (typeof key === "string") {
      const outputEmitter =
        (target[key + "Change"] as EventEmitter<T>) || undefined;

      if (outputEmitter) {
        subscription = subject.subscribe(outputEmitter);
      }
    }

    if (value) {
      subject.next(value);
    }

    Object.defineProperty(target, key, {
      set: (newVal: any) => {
        if (newVal !== value) {
          value = newVal;
          subject.next(newVal);
        }
      },
      get: () => {
        return target[subjectSymbol];
      }
    });

    const currentOnDestroyFn = (target as OnDestroy).ngOnDestroy;

    target.ngOnDestroy = () => {
      if (subscription) {
        subscription.unsubscribe();
      }
      if (currentOnDestroyFn) {
        currentOnDestroyFn();
      }
    };
  };
}
