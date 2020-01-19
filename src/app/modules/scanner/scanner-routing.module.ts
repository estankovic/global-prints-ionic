import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './containers/scanner/scanner.component';

const routes: Routes = [
  {
    path: '',
    component: ScannerComponent,
    children: [
      {
        path: 'products/:id',
        component: ScannerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerRoutingModule {}
