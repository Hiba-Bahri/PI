package com.cotek.backend.services;


import com.cotek.backend.entities.Appointment;
import com.cotek.backend.repositories.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    @Autowired
    private EmailService emailService;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public ResponseEntity<Appointment> saveAppointment(Appointment appointment) {
       Appointment createdAppointment = appointmentRepository.save(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
    }

    public ResponseEntity<Appointment> acceptAppointment(Long appointmentId) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus("accepted");
            appointmentRepository.save(appointment);
            /*emailService.sendMail(appointment.getEmail(),
                    "Cotek appointment",
                    "Your appointment is accepted. We will have a meeting with you on "+appointment.getAppointmentDate()+" at "+ appointment.getAppointmentTime()+"\n Be in time \n Cordially.");*/
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<Appointment> rejectAppointment(Long appointmentId) {
        Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus("rejected");
            appointmentRepository.save(appointment);
            /*emailService.sendMail(appointment.getEmail(),
                    "Cotek appointment",
                    "Your appointment is rejected by an administrator \n Thanks for understanding");*/
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
