import type { ProductData } from "~/components/ProductCard.vue";

export const useProductCatalog = defineStore("productCatalog", () => {
  const productCatalog = ref<ProductData[]>([]);
  const catalogFilteredByBrand = ref<ProductData[]>([]);

  /**
   * Fetches the product catalog data from a JSON file and populates the `productCatalog` array.
   * This function is automatically called when the store is initialized.
   */
  const fetchProductCatalog = async (): Promise<void> => {
    const response = await useFetch("/api/products");
    productCatalog.value = response.data.value;
  };

  const productCatalogFiltered = computed<ProductData[]>(() => {
    return productCatalog.value;
  });

  /**
   * Filters the product catalog by a specific brand and updates the `catalogFilteredByBrand` array.
   *
   * @param brand - The brand name to filter the product catalog by.
   */
  const productCatalogFilteredByBrand = (brand: string): void => {
    catalogFilteredByBrand.value = productCatalog.value.filter(
      (product: ProductData) =>
        product.name.toLowerCase().includes(brand.toLowerCase())
    );
  };
  fetchProductCatalog();
  return {
    productCatalog: productCatalog as Ref<ProductData[]>,
    fetchProductCatalog,
    productCatalogFiltered: productCatalogFiltered as ComputedRef<
      ProductData[]
    >,
    productCatalogFilteredByBrand,
    catalogFilteredByBrand: catalogFilteredByBrand as Ref<ProductData[]>,
  };
});

export const useComposableProductCatalogStore = () => {
  const { fetchProductCatalog, productCatalogFilteredByBrand } =
    useProductCatalog();
  const { catalogFilteredByBrand, productCatalog, productCatalogFiltered } =
    storeToRefs(useProductCatalog());
  return {
    fetchProductCatalog,
    productCatalogFilteredByBrand,
    catalogFilteredByBrand,
    productCatalog,
    productCatalogFiltered,
  };
};
