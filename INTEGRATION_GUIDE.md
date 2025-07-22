# CareSync - Spring Boot Integration Guide

## 🎯 Overview
Your frontend is now fully integrated to work with a Spring Boot backend. All appointment data will be stored permanently in your SQL database.

## 🚀 What's Been Implemented

### Frontend Changes:
1. **API Service Layer** (`src/services/api.js`)
   - Centralized API calls with axios interceptors
   - Automatic token management
   - Error handling with fallback to localStorage

2. **Enhanced Appointments Hook** (`src/hooks/useAppointments.js`)
   - Fetches appointments from Spring Boot API
   - Creates appointments via API with SQL storage
   - Deletes appointments from database
   - Fallback to localStorage if API is unavailable

3. **Updated Components**
   - Loading states during API calls
   - Error handling with user feedback
   - Optimistic UI updates

### API Endpoints Your Spring Boot App Needs:

#### 1. **GET** `/api/appointments?userId={userId}`
- Returns all appointments for a specific user
- **Response:** Array of appointment objects

#### 2. **POST** `/api/appointments`
- Creates a new appointment in database
- **Request Body:**
```json
{
  "date": "2024-07-25",
  "time": "10:00",
  "doctor": "Dr. Smith",
  "reason": "Checkup",
  "userId": "user@email.com",
  "createdAt": "2024-07-25T10:00:00.000Z"
}
```
- **Response:** Created appointment object with database ID

#### 3. **DELETE** `/api/appointments/{id}`
- Deletes an appointment by ID
- **Response:** 204 No Content

## 🗄️ Database Schema
```sql
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
```

## 🔧 Spring Boot Setup Required

### 1. Add Dependencies (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

### 2. Application Properties
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/caresync_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# CORS Configuration
cors.allowed-origins=http://localhost:3000
```

### 3. Enable CORS
```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 🔄 How It Works

### Data Flow:
1. **Login** → User authenticates → JWT token stored
2. **Load Appointments** → API call with userId → Database query → Display appointments
3. **Add Appointment** → Form submission → API call → Database insert → UI update
4. **Delete Appointment** → Delete button → API call → Database delete → UI update

### Fallback Mechanism:
- If Spring Boot server is unavailable, data falls back to localStorage
- Users can still use the app offline
- When server comes back online, they can sync their data

## 🎯 Key Features

### ✅ **Persistent Storage**
- All appointments saved in SQL database
- Data survives browser refresh and app restarts
- User-specific data separation

### ✅ **Real-time Updates**
- Dashboard shows actual upcoming appointments
- Changes reflect immediately across components

### ✅ **Error Handling**
- Network error recovery
- User-friendly error messages
- Graceful degradation to localStorage

### ✅ **Loading States**
- Visual feedback during API calls
- Disabled forms during submission
- Professional user experience

## 🚦 Testing Your Integration

### 1. Start Spring Boot Application
```bash
./mvnw spring-boot:run
```

### 2. Start React Application
```bash
npm start
```

### 3. Test Flow:
1. Register/Login a user
2. Go to Appointments page
3. Add an appointment → Check database
4. Refresh page → Appointments should persist
5. Login as different user → Should see separate appointments

## 🔧 Troubleshooting

### CORS Issues:
- Ensure CORS is properly configured in Spring Boot
- Check browser console for CORS errors

### Database Connection:
- Verify MySQL is running
- Check database credentials in application.properties
- Ensure database exists

### API Endpoints:
- Test endpoints with Postman
- Check Spring Boot logs for errors
- Verify endpoint URLs match frontend calls

## 📁 File Structure
```
src/
├── hooks/
│   ├── useAuth.js          # Authentication hook
│   └── useAppointments.js  # Appointments management
├── services/
│   └── api.js              # Centralized API calls
├── pages/
│   ├── Login.jsx           # Updated with API integration
│   ├── Register.jsx        # Updated with API integration
│   └── Appointments.jsx    # Full CRUD with API calls
└── context/
    └── AuthContext.jsx     # User authentication context
```

Your appointments are now permanently stored in your Spring Boot SQL database! 🎉
