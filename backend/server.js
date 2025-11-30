// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// KONFIGURASI MULTER UNTUK UPLOAD
// ======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'documents');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const timestamp = Date.now();
    const safeFilename = `${baseName.replace(/[^a-zA-Z0-9]/g, '_')}_${timestamp}${extension}`;
    cb(null, safeFilename);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Hanya file PDF yang diizinkan'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024
  }
});

// ======================
// DATA DOKUMEN SAMPLE
// ======================
let documents = [
  { 
    id: 1, 
    title: "Dokumen Pelaksanaan Anggaran (DPA) 2024", 
    filename: "dpa_2024.pdf",
    type: "PDF", 
    size: "2.4 MB", 
    date: "2024-01-15",
    category: "Anggaran"
  },
  { 
    id: 2, 
    title: "Laporan Realisasi Semester I 2024", 
    filename: "laporan_realisasi_semester_i_2024.pdf",
    type: "PDF", 
    size: "1.8 MB", 
    date: "2024-07-20",
    category: "Laporan"
  }
];

// ======================
// UTILITY FUNCTIONS
// ======================
const getNextId = () => {
  return documents.length > 0 ? Math.max(...documents.map(doc => doc.id)) + 1 : 1;
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// ======================
// ROUTES API
// ======================

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Server E-Gov Jombang API berjalan!',
    version: '1.0.0',
    endpoints: {
      documents: '/api/documents',
      categories: '/api/documents/categories',
      upload: '/api/documents/upload',
      download: '/api/documents/download/:id'
    }
  });
});

// GET /api/documents - Ambil semua dokumen
app.get('/api/documents', (req, res) => {
  try {
    const { category } = req.query;
    let filteredDocuments = documents;
    
    if (category && category !== 'all') {
      filteredDocuments = documents.filter(doc => 
        doc.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json({
      success: true,
      data: filteredDocuments,
      total: filteredDocuments.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data dokumen',
      error: error.message
    });
  }
});

// GET /api/documents/categories - Ambil semua kategori
app.get('/api/documents/categories', (req, res) => {
  try {
    const categories = [...new Set(documents.map(doc => doc.category))];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil kategori',
      error: error.message
    });
  }
});

// GET /api/documents/:id - Ambil dokumen by ID
app.get('/api/documents/:id', (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const document = documents.find(doc => doc.id === documentId);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Dokumen tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil dokumen',
      error: error.message
    });
  }
});

// GET /api/documents/download/:id - Download dokumen
app.get('/api/documents/download/:id', (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const document = documents.find(doc => doc.id === documentId);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Dokumen tidak ditemukan'
      });
    }
    
    const filePath = path.join(__dirname, 'public', 'documents', document.filename);
    
    // Cek apakah file exists
    if (!fs.existsSync(filePath)) {
      // Buat file sample jika tidak ada (untuk testing)
      const sampleContent = `This is a sample PDF content for ${document.title}`;
      fs.writeFileSync(filePath, sampleContent);
      console.log(`Sample file created: ${filePath}`);
    }
    
    // Set headers untuk download
    res.setHeader('Content-Disposition', `attachment; filename="${document.filename}"`);
    res.setHeader('Content-Type', 'application/pdf');
    
    // Stream file ke client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    console.log(`Download: ${document.title} - ${new Date().toISOString()}`);
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengunduh dokumen',
      error: error.message
    });
  }
});

// POST /api/documents/upload - Upload dokumen baru
app.post('/api/documents/upload', upload.single('document'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada file yang diupload'
      });
    }

    const { title, category } = req.body;
    
    if (!title || !category) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({
        success: false,
        message: 'Judul dan kategori harus diisi'
      });
    }

    const newDocument = {
      id: getNextId(),
      title: title,
      filename: req.file.filename,
      type: 'PDF',
      size: formatFileSize(req.file.size),
      date: new Date().toISOString().split('T')[0],
      category: category,
      originalName: req.file.originalname
    };

    documents.push(newDocument);

    res.status(201).json({
      success: true,
      message: 'Dokumen berhasil diupload',
      data: newDocument
    });

  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({
      success: false,
      message: 'Gagal mengupload dokumen',
      error: error.message
    });
  }
});

// DELETE /api/documents/:id - Hapus dokumen
app.delete('/api/documents/:id', (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const documentIndex = documents.findIndex(doc => doc.id === documentId);
    
    if (documentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Dokumen tidak ditemukan'
      });
    }

    const document = documents[documentIndex];
    const filePath = path.join(__dirname, 'public', 'documents', document.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    documents.splice(documentIndex, 1);

    res.json({
      success: true,
      message: 'Dokumen berhasil dihapus'
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Gagal menghapus dokumen',
      error: error.message
    });
  }
});

// ======================
// STATIC FILES
// ======================
app.use('/public', express.static(path.join(__dirname, 'public')));

// ======================
// ERROR HANDLING MIDDLEWARE
// ======================
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File terlalu besar. Maksimal 10MB'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan server',
    error: error.message
  });
});

// ======================
// 404 HANDLER - FIXED VERSION
// ======================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`
  });
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log('Server E-Gov Jombang berhasil dijalankan!');
  console.log(`Port: ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/`);
  
  const documentsDir = path.join(__dirname, 'public', 'documents');
  if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
    console.log('✅ Folder documents created:', documentsDir);
  }
  
  console.log('\n📋 Available Endpoints:');
  console.log('   GET  /api/documents           - Get all documents');
  console.log('   GET  /api/documents/categories- Get categories');
  console.log('   GET  /api/documents/:id       - Get document by ID');
  console.log('   GET  /api/documents/download/:id - Download document');
  console.log('   POST /api/documents/upload    - Upload document');
  console.log('   DELETE /api/documents/:id     - Delete document');
});