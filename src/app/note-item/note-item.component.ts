import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {
  @Input() note!: Note;  @Input() id!: string;
  @Input() editingIndex: string | null = null;
  @Input() editedText = '';

  @Output() delete = new EventEmitter<string>();
  @Output() editStart = new EventEmitter<string>();
  @Output() save = new EventEmitter<{ id: string; text: string }>();
  @Output() cancel = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<string>();

  @Output() editTextChange = new EventEmitter<string>();

  onTextChange(value: string) {
    this.editTextChange.emit(value);
  }
  cancelEdit() {
  this.editedText = '';
  this.cancel.emit();
}
  startEdit() {
    this.editStart.emit(this.note.id!);
  }

  saveEdit() {
  this.save.emit({ id: this.note.id!, text: this.editedText });
}

  toggleCompleted() {
  this.toggle.emit(this.note.id!);
}

  deleteNote() {
    if (!this.note.id) return;
    this.delete.emit(this.note.id);
  }
}