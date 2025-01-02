```
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js       # Handles user authentication
│   │   ├── hospitalController.js   # Handles hospital-related logic
│   │   ├── recordController.js     # Handles health records
│   │   └── appointmentController.js# Handles appointment scheduling
│   ├── models/
│   │   ├── User.js                 # User model
│   │   ├── Hospital.js             # Hospital model
│   │   └── Appointment.js          # Appointment model
│   ├── routes/
│   │   ├── authRoutes.js           # Authentication routes
│   │   ├── hospitalRoutes.js       # Hospital-related routes
│   │   ├── recordRoutes.js         # Health records routes
│   │   └── appointmentRoutes.js    # Appointment routes
│   ├── middleware/
│   │   └── authMiddleware.js       # Middleware for authentication
│   ├── utils/
│   │   └── errorHandler.js         # Centralized error handling
│   ├── .env                        # Environment variables
│   ├── server.js                   # Entry point for the backend
│   └── package.json 
```
