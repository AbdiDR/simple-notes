import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NoteService } from './services/note.service';
import { Note } from './models/note';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  notes: Note[] = [];
  newTitle = '';
  newContent = '';

  constructor(
    private noteService: NoteService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    this.noteService.getAllNotes().subscribe({
      next: data => {
        this.notes = data;
        this.cd.detectChanges();
      },
      error: err => {
        this.notes = [];
        this.cd.detectChanges();
      }
    })
  }

  addNote() {
    if (!this.newTitle.trim() || !this.newContent.trim()) {
      alert('Judul dan isi tidak boleh kosong.');
      return;
    }

    this.noteService.addNote(this.newTitle, this.newContent).subscribe(() => {
      this.newTitle = '';
      this.newContent = '';
      this.loadNotes();
    });
  }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe(() => this.loadNotes());
  }
}
