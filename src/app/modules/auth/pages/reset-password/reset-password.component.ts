import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriallUi } from '../../material-ui.module';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    MateriallUi
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

}
