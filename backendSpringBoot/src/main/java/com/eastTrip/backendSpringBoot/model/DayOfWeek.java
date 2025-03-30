package com.eastTrip.backendSpringBoot.model;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public enum DayOfWeek {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY;

    private static final DateTimeFormatter FORMATTER= DateTimeFormatter.ofPattern("MM-dd-yyyy");

    public static DayOfWeek getDayOfWeek(String day) {
        LocalDate date = LocalDate.parse(day, FORMATTER);
        return DayOfWeek.valueOf(date.getDayOfWeek().name());
    }


    }


