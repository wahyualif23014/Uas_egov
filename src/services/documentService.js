// src/services/documentService.js
const API_BASE_URL = 'http://localhost:5000/api';

class DocumentService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Get all documents
  async getDocuments(category = 'all') {
    const endpoint = category !== 'all' 
      ? `/documents?category=${category}`
      : '/documents';
    
    return this.request(endpoint);
  }

  // Get document by ID
  async getDocumentById(id) {
    return this.request(`/documents/${id}`);
  }

  // Get categories
  async getCategories() {
    return this.request('/documents/categories');
  }

  // Download document
  async downloadDocument(documentId, documentTitle) {
    try {
      const response = await fetch(`${this.baseURL}/documents/download/${documentId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengunduh dokumen');
      }

      // Convert response to blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Get filename from response headers or use document title
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = `${documentTitle}.pdf`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true, message: 'Dokumen berhasil diunduh' };
    } catch (error) {
      console.error('Download Error:', error);
      throw error;
    }
  }

  // Upload document
  async uploadDocument(formData) {
    try {
      const response = await fetch(`${this.baseURL}/documents/upload`, {
        method: 'POST',
        body: formData, // formData sudah include file
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengupload dokumen');
      }

      return await response.json();
    } catch (error) {
      console.error('Upload Error:', error);
      throw error;
    }
  }

  // Delete document
  async deleteDocument(id) {
    return this.request(`/documents/${id}`, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const documentService = new DocumentService();