import React, { useEffect, useState } from 'react';

export default function ContactForm({ onAdd, onUpdate, selectedContact, clearSelected }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (selectedContact) {
      setFormData(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (selectedContact) {
      onUpdate(formData);
    } else {
      onAdd(formData);
    }

    setFormData({ name: '', email: '', phone: '' });
    clearSelected();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          className="w-full p-2 border rounded"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        {selectedContact ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
}
