package com.cotek.backend.controllers;

import com.cotek.backend.entities.Notification;
import com.cotek.backend.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/getAllNotifs")
    public List<Notification> getAllNotifs(){
        return notificationService.getAllNotifications();
    }

    @GetMapping("/getNotifById/{id}")
    public ResponseEntity<Notification> getNotifById(@PathVariable Long id){
        return notificationService.getNotificationById(id);
    }

    @PostMapping("/saveNotif")
    public ResponseEntity<Notification> saveNotif(@RequestBody Notification n){
        return notificationService.saveNotification(n);
    }
}
