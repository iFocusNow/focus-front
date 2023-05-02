import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Parent } from 'src/app/models/parent';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  error: string = '';

  constructor(private formBuilder: FormBuilder, private parentService: ParentService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      last_name_mother: ['', Validators.required],
      last_name_father: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const parent: Parent = {
      id: 0,
      last_name_mother: this.registerForm.controls['last_name_mother'].value,
      last_name_father: this.registerForm.controls['last_name_father'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      photo_url: "",
      created_at: new Date(),
      updated_at: new Date()
    };

    this.parentService.registerParent(parent).subscribe(
      (result) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.error = 'Ha ocurrido un error al registrar el padre o tutor.';
      }
    );
  }
}
