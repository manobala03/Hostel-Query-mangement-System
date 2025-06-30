package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.feedback;
@Repository
public interface feedbackRepository extends JpaRepository<feedback, Long>{
    
}
  