
const Booth = require("../models/booth");

// Add a new booth
const createBooth = async (req, res) => {
    try {
        const {
            boothName,
            boothNumber,
            description,
            location,
            price,
            status
        } = req.body;

        const booth = await Booth.create({
            boothName,
            boothNumber,
            description,
            location,
            price,
            status
        });

        res.status(201).json({
            message: "Booth created successfully",
            booth
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create booth",
            error: error.message
        });
    }
};

// Get all booths
const getAllBooths = async (req, res) => {
    try {
        const booths = await Booth.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: booths.length,
            booths
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch booths",
            error: error.message
        });
    }
};

// Get one booth
const getBoothById = async (req, res) => {
    try {
        const booth = await Booth.findById(req.params.id);

        if (!booth) {
            return res.status(404).json({
                message: "Booth not found"
            });
        }

        res.status(200).json(booth);
    } catch (error) {
        res.status(400).json({
            message: "Failed to fetch booth",
            error: error.message
        });
    }
};

// Update a booth
const updateBooth = async (req, res) => {
    try {
        const booth = await Booth.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                
                 returnDocument: "after",
               runValidators: true
}
            
        );

        if (!booth) {
            return res.status(404).json({
                message: "Booth not found"
            });
        }

        res.status(200).json({
            message: "Booth updated successfully",
            booth
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update booth",
            error: error.message
        });
    }
};

// Delete a booth
const deleteBooth = async (req, res) => {
    try {
        const booth = await Booth.findByIdAndDelete(req.params.id);

        if (!booth) {
            return res.status(404).json({
                message: "Booth not found"
            });
       }

        res.status(200).json({
            message: "Booth deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to delete booth",
            error: error.message
        });
    }
};

// Export all controller functions
module.exports = {
    createBooth,
    getAllBooths,
    getBoothById,
    updateBooth,
    deleteBooth
};