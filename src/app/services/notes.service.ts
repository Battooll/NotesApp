import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';


@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private storageKey = 'notes';

  getNotes(): Note[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  saveNotes(notes: Note[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
  }

  addNote(text: string): Note[] {
    const notes = this.getNotes();
    notes.push({ text, completed: false });
    this.saveNotes(notes);
    return notes;
  }

  updateNote(index: number, text: string): Note[] {
    const notes = this.getNotes();
    notes[index].text = text;
    this.saveNotes(notes);
    return notes;
  }

  deleteNote(index: number): Note[] {
    const notes = this.getNotes();
    notes.splice(index, 1);
    this.saveNotes(notes);
    return notes;
  }

  toggleCompleted(index: number): Note[] {
    const notes = this.getNotes();
    notes[index].completed = !notes[index].completed;
    this.saveNotes(notes);
    return notes;
  }
}