# SUPABASE-UPLOAD

An application that uses Node.js, Express.js, MongoDB, Supabase, and Multer to create, list, update, and delete items with image upload functionality.

## Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- Supabase account and storage bucket
- A `.env` file with the following environment variables:
  ```env
  MONGO_URL=<your-mongodb-connection-url>
  SUPABASE_URL=<your-supabase-url>
  SUPABASE_KEY=<your-supabase-key>
  PORT=3000 (optional, defaults to 3000)

## Endpoints
Create Item
URL: /items

Method: POST

Description: Creates a new item with an image upload.

Request Body:

name (string) - The name of the item.

image (file) - The image file to be uploaded.

Response:

201 Created - The created item.

List Items
URL: /items

Method: GET

Description: Lists all items.

Response:

200 OK - An array of items.

Update Item
URL: /items/:id

Method: PUT

Description: Updates an existing item with a new image upload.

Request Body:

name (string) - The name of the item.

image (file) - The new image file to be uploaded.

Response:

200 OK - The updated item.

Delete Item
URL: /items/:id

Method: DELETE

Description: Deletes an item by its ID.

Response:

200 OK - A message indicating the item was successfully deleted.

<!-- SUPABASE -->
ALLOW ANYONE CAN USE ROUTE POST ON SUPABASE
SQL EDITOR