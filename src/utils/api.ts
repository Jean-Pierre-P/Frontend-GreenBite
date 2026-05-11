import type { Usuario } from '../interfaces/usuario';
import type { Producto } from '../interfaces/producto';

// Rutas base
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
  return response.status === 204 ? null : response.json();
};

// ==================== PRODUCTOS (CONEXIÓN AL BFF) ====================

export const fetchProductos = async (): Promise<Producto[]> => {
  try {
    const data = await handleResponse(await fetch(`${BFF_BASE_URL}/catalogo`));
    return data.content || data;
  } catch (error) {
    console.error('Error cargando productos desde BFF:', error);
    return [];
  }
};

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

export const fetchProductoById = async (id: number): Promise<Producto | null> => {
  try {
    return await handleResponse(await fetch(`${BFF_BASE_URL}/catalogo/${id}`));
  } catch {
    return null;
  }
};

// ==================== AUTENTICACIÓN (Auth Service) ====================

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
      localStorage.setItem('userEmail', data.email);
    }
    return { success: true, usuario: data, token: data.token, rol: data.rol };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const registroMicroservicio = async (datos: any) => {
  try {
    const data = await handleResponse(await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(datos)
    }));
    return { success: true, usuario: data, message: 'Registro exitoso' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ==================== USUARIOS ====================

export const fetchUsuarios = async (): Promise<Usuario[]> => {
  try {
    const data = await handleResponse(await fetch(`${API_BASE_URL}/usuarios`, {
      headers: getHeaders(true)
    }));
    return data.content || data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    return [];
  }
};

// --- ESTA ES LA FUNCIÓN QUE TE DABA EL ERROR ---
export const obtenerUsuarioPorId = async (id: number) => {
  try {
    const data = await handleResponse(await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      headers: getHeaders(true)
    }));
    return { success: true, usuario: data };
  } catch (error: any) {
    console.error('Error obteniendo usuario:', error);
    return { success: false, message: error.message };
  }
};

export const eliminarUsuario = async (id: number) => {
  try {
    await handleResponse(await fetch(`${API_BASE_URL}/usuarios/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true)
    }));
    return { success: true, message: 'Usuario eliminado' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ==================== PEDIDOS ====================

export const fetchPedidos = async (isAdmin: boolean = false, usuarioId?: number) => {
  try {
    const token = localStorage.getItem('authToken');
    const endpoint = isAdmin ? `${API_BASE_URL}/pedidos/admin` : `${API_BASE_URL}/pedidos`;
    const headers: any = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    if (usuarioId) headers['X-User-ID'] = usuarioId.toString();

    const response = await fetch(endpoint, { headers });
    const data = await response.json();
    return data.content || data;
  } catch (error) {
    console.error('Error cargando pedidos:', error);
    return [];
  }
};

// Otros helpers necesarios para el admin
export const fetchAdmins = async (): Promise<Usuario[]> => {
    const usuarios = await fetchUsuarios();
    return usuarios.filter(u => 
        (typeof u.rol === 'string' && u.rol.toUpperCase() === 'ADMIN') ||
        (typeof u.rol === 'object' && (u.rol as any).nombre === 'ADMIN')
    );
};