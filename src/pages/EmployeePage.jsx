import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import EmployeeForm from '../components/elements/EmployeeForm';
import EmployeeTable from '../components/elements/EmployeeTable';
import SearchInput from '../components/elements/SearchInput';

export default function EmployeePage() {
  const { token } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({
    id: null,
    name: '',
    phone: '',
    division: '',
    position: '',
    image: null,
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    });

    // fetch employees from v1
//   const fetchEmployees = async () => {
//     const res = await axios.get('https://datakaryawan-be-production.up.railway.app/api/employees', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setEmployees(res.data.data.employees);
//   };

    // fetch employees with pagination
    const fetchEmployees = async (pageNumber = 1, search = '') => {
    const res = await axios.get(
        `https://datakaryawan-be-production.up.railway.app/api/employees?page=${pageNumber}&name=${search}`,
        {
        headers: { Authorization: `Bearer ${token}` },
        }
    );

    setEmployees(res.data.data.employees);
    setPagination(res.data.pagination);
    setPage(pageNumber);
    };

  const fetchDivisions = async () => {
    const res = await axios.get('https://datakaryawan-be-production.up.railway.app/api/divisions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDivisions(res.data.data.divisions);
  };

  useEffect(() => {
    fetchEmployees(page, searchTerm);
    fetchDivisions();
  }, [page, searchTerm]);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();

  // Kirim semua field, termasuk string kosong
  formData.append('name', form.name);
  formData.append('phone', form.phone);
  formData.append('division', form.division);
  formData.append('position', form.position);

  if (form.image) {
    formData.append('image', form.image);
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    if (form.id) {
      await axios.post(
        `https://datakaryawan-be-production.up.railway.app/api/employees/${form.id}?_method=PUT`,
        formData,
        config
      );
    } else {
      await axios.post(
        'https://datakaryawan-be-production.up.railway.app/api/employees',
        formData,
        config
      );
    }

    setForm({ id: null, name: '', phone: '', division: '', position: '', image: null });
    fetchEmployees();
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || 'Terjadi kesalahan');
  }
};

  const handleEdit = (emp) => {
    setForm({
      id: emp.id,
      name: emp.name,
      phone: emp.phone,
      division: emp.division_id,
      position: emp.position,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data ini?')) return;
    await axios.delete(`https://datakaryawan-be-production.up.railway.app/api/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEmployees();
  };

  return (
    <div className="p-6">
        <div className="text-center text-2xl font-bold">
            <h2 className="">Manajemen Karyawan</h2>
        </div>
      <EmployeeForm form={form} divisions={divisions} onChange={handleChange} onSubmit={handleSubmit} />
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
        <div className="mt-4 flex justify-center items-center gap-4">
        <button
        onClick={() => setPage(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 dark:bg-tertiary dark:hover:bg-primary hover:animate-pulse duration-300 rounded disabled:opacity-50 cursor-pointer not-dark:bg-white-tertiary not-dark:text-primary not-dark:hover:bg-white-quaternary"
        >
        Previous
        </button>

        <span>Page {pagination.current_page} of {pagination.last_page}</span>

        <button
        onClick={() => setPage(page + 1)}
        disabled={page >= pagination.last_page}
        className="px-4 py-2 dark:bg-tertiary dark:hover:bg-primary hover:animate-pulse duration-300 rounded disabled:opacity-50 cursor-pointer not-dark:bg-white-tertiary not-dark:text-primary not-dark:hover:bg-white-quaternary"
        >
        Next
        </button>
        </div>

    </div>
  );
}
