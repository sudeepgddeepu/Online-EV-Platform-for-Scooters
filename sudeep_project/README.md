# Electroride - Online EV Showroom Platform

A full-stack web application for an electric vehicle showroom that allows users to browse, book, and provide feedback for electric vehicles.

## Features

- **Homepage**: Showcase of electric vehicles and company information
- **Gallery**: Display of available EV models with pricing
- **Contact Form**: User inquiries and communication
- **Feedback System**: Customer feedback collection
- **Booking System**: Online EV booking with MongoDB integration
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Express.js (Static file serving)

### Backend
- Node.js
- Express.js
- MongoDB (Database)
- Mongoose (ODM)

## Project Structure

```
sudeep_project/
├── frontend/
│   ├── src/
│   │   ├── index.html
│   │   ├── gallery.html
│   │   ├── contact-form.html
│   │   ├── feedback.html
│   │   ├── book-now.html
│   │   └── images/
│   ├── public/
│   └── server.js
├── backend/
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sudeep_project
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/electroride
PORT=5000
```

## Running the Application

1. Start MongoDB:
```bash
# Make sure MongoDB is installed and running
mongod
```

2. Start the backend server:
```bash
cd backend
npm start
```

3. Start the frontend server:
```bash
cd frontend
npm start
```

4. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Contact Form
- POST `/api/contact` - Submit contact form
- GET `/api/contact` - Get all contact submissions

### Feedback
- POST `/api/feedback` - Submit feedback
- GET `/api/feedback` - Get all feedback submissions

### Bookings
- POST `/api/bookings` - Create new booking
- GET `/api/bookings` - Get all bookings
- GET `/api/bookings/:id` - Get specific booking

### Health Check
- GET `/api/health` - Check API and database status

## Features in Detail

### Contact Form
- Name, email, phone validation
- Message submission
- MongoDB storage
- Success/error notifications

### Feedback System
- Customer experience rating
- Vehicle model feedback
- Improvement suggestions
- MongoDB storage

### Booking System
- Vehicle model selection
- Date and time booking
- Payment method selection
- Booking confirmation
- MongoDB storage

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please contact:
- Email: evelectroride@gmail.com
- Phone: +91 123 456 7890
- Website: electroride.com

## Acknowledgments

- Ola Electric for EV models
- MongoDB for database
- Express.js team for the framework
- All contributors and supporters 