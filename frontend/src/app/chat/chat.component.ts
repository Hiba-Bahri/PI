import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../chat-message.model';
import { forkJoin } from 'rxjs';
import { EmojiData } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  recipient: string = ''; 
    
  contacts: { name: string; status: string }[] = [];

    selectedContact!: string;

    selectContact(contact: any): void {
      this.selectedContact = contact.name;
      this.recipient = this.selectedContact; // Set dynamically based on the selected contact
      console.log(this.selectedContact);
      this.loadChatHistory(); // Load chat history for the selected contact
    }

  sender:string = localStorage.getItem("user") ?? ''; // Set dynamically based on logged-in user
  message: string = '';
  chatHistory: ChatMessage[] = [];
  http: HttpClient;

  constructor(private chatService: ChatService, http:HttpClient) {
    this.http = http;
  }

  clientId: number | null = null;

  ngOnInit(): void {
    this.loadChatHistory();
    const userId = localStorage.getItem("userId");

  if (userId !== null) {
    this.clientId = parseInt(userId, 10); // Parse as base 10
  }

    if(localStorage.getItem('userRole')==='client'){
      this.http.get<any>(`http://localhost:8080/getProjectByOwner/${this.clientId}`).subscribe((result)=>{
        console.log(result)

        // Assuming 'team' is an array of team members
    const teamMembers = result.team?.members || [];

    // Filter team members with the role 'project manager'
    const projectManagers = teamMembers.filter((member: any) => member.role === 'project manager');

    // Add project managers to the contacts array
    projectManagers.forEach((projectManager: any) => {
      const contactExists = this.contacts.some(contact => contact.name === projectManager.login);
      if (!contactExists) {
        this.contacts.push({ name: projectManager.login, status: 'online' });
      }
    });

      })
    }else if (localStorage.getItem('userRole') === 'project manager') {
      const projectManagerId = localStorage.getItem('user');
    
      if (projectManagerId) {
        this.http.get<any>(`http://localhost:8080/project-by-manager/${projectManagerId}`).subscribe((project) => {
          console.log(project);
    
          // Check if the 'owner' property exists and is not null
          if (project.owner && project.owner.login) {
            const ownerLogin = project.owner.login;
    
            // Check if owner's login is not already in the contacts array
            if (!this.contacts.some(contact => contact.name === ownerLogin)) {
              this.contacts.push({ name: ownerLogin, status: 'online' });
            }
          }
        });
      }
    }
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
