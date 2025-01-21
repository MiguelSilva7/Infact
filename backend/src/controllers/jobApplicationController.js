const { models } = require("../models/index");
const JobApplication = models.JobApplication;

exports.getAllJobApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.findAll();
    res.json(jobApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobApplicationById = async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByPk(req.params.id, {
      include: ["advertisement", "user", "person"],
    });
    if (!jobApplication) {
      return res.status(404).json({ message: "Job application not found" });
    }
    res.json(jobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createJobApplication = async (req, res) => {
  try {
    const jobApplication = await JobApplication.create(req.body);
    res.status(201).json(jobApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJobApplication = async (req, res) => {
  try {
    const [updated] = await JobApplication.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Job application not found" });
    }

    res.json({ message: "Job application updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJobApplication = async (req, res) => {
  try {
    const deleted = await JobApplication.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Job application not found" });
    }

    res.json({ message: "Job application deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkIfPersonAlreadyApplied = async (req, res) => {
  const { advId, personId } = req.params;

  try {
    const application = await JobApplication.findOne({
      where: {
        advertisement_id: advId,
        person_id: personId,
      },
    });

    if (!application) {
      return res.status(200).json(false);
    }

    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

exports.checkIfUserAlreadyApplied = async (req, res) => {
  const { advId, userId } = req.params;

  try {
    const application = await JobApplication.findOne({
      where: {
        advertisement_id: advId,
        user_id: userId,
      },
    });

    if (!application) {
      return res.status(200).json(false);
    }

    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};
