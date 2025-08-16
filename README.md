# News Aggregator Application

### Overview

This project is a news aggregator website built with React.ts. The application pulls articles from various sources and displays them in a clean, easy-to-read format. Users can search for articles by keyword, filter results by date, category, and source, and create a personalized news feed. The application is mobile-responsive and optimized for viewing on various devices

### Features

1. Article Search and Filtering
   Users can search for articles by entering keywords.
   Filtering options are available by date, category, and source.
2. Personalized News Feed
   Users can customize their news feed by selecting preferred sources, categories, and authors.
3. Mobile-Responsive Design
   The website is optimized for both desktop and mobile devices.
4. Data Sources
   The application uses the following data sources:

### NEWS API Used

- NewsAPI
- The Guardian API
- New York Times API
- GNews API

### Technologies Used

- **Frontend:** React.js (CRA + TypeScript), React Bootstrap, Styled Components
- **State Management:** Redux Toolkit
- **API Requests:** Axios
- **Date Handling:** Moment.js
- **Containerization:** Docker, Docker Compose

### Project Structure

```
news-aggregator/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── components/
│   │   ├── Error
│   │   │   ├── Error.ts
│   │   ├── Loading
│   │   │   ├── index.ts
│   │   │   ├── Loading.tsx
│   │   ├── NavBar
│   │   │   ├── Loading.css
│   │   │   ├── Loading.tsx
│   │   ├── News
│   │   │   ├── index.tsx
│   │   │   ├── News.css
│   │   │   ├── News.tsx
│   │   ├── NewsCard
│   │   │   ├── Details
│   │   │		│   ├── Details.css
│   │   │		│   ├── Details.tsx
│   │   │   ├── NewsCard.css
│   │   │   ├── NewsCard.tsx
│   │   ├── NoDataFound
│   │   │   ├── NoDataFound.css
│   │   │   ├── NoDataFound.tsx
│   │   ├── NoRouteFound
│   │   │   ├── NoRouteFound.tsx
│   │   ├── ScrollToTop
│   │   │   ├── ScrollToTop.tsx
│   │   ├── index.ts
│   │   └── ...
│   │
│   ├── config/
│   │   ├── api.ts
│   │   ├── config.ts
│   │   └── ...
│
│   ├── pages/
│   │   ├── HomePage
│   │   │   ├── HomePage.tsx
│   │   ├── PersonalizedPage
│   │   │   ├── PersonalizedPage.ts
│   │   └── ...
│   │
│   ├── router/
│   │   ├── appRouter.tsx
│   │   └── ...
│   │
│   ├── store/
│   │   ├── slices/
│   │   │   ├── articlesSlice.ts
│   │   └── store.ts
│   │
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   └── ...
│
├── .dockerignore
├── .env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package.tson
└── ...
```

### Implementation Details

1. Search and Filtering

- SearchBar Component: Allows users to search articles by entering keywords. This triggers a search request to the selected data sources.
- FilterOptions Component: Users can filter articles based on categories, date ranges, and sources. This component interacts with Redux to update the filter criteria.

2. Personalized News Feed

- PersonalizedFeed Component: Displays a custom news feed based on user preferences such as preferred categories, sources, and authors. User preferences are stored in Redux and used to fetch and display relevant articles.

3. Mobile-Responsive Design

- Responsive Layout: The UI components are designed using React Bootstrap, ensuring the layout adjusts for different screen sizes. Media queries are used for custom styling on mobile devices.

4. API Integration

- api.ts contains four different data sources newsAPI, guardianAPI, nytAPI, and gnewsAPI: These service file handle API requests to the respective data sources. It contains functions to fetch data, and convert all the data into normalize data which are used in Redux actions and components.

5. State Management

- Redux Toolkit: Used to manage the state of the application, including articles fetched, user preferences, and filter criteria. Redux slices (articlesSlice.ts) are created to handle specific aspects of the state.

## Dockerization

### Dockerfile

The Dockerfile defines the steps to build the Docker image for the application.

1. **Use an official Node.js runtime as a parent image**
   `FROM node:18-alpine`

2. **Set the working directory in the container**
   `WORKDIR /app`

3. **Copy package.json and package-lock.json files**
   `COPY package*.json ./`

4. **Install the dependencies**
   `RUN npm install`

5. **Copy the rest of the application files**
   `COPY . .`

6. **Build the React app**
   `RUN npm run build`

7. **Install serve globally**
   `RUN npm install -g serve`

8. **Expose port 5000 to access the app**
   `EXPOSE 5000`

9. **Start the application using serve**
   `CMD ["serve", "-s", "build", "-l", "5000"]`

## Docker Compose

The docker-compose.yaml file simplifies running the application with proper port mapping and restart policies.

```yaml
version: "3.8"

services:
  web:
    build: .
    container_name: news_aggregator_c
    ports:
      - "3000:5000"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

## Build and Run the Docker Container

1. **Build the Docker Image**: Open a terminal in the root directory of your project and run:

   ```bash
   docker build -t news-aggregator .
   ```

2. **Run the Docker Container**: To start a container from your image, run:

   ```bash
   docker run -p 3000:5000 news-aggregator
   ```

   If using Docker Compose, you can build and run the container with:

   ```bash
   docker-compose up --build
   ```

### Project Setup and Dockerization

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/yourusername/news-aggregator.git
   cd news-aggregator
   ```

2. **Install Docker**:
   Ensure Docker is installed on your machine. You can download it from Docker's official website.

3. **Build the Docker Image**:

   ```bash
   docker build -t news-aggregator .
   ```

4. **Run the Docker Container**:

   ```bash
   docker run -p 3000:5000 news-aggregator
   ```

   Alternatively, if you are using Docker Compose, run:

   ```bash
   docker-compose up --build
   ```

5. **Access the Application**:
   Open your web browser and go to http://localhost:3000 to see the application running.

6. **Stopping the Container**:
   If you started the container with Docker Compose, stop it using:

   ```bash
   docker-compose down
   ```

   If you started the container directly, find the container ID with:

   ```bash
   docker ps
   ```

   Then stop it with:

   ```bash
   docker stop <container_id>
   ```
