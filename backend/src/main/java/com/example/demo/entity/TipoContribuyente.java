package com.example.demo.entity;

import javax.persistence.*;

@Entity
@Table( name = "tb_tipo_contribuyente")
public class TipoContribuyente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_contribuyente")
    private int id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "estado", nullable = false)
    private Boolean estado;

    public int getId() {
        return id;
    }

    public void setId(int idTipoContribuyente) {
        this.id = idTipoContribuyente;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean getEstado() {
        return estado;
    }

    public void setEstado(Boolean estado) {
        this.estado = estado;
    }
}
