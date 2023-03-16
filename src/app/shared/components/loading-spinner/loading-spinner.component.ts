import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() color?: string;

  constructor() { }
  ngOnInit(): void { }
}
