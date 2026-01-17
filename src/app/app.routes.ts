import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotesPageComponent } from './notes-page/notes-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NotesPageComponent },
  { path: 'about', component: AboutComponent },
];
