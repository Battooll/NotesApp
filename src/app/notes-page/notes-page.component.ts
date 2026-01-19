import { Component } from '@angular/core';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from '../note-item/note-item.component';
import { NoteFormComponent } from '../note-form/note-form.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [
    CommonModule,
    NoteItemComponent,
    NoteFormComponent,
    FilterBarComponent
  ],
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent {
  title = 'My Notes App';

  notes: Note[] = [];
  editingIndex: number | null = null;
  filter: 'all' | 'active' | 'completed' = 'all';

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notes = this.notesService.getNotes();
  }

  get filteredNotes() {
    if (this.filter === 'active') return this.notes.filter(n => !n.completed);
    if (this.filter === 'completed') return this.notes.filter(n => n.completed);
    return this.notes;
  }

  addNote(text: string) {
    this.notes = this.notesService.addNote(text);
  }

  removeNote(index: number) {
    this.notes = this.notesService.deleteNote(index);
  }

  startEdit(index: number) {
    this.editingIndex = index;
  }

  saveEdit(event: { index: number; text: string }) {
    this.notes = this.notesService.updateNote(event.index, event.text.trim());
    this.editingIndex = null;
  }

  cancelEdit() {
    this.editingIndex = null;
  }

  toggleCompleted(index: number) {
    this.notes = this.notesService.toggleCompleted(index);
  }
}
