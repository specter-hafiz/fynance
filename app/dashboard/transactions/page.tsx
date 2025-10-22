"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Import,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import ProfileAvatar from "@/components/auth/ProfileAvatar";

// Sample transaction data (100 transactions for testing)
const allTransactions = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  type: i % 3 === 0 ? "Income" : "Expense",
  date: `2024-06-${String(15 - (i % 30)).padStart(2, "0")}`,
  transaction: [
    "Grocery Shopping",
    "Gas Station",
    "Salary Payment",
    "Amazon Purchase",
    "Coffee Shop",
    "Gym Membership",
    "Restaurant",
    "Electric Bill",
    "Netflix",
    "Uber Ride",
  ][i % 10],
  category: [
    "Food & Dining",
    "Transportation",
    "Income",
    "Shopping",
    "Entertainment",
  ][i % 5],
  amount: `$${(Math.random() * 500 + 10).toFixed(2)}`,
  bank: i % 4 === 0 ? "Pending" : "Completed",
  timestamp: `06.${String(15 - (i % 30)).padStart(2, "0")}.25, ${String(
    9 + (i % 12)
  ).padStart(2, "0")}:${String((i * 5) % 60).padStart(2, "0")}`,
}));

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  // Filter transactions
  const filteredTransactions = allTransactions.filter(
    (transaction) =>
      transaction.transaction
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Calculate visible page numbers (show max 5 pages at a time)
  const getVisiblePages = () => {
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex flex-col h-screen bg-lightblue/3">
      {/* Fixed Header */}
      <div className="flex-shrink-0 bg-lightblue/3 border-b border-lightblue/10 px-4 sm:px-8 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Transactions
          </h1>
          <ProfileAvatar />
        </div>
      </div>

      {/* Search and Filters - Fixed */}
      <div className="flex-shrink-0 px-4 sm:px-8 my-4 sm:my-6">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <div className="relative w-full sm:max-w-xs">
            <Search
              className={`w-5 h-5 ${
                searchQuery ? "text-green" : "text-lightgray/80"
              } absolute left-4 top-1/2 transform -translate-y-1/2`}
            />
            <input
              type="text"
              placeholder="Search transaction"
              value={searchQuery}
              onChange={handleSearch}
              className="border border-lightblue/10 rounded-full pl-12 pr-4 py-2.5 w-full focus:outline-none focus:border-green transition-colors text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-lightblue text-black px-3 sm:px-4 py-2 rounded-full hover:bg-lightblue/90 transition-colors text-xs sm:text-sm font-medium cursor-pointer">
              <Import className="w-3 h-3 sm:w-4 sm:h-4 inline-block mr-1 sm:mr-2" />
              Import
            </button>
            <button className="flex-1 sm:flex-none bg-green text-black px-3 sm:px-4 py-2 rounded-full hover:bg-green/90 transition-colors text-xs sm:text-sm font-medium cursor-pointer">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 inline-block mr-1 sm:mr-2" />
              Add
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <button className="bg-lightblue/5 px-3 py-2 rounded-lg hover:bg-lightblue/10 cursor-pointer transition-colors text-xs sm:text-sm flex items-center gap-1">
              Last week
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-lightblue/5 px-3 py-2 rounded-lg hover:bg-lightblue/10 cursor-pointer transition-colors text-xs sm:text-sm flex items-center gap-1">
              All cards
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="bg-lightblue/5 px-3 py-2 rounded-lg hover:bg-lightblue/10 cursor-pointer transition-colors text-xs sm:text-sm flex items-center gap-1">
              Categories
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
          <button className="p-2 bg-lightblue/5 border border-lightblue/10 rounded-lg hover:bg-lightblue/10 cursor-pointer transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className="flex-1 px-4 sm:px-8 pb-4 overflow-hidden">
        <div className="bg-lightblue/5 rounded-lg h-full flex flex-col overflow-hidden">
          {/* Table with horizontal scroll on mobile */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              {/* Sticky Table Header */}
              <thead className="sticky top-0 bg-lightblue/10 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white border-b border-lightblue/10">
                    Type
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white border-b border-lightblue/10">
                    Transaction
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white border-b border-lightblue/10">
                    Category
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white border-b border-lightblue/10">
                    Amount
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white border-b border-lightblue/10">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white border-b border-lightblue/10">
                    Timestamp
                  </th>
                  <th className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium text-white border-b border-lightblue/10">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Scrollable Table Body */}
              <tbody>
                {currentTransactions.length > 0 ? (
                  currentTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-b border-lightblue/10 hover:bg-lightblue/3 transition-colors"
                    >
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "Income"
                              ? "bg-green/20 text-green"
                              : "bg-red-500/20 text-red-500"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium">
                        {transaction.transaction}
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-lightgray/80">
                        {transaction.category}
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm font-semibold">
                        {transaction.amount}
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.bank === "Completed"
                              ? "bg-green/20 text-green"
                              : "bg-yellow-500/20 text-yellow-500"
                          }`}
                        >
                          {transaction.bank}
                        </span>
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm text-lightgray/80">
                        {transaction.timestamp}
                      </td>
                      <td className="px-3 sm:px-4 py-3 text-xs sm:text-sm">
                        <div className="flex gap-2 sm:gap-3">
                          <button
                            onClick={() => console.log("Edit:", transaction.id)}
                            aria-label="Edit transaction"
                            className="hover:scale-110 transition-transform"
                          >
                            <Pencil className="w-4 h-4 text-lightgray/80 hover:text-green transition-colors cursor-pointer" />
                          </button>
                          <button
                            onClick={() =>
                              console.log("Delete:", transaction.id)
                            }
                            aria-label="Delete transaction"
                            className="hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-4 h-4 text-lightgray/80 hover:text-red-500 transition-colors cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-lightgray/80 text-sm"
                    >
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Fixed Pagination Footer */}
      <div className="flex-shrink-0 bg-lightblue/3 px-4 sm:px-8 py-3 border-t border-lightblue/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Results Info */}
          <div className="text-xs sm:text-sm text-lightgray/80">
            Showing{" "}
            <span className="font-semibold text-white">{startIndex + 1}</span>{" "}
            to{" "}
            <span className="font-semibold text-white">
              {Math.min(endIndex, filteredTransactions.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-white">
              {filteredTransactions.length}
            </span>{" "}
            transactions
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-lightblue/5 hover:bg-lightblue/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* First Page */}
            {getVisiblePages()[0] > 1 && (
              <>
                <button
                  onClick={() => goToPage(1)}
                  className="hidden sm:block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-lightblue/5 hover:bg-lightblue/10"
                >
                  1
                </button>
                {getVisiblePages()[0] > 2 && (
                  <span className="hidden sm:block px-2 text-lightgray/80">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Page Numbers */}
            <div className="flex gap-1">
              {getVisiblePages().map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    currentPage === page
                      ? "bg-green text-black"
                      : "bg-lightblue/5 hover:bg-lightblue/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Last Page */}
            {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
              <>
                {getVisiblePages()[getVisiblePages().length - 1] <
                  totalPages - 1 && (
                  <span className="hidden sm:block px-2 text-lightgray/80">
                    ...
                  </span>
                )}
                <button
                  onClick={() => goToPage(totalPages)}
                  className="hidden sm:block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors bg-lightblue/5 hover:bg-lightblue/10"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-lightblue/5 hover:bg-lightblue/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
