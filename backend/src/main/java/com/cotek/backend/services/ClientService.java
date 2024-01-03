package com.cotek.backend.services;

import com.cotek.backend.entities.Client;
import com.cotek.backend.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.cotek.backend.services.MemberService.generatePassword;

@Service
public class ClientService {
    @Autowired
    ClientRepository clientRepo;

    @Autowired
    EmailService emailService;

    public List<Client> getAllClients() {
        return clientRepo.findAll();
    }

    public ResponseEntity<Client> createClient(Client c) {
        c.setLogin(c.getFirstName() + '_' + c.getId());
        c.setPassword(generatePassword());

        Client createdClient = clientRepo.save(c);

        createdClient.setLogin(createdClient.getFirstName() + '_' + createdClient.getId());

        clientRepo.save(createdClient);

        emailService.sendMail(
            c.getEmail(),
            "Cotek client login credentials",
                "Congratulations, You are now our client . \n Here are your coordinates. Feel free to login to your account \n Login: "+c.getLogin()+"\n Password : "+c.getPassword()+" \n Cordially."
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(createdClient);
    }
}
