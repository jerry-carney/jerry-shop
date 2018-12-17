import { CategoryService } from 'src/app/shared/services/category.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category;

  constructor(private cateoryService: CategoryService) {
    this.categories$ = cateoryService.getAll();
  }

}
