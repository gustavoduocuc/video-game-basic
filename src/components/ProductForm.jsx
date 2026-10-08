import { useState } from "react";
import { CATEGORIES } from "../data/categories.js";
import { useForm } from "../hooks/useForm.js";
import { buildProduct } from "../utils/product.js";
import { validateProduct } from "../utils/validation.js";

const FORM_ID = "product-form";
const EMPTY_VALUES = { name: "", categorySlug: "", price: "", description: "", image: "" };

export function ProductForm({ onAddProduct }) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm(EMPTY_VALUES, validateProduct);

  const handleSubmit = (event) =>
    form.submit(event, {
      invalidMessage: "Revisa los campos marcados antes de agregar el videojuego.",
      onValid: (values) => {
        const product = buildProduct(values);
        onAddProduct(product);
        return `${product.name} se agregó al catálogo.`;
      },
    });

  return (
    <div className="product-form-panel">
      <button
        type="button"
        className="btn btn-outline-primary"
        aria-expanded={isOpen}
        aria-controls={FORM_ID}
        onClick={() => setIsOpen((open) => !open)}
      >
        <i className={`bi ${isOpen ? "bi-dash-lg" : "bi-plus-lg"} me-1`} aria-hidden="true"></i>
        Agregar videojuego
      </button>

      <form
        id={FORM_ID}
        className="product-form card card-body mt-3"
        noValidate
        hidden={!isOpen}
        aria-labelledby="product-form-title"
        onSubmit={handleSubmit}
      >
        <h3 id="product-form-title" className="h5">Nuevo videojuego</h3>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label htmlFor="product-name" className="form-label">Nombre</label>
            <input
              type="text"
              id="product-name"
              name="name"
              className={form.fieldClass("name")}
              required
              value={form.values.name}
              onChange={form.handleChange}
            />
            <p className="invalid-feedback">Por favor ingresa el nombre del videojuego.</p>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="product-category" className="form-label">Categoría</label>
            <select
              id="product-category"
              name="categorySlug"
              className={form.fieldClass("categorySlug", "form-select")}
              required
              value={form.values.categorySlug}
              onChange={form.handleChange}
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIES.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.label}
                </option>
              ))}
            </select>
            <p className="invalid-feedback">Selecciona una categoría.</p>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="product-price" className="form-label">Precio (CLP)</label>
            <input
              type="number"
              id="product-price"
              name="price"
              className={form.fieldClass("price")}
              min={1}
              step={1}
              inputMode="numeric"
              required
              value={form.values.price}
              onChange={form.handleChange}
            />
            <p className="invalid-feedback">Ingresa un precio entero mayor a cero.</p>
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="product-image" className="form-label">URL de la imagen (opcional)</label>
            <input
              type="url"
              id="product-image"
              name="image"
              className="form-control"
              placeholder="https://…"
              value={form.values.image}
              onChange={form.handleChange}
            />
          </div>
          <div className="col-12">
            <label htmlFor="product-description" className="form-label">Descripción</label>
            <textarea
              id="product-description"
              name="description"
              className={form.fieldClass("description")}
              rows={2}
              required
              value={form.values.description}
              onChange={form.handleChange}
            ></textarea>
            <p className="invalid-feedback">Por favor escribe una descripción.</p>
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-primary">Agregar al catálogo</button>
        </div>
        <p id="product-form-status" className={`mt-3 mb-0${form.statusClass}`} role="status" aria-live="polite">
          {form.status?.message}
        </p>
      </form>
    </div>
  );
}
