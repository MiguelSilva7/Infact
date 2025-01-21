const { models } = require("../models/index");
const Company = models.Company;

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id, {
      include: "advertisement",
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const [updated] = await Company.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
