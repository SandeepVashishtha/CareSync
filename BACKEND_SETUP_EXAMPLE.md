// Example Spring Boot Controller for Appointments API
// You'll need to create this in your Spring Boot application

/*
@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // GET /api/appointments?userId=user@email.com
    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAppointments(
            @RequestParam String userId,
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            // Validate token if needed
            List<AppointmentDTO> appointments = appointmentService.getAppointmentsByUserId(userId);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST /api/appointments
    @PostMapping
    public ResponseEntity<AppointmentDTO> createAppointment(
            @RequestBody AppointmentDTO appointmentData,
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            // Validate token if needed
            AppointmentDTO savedAppointment = appointmentService.createAppointment(appointmentData);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAppointment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // DELETE /api/appointments/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String token) {
        try {
            // Validate token if needed
            appointmentService.deleteAppointment(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

// AppointmentDTO Example
public class AppointmentDTO {
    private Long id;
    private String date;
    private String time;
    private String doctor;
    private String reason;
    private String userId;
    private String createdAt;
    
    // Constructors, getters, and setters
}

// JPA Entity Example
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "appointment_date")
    private String date;
    
    @Column(name = "appointment_time")
    private String time;
    
    @Column(name = "doctor_name")
    private String doctor;
    
    @Column(name = "reason")
    private String reason;
    
    @Column(name = "user_id")
    private String userId;
    
    @Column(name = "created_at")
    private String createdAt;
    
    // Constructors, getters, and setters
}

// SQL Table Structure
CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    appointment_date VARCHAR(255) NOT NULL,
    appointment_time VARCHAR(255) NOT NULL,
    doctor_name VARCHAR(255) NOT NULL,
    reason VARCHAR(500) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    INDEX idx_user_id (user_id)
);
*/
