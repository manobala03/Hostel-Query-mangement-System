package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api")

public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/{id}")
    public ResponseEntity<User>getUserById(@PathVariable("id")Long id){
        Optional<User>user=userRepository.findById(id);
        if(user.isPresent()){
            return new ResponseEntity<>(user.get(),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody User user){
        try {
            User user1=new User(user.getName(),user.getEmail(),user.getPassword(),user.getRole());
            User user2=userRepository.save(user1);
            return new ResponseEntity<>(user2,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>((User)null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id,@RequestBody User user){
        Optional<User>userData=userRepository.findById(id);
        if(userData.isPresent()){
            User _User=userData.get();
            _User.setName(user.getName());
            _User.setEmail(user.getEmail());
            _User.setPassword(user.getPassword());
            _User.setRole(user.getRole());

            return new ResponseEntity<>(userRepository.save(_User),HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/user/{id}")
    public ResponseEntity<User> deleteId(@PathVariable("id")Long id){
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    } 

     @DeleteMapping("/user")
    public ResponseEntity<HttpStatus> deleteAllUser(){
        try {
            userRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

       @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUser(@RequestParam(required = false) String role){
        try {
            List<User> users=new ArrayList<>();
            userRepository.findAll().forEach(users::add);
            return new ResponseEntity<>(users,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<User>)null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/role/{role}")
    public ResponseEntity<List<User>> getUserByRole(@PathVariable String role){
        try {
            List<User>users=userRepository.findByRole(role.toUpperCase());
            return new ResponseEntity<>(users,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<User>)null,HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



}
