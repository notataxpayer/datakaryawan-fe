import React, { useRef, useEffect } from 'react';

export default function EmployeeForm({ form, divisions, onChange, onSubmit }) {
    const fileInputRef = useRef();
    useEffect(() => {
    if (form.image === null && fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    }, [form.image]);
  return (
    <form onSubmit={onSubmit} className="">
        <div className='flex flex-col space-y-2 justify-center w-10/12 mx-auto px-0 md:p-20 py-10'>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
            Nama Karyawan
        </label>
        <input
            type="text"
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={onChange}
            className="border p-2 w-full"
            required
        />
        <label htmlFor="image" className="block text-sm font-medium mb-1">
            No Telepon
        </label>
        <input
            type="number"
            name="phone"
            placeholder="Telepon"
            value={form.phone}
            onChange={onChange}
            className="border p-2 w-full"
            required
        />
        <label htmlFor="image" className="block text-sm font-medium mb-1">
            Divisi Karyawan
        </label>
        <select
            name="division"
            value={form.division}
            onChange={onChange}
            className="border p-2 w-full"
            required
        >
            <option value="">Pilih Divisi</option>
            {divisions.map((div) => (
            <option key={div.id} value={div.id}>
                {div.name}
            </option>
            ))}
        </select>
        <label htmlFor="image" className="block text-sm font-medium mb-1">
            Jabatan Karyawan
        </label>
        <input
            type="text"
            name="position"
            placeholder="Jabatan"
            value={form.position}
            onChange={onChange}
            className="border p-2 w-full"
            required
        />
            <div>
            <label htmlFor="image" className="block text-sm font-medium mb-1">
                Upload Foto (opsional)
            </label>
            <input
                id="image"
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) =>
                onChange({ target: { name: 'image', value: e.target.files[0] } })
                }
                className="w-full border p-2 rounded bg-transparent file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold not-dark:file:bg-white-quaternary not-dark:file:text-white not-dark:hover:file:bg-white-tertiary file:duration-300  dark:file:bg-blue-100 dark:file:text-blue-700 dark:hover:file:bg-blue-200"
            />
            </div>
        <button type="submit" className="dark:bg-tertiary not-dark:bg-white-tertiary not-dark:text-primary not-dark:hover:bg-white-secondary duration-300 font-semibold text-white px-4 py-2 rounded cursor-pointer">
            {form.id ? 'Update' : 'Tambah'} Data Karyawan
        </button>
        </div>
      
    </form>
  );
}
