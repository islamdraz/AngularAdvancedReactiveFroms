import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from "@angular/forms";

import { Customer } from "./customer";

function ratingRang(min: number, max: number): ValidatorFn{
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      control.value != null &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { rating: true };
    }
    return null;
  }
}

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

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
      email: ["", [Validators.required, Validators.email]],
      phone: ["", []],
      notification: "email",
      rating: [null, [ratingRang(0,5)]],
      // sendCatalog: [{ value: true, disabled: false }],
      sendCatalog: true,
    });
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

  save() {
    console.log(this.customerForm);
    console.log("Saved: " + JSON.stringify(this.customerForm.value));
  }
}
