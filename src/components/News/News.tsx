import React from "react";
import { useSelector } from "react-redux";
import { Container, Header, card } from "./index";
import { Col, Row } from "react-bootstrap";
import { header, capitaLize } from "../../config/config";
import { NewsCard } from "../index";
import Loading from "../Loading/Loading";
import NoDataFound from "../NoDataFound/NoDataFound";
import type { RootState } from "../../store/store"; // assuming you exported RootState

// --- Props Type ---
interface NewsProps {
  personalized?: any;
  handleShowSidebar?: () => void;
}

const News: React.FC<NewsProps> = ({ personalized }) => {
  const personalizedClass = personalized ? "personalized" : "";

  let { articles, status, filters } = useSelector(
    (state: RootState) => state.articles
  );
  articles = personalized ? personalized : articles;

  const heading = personalized
    ? "personalized"
    : filters.query
    ? filters.query
    : filters.category;

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : personalized && articles.length < 1 ? (
        <div className="notify-container"></div>
      ) : (
        <div className={personalizedClass}>
          <Header>{header(capitaLize(heading))}</Header>
          {articles.length < 1 ? (
            <NoDataFound />
          ) : (
            <Container>
              <Row>
                {articles.map((element: any, index: number) => (
                  <Col sm={12} md={6} lg={4} xl={3} style={card} key={index}>
                    <NewsCard
                      title={element.title}
                      description={element.description}
                      published={element.publishedAt}
                      channel={element.source} // assuming source has name
                      alt="News image"
                      imageUrl={element.imgSrc} // adjust based on your Article type
                      urlNews={element.url}
                      author={element.author || "Unknown"}
                      element={element}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
          )}
        </div>
      )}
    </>
  );
};

export default News;
