package com.buzzbuy.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String password;
    @Column(unique = true, nullable = false)
    private String email;
    private String role;
    private String mobile;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Rating> ratings = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Address> address = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    private LocalDateTime createdAt;

    // Correct placement of annotations
    @Embedded
    @ElementCollection
    @CollectionTable(
            name = "payment_information",
            joinColumns = @JoinColumn(name = "user_id")
    )
    private List<PaymentInformation> paymentInformation = new ArrayList<>();

    public User() {}

    public User(Long id, String firstName, String lastName, String password, String email, String role, String mobile,
                List<Rating> ratings, List<Address> address, List<Review> reviews,
                LocalDateTime createdAt, List<PaymentInformation> paymentInformation) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.role = role;
        this.mobile = mobile;
        this.ratings = ratings;
        this.address = address;
        this.reviews = reviews;
        this.createdAt = createdAt;
        this.paymentInformation = paymentInformation;
    }

    // Getters and Setters
    // ----------------------------------

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }

    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }

    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }

    public String getMobile() { return mobile; }

    public void setMobile(String mobile) { this.mobile = mobile; }

    public List<Rating> getRatings() { return ratings; }

    public void setRatings(List<Rating> ratings) { this.ratings = ratings; }

    public List<Address> getAddress() { return address; }

    public void setAddress(List<Address> address) { this.address = address; }

    public List<Review> getReviews() { return reviews; }

    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<PaymentInformation> getPaymentInformation() { return paymentInformation; }

    public void setPaymentInformation(List<PaymentInformation> paymentInformation) {
        this.paymentInformation = paymentInformation;
    }
}
