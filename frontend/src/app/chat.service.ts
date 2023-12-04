import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from './chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:8080/api/chat';
  constructor(private http: HttpClient) { }

  sendMessage(message: ChatMessage): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send`, message);
  }

  getChatHistory(sender: string, recipient: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/history?sender=${sender}&recipient=${recipient}`);
  }
  
}
