import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModRolComponent } from './mod-rol.component';

describe('ModRolComponent', () => {
  let component: ModRolComponent;
  let fixture: ComponentFixture<ModRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
