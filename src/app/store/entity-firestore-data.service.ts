import { Injectable } from "@angular/core";
import { EntityCollectionDataService } from "@ngrx/data";
import { EMPTY, Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";

export class EntityFirestoreDataService
  implements EntityCollectionDataService<any> {
  name: string = "";

  constructor(private db: AngularFirestore) {}

  add(entity: any): Observable<any> {
    return EMPTY;
  }
  delete(id: string | number): Observable<string | number> {
    return EMPTY;
  }
  getAll(): Observable<any[]> {
    console.log(this.db);
    console.log("getting all");
    return EMPTY;
  }
  getById(id: any): Observable<any> {
    return EMPTY;
  }
  getWithQuery(params: any): Observable<any[]> {
    return EMPTY;
  }
  update(update: any): Observable<any> {
    return EMPTY;
  }
  upsert(entity: any): Observable<any> {
    return EMPTY;
  }
}

@Injectable()
export class EntityFirestoreDataServiceFactory {
  constructor(private db: AngularFirestore) {}

  create(): EntityCollectionDataService<any> {
    return new EntityFirestoreDataService(this.db);
  }
}
