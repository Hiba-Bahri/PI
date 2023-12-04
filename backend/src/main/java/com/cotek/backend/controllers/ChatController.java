package com.cotek.backend.controllers;

import com.cotek.backend.entities.ChatMessage;
import com.cotek.backend.repositories.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @PostMapping("/send")
    public void sendMessage(@RequestBody ChatMessage chatMessage) {
        // Log the received message to the console for debugging
        System.out.println("Received Message: " + chatMessage);

        // Save the message to the database
        chatMessageRepository.save(chatMessage);
    }

    @GetMapping("/history")
    public List<ChatMessage> getChatHistory(@RequestParam String sender, @RequestParam String recipient) {
        // Retrieve chat history between sender and recipient
        return chatMessageRepository.findBySenderAndRecipient(sender, recipient);
    }
}
