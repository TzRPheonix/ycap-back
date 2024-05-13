const City = require('../models/cityModel');

// Méthode pour créer une nouvelle ville
exports.createCity = async (req, res) => {
  try {
    const { CityName, Latitude, Longitude, Reach } = req.body;
    const newCity = await City.create({
      CityName,
      Latitude,
      Longitude,
      Reach
    });
    res.status(201).json(newCity);
  } catch (error) {
    console.error('Erreur lors de la création de la ville :', error);
    res.status(500).json({ message: 'Erreur lors de la création de la ville' });
  }
};

// Méthode pour obtenir toutes les villes
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.findAll();
    res.status(200).json(cities);
  } catch (error) {
    console.error('Erreur lors de la récupération des villes :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des villes' });
  }
};

// Méthode pour obtenir une ville par son ID
exports.getCityById = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ message: 'Ville non trouvée' });
    }
    res.status(200).json(city);
  } catch (error) {
    console.error('Erreur lors de la récupération de la ville :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la ville' });
  }
};

// Méthode pour mettre à jour une ville
exports.updateCity = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ message: 'Ville non trouvée' });
    }
    await city.update(req.body);
    res.status(200).json(city);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la ville :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la ville' });
  }
};

// Méthode pour supprimer une ville
exports.deleteCity = async (req, res) => {
  const { id } = req.params;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      return res.status(404).json({ message: 'Ville non trouvée' });
    }
    await city.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Erreur lors de la suppression de la ville :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la ville' });
  }
};