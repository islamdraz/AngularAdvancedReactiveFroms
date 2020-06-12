import { Component, OnInit } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import {
  FormGroup,
  // FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";

import { Customer } from "./customer";

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  var mail = c.get("email");
  let confirmMail = c.get("confirmEmail");
  if (mail.pristine || confirmMail.pristine) {
    return null;
  }
  if (mail.value === confirmMail.value) return null;
  else {
    return { match: true };
  }
}

function ratingRang(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      control.value != null &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { rating: true };
    }
    return null;
  };
}

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  emailErrorMessage;
  private validationMessages = {
    required: "please enter email address",
    email: "please enter valide email address",
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true),
    // });

    this.customerForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group(
        {
          email: ["", [Validators.required, Validators.email]],
          confirmEmail: ["", [Validators.required]],
        },
        { validator: emailMatcher }
      ),
      phone: ["", []],
      notification: "email",
      rating: [null, [ratingRang(0, 5)]],
      // sendCatalog: [{ value: true, disabled: false }],
      sendCatalog: true,
    });

    const notificationCtrl = this.customerForm.get("notification");
    notificationCtrl.valueChanges.subscribe((value) =>
      this.setNotification(value)
    );
    //this has an issue as you don't get notified when the use change the focuse without type anything
    const emailControl = this.customerForm.get("emailGroup.email");
    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => this.setMessage(emailControl));
  }

  setNotification(value: string): void {
    var phoneCtrl = this.customerForm.get("phone");
    if (value == "text") {
      phoneCtrl.setValidators([Validators.required]);
    } else {
      phoneCtrl.clearValidators();
    }

    phoneCtrl.updateValueAndValidity();
  }

  setMessage(c: AbstractControl): void {
    this.emailErrorMessage = "";

    console.log(c.touched, c.dirty, c.errors);
    if ((c.touched || c.dirty) && c.errors) {
      this.emailErrorMessage = Object.keys(c.errors)
        .map((key) => this.validationMessages[key])
        .join(" ");
    }
  }

  save() {
    console.log(this.customerForm);
    console.log("Saved: " + JSON.stringify(this.customerForm.value));
  }
}
