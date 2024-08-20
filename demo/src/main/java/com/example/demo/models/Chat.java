package com.example.demo.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.awt.*;

@Setter
@Getter
@Entity
public class Chat {
    private String mensagem;
    private String nome;
    private TrayIcon.MessageType type;

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer id;
}
