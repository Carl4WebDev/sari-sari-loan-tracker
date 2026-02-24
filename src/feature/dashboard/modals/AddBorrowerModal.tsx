import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  isClose: () => void;
  onBorrowerCreated: (borrower: any) => void;
}

export default function AddBorrowerModal({
  isOpen,
  isClose,
  onBorrowerCreated,
}: Props) {
  const [form, setForm] = useState({
    fName: "",
    mName: "",
    lName: "",
    date: "",
    contact: "",
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newBorrower = {
      id: Date.now(),
      ...form,
    };

    onBorrowerCreated(newBorrower);
    isClose();
  };

return (
  <div
    className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
      isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
    onClick={isClose}
  >
    {/* Top Sliding Panel */}
    <div
      onClick={(e) => e.stopPropagation()}
      className={`
        fixed top-0 left-0 w-full bg-white
        rounded-b-2xl shadow-xl
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#1E3A8A]">
          Add Borrower
        </h2>

        <div className="space-y-3">
          <input
            name="fName"
            placeholder="First Name"
            value={form.fName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
          />

          <input
            name="mName"
            placeholder="Middle Name"
            value={form.mName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
          />

          <input
            name="lName"
            placeholder="Last Name"
            value={form.lName}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
          />

<input
  name="date"
  type="date"
  value={form.date}
  onChange={handleChange}
  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
/>

          <input
            name="contact"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={isClose}
            className="w-1/2 rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-700"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="w-1/2 rounded-xl bg-[#1E3A8A] py-3 text-sm font-semibold text-white"
          >
            Save & Add Loan
          </button>
        </div>
      </div>
    </div>
  </div>
);
}