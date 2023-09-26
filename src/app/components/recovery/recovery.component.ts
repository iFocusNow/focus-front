import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent {
  recoveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parentService: ParentService,
    private snackBar: MatSnackBar,
  ) {
    this.recoveryForm = this.formBuilder.group({
      last_name_mother: ['', Validators.required],
      last_name_father: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  onSubmit() {
    const passwordDTO = {
      last_name_mother: this.recoveryForm.controls['last_name_mother'].value,
      last_name_father: this.recoveryForm.controls['last_name_father'].value,
      email: this.recoveryForm.controls['email'].value,
    };

    if (this.recoveryForm.invalid) {
      this.snackBar.open(
        'Algún dato del registro no está asociado con una cuenta existente.',
        'Cerrar',
        {
          duration: 3000,
        },
      );
      return;
    }

    this.parentService.recoverPassword(passwordDTO).subscribe(
      (result) => {
        if (result) {
          this.snackBar.open(
            'Se envió nuevas credenciales al correo introducido.',
            'Cerrar',
            {
              duration: 3000,
            },
          );
          this.recoveryForm.reset();
          return;
        }
      },
      (error) => {
        this.snackBar.open(
          'Las credenciales ingresadas no son correctas.',
          'Cerrar',
          {
            duration: 3000,
          },
        );
      },
    );
  }
}
