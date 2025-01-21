const { models } = require("../models/index");
const Person = models.Person;

exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findByPk(req.params.id);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    return res.status(201).json(person);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const [updated] = await Person.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updated) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json({ message: "Person updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const deleted = await Person.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.json({ message: "Person deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPersonByEmail = async (req, res) => {
  try {
    const person = await Person.findOne({
      where: { email: req.params.email },
    });

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }
    return res.status(200).json(person);
  } catch (error) {
    return res.status(500).json({ message: "Internal error" });
  }
};
