const express = require('express');
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Analytics = require('../Models/Analytics');
const JWT_SECRET = "abababababab";
const { protect, admin } = require('../middlewares/Authmidddleware'); // Middleware to check authentication

//functions to validate email and password 
function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validatePassword(password){
    return password.length >= 8;
        
}

// @desc    Register a new user (Customer or Car Owner)
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please fill all fields.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    try {
        // Check if the email already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }
console.log("wjsjsj");
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salting

        // Create a new user
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role,
        });

        // Save the new user to the database
        await newUser.save();
       
        await Analytics.create({
            activityType: "registration",
            userId: newUser._id,
          });
        // Respond with success message
        res.status(201).json({
            message: 'User registered successfully',
            user: { name: newUser.name, email: newUser.email, role: newUser.role },
            
        });
    

       
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong, please try again.' });
    }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Please fill all fields.' });
//     }

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await user.matchPassword(password);

//         if (!isMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//         }

//         res.status(200).json({ message: 'Login successful', user });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });
//get all users
router.get("/get-all-users", protect, async (req, res) => {
    try {
        console.log("oooof");

      // Fetch all users
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
// Login route
router.post("/login", async (req, res) => {
    const { email, password, role } = req.body;
    console.log("ata h");
    // Validate input
    if (!email || !password || !role) {
        return res.status(400).json({ message: "Please fill all fields." });
    }

    try {
        // Find user by email and role
        const user = await User.findOne({ email, role });
        if (!user) {
            return res.status(401).json({ message: "Invalid email, password, or role." });
        }

        // Compare the password using bcrypt
        const isMatch = await user.matchPassword(password, user.password); // Use bcrypt to compare password
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
 // Log the login activity
 await Analytics.create({
    activityType: "login",
    userId: user._id,
  });
        // Generate JWT token
        const payload = { userId: user._id, email: user.email, role: user.role }; // Include relevant user data
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "3h" });
        console.log("token bn gya g ");
        //res.user = 

        // Send response with token
        return res.status(200).json({ message: "Login successful", token,role});
    } catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

// @desc    Get all users (Admin only)
// @route   GET /api/users/
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Get a single user by id (Admin or user itself)
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.user.id !== req.params.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Update user details
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    console.log("edittt");
    try {
        const { name, email, password, role } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            console.log("ni mila g ");
            return res.status(404).json({ message: 'User not found' });
        }

        // if (req.user.id !== req.params.id && req.user.role !== 'admin') {
        //     return res.status(403).json({ message: 'Access denied' });
        // }

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// @desc    Delete a user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Use deleteOne to remove the user
        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
