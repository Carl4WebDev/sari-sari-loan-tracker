import { useEffect, useState } from "react";

interface Borrower {
  id: number;
  fName: string;
  lName: string;
}

interface Props {
  isOpen: boolean;
  isClose: () => void;
  borrower: Borrower | null;
}

export default function AddLoanModal({
  isOpen,
  isClose,
  borrower,
}: Props) {
  const [animate, setAnimate] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedBorrower, setSelectedBorrower] =
    useState<Borrower | null>(borrower);

  const [items, setItems] = useState([
    { product: "", quantity: "", price: "" },
  ]);

  // 🔥 HARDCODED borrower list (replace later with API/context)
  const borrowers: Borrower[] = [
    { id: 1, fName: "Juan", lName: "Dela Cruz" },
    { id: 2, fName: "Maria", lName: "Santos" },
    { id: 3, fName: "Pedro", lName: "Reyes" },
  ];

  const filteredBorrowers = borrowers.filter((b) =>
    `${b.fName} ${b.lName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (borrower) {
      setSelectedBorrower(borrower);
    }
  }, [borrower]);

  if (!isOpen) return null;

  const handleItemChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addNewItem = () => {
    setItems([...items, { product: "", quantity: "", price: "" }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ||
      (window as any).SpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported on this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
    };

    recognition.start();
  };

  const handleSubmit = () => {
    if (!selectedBorrower) return;

    const payload = {
      borrowerId: selectedBorrower.id,
      items,
    };

    console.log("LOAN PAYLOAD:", payload);

    // 🔥 Replace with real API call later
    // await loanApi.create(payload)

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
            Add Loan
          </h2>

          {/* Borrower Search */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                placeholder="Search borrower..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
              />
              <button
                onClick={handleVoiceSearch}
                className="rounded-lg bg-gray-100 px-3 text-lg"
              >
                🎤
              </button>
            </div>

            <div className="max-h-32 overflow-y-auto space-y-1">
              {filteredBorrowers.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBorrower(b)}
                  className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
                    selectedBorrower?.id === b.id
                      ? "bg-[#1E3A8A] text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {b.fName} {b.lName}
                </div>
              ))}
            </div>
          </div>

          {/* Loan Items */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="space-y-2 border border-gray-200 rounded-xl p-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Product"
                    value={item.product}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "product",
                        e.target.value
                      )
                    }
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  />

                  <button
                    type="button"
                    onClick={addNewItem}
                    className="rounded-lg bg-[#1E3A8A] text-white px-3 py-3 text-lg"
                  >
                    +
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    className="w-1/2 rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                    className="w-1/2 rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] outline-none"
                  />
                </div>

                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-xs text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
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
              Save Loan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}