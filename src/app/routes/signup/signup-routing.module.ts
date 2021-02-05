import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SignupComponent } from './signup.component'
const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SignupRoutingModule { }
