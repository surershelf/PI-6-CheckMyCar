
let vehicles = [];

export async function listVehicles(userId) {

  return [...vehicles];
}

export async function createVehicle(userId, data) {
  const newVehicle = {
    id: String(Date.now()),
    userId,
    ...data,
  };
  vehicles = [...vehicles, newVehicle];
  return newVehicle;
}

export async function updateVehicle(id, data) {
  vehicles = vehicles.map(v => v.id === id ? { ...v, ...data } : v);
}

export async function deleteVehicle(id) {
  vehicles = vehicles.filter(v => v.id !== id);
}
