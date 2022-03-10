import React from "react";
import { Link } from "react-router-dom";
import { Pagination} from "react-bootstrap";

export default function Paginate({
  pages,
  page,
  isAdmin = false,
  keyword = "",
}) {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <a
            tag={Link}
            key={x + 1}
            href={
              !isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` :
              `/admin/vechicals/${x+1}`
            }
          >
            <span
              style={{
                textDecoration: "none",
                marginLeft: "1rem",
                border: "1px solid orange",
                padding: "0.5rem",
              }}
            >
              {x + 1}
            </span>
          </a>
        ))}
      </Pagination>
    )
  );
}
