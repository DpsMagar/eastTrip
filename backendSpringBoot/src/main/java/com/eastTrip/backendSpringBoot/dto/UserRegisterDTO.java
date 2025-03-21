package com.eastTrip.backendSpringBoot.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserRegisterDTO {

    private String fullName;
    private String email;
    private String password;
    private String confirmPassword;

}
