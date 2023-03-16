import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
    exports: [
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        MatButtonModule,
        MatBadgeModule
    ]
})
export class MateriallUi { }
