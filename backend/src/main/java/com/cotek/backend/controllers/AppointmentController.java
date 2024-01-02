package com.cotek.backend.controllers;

import com.cotek.backend.entities.Appointment;
import com.cotek.backend.services.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/getAllAppointments")
    public List<Appointment> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }

    @PostMapping("/createAppointment")
    public ResponseEntity<Appointment> saveAppointment(@RequestBody Appointment appointment) {
        return appointmentService.saveAppointment(appointment);
    }

    @PostMapping("/appointment/{id}/accept")
    public ResponseEntity<Appointment> acceptAppointment(@PathVariable Long id) {
        return appointmentService.acceptAppointment(id);
    }

    @PostMapping("/appointment/{id}/reject")
    public ResponseEntity<Appointment> rejectAppointment(@PathVariable Long id) {
        return appointmentService.rejectAppointment(id);
    }

}


