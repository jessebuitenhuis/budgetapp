/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { RadioComponent } from "./radio.component";

describe("RadioComponent", () => {
  let component: RadioComponent<any>;
  let fixture: ComponentFixture<RadioComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RadioComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
