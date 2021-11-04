import React from "react";
import Link from "next/link";

export default function Navbar() {
  const navOptions = [
    ["Home", "/"],
    ["About", "/about"],
  ];

  const pdfToolsDropdownOptions = [
    ["Merge PDF", "merge"],
    ["Split PDF", "split"],
    ["Rotate PDF", "rotate"],
  ];
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <div className="navbar-brand">PDFActions</div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {navOptions.map(([text, path], index) => (
              <li className="nav-item" key={index}>
                <Link href={path}>
                  <div className="nav-link">{text}</div>
                </Link>
              </li>
            ))}
            <li className="nav-item dropdown">
              <div
                className="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                PDF Tools
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {pdfToolsDropdownOptions.map(([text, path], index) => (
                  <li key={index}>
                    <Link href={`/pdf-tools/${path}`}>
                      <div className="dropdown-item">{text}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
