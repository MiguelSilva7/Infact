const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.get("/", companyController.getAllCompanies);
router.get("/:id", companyController.getCompanyById);
router.post("/", companyController.createCompany);
router.put("/:id", companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

module.exports = router;
