import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GridDataService } from 'src/app/Services/gridData.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  email: string;
  password: string;
  public form: FormGroup;
  msgs: any[] = [];
  public submitted: boolean = false;
  BaseUrl = "http://localhost/api/ws/account/login";

  constructor(private dataService: GridDataService, private fb: FormBuilder, private router: Router) {

    // Create Form Builder for validation
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {

  }

  public onSubmit(values: Object) {
    this.submitted = true;
    if (this.form.valid) {
      //  Hit Api To the Server
      this.dataService.postData(this.BaseUrl, values)
        .subscribe(res => {
          if (res.success === true) {
            this.router.navigate(['/Pages']);
          }
          else {
            this.showInfo(res.message);
          }
        });
    }
  }

  showInfo(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: msg, detail: '' });
  }

}
