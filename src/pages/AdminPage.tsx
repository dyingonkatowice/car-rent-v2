import { useState, useEffect, useMemo, memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Car,
  RentalWithDetails,
  getCarsFromFirestore,
  updateCarInFirestore,
  addCarToFirestore,
  deleteCarFromFirestore,
} from '../utils/firebase-admin';
import { collection, getDocs, query, orderBy, limit, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';

// Memoized components for better performance
const StatsCard = memo(({ title, value }: { title: string; value: string | number }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
));
StatsCard.displayName = 'StatsCard';

type RentalStatus = 'pending' | 'active' | 'completed' | 'cancelled';

const RentalRow = memo(({ rental, onUpdateStatus }: { 
  rental: RentalWithDetails; 
  onUpdateStatus: (id: string, status: RentalStatus) => void;
}) => (
  <TableRow>
    <TableCell className="font-medium">{rental.car?.name}</TableCell>
    <TableCell>{rental.userId}</TableCell>
    <TableCell>{rental.startDate.toDate().toLocaleDateString()}</TableCell>
    <TableCell>{rental.endDate.toDate().toLocaleDateString()}</TableCell>
    <TableCell>${rental.totalPrice.toFixed(2)}</TableCell>
    <TableCell>
      <Select
        value={rental.status}
        onValueChange={(value: RentalStatus) => onUpdateStatus(rental.id!, value)}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue>
            <Badge
              variant={
                rental.status === 'active'
                  ? 'default'
                  : rental.status === 'completed'
                  ? 'secondary'
                  : 'destructive'
              }
            >
              {rental.status}
            </Badge>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
    </TableCell>
    <TableCell>
      <Button variant="outline" size="sm">
        View Details
      </Button>
    </TableCell>
  </TableRow>
));

const CarRow = memo(({ car, onEdit, onDelete }: { 
  car: Car; 
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
}) => (
  <TableRow>
    <TableCell className="font-medium">{car.name}</TableCell>
    <TableCell>{car.category}</TableCell>
    <TableCell>${car.specs.price}/day</TableCell>
    <TableCell>
      <Badge variant={car.available ? 'default' : 'secondary'}>
        {car.available ? 'Available' : 'Rented'}
      </Badge>
    </TableCell>
    <TableCell className="space-x-2">
      <Button variant="outline" size="sm" onClick={() => onEdit(car)}>
        Edit
      </Button>
      <Button variant="destructive" size="sm" onClick={() => onDelete(car.id!)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
));

const CarForm = memo(({ car, onSubmit, onCancel }: {
  car?: Car;
  onSubmit: (data: Partial<Car>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState<Partial<Car>>(
    car || {
      name: '',
      year: new Date().getFullYear(),
      transmission: 'Automatic',
      imageUrl: '',
      category: 'standard',
      specs: {
        engine: '',
        power: '',
        acceleration: '',
        fuelType: '',
        seating: '',
        price: 0,
        description: ''
      }
    }
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Year</Label>
          <Input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({ ...formData, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="luxury">Luxury</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Price/Day</Label>
          <Input
            type="number"
            value={formData.specs?.price}
            onChange={(e) => setFormData({
              ...formData,
              specs: { ...formData.specs!, price: parseInt(e.target.value) }
            })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          value={formData.specs?.description}
          onChange={(e) => setFormData({
            ...formData,
            specs: { ...formData.specs!, description: e.target.value }
          })}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSubmit(formData)}>Save</Button>
      </DialogFooter>
    </div>
  );
});

const RevenueChart = memo(({ data }: { data: { date: string; revenue: number }[] }) => (
  <div className="w-full space-y-4">
    <div className="flex items-center justify-between">
      {data.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="text-sm text-muted-foreground">{item.date}</div>
          <div className="h-32 w-12 bg-primary/20 rounded-t-lg relative mt-2">
            <div
              className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-500"
              style={{
                height: `${(item.revenue / Math.max(...data.map(d => d.revenue))) * 100}%`
              }}
            />
          </div>
          <div className="mt-2 text-sm font-medium">${item.revenue}</div>
        </div>
      ))}
    </div>
  </div>
));
RevenueChart.displayName = 'RevenueChart';

const AdminPage = () => {
  const [rentals, setRentals] = useState<RentalWithDetails[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarForEdit, setSelectedCarForEdit] = useState<Car | null>(null);
  const [isCarFormOpen, setIsCarFormOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Memoize stats calculation
  const stats = useMemo(() => ({
    totalRentals: rentals.length,
    activeRentals: rentals.filter(rental => rental.status === 'active').length,
    totalRevenue: rentals.reduce((sum, rental) => sum + rental.totalPrice, 0),
    availableCars: cars.filter(car => car.available).length
  }), [rentals, cars]);

  // Filter rentals and cars based on search and filters
  const filteredRentals = useMemo(() => {
    return rentals.filter(rental => {
      const matchesSearch = 
        rental.car?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.userId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !selectedStatus || rental.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [rentals, searchTerm, selectedStatus]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => 
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cars, searchTerm]);

  // Revenue data for chart
  const revenueData = useMemo(() => {
    const data: { date: string; revenue: number }[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString();
      const revenue = rentals
        .filter(rental => rental.startDate.toDate().toLocaleDateString() === dateStr)
        .reduce((sum, rental) => sum + rental.totalPrice, 0);
      data.push({ date: dateStr, revenue });
    }
    return data;
  }, [rentals]);

  const handleUpdateRentalStatus = async (rentalId: string, status: RentalStatus) => {
    try {
      const rentalRef = doc(db, 'rentals', rentalId);
      await updateDoc(rentalRef, { status });
      setRentals(prev => 
        prev.map(rental => 
          rental.id === rentalId ? { ...rental, status } : rental
        )
      );
    } catch (error) {
      console.error('Error updating rental status:', error);
    }
  };

  const handleAddCar = async (carData: Partial<Car>) => {
    try {
      await addCarToFirestore(carData as Omit<Car, 'id'>);
      const updatedCars = await getCarsFromFirestore();
      setCars(updatedCars);
      setIsCarFormOpen(false);
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleUpdateCar = async (carData: Partial<Car>) => {
    if (!selectedCarForEdit?.id) return;
    try {
      await updateCarInFirestore(selectedCarForEdit.id, carData);
      const updatedCars = await getCarsFromFirestore();
      setCars(updatedCars);
      setSelectedCarForEdit(null);
      setIsCarFormOpen(false);
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };

  const handleDeleteCar = async (carId: string) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
    try {
      await deleteCarFromFirestore(carId);
      setCars(prev => prev.filter(car => car.id !== carId));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        // Fetch rentals with limit for better performance
        const rentalsCollection = collection(db, 'rentals');
        const rentalsQuery = query(
          rentalsCollection,
          orderBy('startDate', 'desc'),
          limit(50)
        );
        const rentalsSnapshot = await getDocs(rentalsQuery);
        const rentalsData = rentalsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as RentalWithDetails[];

        // Fetch cars
        const carsData = await getCarsFromFirestore();
        
        if (mounted) {
          setRentals(rentalsData);
          setCars(carsData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Rentals" value={stats.totalRentals} />
        <StatsCard title="Active Rentals" value={stats.activeRentals} />
        <StatsCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
        <StatsCard title="Available Cars" value={stats.availableCars} />
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Revenue Trend (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={revenueData} />
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="rentals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rentals">Rentals</TabsTrigger>
          <TabsTrigger value="cars">Cars</TabsTrigger>
        </TabsList>

        <TabsContent value="rentals" className="space-y-4">
          <div className="flex justify-between items-center">
            <Select value={selectedStatus || ''} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRentals.map((rental) => (
                  <RentalRow 
                    key={rental.id} 
                    rental={rental}
                    onUpdateStatus={handleUpdateRentalStatus}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="cars" className="space-y-4">
          <div className="flex justify-between items-center">
            <Dialog open={isCarFormOpen} onOpenChange={setIsCarFormOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Car
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {selectedCarForEdit ? 'Edit Car' : 'Add New Car'}
                  </DialogTitle>
                </DialogHeader>
                <CarForm
                  car={selectedCarForEdit || undefined}
                  onSubmit={selectedCarForEdit ? handleUpdateCar : handleAddCar}
                  onCancel={() => {
                    setSelectedCarForEdit(null);
                    setIsCarFormOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Car</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price/Day</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.map((car) => (
                  <CarRow
                    key={car.id}
                    car={car}
                    onEdit={(car) => {
                      setSelectedCarForEdit(car);
                      setIsCarFormOpen(true);
                    }}
                    onDelete={handleDeleteCar}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default memo(AdminPage); 