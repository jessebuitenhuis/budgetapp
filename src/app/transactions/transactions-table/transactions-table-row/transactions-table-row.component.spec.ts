/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TransactionsTableRowComponent } from './transactions-table-row.component';

describe('TransactionsTableRowComponent', () => {
  let component: TransactionsTableRowComponent;
  let fixture: ComponentFixture<TransactionsTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
