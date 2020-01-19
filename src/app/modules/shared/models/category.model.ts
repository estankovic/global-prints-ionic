export interface Category {
  displayName: string;
  absolutePath: string;
}

export interface CategoryNode extends Category {
  children?: CategoryNode[];
}
