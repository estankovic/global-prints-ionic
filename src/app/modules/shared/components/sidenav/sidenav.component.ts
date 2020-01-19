import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { CategoryNode } from '../../models/category.model';
import { setActiveCategory } from '../../store/actions/categories.actions';
import { $categoryNodes, $getCategoryByPath, $isCategoryActive, } from '../../store/selectors/category.selectors';
import { SharedState } from '../../store/states';

interface ExampleFlatNode {
  expandable: boolean;
  displayName: string;
  absolutePath: string;
  parent: string;
  level: number;
}

@Component({
  selector: 'gp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  TREE_DATA: CategoryNode[] = [];

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener<CategoryNode, ExampleFlatNode>(
    (node: CategoryNode, level: number) => {
      const s = node.absolutePath.split('__');
      s.pop();
      return {
        expandable: !!node.children && node.children.length > 0,
        displayName: node.displayName,
        absolutePath: node.absolutePath,
        parent: s.join('__'),
        level,
      };
    },
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private readonly store: Store<SharedState>) {
    this.dataSource.data = this.TREE_DATA;

    this.store
      .pipe(
        select($categoryNodes),
        tap(console.log),
        filter(item => Array.isArray(item)),
      )
      .subscribe(data => {
        this.dataSource.data = data;
      });
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
  }

  expandByPath(path: string) {
    const node = this.treeControl.dataNodes.find(
      item => item.absolutePath === path,
    );

    if (node.parent) {
      this.expandByPath(node.parent);
    }

    this.treeControl.expand(node);
  }

  setCategory(path: string) {
    this.store
      .pipe(
        select($getCategoryByPath(path)),
        take(1),
      )
      .subscribe(category => {
        this.store.dispatch(
          setActiveCategory({
            category,
          }),
        );
      });
  }

  isActive(path: string): Observable<boolean> {
    return this.store.pipe(select($isCategoryActive(path)));
  }
}
