import React from "react";
import { Button, Card } from "react-bootstrap";
import "./NewsCard.css";
import { Details } from "../index";

// --- Props Type ---
interface NewsCardProps {
  imageUrl: string;
  alt?: string;
  description?: string;
  title: string;
  channel: string;
  published?: string | Date;
  urlNews: string;
  author?: string;
  element?: any;
}

const NewsCard: React.FC<NewsCardProps> = ({
  imageUrl,
  alt,
  description,
  title,
  channel,
  published,
  urlNews,
  author,
  element,
}) => {
  return (
    <Card className="card">
      <Card.Img
        className="card-img"
        variant="top"
        src={
          imageUrl ||
          "https://thumbs.dreamstime.com/b/bright-blue-orange-text-displays-breaking-news-digital-screen-surrounded-abstract-data-visualization-elements-386391298.jpg?w=768"
        }
        alt={alt}
      />
      <Card.Body>
        <Details channel={channel} published={published} author={author} />

        <Card.Title>{title}</Card.Title>
        <Card.Text className="card-description">
          {description?.substr(0, 150)}
        </Card.Text>
        <Button className="card-btn" href={urlNews} target="_blank">
          Read more
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NewsCard;
