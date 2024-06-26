package com.cotek.backend.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import com.cotek.backend.entities.Team;
import com.cotek.backend.services.TeamService;

@RestController
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping("/getAllTeams")
    public List<Team> getAllTeams(){
        return teamService.getAllTeams();
    }

    @PostMapping("/createTeam")
    public ResponseEntity<Team> addTeam(@RequestBody Team team){
        return teamService.createTeam(team);
    }

    @DeleteMapping("/archiveTeam/{id}")
    public ResponseEntity<String> archiveTeam(@PathVariable Long id){
        return teamService.archiveTeam(id);
    }

    @GetMapping("/getTeamById/{id}")
    public ResponseEntity<Team> getTeamById(@PathVariable Long id){return teamService.getTeamById(id);}
}

