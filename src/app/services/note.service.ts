import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private apiUrl = 'http://localhost:8000/simple-notes/api/v1/notes';

  constructor(private http: HttpClient) {}

  getAllNotes(): Observable<Note[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => response.data as Note[])
    );
  }

  addNote(title: string, content: string): Observable<Note> {
    const payload = { title, content };
    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(response => response.data as Note)
    );
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
