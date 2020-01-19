import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Category } from '../../models/category.model';
import { getCategories, getCategoriesSuccess, setActiveCategory, } from '../actions/categories.actions';
import { CategoriesState } from '../states';

export const categoriesAdapter = createEntityAdapter<Category>({
  selectId: item => item.absolutePath,
});

const initState: CategoriesState = {
  data: categoriesAdapter.getInitialState(),
  loaded: false,
  loading: false,
  metadata: {
    activeCategory: null,
  },
};

const reducer = createReducer(
  initState,

  on(getCategories, state => ({
    ...state,
    loading: true,
  })),

  on(getCategoriesSuccess, (state, {categories}) => ({
    ...state,
    data: categoriesAdapter.addAll(categories, state.data),
    loaded: true,
    loading: false,
  })),

  on(setActiveCategory, (state, {category}) => ({
    ...state,
    metadata: {
      ...state.metadata,
      activeCategory: category ? category : null,
    },
  })),
);

export function categoriesReducer(state: CategoriesState, action: Action) {
  return reducer(state, action);
}
