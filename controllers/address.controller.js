const Address = require('../models/address.model');
const User = require('../models/user.model');

// Create Address
exports.createAddress = async (req, res) => {
  const { street, phoneNumber, city, country, isDefault } = req.body;
  const userId = req.user.id;

  try {
    if (isDefault) {
      await Address.update({ isDefault: false }, { where: { userId } });
    }

    const address = await Address.create({
      street,
      phoneNumber,
      city,
      country,
      isDefault,
      userId,
    });

    res.status(201).json({
      message: 'Address created successfully',
      address,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Addresses
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { userId: req.user.id },
      order: [['id', 'DESC']],
    });

    if (!addresses || addresses.length === 0) {
      return res.status(200).json({
        message: 'No saved addresses found',
        addresses: [],
      });
    }

    res.status(200).json({
      message: 'Addresses fetched successfully',
      addresses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Default Address
exports.getDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      where: {
        userId: req.user.id,
        isDefault: true,
      },
    });

    if (!address) {
      return res.status(404).json({ error: 'No default address found' });
    }

    res.status(200).json({
      message: 'Default address fetched successfully',
      address,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Set Default Address
exports.setDefaultAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    // Unset old default
    await Address.update({ isDefault: false }, { where: { userId } });

    // Set new default
    const [updated] = await Address.update(
      { isDefault: true },
      { where: { id, userId } }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Address not found' });
    }

    res.json({ message: 'Default address set successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Address
exports.deleteAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deleted = await Address.destroy({ where: { id, userId } });

    if (!deleted) {
      return res.status(404).json({ error: 'Address not found' });
    }

    // If no default remains, set the first one as default
    const remaining = await Address.findAll({
      where: { userId },
      order: [['id', 'ASC']],
    });

    if (remaining.length && !remaining.some(addr => addr.isDefault)) {
      await Address.update({ isDefault: true }, { where: { id: remaining[0].id } });
    }

    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
