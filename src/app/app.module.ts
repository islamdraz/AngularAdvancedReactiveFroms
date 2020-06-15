import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CustomerComponent } from "./customers/customer.component";
import { SmInputComponent } from './shared/sm-input/sm-input.component';

@NgModule({
  declarations: [AppComponent, CustomerComponent, SmInputComponent],
  imports: [
    BrowserModule,
    // FormsModule
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
