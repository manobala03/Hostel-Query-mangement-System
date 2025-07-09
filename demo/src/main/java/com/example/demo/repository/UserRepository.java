package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.modal.User;
@Repository
public interface UserRepository extends JpaRepository<User,Long>{

     Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
    
}
