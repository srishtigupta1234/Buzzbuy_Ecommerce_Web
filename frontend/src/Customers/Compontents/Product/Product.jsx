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
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductCard from "./ProductCard";
import { filters, singleFilter } from "./FilterData";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../State/Product/Action";
import Pagination from "@mui/material/Pagination";

const sortOptions = [
  { name: "Price: Low to High", value: "price_low" },
  { name: "Price: High to Low", value: "price_high" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("discount");

  const minDiscountValue =
    discount && discount !== "null" ? Number(discount) : null;

  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.products);
  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue == null ? [0, 10000] : priceValue.split("-").map(Number);

    const data = {
      category: param.levelThree,
      colors: colorValue ? colorValue.split(",") : [],
      sizes: sizeValue ? sizeValue.split(",") : [],
      minPrice,
      maxPrice,
      discount: minDiscountValue,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 12,
      stock: stock || null,
    };

    dispatch(findProducts(data));
  }, [
    param.levelThree,
    colorValue,
    sizeValue,
    priceValue,
    discount,
    sortValue,
    pageNumber,
    stock,
  ]);

  const [selectedFilters, setSelectedFilters] = useState({
    color: [],
    size: [],
    price: null,
    discount: null,
    stock: null,
    sort: sortValue || "price_low",
  });
  useEffect(() => {
    setSelectedFilters({
      color: colorValue ? colorValue.split(",") : [],
      size: sizeValue ? sizeValue.split(",") : [],
      price: priceValue,
      discount: minDiscountValue,
      stock: stock,
      sort: sortValue || "price_low",
    });
  }, [colorValue, sizeValue, priceValue, minDiscountValue, stock, sortValue]);

  const productList = products?.content || [];
  const handleFilter = (sectionId, value) => {
    const searchParams = new URLSearchParams(location.search);

    // 🔥 reset page on filter change
    searchParams.delete("page");

    if (Array.isArray(selectedFilters[sectionId])) {
      let values = searchParams.get(sectionId)
        ? searchParams.get(sectionId).split(",")
        : [];

      if (values.includes(value)) {
        values = values.filter((v) => v !== value);
      } else {
        values.push(value);
      }

      values.length
        ? searchParams.set(sectionId, values.join(","))
        : searchParams.delete(sectionId);
    } else {
      value == null
        ? searchParams.delete(sectionId)
        : searchParams.set(sectionId, value);
    }

    navigate({ search: `?${searchParams.toString()}` });
  };

  const handleSortChange = (value) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set("sort", value); // update sort in URL
    searchParams.delete("page"); // reset page to 1 when sorting

    navigate({ search: `?${searchParams.toString()}` });

    setSelectedFilters((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  const handleFilterChange = (type, value) => {
    handleFilter(type, value);

    setSelectedFilters((prev) => {
      // MULTI
      if (Array.isArray(prev[type])) {
        return {
          ...prev,
          [type]: prev[type].includes(value)
            ? prev[type].filter((v) => v !== value)
            : [...prev[type], value],
        };
      }
      // SINGLE
      return { ...prev, [type]: value };
    });
  };
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    navigate({ search: `?${searchParams.toString()}` });
  };

  return (
    <div className="bg-white">
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
              <XMarkIcon className="size-6" />
            </button>
          </div>

          <form className="mt-4">
            {/* MULTI FILTERS */}
            {filters.map((section) => (
              <Disclosure key={section.id} as="div" className="py-4">
                <DisclosureButton className="flex w-full justify-between">
                  {section.name}
                  <PlusIcon className="size-4" />
                </DisclosureButton>
                <DisclosurePanel className="pt-4 space-y-3">
                  {section.options.map((option, idx) => (
                    <label key={idx} className="flex gap-2 text-sm">
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

            {/* SINGLE FILTERS */}
            {singleFilter.map((section) => (
              <Disclosure key={section.id} as="div" className="py-4">
                <DisclosureButton className="flex w-full justify-between">
                  {section.name}
                  <PlusIcon className="size-4" />
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

      <main className="mx-auto px-4 lg:px-0">
        <div className="flex justify-between border-b border-gray-300 py-6 px-6">
          <h1 className="text-4xl font-bold">New Arrivals</h1>

          <div className="flex items-center gap-4 px-8">
            <Menu >
              <MenuButton className="flex items-center gap-1">
                Sort <ChevronDownIcon className="size-4" />
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
              <FunnelIcon className="size-5" />
            </button>
          </div>
        </div>

        <div className="pt-6 grid lg:grid-cols-5 gap-8 px-6">
          <div>
            <form className="hidden lg:block">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold text-gray-500 uppercase">
                  Filters
                </h2>
                <FilterListIcon className="text-gray-400" />
              </div>
              {filters.map((section) => (
                <Disclosure
                  key={section.id}
                  as="div"
                  className="py-4 border-b border-gray-300"
                >
                  <DisclosureButton className="flex w-full justify-between">
                    {section.name}
                    <PlusIcon className="size-4" />
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
                  key={section.id}
                  as="div"
                  className="py-4 border-b border-gray-300"
                >
                  <DisclosureButton className="flex w-full justify-between">
                    {section.name}
                    <PlusIcon className="size-4" />
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

          {/* ================= PRODUCTS ================= */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
            {loading && <p className="text-center py-10">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
          </div>
        </div>
        <section className="w-full px-[3.6rem]">
          <div className="px-4 py-5 flex justify-center ">
            <Pagination
              count={products?.totalPages || 1}
              page={Number(pageNumber)}
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
