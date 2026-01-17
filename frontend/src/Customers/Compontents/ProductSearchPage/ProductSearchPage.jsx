import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import ProductCard from "../Product/ProductCard";
import { filters, singleFilter } from "../Product/FilterData";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";

const sortOptions = [
  { name: "Price: Low to High", value: "price_low" },
  { name: "Price: High to Low", value: "price_high" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductSearchPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.products);

  const searchParams = new URLSearchParams(location.search);

  // Read filters from URL
  const category = searchParams.get("category") || "";
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const minDiscountValue = searchParams.get("discount");
  const sortValue = searchParams.get("sort") || "price_low";
  const pageNumber = Number(searchParams.get("page") || 1);
  const stock = searchParams.get("stock");

  // Fetch products whenever filters/sort/page change
  useEffect(() => {
    const [minPrice, maxPrice] = priceValue
      ? priceValue.split("-").map(Number)
      : [0, 10000];

    const data = {
      category, // use category as main query param
      colors: colorValue ? colorValue.split(",") : [],
      sizes: sizeValue ? sizeValue.split(",") : [],
      minPrice,
      maxPrice,
      discount: minDiscountValue ? Number(minDiscountValue) : null,
      sort: sortValue,
      pageNumber: pageNumber - 1,
      pageSize: 12,
      stock: stock || null,
    };

    dispatch(findProducts(data));
  }, [
    category,
    colorValue,
    sizeValue,
    priceValue,
    minDiscountValue,
    sortValue,
    pageNumber,
    stock,
    dispatch,
  ]);

  // Handle filter changes
  const handleFilterChange = (type, value) => {
    const params = new URLSearchParams(location.search);
    params.delete("page");

    let updatedFilters = { ...selectedFilters };

    if (type === "color" || type === "size") {
      let values = params.get(type) ? params.get(type).split(",") : [];
      if (values.includes(value)) {
        values = values.filter((v) => v !== value);
      } else {
        values.push(value);
      }
      values.length ? params.set(type, values.join(",")) : params.delete(type);
      updatedFilters[type] = values;
    } else {
      if (value == null) {
        params.delete(type);
        updatedFilters[type] = null;
      } else {
        params.set(type, value);
        updatedFilters[type] = value;
      }
    }

    setSelectedFilters(updatedFilters);
    navigate({ search: `?${params.toString()}` });
  };

  // Handle sort
  const handleSortChange = (value) => {
    const params = new URLSearchParams(location.search);
    params.set("sort", value);
    params.delete("page");
    setSelectedFilters({ ...selectedFilters, sort: value });
    navigate({ search: `?${params.toString()}` });
  };
  useEffect(() => {
    setCategoryInput(category);
  }, [category]);

  // Pagination
  const handlePaginationChange = (event, value) => {
    const params = new URLSearchParams(location.search);
    params.set("page", value);
    navigate({ search: `?${params.toString()}` });
  };
  // Replace the search bar handling with category
  const [categoryInput, setCategoryInput] = useState(category);

  // Handle search submit by updating "category" in URL
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (categoryInput) {
      params.set("category", categoryInput); // update category param
    } else {
      params.delete("category");
    }
    params.delete("page"); // reset to first page
    navigate({ search: `?${params.toString()}` });
  };

  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    size: [],
    price: null,
    minDiscount: null,
    stock: null,
    sort: sortValue || "price_low",
  });
  useEffect(() => {
    setSelectedFilters({
      color: colorValue ? colorValue.split(",") : [],
      size: sizeValue ? sizeValue.split(",") : [],
      price: priceValue,
      minDiscount: minDiscountValue,
      stock: stock,
      sort: sortValue || "price_low",
    });
  }, [colorValue, sizeValue, priceValue, minDiscountValue, stock, sortValue]);

  const productList = products?.content || [];

  return (
    <div className="bg-white">
      {/* Mobile Filters */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-40 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/25" />
        <DialogPanel className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl overflow-y-auto p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Filters</h2>
            <button onClick={() => setMobileFiltersOpen(false)}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          {/* Filters Form */}
          <form className="mt-4">
            {filters.map((section) => (
              <Disclosure as="div" key={section.id} className="py-4">
                <DisclosureButton className="flex w-full justify-between">
                  {section.name} <PlusIcon className="h-4 w-4 text-gray-500" />
                </DisclosureButton>
                <DisclosurePanel className="pt-4 space-y-3">
                  {section.options.map((option) => (
                    <label key={option.value} className="flex gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedFilters[section.id].includes(
                          option.value
                        )}
                        onChange={() =>
                          handleFilterChange(section.id, option.value)
                        }
                      />
                      {option.label}
                    </label>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            ))}
            {singleFilter.map((section) => (
              <Disclosure as="div" key={section.id} className="py-4">
                <DisclosureButton className="flex w-full justify-between">
                  {section.name} <PlusIcon className="h-4 w-4 text-gray-500" />
                </DisclosureButton>
                <DisclosurePanel className="pt-4 space-y-3">
                  {section.options.map((option) => (
                    <label key={option.value} className="flex gap-2 text-sm">
                      <input
                        type="radio"
                        name={section.id}
                        checked={selectedFilters[section.id] === option.value}
                        onChange={() =>
                          handleFilterChange(section.id, option.value)
                        }
                      />
                      {option.label}
                    </label>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </Dialog>

      {/* Main Content */}
      <main className="mx-auto px-4 lg:px-0">
        {/* Header with search and sort */}
        <div className="flex justify-center w-full border-b border-gray-300 py-6 px-6 gap-4">
          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative flex flex-1 items-center max-w-xl"
          >
            {/* Search Icon */}
            <SearchIcon className="absolute left-4 text-gray-400" />

            {/* Input */}
            <input
              type="text"
              placeholder="Search by category (men, women, kurta...)"
              className="w-full pl-11 pr-12 py-2.5 text-sm 
               rounded-xl border border-gray-300 
               bg-white text-gray-900 placeholder-gray-400
               focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
               transition duration-200"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="absolute right-2 px-3 py-1.5 
               rounded-lg text-gray-700 font-semibold hover:bg-gray-100
               transition"
            >
              Search
            </button>
          </form>

          {/* Sort and mobile filter */}
          <div className="flex items-center gap-4">
            <Menu>
              <MenuButton className="flex items-center font-semibold gap-1 px-2 py-1 rounded-xl border border-gray-300 
               bg-white text-gray-700">
                Sort <ChevronDownIcon className="h-4 w-4" />
              </MenuButton>
              <MenuItems className="absolute bg-white shadow rounded mt-2 z-50">
                {sortOptions.map((option) => (
                  <MenuItem key={option.value}>
                    <div
                      className={classNames(
                        "px-4 py-2 text-sm cursor-pointer",
                        selectedFilters.sort === option.value
                          ? "font-semibold"
                          : ""
                      )}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.name}
                    </div>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden"
            >
              <FunnelIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="pt-6 grid lg:grid-cols-5 gap-8 px-6">
          {/* Filters Sidebar */}
          <div className="hidden lg:block">
            <form>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                  Filters
                </h2>
                <FilterListIcon className="text-gray-400" />
              </div>
              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="py-4 border-b border-gray-300"
                >
                  <DisclosureButton className="flex w-full justify-between text-gray-700 font-semibold">
                    {section.name}{" "}
                    <PlusIcon className="h-4 w-4 text-gray-500" />
                  </DisclosureButton>
                  <DisclosurePanel className="pt-4 space-y-3">
                    {section.options.map((option) => (
                      <label key={option.value} className="flex gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedFilters[section.id].includes(
                            option.value
                          )}
                          onChange={() =>
                            handleFilterChange(section.id, option.value)
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
              {singleFilter.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="py-4 border-b border-gray-300"
                >
                  <DisclosureButton className="flex w-full justify-between text-gray-700 font-semibold">
                    {section.name}{" "}
                    <PlusIcon className="h-4 w-4 text-gray-500" />
                  </DisclosureButton>
                  <DisclosurePanel className="pt-4 space-y-3">
                    {section.options.map((option) => (
                      <label key={option.value} className="flex gap-2 text-sm">
                        <input
                          type="radio"
                          name={section.id}
                          checked={selectedFilters[section.id] === option.value}
                          onChange={() =>
                            handleFilterChange(section.id, option.value)
                          }
                        />
                        {option.label}
                      </label>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </form>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
            {loading && <p className="text-center py-10">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
          </div>
        </div>

        {/* Pagination */}
        <section className="w-full px-[3.6rem]">
          <div className="px-4 py-5 flex justify-center">
            <Pagination
              count={products?.totalPages || 1}
              page={pageNumber}
              onChange={handlePaginationChange}
              variant="outlined"
              color="primary"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
