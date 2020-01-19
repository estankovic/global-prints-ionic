import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatListModule, MatTreeModule } from '@angular/material';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './components/counter/counter.component';
import { BottomNavigationComponent } from './components/layout/bottom-navigation/bottom-navigation.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ScrollPositionRestoreDirective } from './directives/scroll-position-restore/scroll-position-restore.directive';
import { ScrollPositionService } from './directives/scroll-position-restore/scroll-position.service';
import { CategoryService } from './services/category.service';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    ProductCardComponent,
    ToolbarComponent,
    BottomNavigationComponent,
    CounterComponent,
    ScrollPositionRestoreDirective,
    SidenavComponent,
  ],
  exports: [
    ProductCardComponent,
    ToolbarComponent,
    BottomNavigationComponent,
    CounterComponent,
    ScrollPositionRestoreDirective,
    SidenavComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    StoreModule.forFeature('shared', reducers),
    EffectsModule.forFeature(effects),
    MatListModule,
    MatTreeModule,
    CdkTreeModule,
  ],
  providers: [ScrollPositionService, CategoryService],
})
export class SharedModule {}
