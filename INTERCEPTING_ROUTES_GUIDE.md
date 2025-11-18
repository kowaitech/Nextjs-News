# Intercepting Routes in Next.js 13+ App Router - Complete Guide

## What Are Intercepting Routes?

**Intercepting routes** allow you to intercept navigation to a route and show an alternative UI (typically a modal) on top of the current page, **without triggering a full page reload**.

### Real-world Example
On an e-commerce site:
- User is on the **Products List** page (`/products`)
- User clicks a product link (e.g., `/product/1`)
- Instead of navigating away, a **modal pops up** showing product details
- The URL in the address bar shows `/product/1`
- The background is still the `/products` page
- User can close the modal with `router.back()` and return to the products list

## Folder Structure

```
app/
├── products/
│   ├── page.js                     ← Product list page
│   └── (..)product/                ← Intercepting route folder (nested!)
│       └── [id]/
│           └── page.js             ← Modal page (intercepts navigation)
├── product/
│   └── [id]/
│       └── page.js                 ← Full product page (normal route)
```

### Key Files Explanation

| File | Purpose |
|------|---------|
| `app/products/page.js` | Shows the product list. Links to `/product/[id]`. |
| `app/product/[id]/page.js` | Normal full-page product view (when URL is accessed directly). |
| `app/products/(..)product/[id]/page.js` | **Intercepts** `/product/[id]` when coming from `/products`. Shows a modal instead. |

## How Intercepting Routes Work

### The `(..)` Syntax

The folder name `products/(..)product` uses a special syntax:
- `(..)` = "intercept 2 segments up" (from `app/products/(..)product/[id]/` → intercept `/product/[id]`)
  - Going up 2 levels from `/products/(..)product/[id]/` = `/` (root)
  - From root, `/product/[id]` is intercepted
- `(.)` = intercept 1 segment up
- `(...)` = intercept routes from anywhere
- **Important**: `(..)` cannot be at the root level; it must be nested under a segment (like `products/`)

### Navigation Flow

#### Scenario 1: Click link from `/products`
```
/products page
    ↓
Click link href="/product/1"
    ↓
Next.js intercepts with (..)product/[id]/page.js
    ↓
Modal appears (no page reload)
    ↓
URL bar shows: /product/1
    ↓
Background is still /products
```

#### Scenario 2: Direct URL access
```
Type in address bar: /product/1
    ↓
Next.js does NOT intercept (route not coming from /products)
    ↓
Shows app/product/[id]/page.js (full page)
    ↓
URL bar shows: /product/1
    ↓
No background visible
```

## Code Walkthrough

### 1. Product List Page (`app/products/page.js`)

```javascript
import Link from "next/link";

export default function ProductsPage() {
  const products = [
    { id: 1, name: "Laptop", price: "$999" },
    { id: 2, name: "Smartphone", price: "$699" },
    { id: 3, name: "Tablet", price: "$399" },
  ];

  return (
    <div>
      <h1>Products List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {/* Link to /product/[id] - this will be intercepted */}
            <Link href={`/product/${product.id}`}>
              {product.name} — {product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Key Point**: The link points to `/product/[id]`, which triggers the intercepting route.

### 2. Normal Full Product Page (`app/product/[id]/page.js`)

```javascript
export default function ProductPage({ params }) {
  const product = {
    1: { name: "Laptop", price: "$999", description: "..." },
    2: { name: "Smartphone", price: "$699", description: "..." },
    3: { name: "Tablet", price: "$399", description: "..." },
  }[params.id];

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
```

**Purpose**: Shows when user:
- Accesses `/product/1` directly via URL bar
- Clicks "Full Page" button in the modal

### 3. Intercepting Route Modal (`app/(..)product/[id]/page.js`)

```javascript
"use client";

import { useRouter } from "next/navigation";

export default function ProductModal({ params }) {
  const router = useRouter();
  const { id } = params;

  return (
    <>
      {/* Backdrop - click to close */}
      <div
        style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={() => router.back()}
      />

      {/* Modal - centered dialog */}
      <div style={{ position: "fixed", top: "50%", left: "50%", ... }}>
        <h2>Product #{id}</h2>
        <p>Product details here...</p>

        {/* Close button */}
        <button onClick={() => router.back()}>
          Close Modal
        </button>

        {/* Full page button */}
        <button onClick={() => router.push(`/product/${id}`)}>
          Full Page
        </button>
      </div>
    </>
  );
}
```

**Key Points**:
- Uses `"use client"` (client component)
- `router.back()` closes the modal (returns to `/products`)
- `router.push()` navigates to full page view
- Uses `inset: 0` for full-screen backdrop
- Uses `position: "fixed"` for modal positioning

## Testing the Example

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Visit the products list**:
   - Open: http://localhost:3000/products

3. **Test interception**:
   - Click a product link → **Modal appears** (same page, URL changes to `/product/1`)
   - Click "Close Modal" → Modal closes, back to `/products`
   - Click "Full Page" → Navigates to full product page

4. **Test direct access**:
   - Open: http://localhost:3000/product/1 directly in URL bar
   - Shows full page (NOT intercepted, NOT a modal)

## Why Use Intercepting Routes?

✅ **Better UX**: No page reload, keeps scroll position
✅ **Shareable URLs**: Modal URL is bookmarkable
✅ **Fallback**: If you visit the URL directly, you get the full page
✅ **Simple implementation**: No complex state management needed
✅ **SEO-friendly**: URL changes are visible, shareable

## Common Pitfalls

❌ **Folder naming**: `(modal)` alone doesn't intercept. Must be `(..)`, `(.)`, or `(...)`
❌ **Missing `"use client"`**: Modal won't have router access
❌ **Wrong segment count**: `(..)` goes up 2 levels, not the same level
❌ **No fallback page**: If you don't have `/product/[id]/page.js`, direct access fails

## Summary

| What | Where |
|------|-------|
| **Product List** | `/app/products/page.js` |
| **Full Product Page** | `/app/product/[id]/page.js` |
| **Modal (Intercepting Route)** | `/app/products/(..)product/[id]/page.js` |
| **When intercepting happens** | Click from `/products` → modal shows |
| **When full page shows** | Direct URL access or "Full Page" button |

Happy building! 🚀
