/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.animal;

/**
 *
 * @author aluno
 */
public class Cachorro extends Animal{
     @Override
     public void fazersom(){
        System.out.println("O cachorro late");
    }
        public static void main(String[] args) {
        Cachorro cachorro = new Cachorro();
       cachorro.fazersom();
    }
    
}
