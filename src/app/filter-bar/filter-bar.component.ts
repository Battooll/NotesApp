import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Input() filter: 'all' | 'active' | 'completed' = 'all';
  @Output() changeFilter = new EventEmitter<'all' | 'active' | 'completed'>();

  setFilter(value: 'all' | 'active' | 'completed') {
    this.changeFilter.emit(value);
  }
}
