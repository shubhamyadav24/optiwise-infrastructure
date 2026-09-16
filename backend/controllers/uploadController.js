// POST /api/upload (admin only) - handles a single image upload, returns its public URL
const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file received.' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.status(201).json({ url });
};

module.exports = { uploadImage };
