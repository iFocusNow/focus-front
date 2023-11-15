import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from 'src/app/services/parent.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string = '';
  hidePassword = true;
  storage = localStorage;

  constructor(
    private formBuilder: FormBuilder,
    private parentService: ParentService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.formBuilder.group({
      last_name_mother: [
        '',
        [
          Validators.required,
          Validators.minLength(4), // Adjust the minimum length for last name as needed
          Validators.maxLength(50), // Adjust the maximum length for last name as needed
          Validators.pattern(/^\S*$/), // Ensures no spaces are allowed
        ],
      ],
      last_name_father: [
        '',
        [
          Validators.required,
          Validators.minLength(4), // Adjust the minimum length for last name as needed
          Validators.maxLength(50), // Adjust the maximum length for last name as needed
          Validators.pattern(/^\S*$/), // Ensures no spaces are allowed
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8), // Adjust the minimum password length as needed
          Validators.maxLength(20), // Adjust the maximum password length as needed
        ],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.snackBar.open(
        'Algún dato del registro es erroneo. Inténtelo otra vez.',
        'Cerrar',
        {
          duration: 2000,
        },
      );
      return;
    }

    const parentUserDTO = {
      last_name_mother: this.registerForm.controls['last_name_mother'].value,
      last_name_father: this.registerForm.controls['last_name_father'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      // Momentary photo
      photo_url:
        'https://avatars.steamstatic.com/1cfdee9bd003f0559d045b6223b321dd36c34958_full.jpg',
    };

    this.parentService.registerParent(parentUserDTO).subscribe(
      (result) => {
        if (!result) {
          this.snackBar.open('El usuario ya existe', 'Cerrar', {
            duration: 2000,
          });
          return;
        }

        this.storage.setItem('email', parentUserDTO.email);
        this.storage.setItem('password', parentUserDTO.password);

        this.router.navigate(['']);
      },
      (error) => {
        this.snackBar.open(error.message, 'Cerrar', {
          duration: 2000,
        });
      },
    );
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }
}
