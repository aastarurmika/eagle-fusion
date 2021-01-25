import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule, MatChipsModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material'
import { SignupComponent } from './signup.component'
import { SignupRoutingModule } from './signup-routing.module';
import { OtpComponent } from './otp/otp.component'

@NgModule({
  declarations: [SignupComponent, OtpComponent],
  imports: [
    SignupRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [SignupComponent],
})
export class SignupModule { }
