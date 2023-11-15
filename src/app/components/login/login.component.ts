import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParentService } from 'src/app/services/parent.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

const storage = localStorage;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() icon!: string;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parentService: ParentService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4), // Adjust the minimum password length as needed
          Validators.maxLength(20), // Adjust the maximum password length as needed
        ],
      ],
    });
  }

  onSubmit() {
    const parentAuthDto = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    };

    this.parentService.authenticateParent(parentAuthDto).subscribe(
      () => {
        // Handle successful authentication
        console.log('Credenciales válidas');

        // Setting local storage
        storage.setItem('email', parentAuthDto.email);
        storage.setItem('password', parentAuthDto.password);

        window.location.reload();
        // Aquí podrías redirigir al usuario a otra página, por ejemplo.
      },
      (error) => {
        // Handle authentication error
        console.log('Credenciales inválidas');
        if (error.status === 400) {
          this.snackBar.open('Credenciales inválidas', 'Cerrar', {
            duration: 5000,
            panelClass: ['snack-bar-error'], // You can define a custom style for error messages
          });
        } else {
          // Handle other errors if needed
          console.error('An unexpected error occurred:', error);
        }
      },
    );
  }
}
