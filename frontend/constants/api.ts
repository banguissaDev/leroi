import { Platform } from 'react-native';

// Changer l'IP selon votre réseau WiFi local
// Sur émulateur Android : 10.0.2.2
// Sur téléphone physique : l'IP de votre PC (ex: 192.168.1.100)
const LOCAL_IP = '192.168.1.100'; // ou 10.0.2.2 pour l'émulateur

export const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:3001/api' 
  : `http://${LOCAL_IP}:3001/api`;

export const ENDPOINTS = {
  vendorRegister: `${API_BASE_URL}/vendors/register`,
  vendorStatus: (id: string) => `${API_BASE_URL}/vendors/status/${id}`,
  adminVendors: `${API_BASE_URL}/admin/vendors`,
  adminApprove: (id: string) => `${API_BASE_URL}/admin/vendors/${id}/approve`,
  adminReject: (id: string) => `${API_BASE_URL}/admin/vendors/${id}/reject`,
  shops: `${API_BASE_URL}/shops`,
};
