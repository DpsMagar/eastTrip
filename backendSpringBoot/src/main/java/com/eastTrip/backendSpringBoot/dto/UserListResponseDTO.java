package com.eastTrip.backendSpringBoot.dto;

import com.eastTrip.backendSpringBoot.dto.UserDTO;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserListResponseDTO {
    private List<UserDTO> users;
    private long totalCount;
}
