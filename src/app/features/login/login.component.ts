import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { BaseComponent } from '@shared/components/base/base.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  form!: FormGroup;
  hide_eye = 'fas fa-eye-slash';
  show_eye = 'fas fa-eye';
  eye = 'fas fa-eye-slash';
  message = '';
  returnUrl: string = '';
  isLoading: boolean = false;
  loginError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }
  onSubmit() {
    this.loginError = false;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.isLoading = true;
      this.authService
        .login(this.form.value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          () => {
            this.router.navigateByUrl(this.returnUrl);
          },
          (err: HttpErrorResponse) => {
            this.loginError = true;
          }
        );
    }
  }
  togglePassword() {
    this.eye = this.eye == this.show_eye ? this.hide_eye : this.show_eye;
  }
}
