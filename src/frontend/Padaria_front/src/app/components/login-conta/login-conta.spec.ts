import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginConta } from './login-conta';

describe('LoginConta', () => {
  let component: LoginConta;
  let fixture: ComponentFixture<LoginConta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginConta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginConta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
