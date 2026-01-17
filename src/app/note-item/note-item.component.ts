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
  @Input() note!: Note;
  @Input() index!: number;
  @Input() editingIndex: number | null = null;

  @Output() delete = new EventEmitter<number>();
  @Output() editStart = new EventEmitter<number>();
  @Output() save = new EventEmitter<{ index: number; text: string }>();
  @Output() cancel = new EventEmitter<void>();
  @Output() toggle = new EventEmitter<number>();

  editedText = '';

  startEdit() {
    this.editedText = this.note.text;
    this.editStart.emit(this.index);
  }

  saveEdit() {
  if (!this.editedText.trim()) return;
  this.save.emit({ index: this.index, text: this.editedText });
}

  toggleCompleted() {
    this.toggle.emit(this.index);
  }

  deleteNote() {
    this.delete.emit(this.index);
  }

  cancelEdit() {
  this.editedText = '';
  this.cancel.emit();
}
}
