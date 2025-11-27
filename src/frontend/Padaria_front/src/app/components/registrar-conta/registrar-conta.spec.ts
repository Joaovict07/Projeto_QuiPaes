import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarConta } from './registrar-conta';

describe('RegistrarConta', () => {
  let component: RegistrarConta;
  let fixture: ComponentFixture<RegistrarConta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarConta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarConta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
