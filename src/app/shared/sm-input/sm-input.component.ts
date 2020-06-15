import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, AbstractControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "sm-input",
  templateUrl: "./sm-input.component.html",
  styleUrls: ["./sm-input.component.css"],
})
export class SmInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() parentForm: FormGroup;
  @Input() errors: {};

  errorMessage: string;
  constructor() {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => this.setMessage(this.control));
  }

  setMessage(c: AbstractControl): void {
    this.errorMessage = "";
    if ((c.touched || c.dirty) && c.errors) {
      this.errorMessage = Object.keys(c.errors)
        .map((key) => this.errors[key])
        .join(" ");
    }
  }
}
