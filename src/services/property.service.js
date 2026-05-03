import { fetchAPI } from '@/lib/api';

export async function getProperties() {
  return fetchAPI('/properties');
}

export async function getPropertyById(id) {
  return fetchAPI(`/properties/${id}`);
}