/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { DashboardChartsComponent } from "./dashboard-charts.component";
import { DashboardService } from "../services/dashboard.service";

describe("DashboardChartsComponent", () => {
  let component: DashboardChartsComponent;
  let fixture: ComponentFixture<DashboardChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardChartsComponent],
      providers: [DashboardService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
