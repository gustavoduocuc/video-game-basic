import { useCallback, useEffect, useMemo, useState } from "react";

const PRODUCTS_URL = "assets/data/products.json";

export function useCatalog() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    setStatus("loading");

    fetch(PRODUCTS_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Respuesta no exitosa del servidor (status ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        setProducts(data);
        setStatus("ready");
      })
      .catch((error) => {
        if (cancelled) return;
        console.error("[GameVault] No se pudo cargar el catálogo:", error);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [reloadToken]);

  const retry = useCallback(() => setReloadToken((token) => token + 1), []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = !category || product.categorySlug === category;
      const matchesSearch = !term || product.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, category, searchTerm]);

  return {
    products,
    status,
    category,
    searchTerm,
    filteredProducts,
    setCategory,
    setSearchTerm,
    retry,
  };
}
