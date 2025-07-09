package com.example.demo.controller;

import com.example.demo.modal.Feedback;
import com.example.demo.repository.FeedbackRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Get feedback by ID
    @GetMapping("/feedback/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable("id") Long id) {
        Optional<Feedback> feedback = feedbackRepository.findById(id);
        return feedback.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create feedback
    @PostMapping("/feedback")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback newFeedback = new Feedback(feedback.getQueryId(), feedback.getUserId(), feedback.getRating(), feedback.getComment());
            Feedback savedFeedback = feedbackRepository.save(newFeedback);
            return new ResponseEntity<>(savedFeedback, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update feedback
    @PutMapping("/feedback/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable("id") Long id, @RequestBody Feedback feedback) {
        Optional<Feedback> feedbackData = feedbackRepository.findById(id);
        if (feedbackData.isPresent()) {
            Feedback _feedback = feedbackData.get();
            _feedback.setComment(feedback.getComment());
            _feedback.setQueryId(feedback.getQueryId());
            _feedback.setRating(feedback.getRating());
            _feedback.setUserId(feedback.getUserId());

            Feedback updatedFeedback = feedbackRepository.save(_feedback);
            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete feedback by ID
    @DeleteMapping("/feedback/{id}")
    public ResponseEntity<HttpStatus> deleteFeedbackById(@PathVariable("id") Long id) {
        try {
            feedbackRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all feedbacks
    @GetMapping("/feedback")
    public ResponseEntity<Iterable<Feedback>> getAllFeedbacks() {
        try {
            Iterable<Feedback> feedbacks = feedbackRepository.findAll();
            return new ResponseEntity<>(feedbacks, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
