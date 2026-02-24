import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface Borrower {
  id: number;
  fName: string;
  mName?: string;
  lName: string;
  age: number;
  contact: string;
  totalLoan: number;
}

export default function BorrowersPage() {
  const [search, setSearch] = useState("");

  // 🔥 HARDCODED DATA (Replace with API later)
  const borrowers: Borrower[] = [
    {
      id: 1,
      fName: "Juan",
      mName: "S.",
      lName: "Dela Cruz",
      age: 35,
      contact: "09171234567",
      totalLoan: 1200,
    },
    {
      id: 2,
      fName: "Maria",
      lName: "Santos",
      age: 29,
      contact: "09179876543",
      totalLoan: 540,
    },
    {
      id: 3,
      fName: "Pedro",
      lName: "Reyes",
      age: 42,
      contact: "09171231234",
      totalLoan: 3200,
    },
  ];

  const filteredBorrowers = useMemo(() => {
    return borrowers.filter((b) =>
      `${b.fName} ${b.lName} ${b.contact}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const handleExport = () => {
    // 🔥 Replace with real Excel export logic later
    console.log("Exporting borrowers...");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1E3A8A]">
          Borrowers
        </h1>
        <p className="text-sm text-gray-500">
          Manage and monitor borrower records
        </p>
      </div>

      {/* Search + Export */}
      <div className="flex flex-wrap gap-3 justify-center">
        <input
          placeholder="Search borrower..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
        />

        <button
          onClick={handleExport}
          className="rounded-lg bg-[#1E3A8A] p-4 w-full md:w-1/6 text-sm font-medium text-white"
        >
          Export
        </button>
      </div>

      {/* Borrower List */}
      <div className="space-y-4">
        {filteredBorrowers.map((b) => (
  <Link
    key={b.id}
    to={`/borrowers/${b.id}`}
    className="block"
  >
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-base font-semibold text-gray-800">
                  {b.fName} {b.mName ?? ""} {b.lName}
                </p>

                <p className="text-sm text-gray-500">
                  📞 {b.contact}
                </p>

                <p className="text-sm text-gray-500">
                  Age: {b.age}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">
                  Total Loan
                </p>
                <p className="text-lg font-bold text-[#1E3A8A]">
                  ₱{b.totalLoan.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Link>
        ))}

        {filteredBorrowers.length === 0 && (
          <p className="text-center text-sm text-gray-500">
            No borrowers found.
          </p>
        )}
      </div>
    </div>
  );
}