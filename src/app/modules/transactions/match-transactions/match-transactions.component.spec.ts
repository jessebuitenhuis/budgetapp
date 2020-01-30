/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { MatchTransactionsComponent } from "./match-transactions.component";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

describe("MatchTransactionsComponent", () => {
  let component: MatchTransactionsComponent;
  let fixture: ComponentFixture<MatchTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchTransactionsComponent],
      providers: [NgbActiveModal]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
