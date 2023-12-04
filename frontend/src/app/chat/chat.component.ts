import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../chat-message.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  sender: string = 'User1'; // Set dynamically based on logged-in user
  recipient: string = 'User2'; // Set dynamically based on chat partner
  message: string = '';
  chatHistory: ChatMessage[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadChatHistory();
  }

  loadChatHistory(): void {
    // Use forkJoin to make parallel requests for sent and received messages
    forkJoin([
      this.chatService.getChatHistory(this.sender, this.recipient),
      this.chatService.getChatHistory(this.recipient, this.sender),
    ]).subscribe(([sentMessages, receivedMessages]) => {
      // Merge and sort the messages based on the timestamp
      this.chatHistory = [...sentMessages, ...receivedMessages].sort((a, b) => {
        const timestampA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const timestampB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      
        return timestampA - timestampB;
      });
      
    });
  }
  

  sendMessage(): void {
    const newMessage: ChatMessage = {
      sender: this.sender,
      recipient: this.recipient,
      message: this.message,
    };
    this.chatService.sendMessage(newMessage).subscribe(() => {
      this.loadChatHistory(); // Refresh the chat history after sending a message
      this.message = ''; // Clear the message input field
    });
  }
}
