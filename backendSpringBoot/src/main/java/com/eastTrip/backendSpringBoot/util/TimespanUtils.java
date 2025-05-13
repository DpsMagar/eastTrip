package com.eastTrip.backendSpringBoot.util;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

public class TimespanUtils {

    public static String getTimeSpan(LocalDateTime fromTime) {
        LocalDateTime now = LocalDateTime.now();

        long years = fromTime.until(now, ChronoUnit.YEARS);
        if (years > 0) return years + "y";

        long months = fromTime.until(now, ChronoUnit.MONTHS);
        if (months > 0) return months + "mo";

        long weeks = fromTime.until(now, ChronoUnit.WEEKS);
        if (weeks > 0) return weeks + "w";

        long days = fromTime.until(now, ChronoUnit.DAYS);
        if (days > 0) return days + "d";

        long hours = fromTime.until(now, ChronoUnit.HOURS);
        if (hours > 0) return hours + "h";

        long minutes = fromTime.until(now, ChronoUnit.MINUTES);
        if (minutes > 0) return minutes + "m";

        return "just now";
    }
}
