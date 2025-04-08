"use client";
import AddSale from "@/components/popups/AddSale";
import DeleteSale from "@/components/popups/DeleteSale";
import EditSale from "@/components/popups/EditSale";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useState } from "react";
import { Sale } from "@/types/sale";

interface SalesListProps {
  title: string;
  salesData: Sale[];
}

const SalesList: React.FC<SalesListProps> = ({ title, salesData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<"add" | "edit" | "delete" | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<Sale | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Sale | null>(null);
  const [accounts, setAccounts] = useState(salesData);

  const [selectedSort, setSelectedSort] = useState<string>("Name");
  const sortingOptions = ["Name", "Adding date"];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const openAddAccountPopup = () => setShowPopup("add");
  const openEditAccountPopup = (account: Sale) => {
    setAccountToEdit(account);
    setShowPopup("edit");
  };
  const openDeleteAccountPopup = (account: Sale) => {
    setAccountToDelete(account);
    setShowPopup("delete");
  };
  const closePopup = () => {
    setShowPopup(null);
    setAccountToEdit(null);
    setAccountToDelete(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    if (value.trim() !== "") {
      setAccounts(salesData.filter((sale) => sale.userName.toLowerCase().includes(value)));
    } else {
      setAccounts(salesData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...accounts];

    switch (sortOption) {
      case "Use name":
        sortedItems.sort((a, b) => a.userName.localeCompare(b.userName));
        break;
      case "Adding date":
        sortedItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    setAccounts(sortedItems);
  };

  const displayedAccounts = accounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: "id", label: "Id" },
    { key: "userName", label: "Name" },
    { key: "commercialName", label: "Agent" },
    { key: "dispositiveId", label: "Device ID" },
    { key: "Status", label: "Status" },
    { key: "date", label: "Adding date" }
  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-irchad-gray-light shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type={title.toLowerCase()}
        itemCount={accounts.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={openAddAccountPopup}
        sortingOptions={sortingOptions}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      <TableData 
        columns={columns as any} 
        data={displayedAccounts} 
        onEdit={openEditAccountPopup} 
        onDelete={openDeleteAccountPopup} 
        page={`${title.toLowerCase()}s`}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onPageSelect={setCurrentPage}
      />

      {showPopup && (
        <PopUpScreen>
          {showPopup === "add" && <AddSale closePopup={closePopup} />}
          {showPopup === "edit" && accountToEdit && <EditSale sale={accountToEdit} closePopup={closePopup} />}
          {showPopup === "delete" && accountToDelete && <DeleteSale closePopup={closePopup} />}
        </PopUpScreen>
      )}
    </div>
  );
};

export default SalesList;
