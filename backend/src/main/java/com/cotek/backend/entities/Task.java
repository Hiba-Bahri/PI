package com.cotek.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name="Task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description", columnDefinition = "VARCHAR(255)", nullable = false)
    private String description;

    @Column(name = "progress", columnDefinition = "VARCHAR(20)", nullable = false)
    private String progress;

    @JoinColumn(name = "member_id", nullable = false)
    @ManyToOne
    private Member member;

    @ManyToOne
    @JoinColumn(name="project_id")
    private Project project;
}