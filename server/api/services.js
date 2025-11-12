const connectDB = require('../lib/db');
const Service = require('../lib/Service');

module.exports = async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    const services = await Service.find();
    return res.status(200).json(services);
  }

  if (req.method === 'POST') {
    const newService = await Service.create(req.body);
    return res.status(201).json(newService);
  }

  res.status(405).json({ message: 'Method not allowed' });
};
