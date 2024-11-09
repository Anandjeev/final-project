Rent-a-Spot Parking System
Overview
The Rent-a-Spot application is a comprehensive solution for managing parking space reservations. It allows users to request a parking slot, which the owner must approve before confirming the reservation. The app collects car details and charges a parking fee upon booking confirmation.

Features
Slot Request & Approval: Users submit requests with car details, which the owner reviews. Slots are only allocated after owner approval.
Car Details Collection: Collects essential car information (model, license plate, color) for booking verification.
Parking Fee Management: Calculates a fee based on parking duration, requiring payment upon owner approval.
Frontend and Backend Integration: Seamless connection between the frontend user interface and backend APIs.
Development Builds and Auto-Restart: The backend uses nodemon for monitoring code changes, while the frontend runs on a development server with webpack.
Project Structure
Backend: Manages API requests for slot allocation, approval, fee processing, and car details.
Frontend: User interface for making booking requests and viewing status updates, running on a development server.

Installation
Clone the repository:bash
git clone https://github.com/anandjeeva/rent-a-spot.git
Navigate to each directory (Backend and Frontend) and install dependencies:
cd rent-lot-parking/Rent-a-Spot/Backend
npm install
cd ../Frontend/rent_spot_frontend
npm install
Running the Backend
Start the backend server:
npm start
The backend runs with nodemon and will restart automatically upon code changes.
Running the Frontend
Start the frontend development server:
npm start
View the app in the browser:
Local: http://localhost:3000
Network: http://192.168.167.159:3000
To create a production build:
npm run build
Technologies Used
Frontend: React, Webpack
Backend: Node.js, Express, nodemon
Database: MongoDB
Future Enhancements
Notifications for slot availability and request approval.
Advanced pricing options based on location or peak hours.
Mobile app integration.
