package com.example.demo.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name="feedback")
public class feedback {
    @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;

   @Column(name="queryId",nullable=false)
  private String queryId;

   @Column(name="userid",nullable=false)
  private String userId;

   @Column(name="rating",nullable=false)
  private String rating;

   @Column(name="comment",nullable=false)
  private String comment;

  
  @Column(name="createdat")
  private LocalDateTime createdat=LocalDateTime.now();

  public feedback(){ }

 public feedback(String queryId, String userId, String rating, String comment) {
        this.queryId = queryId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }

    public String getQueryid() {
        return queryId;
    }

    public void setQueryid(String queryId) {
        this.queryId = queryId;
    }

    public LocalDateTime getCreatedat() {
        return createdat;
    }

    public void setCreatedat(LocalDateTime createdat) {
        this.createdat = createdat;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getUserid() {
        return userId;
    }

    public void setUserid(String userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
}
