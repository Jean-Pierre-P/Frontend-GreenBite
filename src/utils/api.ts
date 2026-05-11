import type { Usuario } from '../interfaces/usuario';
import type { Producto } from '../interfaces/producto';

const API_BASE_URL = '/api'; 
const BFF_BASE_URL = '/api/bff'; 

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
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json") && response.status !== 204) {
    return response.json();
  }
  const text = await response.text();
  return { success: true, message: text };
};

// ==================== PRODUCTOS (BFF) ====================
export const fetchProductos = async (): Promise<Producto[]> => {
  try {
    const data = await handleResponse(await fetch(`${BFF_BASE_URL}/catalogo`));
    return data.content || data;
  } catch (error) { return []; }
};

export const buscarProductos = async (nombre: string): Promise<Producto[]> => {
  try {
    return await handleResponse(await fetch(`${BFF_BASE_URL}/catalogo/buscar?nombre=${encodeURIComponent(nombre)}`));
  } catch (error) { return []; }
};

// ==================== AUTENTICACIÓN ====================
export const loginUsuario = async (email: string, password: string) => {
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
};

export const registroMicroservicio = async (datos: any) => {
  return await handleResponse(await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(datos)
  }));
};

// ==================== USUARIOS & PEDIDOS ====================
export const obtenerUsuarioPorId = async (id: number) => {
  const data = await handleResponse(await fetch(`${API_BASE_URL}/usuarios/${id}`, { headers: getHeaders(true) }));
  return { success: true, usuario: data };
};

export const crearPedido = async (pedidoData: any) => {
  const headers = getHeaders(true);
  (headers as any)['X-User-ID'] = pedidoData.usuarioId.toString();
  const data = await handleResponse(await fetch(`${API_BASE_URL}/pedidos`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(pedidoData)
  }));
  return { success: true, pedido: data, id: data.id };
};

export const fetchUsuarios = async () => handleResponse(await fetch(`${API_BASE_URL}/usuarios`, { headers: getHeaders(true) }));
export const fetchPedidos = async (isAdmin = false) => handleResponse(await fetch(isAdmin ? `${API_BASE_URL}/pedidos/admin` : `${API_BASE_URL}/pedidos`, { headers: getHeaders(true) }));