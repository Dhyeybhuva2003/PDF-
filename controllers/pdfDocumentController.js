const PdfDocument = require('../models/PdfDocument');
const { uploadImage } = require('../config/cloudinary');
require("dotenv").config();

// Create a new PDF document
exports.createPdfDocument = async (req, res) => {
    try {
        // Check if the file is present
        if (!req.files.pdfUrl) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const uploadedFile = await uploadImage(req.files.pdfUrl, process.env.FOLDER_PDF);

        // Create the PDF document entry
        const pdfDocument = new PdfDocument({
            pdfUrl: uploadedFile.secure_url
        });

        await pdfDocument.save();

        res.status(201).json(pdfDocument);
    } catch (err) {
        res.status(400).json({ message: 'Error creating PDF document: ' + err.message });
    }
};

// Get all PDF documents
exports.getPdfDocuments = async (req, res) => {
    try {
        const pdfDocuments = await PdfDocument.find();
        res.status(200).json(pdfDocuments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching PDF documents: ' + err.message });
    }
};

// Get a single PDF document by its ID
exports.getPdfDocumentById = async (req, res) => {
    try {
        const pdfDocument = await PdfDocument.findById(req.params.id);
        if (!pdfDocument) {
            return res.status(404).json({ message: 'PDF document not found' });
        }
        res.status(200).json(pdfDocument);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching PDF document: ' + err.message });
    }
};

// Update a PDF document by its ID
exports.updatePdfDocument = async (req, res) => {
    try {
        let updateData = {};

        if (req.files?.pdfUrl) {
            const uploadedPdf = await uploadImage(req.files.pdfUrl, process.env.FOLDER_PDF);
            updateData.pdfUrl = uploadedPdf.secure_url;
        }

        const pdfDocument = await PdfDocument.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!pdfDocument) {
            return res.status(404).json({ message: 'PDF document not found' });
        }

        res.status(200).json(pdfDocument);
    } catch (err) {
        res.status(400).json({ message: 'Error updating PDF document: ' + err.message });
    }
};

// Delete a PDF document by its ID
exports.deletePdfDocument = async (req, res) => {
    try {
        const pdfDocument = await PdfDocument.findByIdAndDelete(req.params.id);
        if (!pdfDocument) {
            return res.status(404).json({ message: 'PDF document not found' });
        }
        res.status(200).json({ message: 'PDF document deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting PDF document: ' + err.message });
    }
};
