import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriallUi } from '../../material-ui.module';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,
    MateriallUi],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

}
