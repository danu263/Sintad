package com.example.demo.security.entity;

import com.example.demo.security.enums.RolNombre;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "tb_rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol", nullable = false)
    private int id;

    @NotNull
    @Column(name = "nombre", unique = true)
    @Enumerated(EnumType.STRING)
    private RolNombre rolNombre;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public RolNombre getRolNombre() {
        return rolNombre;
    }

    public void setRolNombre(RolNombre nombre) {
        this.rolNombre = nombre;
    }
}
