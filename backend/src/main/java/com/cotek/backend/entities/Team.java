package com.cotek.backend.entities;

import java.util.ArrayList;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",nullable = false, columnDefinition = "VARCHAR(20)")
    private String name;

    @OneToMany(mappedBy = "team")
    private ArrayList<Member> members = new ArrayList<>();

}