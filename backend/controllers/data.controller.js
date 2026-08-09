const cpcbService = require('../services/cpcb.service');

exports.getLiveData = async (req, res) => {
  const result = await cpcbService.getLiveData();
  if (!result.success) {
    return res.status(503).json({ success: false, message: result.error, data: [] });
  }
  res.json(result.data);
};
