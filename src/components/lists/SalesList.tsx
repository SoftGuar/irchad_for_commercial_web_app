"use client";
import AddSale from "@/components/popups/AddSale";
import DeleteSale from "@/components/popups/DeleteSale";
import EditSale from "@/components/popups/EditSale";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { salesApi } from "@/services/salesApi";
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
  const [saleToEdit, setSaleToEdit] = useState<Sale | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [sales, setSales] = useState<Sale[]>(salesData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSort, setSelectedSort] = useState<string>("Name");
  const sortingOptions = ["Name", "Adding date"];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(sales.length / itemsPerPage);

  const openAddAccountPopup = () => setShowPopup("add");
  const openEditAccountPopup = (account: Sale) => {
    setSaleToEdit(account);
    setShowPopup("edit");
  };
  const openDeleteAccountPopup = (account: Sale) => {
    setSaleToDelete(account);
    setShowPopup("delete");
  };
  const closePopup = () => {
    setShowPopup(null);
    setSaleToEdit(null);
    setSaleToDelete(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    if (value.trim() !== "") {
      setSales(salesData.filter((sale) => sale.userName.toLowerCase().includes(value)));
    } else {
      setSales(salesData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...sales];

    switch (sortOption) {
      case "Use name":
        sortedItems.sort((a, b) => a.userName.localeCompare(b.userName));
        break;
      case "Adding date":
        sortedItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    setSales(sortedItems);
  };

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await salesApi.transactions.getAllSales();
          
      if (response.success) {
        const formattedSales = response.data.map((sale: Sale) => ({
          id: sale.id,
          userName: sale.userName,
          commercialName: sale.commercialName,
          dispositiveId: sale.dispositiveId,
          Status: sale.Status,
          date: new Date(sale.date).toISOString().split('T')[0],
        }));
            
        setSales(formattedSales);
      } else {
        setError('Failed to fetch sales');
      }
    } catch (err) {
      console.error('Error fetching sales:', err);
      setError('An error occurred while fetching sales');
    } finally {
      setLoading(false);
    }
  };

  const displayedAccounts = sales.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        itemCount={sales.length}
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
          {showPopup === "add" && <AddSale closePopup={closePopup} onSaleAdded={fetchSales} />}
          {showPopup === "edit" && saleToEdit && <EditSale sale={saleToEdit} closePopup={closePopup} />}
          {showPopup === "delete" && saleToDelete && <DeleteSale closePopup={closePopup} saleId={saleToDelete.id} onSaleDeleted={fetchSales} />}
        </PopUpScreen>
      )}
    </div>
  );
};

export default SalesList;
