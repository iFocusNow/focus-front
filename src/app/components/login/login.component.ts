import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { ParentService } from 'src/app/services/parent.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  @Input() icon!: string;
  loginForm !: FormGroup;

   constructor(private formBuilder: FormBuilder, private parentService: ParentService,
    private snackBar: MatSnackBar, private router: Router){

  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]})
  }

  onSubmit() {
    const parent = {
      id: 0,
      last_name_mother:"",
      last_name_father: "",
      photo_url: "",
      created_at: new Date(),
      updated_at: new Date(),
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    };
    this.parentService.authenticateParent(parent).subscribe((isValid) => {
      if (isValid) {
        console.log('Credenciales válidas');
        this.router.navigate([''])
        // Aquí podrías redirigir al usuario a otra página, por ejemplo.

      } else {
        console.log('Credenciales inválidas');
        this.snackBar.open('Usuario no encontrado', 'Cerrar', {
          duration: 5000,
          panelClass: ['snack-bar-custom']
        });
      }
    });
  }
}
