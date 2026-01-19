import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent {

  @Output() add = new EventEmitter<string>();

  newNote = new FormControl('');

  submit() {
    const text = this.newNote.value?.trim();
    if (!text) return;

    this.add.emit(text);
    this.newNote.reset();
  }
}
