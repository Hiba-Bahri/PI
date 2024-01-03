package com.cotek.backend.controllers;

import com.cotek.backend.entities.Project;
import com.cotek.backend.entities.Team;
import com.cotek.backend.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/getAllProjects")
    public List<Project> getAllProjects(){
        return projectService.getAllProjects();
    }

    @GetMapping("/getProjectById/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id){
        return projectService.getProjectById(id);
    }

    @PostMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestBody Project p){
        return projectService.createProject(p);
    }

    @PutMapping("/updateProject/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project editedProject){
        return projectService.updateProject(id,editedProject);
    }

    @DeleteMapping("/deleteProject/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable Long id){
        return projectService.deleteProject(id);
    }

    @PutMapping("/updateProjectTeam/{id}")
    public ResponseEntity<Project> updateProjectTeam(@PathVariable Long id, @RequestBody Team teamid){
        return projectService.updateProjectTeam(id, teamid);
    }

    @GetMapping("/getProjectByOwner/{ownerId}")
    public ResponseEntity<Project> getProjectByOwner(@PathVariable Long ownerId) {
        Project project = projectService.getProjectByOwner(ownerId);
        if (project != null) {
            return ResponseEntity.ok(project);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/project-by-manager/{login}")
    public Project getProjectByProjectManager(@PathVariable String login) {
        return projectService.getProjectByProjectManagerLogin(login);
    }

    @PutMapping("/updateMethodolgy/{id}")
    public ResponseEntity<Project> updateMethodology(@PathVariable Long id, @RequestBody String method){
        System.out.println("Received id: " + id);
        System.out.println("Received methodology: " + method);
        return projectService.updateWorkMethodology(id,method);
    }
}
