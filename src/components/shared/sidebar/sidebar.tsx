"use client"; // Ensure this is a Client Component

import { useState } from "react";
import { ChevronDown, ChevronRight, Users, LayoutGrid, IdCard, MapPin } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isAccountsOpen, setIsAccountsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("List");
  const [selectedMain, setSelectedMain] = useState("customers"); // Track the selected main menu item

 
  const handleSubmenuClick = (item: string) => {
    setSelectedItem(item);
    setSelectedMain("customers");  
  };

  
  const handleMainClick = (item: string) => {
    setSelectedItem(item);
    setSelectedMain(item);
    setIsAccountsOpen(false); // Close accounts submenu when clicking a new main menu item
  };

  return (
    <div
      className="w-64 min-h-screen p-4"
      style={{
        backgroundColor: "#2E2E2E",
        borderTop: "1px solid #959595",
      }}
    >
      {/* Navigation */}
      <nav className="mt-6 space-y-2">
        {/* Home Section */}
        <Link
          href="/"
          className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
            selectedMain === "dashboard" ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("dashboard")}
        >
          <LayoutGrid className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        {/* Pages Section */}
        <h3 className="text-gray-400 text-sm mt-4">Pages</h3>

        {/* Accounts Dropdown */}
        <button
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md ${
            selectedMain === "customers" ? "bg-[#FF8B00]/[0.64]" : "hover:bg-gray-700"
          }`}
          onClick={() => {
            setIsAccountsOpen(!isAccountsOpen);
            setSelectedMain("customers"); // Set "Accounts" as active
          }}
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>Customers</span>
          </div>
          {isAccountsOpen ? <ChevronDown /> : <ChevronRight />}
        </button>

        {/* Sub-menu */}
        {isAccountsOpen && (
          <div className="ml-6 mt-1 space-y-1">
            {[{Label:"List", route:"customers"}, {Label: "Add customer", route:"add-customer"}].map((item) => (
              <Link
                key={item.Label}
                href={`/${item.route}`}
                className={`flex items-center gap-2 px-2 py-1 text-sm rounded-md ${
                  selectedItem === item.Label ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
                }`}
                onClick={() => handleSubmenuClick(item.Label)}
              >
                <span className="text-lg">•</span> {item.Label.charAt(0).toUpperCase() + item.Label.slice(1)}
              </Link>
            ))}
          </div>
        )}

        {/* Devices Section */}
        <Link
          href="/sales"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedMain === "sales" ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("sales")}
        >
          <IdCard className="w-5 h-5" />
          <span>Sales</span>
        </Link>

        {/* Environments Section */}
        <Link
          href="/devis"
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
            selectedMain === "devis" ? "bg-[#FF8B00]/[0.64]" : "text-gray-300 hover:text-white"
          }`}
          onClick={() => handleMainClick("devis")}
        >
          <IdCard className="w-5 h-5" />
          <span>Devis</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
