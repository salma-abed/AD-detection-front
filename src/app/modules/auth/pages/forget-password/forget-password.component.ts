import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriallUi } from '../../material-ui.module';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,

    MateriallUi
  ],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

}
