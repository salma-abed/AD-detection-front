import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        FormsModule,
        MatToolbarModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        RouterModule
    ]
})
export class MateriallUi { }
