import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTabBgImagesComponent } from './add-tab-bg-images.component';

describe('AddTabBgImagesComponent', () => {
  let component: AddTabBgImagesComponent;
  let fixture: ComponentFixture<AddTabBgImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTabBgImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTabBgImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
