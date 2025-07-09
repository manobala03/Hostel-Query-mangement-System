package com.example.demo.controller;

import com.example.demo.modal.Query;
import com.example.demo.repository.QueryRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class QueryController {

    @Autowired
    private QueryRepository queryRepository;

    // Get query by ID
    @GetMapping("/query/{id}")
    public ResponseEntity<Query> getQueryById(@PathVariable("id") Long id) {
        Optional<Query> query = queryRepository.findById(id);
        return query.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create new query
    @PostMapping("/query")
    public ResponseEntity<Query> createQuery(@RequestBody Query query) {
        try {
            Query newQuery = new Query(query.getStudentName(), query.getRoomNumber(), query.getQueryType(), query.getDescription(), query.getStatus());
            Query savedQuery = queryRepository.save(newQuery);
            return new ResponseEntity<>(savedQuery, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update query
    @PutMapping("/query/{id}")
    public ResponseEntity<Query> updateQuery(@PathVariable("id") Long id, @RequestBody Query query) {
        Optional<Query> queryData = queryRepository.findById(id);
        if (queryData.isPresent()) {
            Query _query = queryData.get();
            _query.setStudentName(query.getStudentName());
            _query.setRoomNumber(query.getRoomNumber());
            _query.setQueryType(query.getQueryType());
            _query.setDescription(query.getDescription());
            _query.setStatus(query.getStatus());

            Query updatedQuery = queryRepository.save(_query);
            return new ResponseEntity<>(updatedQuery, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete query by ID
    @DeleteMapping("/query/{id}")
    public ResponseEntity<HttpStatus> deleteQuery(@PathVariable("id") Long id) {
        try {
            queryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete all queries
    @DeleteMapping("/query")
    public ResponseEntity<HttpStatus> deleteAllQuery() {
        try {
            queryRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all queries or filtered by status
    @GetMapping("/query")
    public ResponseEntity<List<Query>> getAllQuery(@RequestParam(required = false) String status) {
        try {
            List<Query> queries = new ArrayList<>();
            if (status != null) {
                queries = queryRepository.findByStatus(status.toUpperCase());
            } else {
                queryRepository.findAll().forEach(queries::add);
            }
            return new ResponseEntity<>(queries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get queries by status (alternative endpoint)
    @GetMapping("/query/status/{status}")
    public ResponseEntity<List<Query>> getQueryByStatus(@PathVariable String status) {
        try {
            List<Query> queries = queryRepository.findByStatus(status.toUpperCase());
            return new ResponseEntity<>(queries, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
