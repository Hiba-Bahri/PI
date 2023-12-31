package com.cotek.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper=false)
@Entity(name = "Client")
@PrimaryKeyJoinColumn(name = "client_id")
public class Client extends User {

    @Column(name = "tel", columnDefinition = "VARCHAR(8)",nullable = false)
    private String tel;

    @OneToOne(mappedBy = "owner")
    @JsonIgnoreProperties("owner")
    private Project ownedProject;
}
