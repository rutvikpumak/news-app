import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";

import "./PersonalizedPage.css";
import { useDispatch, useSelector } from "react-redux";
import { News } from "../../components";
import {
  setPreferredAuthors,
  setPreferredCategories,
  setPreferredSources,
} from "../../store/slices/articlesSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Accordion } from "react-bootstrap";

interface Source {
  key: string;
  name: string;
}

const PersonalizedPage: React.FC = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { articles } = useSelector((state: RootState) => state.articles);

  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCloseSidebar = () => setShow(false);
  const handleShowSidebar = () => setShow(true);

  const handleAuthorCheckboxChange = (author: string) => {
    const updated = selectedAuthors.includes(author)
      ? selectedAuthors.filter((a) => a !== author)
      : [...selectedAuthors, author];
    setSelectedAuthors(updated);
    dispatch(setPreferredAuthors(updated));
  };

  const handleSourcesCheckboxChange = (sourceName: string) => {
    const updatedNames = selectedSources.includes(sourceName)
      ? selectedSources.filter((s) => s !== sourceName)
      : [...selectedSources, sourceName];

    setSelectedSources(updatedNames);

    // Map string names to Source objects
    const updatedSources: Source[] = updatedNames.map((name) => ({
      key: name.toLowerCase().replace(/\s+/g, "-"), // or any unique key logic
      name,
    }));

    dispatch(setPreferredSources(updatedSources));
  };

  const handleCategoriesCheckboxChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    dispatch(setPreferredCategories(updated));
  };

  const uniqueSources = Array.from(
    new Set(articles.map((article) => article.source || ""))
  );
  const uniqueAuthors = Array.from(
    new Set(articles.map((article) => article.author || ""))
  );
  const uniqueCategories = Array.from(
    new Set(articles.map((article) => article.category || ""))
  );

  const filteredArticles =
    selectedSources.length === uniqueSources.length &&
    selectedAuthors.length === uniqueAuthors.length &&
    selectedCategories.length === uniqueCategories.length
      ? articles
      : articles.filter(
          (article) =>
            selectedSources.includes(article.source || "") ||
            selectedAuthors.includes(article.author || "") ||
            selectedCategories.includes(article.category || "")
        );

  return (
    <>
      <div
        className="mt-500"
        style={{
          color: "#fff",
          marginTop: "100px",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "40px",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
          }}
        >
          <h4 style={{ color: "#fff", marginBottom: "20px" }}>
            Personalize Your News Feed
          </h4>
          <Button
            variant="primary"
            size="lg"
            style={{
              padding: "10px 25px",
              fontSize: "1rem",
              borderRadius: "8px",
            }}
            onClick={handleShowSidebar}
          >
            Set Personalized News
          </Button>
        </div>
      </div>

      <div>
        <News personalized={filteredArticles} />

        <Offcanvas
          show={show}
          onHide={handleCloseSidebar}
          placement="start"
          className="bg-dark text-light"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fw-bold fs-5">
              Personalized Filter
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body style={{ overflowY: "auto" }}>
            <Accordion>
              {[
                {
                  title: "By Sources",
                  items: uniqueSources,
                  selected: selectedSources,
                  onChange: handleSourcesCheckboxChange,
                },
                {
                  title: "By Authors",
                  items: uniqueAuthors,
                  selected: selectedAuthors,
                  onChange: handleAuthorCheckboxChange,
                },
                {
                  title: "By Categories",
                  items: uniqueCategories,
                  selected: selectedCategories,
                  onChange: handleCategoriesCheckboxChange,
                },
              ].map(({ title, items, selected, onChange }, index) => (
                <Accordion.Item eventKey={String(index)} key={title}>
                  <Accordion.Header>{title}</Accordion.Header>
                  <Accordion.Body>
                    <div className="d-flex flex-column gap-2">
                      {items.map((item) => (
                        <Form.Check
                          key={`${title}-${item}`}
                          type="checkbox"
                          id={`${title}-${item}`}
                          label={item}
                          value={item}
                          checked={selected.includes(item)}
                          onChange={() => onChange(item)}
                        />
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Offcanvas.Body>

          <div className="p-3 border-top">
            <Button
              variant="primary"
              className="w-100"
              onClick={handleCloseSidebar}
            >
              Close
            </Button>
          </div>
        </Offcanvas>
      </div>
    </>
  );
};

export default PersonalizedPage;
