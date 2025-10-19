import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraMenu } from './barra-menu';

describe('BarraMenu', () => {
  let component: BarraMenu;
  let fixture: ComponentFixture<BarraMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
