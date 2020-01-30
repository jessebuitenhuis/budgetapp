/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { DashboardTableRowComponent } from "./dashboard-table-row.component";
import { DashboardService } from "../services/dashboard.service";

describe("DashboardTableRowComponent", () => {
  let component: DashboardTableRowComponent;
  let fixture: ComponentFixture<DashboardTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTableRowComponent],
      providers: [DashboardService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTableRowComponent);
    component = fixture.componentInstance;
    component.category = { id: "1", name: "Category" };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
