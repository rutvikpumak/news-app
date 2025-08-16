import React from "react";
import { newsChannel, lastUpdate } from "../../../config/config";
import "./Details.css";

// --- Props Type ---
interface DetailsProps {
  channel: string;
  published: string | Date | undefined;
  author: string | undefined;
}
const Details: React.FC<DetailsProps> = ({ channel, published, author }) => {
  return (
    <p className="details">
      {published ? lastUpdate(published.toString()) : "Unknown"} ,{" "}
      {author || "Unknown"} - {channel ? newsChannel(channel) : "Unknown"}
    </p>
  );
};

export default Details;
