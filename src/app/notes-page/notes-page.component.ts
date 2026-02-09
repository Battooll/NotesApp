import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotesStore } from '../store/notes.store';
import { Note } from '../models/note.model';

import { NoteItemComponent } from '../note-item/note-item.component';
import { NoteFormComponent } from '../note-form/note-form.component';
import { FilterBarComponent } from "../../../dist/src/app/filter-bar/filter-bar.component";

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NoteItemComponent, NoteFormComponent, FilterBarComponent],
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.css']
})
export class NotesPageComponent implements OnInit {

  notes: Note[] = [];
  filter: 'all' | 'active' | 'completed' = 'all';

  editingId: string | null = null;
  editingText = '';

  constructor(private store: NotesStore) {}

  ngOnInit(): void {
    this.store.notes$.subscribe(notes => {
      this.notes = notes;
    });

    this.store.loadNotes();
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
  setFilter(value: 'all' | 'active' | 'completed') {
  this.filter = value;
  }


  addNote(text: string): void {
    if (!text.trim()) return;
    this.store.addNote(text);
  }

  deleteNote(id: string): void {
    this.store.deleteNote(id);
  }

  toggle(note: Note): void {
    this.store.toggleCompleted(note);
  }

  startEdit(note: Note): void {
    this.editingId = note.id;
    this.editingText = note.text;
  }

  saveEdit(note: Note): void {
    if (!this.editingText.trim()) return;

    this.store.updateText(note, this.editingText);
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editingText = '';
  }
}
