package com.cotek.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="Project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", columnDefinition = "VARCHAR(255)", nullable = false)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @JoinColumn(name = "owner", nullable = false)
    @OneToOne
    private Client owner;

    @Column(name = "technologies", columnDefinition = "VARCHAR(255)", nullable = false)
    private String technologies;

    @Column(name = "keywords", columnDefinition = "VARCHAR(255)", nullable = false)
    private String keywords;

    @OneToOne
    private Team team;

    @Column(name = "status")
    private String status;

    @Column(name="methodology")
    private String methodology;

}
