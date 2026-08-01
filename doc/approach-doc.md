```md
# Approach – Sheets-like GST Reconciliation Grid

## Architecture

I would follow a component-based architecture with the **Grid** acting as the single source of truth for invoice data, editing state, selected rows, and active cells. UI components (`GridHeader`, `GridBody`, `GridRow`, `GridCell`) focus only on rendering, while custom hooks manage behaviors such as keyboard navigation and row selection. This keeps the code modular, reusable, and easy to maintain.

## Core Technical Challenges

### 1. Rendering Large Datasets (10k–100k rows)

Rendering thousands of rows simultaneously can impact performance and increase memory usage. I would use **row virtualization** with a small overscan buffer so that only visible rows are rendered, ensuring smooth scrolling and a constant DOM size.

### 2. Spreadsheet-like User Experience

Users expect Excel-like interactions such as keyboard navigation, inline editing, bulk selection, sorting, filtering, and copy/paste. I would implement these features as independent modules or custom hooks to keep the grid extensible and maintainable.

### 3. Efficient State Updates

Frequent edits and selections can cause unnecessary re-renders. To minimize this, I would keep the editing state local to the active cell, update only the affected rows, and use memoization with stable callbacks to maintain responsiveness.

## Build vs Buy

For this prototype, I built the grid from scratch to demonstrate my understanding of rendering, virtualization, keyboard interactions, and state management.

For a production application, I would evaluate:

- **AG Grid** – Best suited for enterprise applications with built-in virtualization, Excel-like editing, copy/paste, grouping, filtering, sorting, and pinned columns.
- **TanStack Table** – Highly flexible but requires additional development for spreadsheet-like features.
- **MUI Data Grid** – A good option if the application already uses the MUI ecosystem.

### Trade-offs of Using a Library

**Pros**
- Faster development and delivery.
- Built-in enterprise features with proven performance.
- Reduced maintenance for common grid functionality.

**Cons**
- Enterprise features may require a paid license.
- May not fully support all business-specific requirements without customization.
- Dependency on a third-party library can introduce upgrade, compatibility, or security concerns over time.

## What I'd Build First vs Later

### First (Core MVP)

- Virtualized grid
- Inline editing
- Keyboard navigation
- Row selection and bulk actions
- Validation
- Sorting and filtering

### Later

- Excel copy/paste
- Undo/Redo
- Column resizing
- Accessibility improvements
- Performance profiling
- Automated testing
- Additional Excel-like features

## Biggest Risks & Mitigation

### Performance

Use virtualization, memoized components, and optimized rendering to ensure smooth performance with large datasets.

### Feature Complexity

Keep business logic centralized and separate features into reusable hooks and components to make the codebase easier to maintain and extend.

### Data Integrity

Validate user input, provide clear save workflows before persisting reconciliation changes.
