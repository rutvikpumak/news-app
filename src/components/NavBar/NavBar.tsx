import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "./NavBar.css";
import { Link, useLocation } from "react-router-dom";
import {
  setQuery,
  setSource,
  fetchArticles,
  setDate,
  setCategory,
} from "../../store/slices/articlesSlice";
import { sources, categories, capitaLize } from "../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppDispatch } from "../../store/hooks";

// --- Component ---
const NavBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const dispatch = useAppDispatch();

  const isPagePersonalized = /\/personalized/.test(currentPath);

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [selected, setSelected] = useState<any>(sources[0]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<any>(categories[0]);

  const isSearchButtonDisabled = searchInputValue.trim() === "";

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setQuery(searchInputValue));
    dispatch(
      fetchArticles({
        query: searchInputValue,
        source: selected.key,
        date: startDate,
      })
    );
    setSearchInputValue("");
  };

  const handleSelectSource = (eventKey: string | null) => {
    if (!eventKey) return;
    const selectedSource = sources.find((source) => source.key === eventKey);
    if (!selectedSource) return;
    setSelected(selectedSource);
    dispatch(setSource(selectedSource));
  };

  const handleSelectCategory = (eventKey: string | null) => {
    if (!eventKey) return;
    const selectedCat = categories.find((cat) => cat === eventKey);
    if (!selectedCat) return;
    setSelectedCategory(selectedCat);
    dispatch(setCategory(selectedCat));
  };

  const handleDateChange = (date: Date | null) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (date) {
      setStartDate(date);
    }
    dispatch(setDate(formattedDate));
  };

  useEffect(() => {
    dispatch(setSource(selected));
    dispatch(setDate(moment(startDate).format("YYYY-MM-DD")));
    dispatch(setCategory(selectedCategory));
    dispatch(
      fetchArticles({
        query: searchInputValue,
        source: selected.key,
        category: selectedCategory,
        date: moment(startDate).format("YYYY-MM-DD"),
      })
    );
    dispatch(setQuery(""));
    // eslint-disable-next-line
  }, [dispatch, selected, selectedCategory]);

  return (
    <Navbar
      className="navbar"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={!isCollapsed}
    >
      <Navbar.Brand className="nav-brand" href="/">
        <img
          src="https://media.istockphoto.com/id/929047972/vector/world-news-flat-vector-icon-news-symbol-logo-illustration-business-concept-simple-flat.jpg?s=612x612&w=0&k=20&c=5jpcJ7xejjFa2qKCzeOXKJGeUl7KZi9qoojZj1Kq_po="
          alt="Logo"
          className="logo"
        />
      </Navbar.Brand>

      {isCollapsed ? (
        <Navbar.Toggle
          className="border-0"
          aria-controls="basic-navbar-nav"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      ) : (
        <IoCloseOutline
          size={40}
          className="close-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}
      {isPagePersonalized ? (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={isPagePersonalized ? "" : "active"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/personalized"
              className={isPagePersonalized ? "active" : ""}
            >
              Personalized
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      ) : (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="active">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/personalized">
              Personalized
            </Nav.Link>
            <NavDropdown
              id="dropdown-basic-button"
              title={capitaLize(selectedCategory)} // Display the selected source's name
              onSelect={handleSelectCategory} // Handle the selection event
            >
              {categories.map((element, index) => (
                <NavDropdown.Item key={index} eventKey={element}>
                  {capitaLize(element)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <NavDropdown
              id="dropdown-basic-button"
              title={selected.name} // Display the selected source's name
              onSelect={handleSelectSource} // Handle the selection event
            >
              {sources.map((element, index) => (
                <NavDropdown.Item key={index} eventKey={element.key}>
                  {element.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <div className="date-picker">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              maxDate={new Date()}
            />
          </div>
          <Form className="search-form" onSubmit={handleSubmit}>
            <FormControl
              type="text"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              placeholder="Explore news..."
              className="form-input color-white form-control-lg mt-lg-2 mt-md-2 mt-sm-2 mt-xl-0"
            />
            <Button
              onClick={handleSubmit}
              className="search-btn mt-lg-2 ml-2 mt-md-2 mt-sm-2 mt-xl-0"
              disabled={isSearchButtonDisabled}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
};

export default NavBar;
