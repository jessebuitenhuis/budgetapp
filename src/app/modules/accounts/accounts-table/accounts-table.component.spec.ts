/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { AccountsTableComponent } from "./accounts-table.component";
import { FormsModule } from "@angular/forms";

describe("AccountsTableComponent", () => {
  let component: AccountsTableComponent;
  let fixture: ComponentFixture<AccountsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsTableComponent],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
