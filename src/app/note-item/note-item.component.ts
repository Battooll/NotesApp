import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-note-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent {

  @Input() note!: Note;
  @Input() editingId!: string | null;
  @Input() editingText!: string;

  @Output() editStart = new EventEmitter<Note>();
  @Output() editTextChange = new EventEmitter<string>();
  @Output() save = new EventEmitter<Note>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<Note>();

  startEdit() {
    this.editStart.emit(this.note);
  }

  onTextChange(value: string) {
    this.editTextChange.emit(value);
  }

  saveEdit() {
    this.save.emit(this.note);
  }

  deleteNote() {
    this.delete.emit(this.note.id);
  }

  toggleCompleted() {
    this.toggle.emit(this.note);
  }
}
