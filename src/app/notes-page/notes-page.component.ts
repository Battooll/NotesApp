import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteItemComponent } from '../note-item/note-item.component';
import { NoteFormComponent } from '../note-form/note-form.component';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';
import { FilterBarComponent } from "../../../dist/src/app/filter-bar/filter-bar.component";

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [CommonModule, NoteItemComponent, NoteFormComponent, FilterBarComponent],
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit {
    title = 'My Notes App';

  notes: Note[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  editingId: string | null = null;
  editedText = '';

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.noteService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.filteredNotes;
    });
  }

  addNote(text: string): void {
    this.noteService.addNote({ text }).subscribe(() => this.loadNotes());
  }

  removeNote(id: string): void {
    this.noteService.deleteNote(id).subscribe(() => this.loadNotes());
  }

  toggleCompleted(id: string): void {
    const note = this.notes.find(n => n.id === id);
    if (!note) return;

    this.noteService
      .updateNote(id, { completed: !note.completed })
      .subscribe(() => this.loadNotes());
  }

  
startEdit(id: string): void {
  const note = this.notes.find(n => n.id === id);
  if (!note) return;

  this.editingId = id;
  this.editedText = note.text;
}

  saveEdit(data: { id: string; text: string }): void {
    this.noteService.updateNote(data.id, { text: data.text })
      .subscribe(() => {
        this.editingId = null;
        this.loadNotes();
      });
  }

  cancelEdit(): void {
    this.editingId = null;
  }


  get filteredNotes(): Note[] {
  if (this.filter === 'active') {
    return this.notes.filter(n => !n.completed);
  }

  if (this.filter === 'completed') {
    return this.notes.filter(n => n.completed);
  }

  return this.notes;
}
setFilter(filter: 'all' | 'active' | 'completed') {
  this.filter = filter;
}

}
