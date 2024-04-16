/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter } from "@/src/Redux/Reducers/Products";
import Pagination from "@mui/material/Pagination";

export default function Paginate({ info }) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const handleClick = (event, value) => {
    // تصحيح الكود الخاص بتعيين localStorage
    localStorage.setItem("page", String(value));
    dispatch(Filter());
    setPage(value);
  };

  const { paginate } = useSelector((state) => state.products);

  return (
    <div className="card">
      {/* استخدام مكون Pagination من Material-UI */}
      <Pagination
        page={page}
        count={paginate !== null ? parseInt(paginate?.per_page, 10) || 1 : 1}
        onChange={handleClick}
        shape="rounded"
      />
    </div>
  );
}
