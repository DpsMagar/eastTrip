    package com.eastTrip.backendSpringBoot.model;


    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.ArrayList;
    import java.util.HashSet;
    import java.util.List;
    import java.util.Set;

    @Entity
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class HotelRooms {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String roomFeatures;

        @ManyToMany(mappedBy = "roomFeatures")
        private List<Hotel> hotels=new ArrayList<>();


    }
