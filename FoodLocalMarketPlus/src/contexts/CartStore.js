import { create } from "zustand";

const useCartStore = create((set) => ({
  montoTotal: 0,
  productos: [],
  // Funciones del carrito
  resetCart: () => set({ montoTotal: 0, productos: [] }),
  addToCart: (producto) =>
    set((state) => ({
      productos: [...state.productos, producto],
      montoTotal: state.montoTotal + producto.precio * producto.cantidad,
    })),
  deleteFromCart: (productoId) =>
    set((state) => {
      const nuevosProductos = state.productos.filter(
        (producto) => producto.id !== productoId
      );

      const nuevoMontoTotal = nuevosProductos.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );

      return {
        productos: nuevosProductos,
        montoTotal: nuevoMontoTotal,
      };
    }),
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
  initCart: (productos, montoTotal) =>
    set({ productos: productos, montoTotal: montoTotal }),
}));

export default useCartStore;
