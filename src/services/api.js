const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://www.ipadev.ng/api';

class ApiService {
  async fetchData(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async postData(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Content endpoints
  async getHero() {
    return this.fetchData('/hero');
  }

  async getAbout() {
    return this.fetchData('/about');
  }

  async getTeam() {
    return this.fetchData('/team');
  }

  async getAreasOfFocus() {
    return this.fetchData('/areas-of-focus');
  }

  async getContact() {
    return this.fetchData('/contact');
  }

  // Form submissions
  async submitContact(formData) {
    return this.postData('/contact', formData);
  }

  async subscribeNewsletter(email) {
    return this.postData('/newsletter', { email });
  }
}

export default new ApiService(); 