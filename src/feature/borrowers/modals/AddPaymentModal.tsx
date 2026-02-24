import { useEffect, useState } from "react";

interface Borrower {
  id: number;
  fName: string;
  lName: string;
  totalLoan?: number;
 pastPaymentNotes: [
    {
      date: "2025-01-02",
      amount: 200,
      note: "Partial payment - cash",
    },
    {
      date: "2025-01-10",
      amount: 300,
      note: "Paid via GCash - installment",
    },
  ],
}

interface Props {
  isOpen: boolean;
  isClose: () => void;
  borrower: Borrower | null;
}

export default function AddPaymentModal({
  isOpen,
  isClose,
  borrower,
}: Props) {
  const [animate, setAnimate] = useState(false);

const [form, setForm] = useState({
  amount: "",
  note: "",
  paymentType: "",
});

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.amount) return;

const payload = {
  borrowerId: borrower?.id,
  amount: Number(form.amount),
  note: form.note,
  paymentType: form.paymentType,
};
    console.log("PAYMENT PAYLOAD:", payload);

    // 🔥 Replace with real API call
    // await paymentApi.create(payload)

    isClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300"
      onClick={isClose}
    >
      <div
        className={`
          fixed top-0 left-0 w-full bg-white
          rounded-b-2xl shadow-xl
          transform transition-transform duration-300 ease-out
          ${animate ? "translate-y-0" : "-translate-y-full"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <h2 className="text-lg font-semibold text-[#1E3A8A]">
            Add Payment
          </h2>

{/* Borrower Info */}
<div className="space-y-1">
  <div className="text-sm text-gray-600">
    {borrower?.fName} {borrower?.lName}
  </div>

  {/* 🔥 Total Balance Display */}
  <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
    <p className="text-xs text-gray-500">Current Total Balance</p>
    <p className="text-lg font-bold text-[#1E3A8A]">
      ₱{borrower?.totalLoan?.toLocaleString() ?? 0}
    </p>
  </div>

  {/* 🔥 Past Payment Notes */}
{borrower?.pastPaymentNotes && borrower.pastPaymentNotes.length > 0 && (
  <div className="space-y-2">
    <p className="text-xs text-gray-500">Previous Notes</p>

    <div className="max-h-40 overflow-y-auto space-y-2">
      {borrower.pastPaymentNotes.map((entry, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-3 bg-gray-50"
        >
          <div className="flex justify-between text-xs text-gray-400">
            <span>{entry.date}</span>
            <span className="text-[#16A34A] font-medium">
              ₱{entry.amount.toLocaleString()}
            </span>
          </div>

          <p className="text-sm text-gray-700 mt-1">
            {entry.note}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
</div>

          {/* Amount */}
          <input
            name="amount"
            type="number"
            placeholder="Payment Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
          />

{/* Payment Type */}
<select
  name="paymentType"
  value={form.paymentType}
  onChange={handleChange}
  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
>
  <option value="">Select Payment Type</option>
  <option value="Cash">Cash</option>
  <option value="GCash">GCash</option>
  <option value="Credit Card">Credit Card</option>
  <option value="Debit Card">Debit Card</option>
</select>
          {/* Note */}
          <textarea
            name="note"
            placeholder="Optional note..."
            value={form.note}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none resize-none"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={isClose}
              className="w-1/2 rounded-xl border border-gray-300 py-3 text-sm font-medium text-gray-700"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="w-1/2 rounded-xl bg-[#16A34A] py-3 text-sm font-semibold text-white"
            >
              Save Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}