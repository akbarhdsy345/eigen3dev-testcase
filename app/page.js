"use client"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState({});
  const [selectedMemberId, setSelectedMemberId] = useState(null); // State untuk menyimpan ID anggota yang dipilih

  useEffect(() => {
    // Fetch books data
    axios.get("http://localhost:2000/books")
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching books:", error);
      });

    // Fetch members data
    axios.get("http://localhost:2000/members")
      .then(response => {
        setMembers(response.data);
      })
      .catch(error => {
        console.error("Error fetching members:", error);
      });

    // Fetch borrowed books data (if needed)
    axios.get("http://localhost:2000/borrowedBooks")
      .then(response => {
        setBorrowedBooks(response.data);
      })
      .catch(error => {
        console.error("Error fetching borrowed books:", error);
      });
  }, []);

  // Function to handle borrowing books
  const borrowBook = (memberId, bookCode) => {
    // Check if the member has already borrowed 2 books
    if (borrowedBooks[memberId] && borrowedBooks[memberId].length >= 2) {
      alert("Member cannot borrow more than 2 books!");
      return;
    }

    // Simulate borrowing (update state or send request to server)
    const updatedBorrowedBooks = {
      ...borrowedBooks,
      [memberId]: [...(borrowedBooks[memberId] || []), bookCode]
    };

    setBorrowedBooks(updatedBorrowedBooks);
    alert(`Member ${memberId} borrowed book ${bookCode}`);
    // You can also send a request to update borrowed books on the server
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Author</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.code} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-black whitespace-nowrap">{book.code}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{book.title}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{book.author}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{book.stock}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">
                {/* Button to borrow book */}
                <button
                  onClick={() => borrowBook(selectedMemberId, book.code)} // Mengirim selectedMemberId ke fungsi borrowBook
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <h2 className="text-2xl font-bold my-4">Members</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-black whitespace-nowrap">{member.code}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{member.name}</td>
              <td className="px-6 py-4 text-black whitespace-nowrap">{member.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

