import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContactForm from '../components/elements/ContactForm';
import {
  addContactToDB,
  getAllContactsFromDB,
  updateContactInDB,
  deleteContactFromDB,
} from '../utils/idb';

export default function DashboardPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const contactsPerPage = 2;

  // Filter
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  useEffect(() => {
    const loadContacts = async () => {
      const all = await getAllContactsFromDB();
      setContacts(all);
    };
    loadContacts();
  }, []);

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchParams({ q, page: 1 }); 
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ q: searchTerm, page: newPage });
  };

  const addContact = async (newContact) => {
    const contactWithId = { ...newContact, id: Date.now() };
    await addContactToDB(contactWithId);
    setContacts((prev) => [...prev, contactWithId]);
  };

  const updateContact = async (updated) => {
    await updateContactInDB(updated);
    setContacts((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const deleteContact = async (id) => {
    await deleteContactFromDB(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-6 dark:bg-secondary not-dark:bg-white-primary not-dark:text-primary dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Contacts (Non API Integrated)</h1>

      <ContactForm
        onAdd={addContact}
        onUpdate={updateContact}
        selectedContact={selectedContact}
        clearSelected={() => setSelectedContact(null)}
      />

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full mb-4 p-2 border rounded"
        />
      </div>

      <ul className="mt-6 space-y-2">
        {currentContacts.map((contact) => (
          <li
            key={contact.id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm">{contact.email}</p>
              <p className="text-sm">{contact.phone}</p>
            </div>
            <div className="flex space-x-2 gap-4">
              <button
                className="text-blue-600 cursor-pointer hover:text-primary duration-300"
                onClick={() => setSelectedContact(contact)}
              >
                Edit
              </button>
              <button
                className="text-red-600 cursor-pointer hover:text-red-900 duration-300"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
