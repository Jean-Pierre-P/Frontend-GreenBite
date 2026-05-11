import type { Usuario } from '../interfaces/usuario';
import type { Producto } from '../interfaces/producto';

// Rutas base
const API_BASE_URL = '/api'; // Para Auth, Usuarios y Pedidos directos
const BFF_BASE_URL = '/api/bff'; // Nueva ruta para el catálogo compuesto (BFF)

// --- HELPERS ---

const getAuthToken = (): string | null => localStorage.getItem('authToken');

const getHeaders = (auth = false): HeadersInit => {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getAuthToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text();
    let mensaje = 'Error en la solicitud';
    try {
      const errorData = JSON.parse(errorText);
      mensaje = errorData.message || errorData.mensaje || mensaje;
    } catch {
      if (errorText) mensaje = errorText;
    }
    throw new Error(`Error ${response.status}: ${mensaje}`);
  }
  return response.status === 204 ? null : response.json();
};

// ==================== PRODUCTOS (CONEXIÓN AL BFF) ====================

// Obtiene todos los productos a través del catálogo del BFF
export const fetchProductos = async (): Promise<Producto[]> => {
  try {
    const data = await handleResponse(await fetch(`${BFF_BASE_URL}/catalogo`));
    return data.content || data;
  } catch (error) {
    console.error('Error cargando productos desde BFF:', error);
    return [];
  }
};

// Función de búsqueda específica usando el BFF
export const buscarProductos = async (nombre: string): Promise<Producto[]> => {
  try {
    const data = await handleResponse(
      await fetch(`${BFF_BASE_URL}/catalogo/buscar?nombre=${encodeURIComponent(nombre)}`)
    );
    return data;
  } catch (error) {
    console.error('Error en la búsqueda vía BFF:', error);
    return [];
  }
};

// Detalle de producto individual vía BFF
export const fetchProductoById = async (id: number): Promise<Producto | null> => {
  try {
    return await handleResponse(await fetch(`${BFF_BASE_URL}/catalogo/${id}`));
  } catch {
    return null;
  }
};

// ==================== AUTENTICACIÓN Y OTROS ====================

export const loginUsuario = async (email: string, password: string) => {
  try {
    const data = await handleResponse(await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    }));
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userRole', data.rol);
    }
    return { success: true, usuario: data, token: data.token };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
