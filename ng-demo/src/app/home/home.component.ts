import { AppService } from "./../app.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  users: any = [];

  constructor(
    private formBuilder: FormBuilder,
    public appservice: AppService
  ) {}

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    this.appservice.createNewUser(this.signUpForm.value).subscribe(msg => {
      if (msg["status"] === "true") {
        alert("user signUp successfully");
      } else {
        alert("Failed" + msg);
      }
    });
  }
  getUsers() {
    this.appservice.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }
}
