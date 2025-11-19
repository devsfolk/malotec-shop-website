
# Prompt for Building a "malotec.shop" E-Commerce Replica

Build a fully functional, production-ready e-commerce website that is an exact replica of "malotec.shop". The website should be a modern, dynamic, and responsive storefront for selling mobile phones and electronics, complete with a single-page admin dashboard for managing products and categories.

## 1. Core Technologies

- **Framework:** Next.js with the App Router
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** Tailwind CSS with `tailwindcss-animate`
- **Component Library:** ShadCN UI (pre-installed, use components from `src/components/ui`)
- **Icons:** `lucide-react`
- **Font:** PT Sans
- **Data Handling:** Mock data stored in a `mock-data-persisted.json` file, managed via Next.js Server Actions.

## 2. Storefront Functionality

### 2.1. Homepage (`/`)
The homepage should be the central hub, featuring a dynamic and interactive layout.

- **Hero Banner:**
  - Create a full-width, auto-playing hero slider (`HeroSlider`) at the top of the page.
  - The slider should have a delay of 4 seconds and pause on hover.
  - It should feature at least two slides with promotional messages like "Free delivery on all orders" and "First check, then pay," each accompanied by a relevant `lucide-react` icon (e.g., `Bike`, `HandCoins`).

- **Category Selector:**
  - Below the hero banner, implement a horizontally scrollable category selector (`CategorySelector`).
  - This component should be a carousel that is easily swipeable on mobile devices without requiring a firm tap-and-drag.
  - Each category should be displayed as a card with a small, square image and its name below.
  - **Dynamic Filtering:** Clicking a category card should filter the product grid on the same page instantly, without a page reload. A "View All" button should also be present to clear the filter and show all products.

- **Product Grid:**
  - Display all products by default in a responsive grid (`ProductGrid`).
  - Each product should be shown in a `ProductCard` containing the product image, name, price, and an "Add to Cart" button.
  - The grid should dynamically update based on the category selected in the `CategorySelector`.

- **Product Detail Modal:**
  - Clicking on a product card (but not the "Add to Cart" button) should open a modal popup (`Dialog`) displaying the product's details (`ProductDetailModal`). This must not navigate to a new page.
  - The modal should feature a larger product image, name, description, price, and an "Add to Cart" button.
  - The modal's design should be clean, with rounded corners and proper padding, ensuring it is visually appealing on both desktop and mobile devices.

### 2.2. Shopping Cart & Checkout
The cart and checkout process should be seamless and dynamic.

- **Cart Side Panel:**
  - The header should feature a shopping bag icon (`ShoppingBag`) with a badge indicating the number of items in the cart (`StoreHeader`).
  - Clicking this icon should open a side panel (`Sheet`) from the right, displaying the cart's contents (`CartView`). This should not be a new page.
  - Inside the panel, users should be able to view items, adjust quantities (increase, decrease), and remove items. The total price should update automatically.
  - If the cart is empty, a "Start Shopping" button should be displayed, which closes the panel and returns the user to the storefront.

- **Checkout Process:**
  - From the cart (either the side panel or the dedicated `/cart` page), a "Proceed to Checkout" button should lead to the checkout form.
  - The checkout process is consolidated on the `/cart` page, where the `CheckoutForm` is displayed alongside the `CartView`.
  - The form should collect the customer's Name, Phone Number, and Shipping Address.
  - Upon submission, the form should gather all order details (customer info and cart items) and open a pre-filled WhatsApp chat with a designated number to confirm the order.

## 3. Admin Dashboard (`/dmalo`)
The dashboard must be a fast, single-page application for easy store management.

- **Authentication:**
  - The entire dashboard, starting from `/dmalo`, must be password-protected.
  - Create a login page at `/dmalo` that redirects to `/dmalo/dashboard` upon successful authentication using a server action and cookies.
  - The admin should remain authenticated until they explicitly log out.

- **Single-Page Architecture:**
  - The dashboard should use a single layout (`/dmalo/dashboard/layout.tsx`). All content for "Dashboard," "Products," "Categories," and their sub-pages (like editing a product) must render dynamically within this layout without full page reloads.
  - Implement client-side navigation using Next.js `Link` and `useRouter`.

- **Navigation:**
  - A persistent sidebar (`AdminNav`) should allow navigation between the Dashboard, Products, and Categories sections.
  - On mobile, this navigation should be accessible via a slide-in `Sheet` menu.
  - A "Back" button must be present in the header to allow easy navigation back from form pages to list pages.

- **CRUD Functionality (Products & Categories):**
  - **List Views:** Create dynamic list pages for both products and categories (`AdminProductList`, `AdminCategoryList`) that display all items in a table. Each item should have "Edit" and "Delete" actions. Deleting an item should optimistically update the UI by removing it from the list instantly.
  - **Form Views:** Create dynamic forms (`AdminProductForm`, `AdminCategoryForm`) for adding and editing products/categories.
  - **Image Handling:** The forms must include an `ImageUploader` component that supports both file uploads (converted to data URI) and pasting image URLs.
  - **Data Persistence:** All create, update, and delete operations should be handled by Next.js Server Actions that write the changes to the `mock-data-persisted.json` file.

## 4. Data Structure
- **`src/lib/types.ts`:** Define the TypeScript types for `Product`, `Category`, and `CartItem`.
- **`src/lib/mock-data-persisted.json`:** This file will act as the database, storing arrays of product and category objects.
- **`src/lib/actions.ts`:** Contains all server actions for logging in, logging out, and performing CRUD operations on the mock data file. Use `revalidatePath` to ensure data is refreshed after mutations.

This prompt covers all the features and functionality required to build a complete and identical replica of malotec.shop.
