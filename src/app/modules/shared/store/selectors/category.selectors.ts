import { createSelector } from '@ngrx/store';

import * as FlatToNested from 'flat-to-nested';
import { CategoryNode } from '../../models/category.model';
import { categoriesAdapter } from '../reducers/category.reducer';
import { sharedFeatureSelector } from './feature.selector';

const {selectAll} = categoriesAdapter.getSelectors();

const categoryState = createSelector(
  sharedFeatureSelector,
  state => state.categories,
);

const categoryStateData = createSelector(
  categoryState,
  state => state.data,
);

const categoryStateMetadata = createSelector(
  categoryState,
  state => state.metadata,
);

const $categoriesList = createSelector(
  categoryStateData,
  state => selectAll(state),
);

export const $activeCategory = createSelector(
  categoryStateMetadata,
  state => state.activeCategory,
);

export const $getCategoryByPath = (path: string) =>
  createSelector(
    categoryStateData,
    state => state.entities[path],
  );

export const $categoryNodes = createSelector(
  $categoriesList,
  (state): CategoryNode[] => {
    const flatToNested = new FlatToNested({
      // The name of the property with the node id in the flat representation
      id: 'absolutePath',
      // The name of the property with the parent node id in the flat representation
      parent: 'parent',
      // The name of the property that will hold the children nodes in the nested representation
      children: 'children',
    });

    const nodes: { children?: CategoryNode[] } = flatToNested.convert(
      state.map(item => {
        const s = item.absolutePath.split('__');
        s.pop();
        const parent = s.join('__');
        if (parent) {
          return {
            ...item,
            parent,
          };
        } else {
          return {...item};
        }
      }),
    );

    return nodes.children ? nodes.children : [];
  },
);

export const $isCategoryActive = (path: string) =>
  createSelector(
    $activeCategory,
    state => state && state.absolutePath === path,
  );
