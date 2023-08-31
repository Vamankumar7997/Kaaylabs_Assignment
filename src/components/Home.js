import React, { useState, useEffect } from "react";
import "./home.css";
import axios from "axios";
const Home = () => {
  const [beers, setBeers] = useState([]);
  const [beersPerPage, setBeersPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorting, setSorting] = useState("ASC");

  useEffect(() => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then((res) => setBeers(res.data));
  }, []);

  const numPages = Math.ceil(beers.length / beersPerPage);
  const display = [...Array(numPages + 1).keys()].slice(1);

  const indexOfLastBeer = currentPage * beersPerPage;
  const indexofFirstBeer = indexOfLastBeer - beersPerPage;

  const visibleBeers = beers.slice(indexofFirstBeer, indexOfLastBeer);

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== numPages) setCurrentPage(currentPage + 1);
  };

  const sortingFun = (col) => {
    if (sorting === "ASC") {
      const sorted = [...beers].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setBeers(sorted);
      setSorting("DSC");
    }

    if (sorting === "DSC") {
      const sorted = [...beers].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setBeers(sorted);
      setSorting("ASC");
    }
  };

  return (
    <div className="container">
      <>
        <h1 className="header">Beers Table</h1>
        <table
          id="table"
          className="table table-striped table-bordered m-2 p-2"
        >
          <tr>
            <th>Name</th>
            <th>Tagline</th>
            <th onClick={() => sortingFun("first_brewed")}>Brewed Date</th>
          </tr>
          {visibleBeers.map((beer) => (
            <tr key={beer.id}>
              <td>{beer.name}</td>
              <td>{beer.tagline}</td>
              <td>{beer.first_brewed}</td>
            </tr>
          ))}
        </table>

        <p className="pagination">
          <span onClick={prevPageHandler}>Prev </span>
          {display.map((page) => (
            <span
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`${currentPage === page ? "active" : ""}`}
            >{`${page} `}</span>
          ))}
          <span onClick={nextPageHandler}> Next</span>
        </p>
      </>
    </div>
  );
};

export default Home;
