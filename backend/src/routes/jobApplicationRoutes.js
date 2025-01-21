const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationController");

router.get("/", jobApplicationController.getAllJobApplications);
router.get("/:id", jobApplicationController.getJobApplicationById);
router.get(
  "/check_person/:advId/:personId",
  jobApplicationController.checkIfPersonAlreadyApplied,
);
router.get(
  "/check_user/:advId/:userId",
  jobApplicationController.checkIfUserAlreadyApplied,
);
router.post("/", jobApplicationController.createJobApplication);
router.put("/:id", jobApplicationController.updateJobApplication);
router.delete("/:id", jobApplicationController.deleteJobApplication);

module.exports = router;
