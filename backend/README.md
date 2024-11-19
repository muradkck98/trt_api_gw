# Unified Content API Project

This project provides a unified API service for content aggregation, translation, and proxy-based access. It uses **Express.js** for the server framework and integrates external APIs for fetching and processing content in multiple languages.

---

## Features

- **Unified Content Aggregation**  
  Collects content from various APIs, processes the data, and serves it through a single unified endpoint.

- **Proxy-based API Access**  
  Provides access to specific APIs based on language through a proxy endpoint.

- **Content Translation**  
  Fetches content in different languages and translates it to English using the Google Translate API.

- **Caching for Optimization**  
  Implements caching to reduce API calls and improve performance.

---

## Technologies Used

- **Node.js**: Server runtime for executing JavaScript on the server side.
- **Express.js**: Framework for building web APIs.
- **Axios**: HTTP client for API communication.
- **NodeCache**: In-memory caching to reduce API call overhead.
- **Google Translate API**: For content translation.
- **dotenv**: Environment variable management.
- **Fetch API**: Lightweight alternative for making HTTP requests.
- **Clean Architecture**: Separation of concerns between routes, controllers, and services for better maintainability.

---

## Why These Technologies?

- **Express.js**: Its simplicity and middleware support make it ideal for building REST APIs.
- **Axios & Fetch**: Reliable tools for making HTTP requests with robust error handling.
- **NodeCache**: Efficient caching layer to minimize redundant requests and improve response times.
- **Google Translate API**: A trusted service for accurate translations.
- **Clean Architecture**: Enhances code readability and facilitates testing.

---

## API Endpoints

### 1. Unified Content API
- **Endpoint**: `/api/content`  
- **Method**: `GET`  
- **Description**: Fetches and combines data from multiple APIs into a unified structure.

**Sample Response**:
```json
[
  {
    "id": "123",
    "type": "news",
    "title": "Sample Title",
    "description": "Sample Description",
    "road": "Sample Road",
    "published_date": "2024-11-19",
    "authors": [
      {
        "userName": "john_doe",
        "firstName": "John",
        "lastName": "Doe",
        "bio": "Journalist",
        "path": "/author/john_doe"
      }
    ],
    "image": "https://example.com/image.jpg",
    "language": "fra"
  }
]
```
### Proxy API

- **Endpoint**: `/api/proxy/:lang`  
- **Method**: `GET`  
- **Description**: Fetches content directly from a specific language API.  
- **Path Parameters**:  
  - `:lang`: Language code (e.g., `fra`, `ara`).  

**Sample Response**:
```json
{
  "news": [
    {
      "id": "1",
      "title": "Titre Exemple",
      "description": "Description Exemple"
    }
  ]
}
```
### Translate API

- **Endpoint**: `/api/translate/digest`  
- **Method**: `GET`  
- **Description**: Aggregates and translates content from multiple APIs into English.  

**Sample Response**:
```json
[
  {
    "source_id": "1",
    "source_language": "fra",
    "source_title": "Titre Exemple",
    "source_description": "Description Exemple",
    "translated_title": "Example Title",
    "translated_description": "Example Description"
  }
]
```
## Setup Instructions

### Prerequisites

1. **Node.js**: Install from the [Node.js Official Site](https://nodejs.org).
2. **npm or Yarn**: Comes with the Node.js installation.
3. **Environment Variables**: Create a `.env` file with the following content:
   ```env
   PORT=3000
   CACHE_TTL=300
   API_LIMIT=150
    ```
### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/muradkck98/trt_api_gw
   cd your-repo
2. **Run the following command to install the required dependencies**:

    ```bash
    npm install
    ```
    ```bash
    npm run dev
    ```
**Access the server at http://localhost:3000**