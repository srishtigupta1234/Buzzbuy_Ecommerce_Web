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
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import ProductCard from "../Product/ProductCard";
import { filters, singleFilter } from "../Product/FilterData";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate } from "react-router-dom";
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

  const [categoryInput, setCategoryInput] = useState(category);

  // State to track selected filters for UI consistency
  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    size: [],
    price: null,
    minDiscount: null,
    stock: null,
    sort: sortValue || "price_low",
  });

  // Fetch products
  useEffect(() => {
    const [minPrice, maxPrice] = priceValue
      ? priceValue.split("-").map(Number)
      : [0, 10000];

    const data = {
      category,
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

  // Sync state with URL
  useEffect(() => {
    setSelectedFilters({
      color: colorValue ? colorValue.split(",") : [],
      size: sizeValue ? sizeValue.split(",") : [],
      price: priceValue,
      minDiscount: minDiscountValue,
      stock: stock,
      sort: sortValue || "price_low",
    });
    setCategoryInput(category);
  }, [category, colorValue, sizeValue, priceValue, minDiscountValue, stock, sortValue]);

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

  const handleSortChange = (value) => {
    const params = new URLSearchParams(location.search);
    params.set("sort", value);
    params.delete("page");
    setSelectedFilters({ ...selectedFilters, sort: value });
    navigate({ search: `?${params.toString()}` });
  };

  const handlePaginationChange = (event, value) => {
    const params = new URLSearchParams(location.search);
    params.set("page", value);
    navigate({ search: `?${params.toString()}` });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (categoryInput) {
      params.set("category", categoryInput);
    } else {
      params.delete("category");
    }
    params.delete("page");
    navigate({ search: `?${params.toString()}` });
  };

  const productList = products?.content || [];

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile Filters Dialog */}
      <Dialog
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30 transition-opacity" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Filters Form */}
            <form className="mt-4 border-t border-gray-200">
              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={selectedFilters[section.id].includes(
                                  option.value
                                )}
                                onChange={() =>
                                  handleFilterChange(section.id, option.value)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
              {/* Similar logic for singleFilter if needed on mobile... */}
              {singleFilter.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={section.id} // Grouping by name ensures radio behavior
                                type="radio"
                                checked={selectedFilters[section.id] === option.value}
                                onChange={() =>
                                  handleFilterChange(section.id, option.value)
                                }
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className="ml-3 min-w-0 flex-1 text-gray-500"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        
        {/* Top Bar: Search & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-6 gap-4">
           {/* Search Input */}
           <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search Products..."
                  className="block w-full rounded-md border-0 py-2 pl-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-gray-50"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                />
            </form>

          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <p
                          onClick={() => handleSortChange(option.value)}
                          className={classNames(
                            option.value === selectedFilters.sort
                              ? "font-medium text-gray-900 bg-gray-100"
                              : "text-gray-500",
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm cursor-pointer"
                          )}
                        >
                          {option.name}
                        </p>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pt-6 pb-24">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Desktop Filters */}
            <form className="hidden lg:block sticky top-20 h-fit overflow-y-auto pr-4">
              <div className="flex items-center justify-between mb-4 pb-2 border-b">
                 <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                 <FilterListIcon className="text-gray-400" />
              </div>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type="checkbox"
                                checked={selectedFilters[section.id].includes(
                                  option.value
                                )}
                                onChange={() =>
                                  handleFilterChange(section.id, option.value)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-indigo-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
              
               {/* Single Filters (Radio) */}
              {singleFilter.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon className="h-5 w-5" aria-hidden="true" />
                            ) : (
                              <PlusIcon className="h-5 w-5" aria-hidden="true" />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}`}
                                type="radio"
                                checked={selectedFilters[section.id] === option.value}
                                onChange={() =>
                                  handleFilterChange(section.id, option.value)
                                }
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-indigo-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                 <div className="flex items-center justify-center h-[50vh]">
                    <p className="text-gray-500">Loading products...</p>
                 </div>
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {productList.length > 0 ? (
                    productList.map((item) => (
                      <ProductCard key={item.id} product={item} />
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                        <p className="text-xl font-semibold text-gray-600">No products found</p>
                        <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
                    </div>
                  )}
                </div>
              )}
              
               {/* Pagination */}
               <div className="flex justify-center mt-12">
                <Pagination
                  count={products?.totalPages || 1}
                  page={pageNumber}
                  onChange={handlePaginationChange}
                  color="primary"
                  shape="rounded"
                  size="large"
                />
              </div>
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
}