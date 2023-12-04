package com.cotek.backend.controllers;

import com.cotek.backend.entities.Client;
import com.cotek.backend.services.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClientController {

    @Autowired
    ClientService clientService;

    @GetMapping("/getAllClients")
    public List<Client> getAllClients(){
        return clientService.getAllClients();
    }
}
