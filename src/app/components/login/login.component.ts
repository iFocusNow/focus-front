import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() icon!: string;

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder){

  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]})
  }

}
