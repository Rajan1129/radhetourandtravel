export const notFoundApi = (req, res) => res.status(404).json({ message: 'Not found.' });
export const errorHandler = (err, req, res, next) => { console.error(err); res.status(500).json({ message: 'Server error. Please try again or call us.' }); };
