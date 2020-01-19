import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';

export const getCategories = createAction('[Categories] Load');

export const getCategoriesSuccess = createAction(
  '[Categories] Load Success',
  props<{
    categories: Category[];
  }>(),
);

export const getCategoriesFail = createAction(
  '[Categories] Load Fail',
  props<{
    error: any;
  }>(),
);

export const setActiveCategory = createAction(
  '[Categories] Set Active Category',
  props<{
    category: Category;
  }>(),
);
