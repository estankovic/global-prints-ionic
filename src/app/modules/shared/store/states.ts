import { Category } from '../models/category.model';
import { StoreState } from '../models/store.models';

export interface SideNavState {
  opened: boolean;
}

export type CategoriesState = StoreState<Category,
  {
    activeCategory: Category;
  }>;

export interface SharedState {
  sidenav: SideNavState;
  categories: CategoriesState;
}
