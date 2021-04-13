import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public types = ['User', 'Admin'];
  myForm: FormGroup;
  products = [''];
  constructor(
    private us: DataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = this.formBuilder.group({
      user: [null, Validators.required],
    });
  }

  status: 'data';
  clickedSubmit(formRef) {
    let dataFromForm = formRef.value;

    if (dataFromForm.radioType == 'userChecked') {
      this.us.createUser(dataFromForm).subscribe(
        (res) => {
          if (res['message'] == 'user created') {
            alert(`${res['message']} Successfully `);
            this.router.navigateByUrl('/login');
          } else {
            alert('The email or username is already exist ');
          }
        },
        (err) => {
          alert('Something is wrong while creating');
          console.log(err);
        }
      );
    }
    if (dataFromForm.radioType == 'adminChecked') {
      dataFromForm.products = [];
      console.log('new admin', dataFromForm);

      this.us.createAdmin(dataFromForm).subscribe(
        (res) => {
          if (res['message'] == 'Admin created') {
            alert(`${res['message']} Successfully `);
            this.router.navigateByUrl('/login');
          } else {
            alert('The email or username is already exist ');
          }
        },
        (err) => {
          alert('Something is wrong while creating Admin');
          console.log(err);
        }
      );
    }
  }

  ngOnInit(): void {}
}
