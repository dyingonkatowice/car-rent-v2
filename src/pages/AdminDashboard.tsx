import { useState, useEffect } from 'react';
import { getUserRentals } from '../utils/firebase-admin';
import { Rental } from '../types/rental';

const AdminDashboard = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const allRentals = await getUserRentals("admin");
        setRentals(allRentals);
      } catch (err) {
        setError('Failed to fetch rental data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Rental History</h2>
        <div className="grid gap-4">
          {rentals.map((rental) => (
            <div key={rental.id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{rental.car.name} ({rental.car.year})</h3>
                  <p className="text-gray-600">
                    Rental Period: {new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">Status: {rental.status}</p>
                  <p className="text-gray-600">Total Price: ${rental.totalPrice}</p>
                </div>
                <div>
                  <img 
                    src={rental.car.imageUrl} 
                    alt={rental.car.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Summary Statistics</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Total Rentals</h3>
            <p className="text-2xl">{rentals.length}</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Active Rentals</h3>
            <p className="text-2xl">
              {rentals.filter(rental => rental.status === 'active').length}
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Total Revenue</h3>
            <p className="text-2xl">
              ${rentals.reduce((sum, rental) => sum + rental.totalPrice, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h1>Admin Page</h1>
        {/* Add admin page content */}
      </div>
    </div>
  );
};

export default AdminDashboard;