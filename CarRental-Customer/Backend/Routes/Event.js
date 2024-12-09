const express = require('express');
const router = express.Router();
const Event = require('../Models/Event');
const { protect, admin } = require('../middlewares/Authmidddleware');

// Create an event
router.post('/create', protect, admin, async (req, res) => {
    const { name, description, date, location } = req.body;
    try {
        const event = new Event({ name, description, date, location });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all events
router.get('/', protect, admin, async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an event
router.put('/:id', protect, admin, async (req, res) => {
    const { name, description, date, location } = req.body;
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            event.name = name || event.name;
            event.description = description || event.description;
            event.date = date || event.date;
            event.location = location || event.location;
            await event.save();
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an event
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            await event.remove();
            res.status(200).json({ message: 'Event deleted' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
