"use client";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useState } from "react";
import { Product } from "@/types/product";

interface AccountListProps {
  title: string;
  productsData: Product[];
  loading: boolean;
}

const ProductList: React.FC<AccountListProps> = ({ title, productsData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState(productsData);

  const [selectedSort, setSelectedSort] = useState<string>("Name");
  const sortingOptions = ["Name", "Price"];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    if (value.trim() !== "") {
      setProducts(productsData.filter((product) => product.name.toLowerCase().includes(value)));
    } else {
      setProducts(productsData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...products];

    switch (sortOption) {
      case "Name":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Price":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
    }

    setProducts(sortedItems);
  };

  const displayedAccounts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" }
  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-irchad-gray-light shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type={title.toLowerCase()}
        itemCount={products.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={()=> {}}
        sortingOptions={sortingOptions}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      <TableData 
        columns={columns as any} 
        data={displayedAccounts} 
        onEdit={()=> {}} 
        onDelete={()=> {}} 
        page={`${title.toLowerCase()}s`}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onPageSelect={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
