import { create } from "zustand";

const useCartStore = create((set) => ({
  idRestaurante: null,
  montoTotal: 0,
  productos: [],
  // Funciones del carrito
  resetCart: () => set({ idRestaurante: null, montoTotal: 0, productos: [] }),
  addToCart: (producto) =>
    set((state) => ({
      productos: [...state.productos, producto],
      montoTotal: state.montoTotal + producto.precio * producto.cantidad,
    })),
  updateCartItemQuantity: (productoId, nuevaCantidad) =>
    set((state) => {
      const nuevosProductos = state.productos.map((producto) =>
        producto.id === productoId
          ? { ...producto, cantidad: nuevaCantidad }
          : producto
      );

      const nuevaListaProductos = nuevosProductos.filter((p) => p.cantidad > 0);

      const nuevoMontoTotal = nuevaListaProductos.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );

      return {
        productos: nuevosProductos,
        montoTotal: nuevoMontoTotal,
      };
    }),
  addRestaurantId: (id) => set({ idRestaurante: id }),
  initCart: (productos, montoTotal) =>
    set({ productos: productos, montoTotal: montoTotal }),
}));

export default useCartStore;
