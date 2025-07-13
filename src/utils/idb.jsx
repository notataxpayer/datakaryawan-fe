import { openDB } from 'idb';

const DB_NAME = 'contacts-db';
const STORE_NAME = 'contacts';
const DB_VERSION = 1;

const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const addContactToDB = async (contact) => {
  const db = await initDB();
  await db.add(STORE_NAME, contact);
};

export const getAllContactsFromDB = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteContactFromDB = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

// export const deleteContactFromDB = async (id) => {
//   const db = await openDB('ContactsDB', 1);
//   return db.delete('contacts', id);
// };


export const updateContactInDB = async (contact) => {
  const db = await initDB();
  await db.put(STORE_NAME, contact);
};

