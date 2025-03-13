import React, { useState } from 'react';

const SearchbarEmployee = () => {
  const [deleted, setDeleted] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleSearch = () => {
    const searchParams: { [key: string]: string } = {};

    if (deleted) searchParams.deleted = deleted;
    if (firstName) searchParams.first_name = firstName;
    if (lastName) searchParams.last_name = lastName;
    if (email) searchParams.email = email;

    console.log(searchParams);
  };

  return (
    <div className="flex flex-row w-full justify-around gap-4 p-6 bg-gray-100 rounded-2xl shadow-lg mx-auto">
      <input
        type="text"
        placeholder="Supprimer (true/false)"
        value={deleted}
        onChange={(e) => setDeleted(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchbarEmployee;
