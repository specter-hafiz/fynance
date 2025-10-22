"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import ProfileAvatar from "@/components/auth/ProfileAvatar";

interface Payment {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
  type: "expense" | "income";
  status: "pending" | "paid" | "overdue";
  recurring: boolean;
}

interface PaymentFormData {
  title: string;
  amount: string;
  date: string;
  category: string;
  type: "expense" | "income";
  status: "pending" | "paid" | "overdue";
  recurring: boolean;
}

interface Filters {
  status: string;
  category: string;
  type: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payment: Payment) => void;
  editPayment: Payment | null;
  selectedDate: string | null;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editPayment,
  selectedDate,
}) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    title: "",
    amount: "",
    date: "",
    category: "Bills",
    type: "expense",
    status: "pending",
    recurring: false,
  });

  useEffect(() => {
    if (editPayment) {
      setFormData({
        ...editPayment,
        amount: editPayment.amount.toString(),
      });
    } else if (selectedDate) {
      setFormData({
        title: "",
        amount: "",
        date: selectedDate,
        category: "Bills",
        type: "expense",
        status: "pending",
        recurring: false,
      });
    }
  }, [editPayment, selectedDate, isOpen]);

  const handleSubmit = (): void => {
    if (!formData.title || !formData.amount || !formData.date) return;

    onSave({
      ...formData,
      amount: parseFloat(formData.amount),
      id: editPayment?.id || Date.now(),
    } as Payment);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a2e] rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            {editPayment ? "Edit" : "Add"} Payment
          </h2>
          <button
            onClick={onClose}
            className="text-lightgray/50 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-lightblue/3 rounded-lg px-4 py-2 text-white border border-lightblue/10 focus:border-green focus:outline-none"
              placeholder="e.g., Rent Payment"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full bg-lightblue/3 rounded-lg px-4 py-2 text-white border border-lightblue/10 focus:border-green focus:outline-none"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full bg-lightblue/3 rounded-lg px-4 py-2 text-white border border-lightblue/10 focus:border-green focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full bg-lightblue/3 rounded-lg px-4 py-2 text-white border border-lightblue/10 focus:border-green focus:outline-none"
            >
              <option value="Bills">Bills</option>
              <option value="Rent">Rent</option>
              <option value="Utilities">Utilities</option>
              <option value="Subscription">Subscription</option>
              <option value="Insurance">Insurance</option>
              <option value="Loan">Loan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as "expense" | "income",
                  })
                }
                className="w-full bg-lightblue/3 rounded-lg px-4 py-2 text-white border border-lightblue/10 focus:border-green focus:outline-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "pending" | "paid" | "overdue",
                  })
                }
                className="w-full bg-lightblue/3 rounded-lg px-4 py-2 text-white border border-lightblue/10 focus:border-green focus:outline-none"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recurring"
              checked={formData.recurring}
              onChange={(e) =>
                setFormData({ ...formData, recurring: e.target.checked })
              }
              className="w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="recurring" className="text-sm cursor-pointer">
              Recurring payment
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-lightblue/3 rounded-lg hover:bg-lightblue/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-green text-black rounded-lg hover:bg-green/80 transition-colors font-medium"
            >
              {editPayment ? "Update" : "Add"} Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      title: "Rent Payment",
      amount: 1200,
      date: "2024-06-15",
      category: "Rent",
      type: "expense",
      status: "pending",
      recurring: true,
    },
    {
      id: 2,
      title: "Netflix Subscription",
      amount: 15.99,
      date: "2024-06-01",
      category: "Subscription",
      type: "expense",
      status: "paid",
      recurring: true,
    },
    {
      id: 3,
      title: "Freelance Income",
      amount: 2500,
      date: "2024-06-10",
      category: "Other",
      type: "income",
      status: "paid",
      recurring: false,
    },
  ]);

  const [filters, setFilters] = useState<Filters>({
    status: "all",
    category: "all",
    type: "all",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showStatusMenu, setShowStatusMenu] = useState<boolean>(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState<boolean>(false);
  const [showTypeMenu, setShowTypeMenu] = useState<boolean>(false);

  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek: string[] = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7; // Adjust to make Monday = 0

    const days: (number | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getPaymentsForDate = (day: number | null): Payment[] => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return payments.filter((p) => {
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.category !== "all" && p.category !== filters.category)
        return false;
      if (filters.type !== "all" && p.type !== filters.type) return false;
      return p.date === dateStr;
    });
  };

  const handleDayClick = (day: number | null): void => {
    if (!day) return;
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(dateStr);
    setEditingPayment(null);
    setIsModalOpen(true);
  };

  const handleSavePayment = (payment: Payment): void => {
    if (editingPayment) {
      setPayments(payments.map((p) => (p.id === payment.id ? payment : p)));
    } else {
      setPayments([...payments, payment]);
    }
    setEditingPayment(null);
    setSelectedDate(null);
  };

  const getUpcomingPayments = (): Payment[] => {
    const today = new Date();
    return payments
      .filter((p) => {
        const paymentDate = new Date(p.date);
        return paymentDate >= today;
      })
      .filter((p) => {
        if (filters.status !== "all" && p.status !== filters.status)
          return false;
        if (filters.category !== "all" && p.category !== filters.category)
          return false;
        if (filters.type !== "all" && p.type !== filters.type) return false;
        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const days = getDaysInMonth(currentDate);
  const upcomingPayments = getUpcomingPayments();

  const categories: string[] = [
    "all",
    "Bills",
    "Rent",
    "Utilities",
    "Subscription",
    "Insurance",
    "Loan",
    "Other",
  ];
  const statuses: string[] = ["all", "pending", "paid", "overdue"];
  const types: string[] = ["all", "expense", "income"];

  return (
    <div className="flex flex-col flex-1 bg-lightblue/3 text-white min-h-screen">
      {/* Fixed Header */}
      <div className="px-3 sm:px-8 py-3 bg-lightblue/3 border-b border-lightblue/10 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Calendar
          </h2>
          <ProfileAvatar />
        </div>
      </div>

      {/* Filters */}
      <div className="my-8 px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-[3fr_1fr] items-center justify-between gap-4">
        <div className="flex items-center flex-wrap gap-4">
          <div className="flex items-center">
            <ChevronLeft
              onClick={() => navigateMonth(-1)}
              className="w-6 h-6 inline mr-4 cursor-pointer hover:text-green transition-colors"
            />
            <span className="text-sm sm:text-lg md:text-xl min-w-[180px] text-center">
              {months[currentDate.getMonth()]}{" "}
              <span className="text-lightgray/50 text-lg">
                {currentDate.getFullYear()}
              </span>
            </span>
            <ChevronRight
              onClick={() => navigateMonth(1)}
              className="w-6 h-6 inline ml-4 cursor-pointer hover:text-green transition-colors"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowStatusMenu(!showStatusMenu);
                setShowCategoryMenu(false);
                setShowTypeMenu(false);
              }}
              className="px-3 py-2 bg-lightblue/3 border border-lightblue/10 rounded-lg hover:bg-lightblue/10 transition-colors cursor-pointer text-sm sm:text-base font-medium"
            >
              {filters.status === "all" ? "Status" : filters.status}{" "}
              <ChevronDown className="w-6 h-6 inline ml-1" />
            </button>
            {showStatusMenu && (
              <div className="absolute top-full mt-2 bg-[#1a1a2e] rounded-lg shadow-lg border border-lightblue/10 py-2 min-w-[150px] z-20">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilters({ ...filters, status });
                      setShowStatusMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-lightblue/10 transition-colors capitalize"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowCategoryMenu(!showCategoryMenu);
                setShowStatusMenu(false);
                setShowTypeMenu(false);
              }}
              className="px-3 py-2 bg-lightblue/3 border border-lightblue/10 rounded-lg hover:bg-lightblue/10 transition-colors cursor-pointer text-sm sm:text-base font-medium"
            >
              {filters.category === "all" ? "All categories" : filters.category}{" "}
              <ChevronDown className="w-6 h-6 inline ml-1" />
            </button>
            {showCategoryMenu && (
              <div className="absolute top-full mt-2 bg-[#1a1a2e] rounded-lg shadow-lg border border-lightblue/10 py-2 min-w-[150px] z-20">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setFilters({ ...filters, category: cat });
                      setShowCategoryMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-lightblue/10 transition-colors capitalize"
                  >
                    {cat === "all" ? "All categories" : cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowTypeMenu(!showTypeMenu);
                setShowStatusMenu(false);
                setShowCategoryMenu(false);
              }}
              className="px-3 py-2 bg-lightblue/3 border border-lightblue/10 rounded-lg hover:bg-lightblue/10 transition-colors cursor-pointer text-sm sm:text-base font-medium"
            >
              {filters.type === "all" ? "All types" : filters.type}{" "}
              <ChevronDown className="w-6 h-6 inline ml-1" />
            </button>
            {showTypeMenu && (
              <div className="absolute top-full mt-2 bg-[#1a1a2e] rounded-lg shadow-lg border border-lightblue/10 py-2 min-w-[150px] z-20">
                {types.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilters({ ...filters, type });
                      setShowTypeMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-lightblue/10 transition-colors capitalize"
                  >
                    {type === "all" ? "All types" : type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedDate(null);
            setEditingPayment(null);
            setIsModalOpen(true);
          }}
          className="rounded-full bg-green px-3 py-2 text-black flex items-center gap-2 hover:bg-green/80 transition-colors cursor-pointer text-xs sm:text-sm font-medium"
        >
          <Plus className="w-6 h-6" /> Add scheduled payment
        </button>
      </div>

      {/* Calendar Content */}
      <div className="flex-1 px-4 sm:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          {/* Calendar Grid */}
          <div className="bg-lightblue/3 rounded-lg overflow-hidden">
            <div className="grid grid-cols-7 bg-lightblue/10">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="px-2 py-4 text-center text-xs sm:text-sm font-medium border-b border-lightblue/10"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
              {days.map((day, idx) => {
                const dayPayments = getPaymentsForDate(day);
                const today = isToday(day);

                return (
                  <div
                    key={idx}
                    onClick={() => handleDayClick(day)}
                    className={`min-h-[80px] sm:min-h-[100px] p-2 border border-lightblue/10 transition-colors ${
                      day
                        ? "hover:bg-lightblue/10 cursor-pointer"
                        : "bg-lightblue/5"
                    } ${today ? "bg-green/20 border-green" : ""}`}
                  >
                    {day && (
                      <>
                        <div
                          className={`text-sm font-medium mb-1 ${
                            today ? "text-green" : ""
                          }`}
                        >
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayPayments.slice(0, 2).map((payment) => (
                            <div
                              key={payment.id}
                              className={`text-xs px-1 py-0.5 rounded truncate ${
                                payment.type === "income"
                                  ? "bg-green/20 text-green"
                                  : payment.status === "overdue"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              ${payment.amount}
                            </div>
                          ))}
                          {dayPayments.length > 2 && (
                            <div className="text-xs text-lightgray/50">
                              +{dayPayments.length - 2} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            <div className="bg-lightblue/3 rounded-lg p-4 h-fit">
              <h3 className="text-lg font-bold mb-4">Upcoming Payments</h3>
              <div className="space-y-3">
                {upcomingPayments.length > 0 ? (
                  upcomingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      onClick={() => {
                        setEditingPayment(payment);
                        setIsModalOpen(true);
                      }}
                      className="bg-lightblue/10 rounded-lg p-3 hover:bg-lightblue/20 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{payment.title}</h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            payment.status === "paid"
                              ? "bg-green/20 text-green"
                              : payment.status === "overdue"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-lightgray/70">
                        <span>{payment.category}</span>
                        <span
                          className={
                            payment.type === "income"
                              ? "text-green"
                              : "text-white"
                          }
                        >
                          {payment.type === "income" ? "+" : "-"}$
                          {payment.amount}
                        </span>
                      </div>
                      <div className="text-xs text-lightgray/50 mt-1">
                        {new Date(payment.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lightgray/50 py-8">
                    <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">No upcoming payments</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm">Scheduled monthly income</h3>
              <div className="flex gap-3 text-green text-sm sm:text-base font-medium my-2">
                <TrendingUp className="w-6 h-6" />
                <div>250,000 $</div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-lightgray/80">Already paid</h3>
                <div>15,000 $</div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-lightgray/80">Upcoming</h3>
                <div>1,500 $</div>
              </div>
            </div>
            <div>
              <h3 className="text-sm">Scheduled monthly income</h3>
              <div className="flex gap-3 text-red-500 text-sm sm:text-base font-medium my-2">
                <TrendingDown className="w-6 h-6" />
                <div>250,000 $</div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-lightgray/80">Already paid</h3>
                <div>15,000 $</div>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-lightgray/80">Upcoming</h3>
                <div>1,500 $</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPayment(null);
          setSelectedDate(null);
        }}
        onSave={handleSavePayment}
        editPayment={editingPayment}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;
