const mongoose = require('mongoose');

const pdfDocumentSchema = new mongoose.Schema({
    pdfUrl: String // URL of the PDF stored in Cloudinary
});

module.exports = mongoose.model('PdfDocument', pdfDocumentSchema);
