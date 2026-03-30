import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// PrimeNG
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { toSignal } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';

// Services & Models
import { ApiService } from '../../../core/services/api.service';
import { endpoints } from '../../../core/constant/api.endpoint';
import { Datum, IProjects } from '../../../core/models/homeApiResponse';

export interface ICategoryOption {
  label: string;
  value: Datum;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule,
    SelectModule,
    DrawerModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  private api = inject(ApiService);

  drawerVisible = signal(false);

  homeForm = new FormGroup({
    category: new FormControl<Datum | null>(null, Validators.required)
  });

  categories: ICategoryOption[] = [];

  categorySignal = toSignal(
    this.homeForm.get('category')!.valueChanges,
    { 
      initialValue: this.homeForm.get('category')?.value ?? null
    }
  );

  // ✅ FIX: effect handles change detection properly without setTimeout
  constructor() {
    this.loadProjects();

    // ✅ FIX: Move effect into constructor for proper lifecycle
    effect(() => {
      const category = this.categorySignal();

      if (category) {
        console.log('✅ Selected Category:', category);

        // ✅ FIX: No setTimeout needed - use signal for drawer visibility
        // this.drawerVisible.set(true);

        this.onCategoryChange(category);
      }
    });
  }

  loadProjects() {
    this.api.get<IProjects>(`${endpoints.dashboard.projects}`).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.categories = response.data.map(project => ({
            label: project.projectName,
            value: project
          }));
          console.log('✅ Categories loaded:', this.categories);
        }
      },
      error: (err) => console.error('❌ Fetch Projects Failed:', err)
    });
  }

  onCategoryChange(category: Datum) {
    console.log('🔄 Handle category:', category.projectName);
    // Add your business logic here
  }

  // onSubmit() {
  //   if (this.homeForm.valid) {
  //     const selectedCategory = this.homeForm.get('category')?.value;
  //     console.log('✅ Form Valid - Selected:', selectedCategory?.projectName);
  //     // Call API or perform action
  //   } else {
  //     this.homeForm.markAllAsTouched();
  //     console.warn('❌ Form Invalid - Please select a category');
  //   }
  // }

  // ✅ FIX: Helper method to safely get selected category
  getSelectedCategory(): Datum | null {
    return this.homeForm.get('category')?.value ?? null;
  }

  // ✅ FIX: Helper method to check if category is selected
  isCategorySelected(): boolean {
    return !!this.getSelectedCategory();
  }
}