package com.example.demo.model;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Querys")
public class Query {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;

  @Column(name="StudentName",nullable=false)
  private String StudentName;

  @Column(name="roomnumber",nullable=false)
  private String roomnumber;

  @Column(name="querytype",nullable=false)
  private String querytype;

  @Column(name="description",nullable=false)
   private String description;

  @Column(name="status",nullable=false)
  private String status="pending";

  @Column(name="createdat")
  private LocalDateTime createdat=LocalDateTime.now();

    public Query() {
    }
    public Query(String StudentName,String roomnumber,String querytype,String description){
        this.StudentName=StudentName;
        this.roomnumber=roomnumber;
        this.querytype=querytype;
        this.description=description;
    }
    
    public long getId(){
        return id;
    }
    public void setId(long id){
        this.id=id;
    }

    public String getStudentName() {
        return StudentName;
    }

    public void setStudentName(String StudentName) {
        this.StudentName = StudentName;
    }

    public String getRoomnumber() {
        return roomnumber;
    }

    public void setRoomnumber(String roomnumber) {
        this.roomnumber = roomnumber;
    }

    public String getQuerytype() {
        return querytype;
    }

    public void setQuerytype(String querytype) {
        this.querytype = querytype;
    }

    

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedat() {
        return createdat;
    }

    public void setCreatedat(LocalDateTime createdat) {
        this.createdat = createdat;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
