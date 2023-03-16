import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule
  ]
})
export class ConfirmDeleteComponent implements OnInit {
  public message?: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void {
    this.message = this.data || "Are you sure you want to delete this?";
  }
}
