import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function EditProfilePage() {
  const { user, updateFullName } = useAuth();
  const [name, setName] = useState(user?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      updateFullName(name);
      alert('Nama berhasil diperbarui!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded dark:bg-secondary not-dark:bg-white-secondary not-dark:text-primary h-full">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            className="w-full p-2 border rounded"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="dark:bg-tertiary not-dark:bg-white-tertiary hover:bg-primary duration-300 hover:animate-pulse not-dark:text-primary not-dark:hover:text-white dark:text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
