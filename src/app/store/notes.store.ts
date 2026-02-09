import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note.model';



@Injectable({ providedIn: 'root' })
export class NotesStore {

  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();

  constructor(private notesService: NotesService) {}

  // Load all notes
  loadNotes(): void {
    this.notesService.getNotes().subscribe(notes => {
      this.notesSubject.next(notes);
    });
  }

  // Add note
  addNote(text: string): void {
    const newNote = { text, completed: false };

    this.notesService.addNote(newNote).subscribe(created => {
      const current = this.notesSubject.value;
      this.notesSubject.next([...current, created]);
    });
  }

  // Delete note
  deleteNote(id: string): void {
    this.notesService.deleteNote(id).subscribe(() => {
      const filtered = this.notesSubject.value.filter(n => n.id !== id);
      this.notesSubject.next(filtered);
    });
  }

  // Toggle completed
  toggleCompleted(note: Note): void {
  const patch = { completed: !note.completed };

  this.notesService.updateNote(note.id, patch).subscribe(updated => {
    const mapped = this.notesSubject.value.map(n =>
      n.id === updated.id ? updated : n
    );
    this.notesSubject.next(mapped);
  });
}


  // Update text
  updateText(note: Note, text: string): void {
  const patch = { text };

  this.notesService.updateNote(note.id, patch).subscribe(updated => {
    const mapped = this.notesSubject.value.map(n =>
      n.id === updated.id ? updated : n
    );
    this.notesSubject.next(mapped);
  });
}

}
