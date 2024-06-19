const express = require('express');
const router = express.Router();
const pdfDocumentController = require('../controllers/pdfDocumentController');

// Route to create a new PDF document
router.post('/', pdfDocumentController.createPdfDocument);

// Route to get all PDF documents
router.get('/', pdfDocumentController.getPdfDocuments);

// Route to get a single PDF document by its ID
router.get('/:id', pdfDocumentController.getPdfDocumentById);

// Route to update a PDF document by its ID
router.put('/:id', pdfDocumentController.updatePdfDocument);

// Route to delete a PDF document by its ID
router.delete('/:id', pdfDocumentController.deletePdfDocument);

module.exports = router;
