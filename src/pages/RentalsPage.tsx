import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { getUserRentals, RentalWithDetails } from '../utils/firebase-admin';
import { Button } from "../components/ui/button";
import { Car, AlertCircle } from 'lucide-react';

const RentalsPage = () => {
  const [user] = useAuthState(auth);
  const [rentals, setRentals] = useState<RentalWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRentals = async () => {
      if (user) {
        try {
          const userRentals = await getUserRentals(user.uid);
          setRentals(userRentals);
        } catch (error) {
          setError('Failed to load rentals');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRentals();
  }, [user]);

  const getStatusColor = (status: RentalWithDetails['status']) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'active':
        return 'text-green-500';
      case 'completed':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">My Rentals</h1>

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-500 mb-4">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-6">
        {rentals.length === 0 ? (
          <div className="text-center py-12">
            <Car className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium">No rentals found</h3>
            <p className="text-muted-foreground">
              You haven't rented any cars yet.
            </p>
          </div>
        ) : (
          rentals.map((rental) => (
            <div
              key={rental.id}
              className="border rounded-lg p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="w-full md:w-48 h-32">
                <img
                  src={rental.car.imageUrl}
                  alt={rental.car.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{rental.car.name}</h3>
                  <p className={`text-sm font-medium ${getStatusColor(rental.status)} capitalize`}>
                    {rental.status}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                      {formatDate(rental.startDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p className="font-medium">
                      {formatDate(rental.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Daily Rate</p>
                    <p className="font-medium">
                      ${rental.car.specs.price.toFixed(2)}/day
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Price</p>
                    <p className="font-medium">
                      ${rental.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                {rental.status === 'pending' && (
                  <div className="flex gap-4">
                    <Button variant="outline" className="text-red-500 hover:text-red-600">
                      Cancel Rental
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RentalsPage; 