package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Query;
@Repository

public interface QueryRepository extends JpaRepository<Query, Long> {
    
}
