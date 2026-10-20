
const express = require("express");
const Application = require("../Model/ApplicationModel");

const router = express.Router();

// Exhibitor submits an application
router.post("/", async (req, res) => {
    try {
        const {
            exhibitorEmail,
            companyName,
            expoName,
            products,
            description,
            staffCount,
            boothPreference
        } = req.body;

        if (
            !exhibitorEmail ||
            !companyName ||
            !expoName ||
            !products ||
            !description ||
            !staffCount ||
            !boothPreference
        ) {
            return res.status(400).json({
                message: "Please complete all required fields."
            });
        }

        const application = await Application.create({
            exhibitorEmail: exhibitorEmail.trim().toLowerCase(),
            companyName: companyName.trim(),
            expoName,
            products: products.trim(),
            description: description.trim(),
            staffCount: Number(staffCount),
            boothPreference,
            status: "Pending"
        });

        return res.status(201).json({
            message: "Application submitted successfully. Waiting for admin approval.",
            application
        });
    } catch (error) {
        console.error("Submit application error:", error);

        return res.status(500).json({
            message: "Application could not be submitted.",
            error: error.message
        });
    }
});

// Exhibitor sees their own applications
router.get("/my", async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(400).json({
                message: "Exhibitor email is required."
            });
        }

        const applications = await Application.find({
            exhibitorEmail: email.trim().toLowerCase()
        }).sort({ createdAt: -1 });

        return res.json(applications);
    } catch (error) {
        console.error("Load applications error:", error);

        return res.status(500).json({
            message: "Applications could not be loaded."
        });
    }
});

// Admin sees all applications
router.get("/all", async (req, res) => {
    try {
        const applications = await Application.find()
            .sort({ createdAt: -1 });

        return res.json(applications);
    } catch (error) {
        console.error("Load all applications error:", error);

        return res.status(500).json({
            message: "Applications could not be loaded."
        });
    }
});

// Admin approves or rejects an application
router.patch("/:id/status", async (req, res) => {
    try {
        const { status, adminRemarks } = req.body;

        if (!["Pending", "Approved", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Pending, Approved or Rejected."
            });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    status,
                    adminRemarks: adminRemarks || ""
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!application) {
            return res.status(404).json({
                message: "Application not found."
            });
        }

        return res.json({
            message: `Application ${status.toLowerCase()} successfully.`,
            application
        });
    } catch (error) {
        console.error("Update application status error:", error);

        return res.status(500).json({
            message: "Application status could not be updated."
        });
    }
});

module.exports = router;
