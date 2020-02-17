import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'products',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../modules/products/products.module').then(m => m.ProductsModule)
          }
        ]
      },
      {
        path: 'scanner',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../modules/scanner/scanner.module').then(m => m.ScannerModule)
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../modules/orders/orders.module').then(m => m.OrdersModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/products',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
