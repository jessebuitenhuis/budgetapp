/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { AccountsTableRowComponent } from "./accounts-table-row.component";

describe("AccountsTableRowComponent", () => {
  let component: AccountsTableRowComponent;
  let fixture: ComponentFixture<AccountsTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsTableRowComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsTableRowComponent);
    component = fixture.componentInstance;
    component.account = { id: "1", name: "Account 1" };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
