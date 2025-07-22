# CareSync

CareSync is a simple React + Vite web application for managing medical appointments and prescriptions.

## Features

- **Appointments Page:**  
  - View all appointments in a table  
  - Add new appointments with date, time, doctor selection (from dropdown), and reason

- **Prescriptions Page:**  
  - View all prescriptions in a table  
  - Add new prescriptions with date, patient name, medicine, dosage, and instructions

- **Doctor Data:**  
  - Doctors are managed via a JSON file and selectable in the appointment form

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/sandeepvashishtha/caresync.git
   cd caresync
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Usage

- Visit `http://localhost:5173` in your browser
- Navigate between Appointments and Prescriptions pages
- Add new entries using the forms

## Project Structure

- `src/pages/Appointments.jsx` — Appointments page component
- `src/pages/Appointments.css` — Styling for appointments
- `src/pages/Prescriptions.jsx` — Prescriptions page component
- `src/pages/Prescriptions.css` — Styling for prescriptions
- `src/data/doctors.json` — Doctor data for dropdown selection

## Customization

- To add or edit doctors, modify `src/data/doctors.json`
- Styling can be adjusted in the respective CSS files

## License

This project is for demo and educational purposes.
