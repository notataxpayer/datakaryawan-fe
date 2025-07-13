import React from 'react';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto md:overflow-y-hidden overflow-y-scroll mb-4 flex flex-col space-y-2 justify-center w-10/12 mx-auto px-0 md:px-20">
        <table className="w-full border">
      <thead>
        <tr className="dark:bg-tertiary not-dark:bg-white-tertiary not-dark:text-primary text-white">
          <th className="border p-2">Nama</th>
          <th className="border p-2">Telepon</th>
          <th className="border p-2">Divisi</th>
          <th className="border p-2">Jabatan</th>
          <th className="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td className="border p-2">{emp.name}</td>
            <td className="border p-2">{emp.phone}</td>
            <td className="border p-2">{emp.division?.name}</td>
            <td className="border p-2">{emp.position}</td>
            <td className="border p-2 space-x-2">
              <button onClick={() => onEdit(emp)} className="text-blue-600 cursor-pointer hover:text-primary">Edit</button>
              <button onClick={() => onDelete(emp.id)} className="text-red-600 cursor-pointer hover:text-red-800">Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    
    
  );
}
