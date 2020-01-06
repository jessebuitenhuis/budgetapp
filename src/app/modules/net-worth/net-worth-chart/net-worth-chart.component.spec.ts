/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NetWorthChartComponent } from './net-worth-chart.component';

describe('NetWorthChartComponent', () => {
  let component: NetWorthChartComponent;
  let fixture: ComponentFixture<NetWorthChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetWorthChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
