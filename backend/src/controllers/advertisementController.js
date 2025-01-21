const { models } = require("../models/index");
const Advertisement = models.Advertisement;

exports.getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.findAll();
    res.json(advertisements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdvertisementById = async (req, res) => {
  try {
    const advertisement = await Advertisement.findByPk(req.params.id, {
      include: "company",
    });
    if (!advertisement) {
      return res.status(404).json({ message: "Advertisement not found" });
    }
    res.json(advertisement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAdvertisement = async (req, res) => {
  try {
    const advertisement = await Advertisement.create(req.body);
    res.status(201).json(advertisement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAdvertisement = async (req, res) => {
  try {
    const [updated] = await Advertisement.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    res.json({ message: "Advertisement updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdvertisement = async (req, res) => {
  try {
    const deleted = await Advertisement.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    res.json({ message: "Advertisement deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
