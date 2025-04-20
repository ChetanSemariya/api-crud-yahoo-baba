const express = require('express');
const app = express();
const StudentRoutes = require('./routes/students.routes');
const connectDB = require('./config/database')

connectDB(); // jo bhi function ko hum export krenge databaseJs ki file se use yaha call krna compulsory hai

const PORT = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// routes
app.use('/api/students', StudentRoutes); // here StudentRoutes mai jitne bhi routes humne define kiye hai unsbse phle hume /api/students likhna padega jabhi vo route run honge

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


