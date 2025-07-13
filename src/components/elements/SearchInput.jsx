import React from 'react';

export default function SearchInput({ value, onChange }) {
  return (
    <div className="mb-4 flex flex-col space-y-2 justify-center w-10/12 mx-auto px-0 md:px-20">
        <label htmlFor="image" className="block text-sm font-medium mb-1">
            Cari Karyawan
        </label>
      <input
        type="text"
        placeholder="Cari nama atau posisi..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
    </div>
  );
}
