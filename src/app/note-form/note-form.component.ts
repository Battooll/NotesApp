import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css'
})
export class NoteFormComponent {
  @Output() add = new EventEmitter<string>();
  newNote = '';

  submit() {
    if (!this.newNote.trim()) return;
    this.add.emit(this.newNote.trim());
    this.newNote = '';
  }
}
