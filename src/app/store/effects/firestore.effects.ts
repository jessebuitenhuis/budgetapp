import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { filter, map, tap, switchMap } from "rxjs/operators";
import { ofEntityOp, EntityOp, EntityAction, EntityActionFactory } from "@ngrx/data";
import { Action } from "@ngrx/store";
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable()
export class FirestoreEffects {
  onPersist$ = createEffect(<T>() =>
    this.actions$.pipe(
      ofEntityOp(EntityOp.QUERY_ALL),
      switchMap(action => {
        const collection = this.db.collection<T>(action.payload.entityName);



        .valueChanges();

        const newAction = this.actionFactory.createFromAction(action, {
          entityOp: EntityOp.QUERY_ALL_SUCCESS,
          i
        })

        return
      )),
      map(([action, items]) => this.actionFactory.createFromAction(action))
    )
  );



  constructor(private actions$: Actions<EntityAction>, private actionFactory: EntityActionFactory, private db: AngularFirestore) {
    console.log("registering firestore effects");
  }
}

