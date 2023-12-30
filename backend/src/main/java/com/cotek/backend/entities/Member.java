package com.cotek.backend.entities;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper=false)
@Entity(name = "Member")
public class Member extends User {

    @Column(name = "occupation", columnDefinition = "VARCHAR(50)", nullable = false)
    private String occupation;

    @Column(name = "disponibility", columnDefinition = "VARCHAR(15)",nullable = false)
    private String disponibility;

    @ManyToOne
    @JsonIgnore
    private Team team;

    @OneToMany(mappedBy = "assignedMember", cascade = CascadeType.ALL)
    private List<Task> tasks = new ArrayList<>();
}
