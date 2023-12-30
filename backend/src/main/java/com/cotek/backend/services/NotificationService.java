package com.cotek.backend.services;

import com.cotek.backend.entities.Notification;
import com.cotek.backend.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;
    public List<Notification> getAllNotifications(){
        return notificationRepository.findAll();
    }

    public ResponseEntity<Notification> getNotificationById(Long id){
        Optional<Notification> notif = notificationRepository.findById(id);
        if(notif.isPresent()){
            return ResponseEntity.ok(notif.get());
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    public ResponseEntity<Notification> saveNotification(Notification n){
        Notification createdNotif = notificationRepository.save(n);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNotif);

    }
}