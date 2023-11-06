package com.cotek.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper=false)
@Entity(name = "Member")
@PrimaryKeyJoinColumn(name = "member_id")
public class Member extends User {

    @Column(name = "profession", columnDefinition = "VARCHAR(50)", nullable = false)
    private String profession;

    @Column(name = "disponibilite", columnDefinition = "VARCHAR(15)",nullable = false)
    private String disponibilite;

    @ManyToOne
    @JsonIgnore
    private Team team;
}
