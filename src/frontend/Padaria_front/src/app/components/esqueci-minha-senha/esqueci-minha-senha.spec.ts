import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsqueciMinhaSenha } from './esqueci-minha-senha';

describe('EsqueciMinhaSenha', () => {
  let component: EsqueciMinhaSenha;
  let fixture: ComponentFixture<EsqueciMinhaSenha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsqueciMinhaSenha]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsqueciMinhaSenha);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
