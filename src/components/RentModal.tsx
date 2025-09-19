<<<<<<< Updated upstream
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Car as CarIcon, Mail, Phone, User, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
=======
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import { Car } from '../utils/firebase-admin';
import { createRental } from '../utils/firebase-admin';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { Timestamp } from 'firebase/firestore';
>>>>>>> Stashed changes

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car;
}

<<<<<<< Updated upstream
const RentModal = ({ isOpen, onClose, carName }: RentModalProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
=======
const calculateRentalPrice = (dailyRate: number, startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return dailyRate * diffDays;
};
>>>>>>> Stashed changes

const RentModal = ({ isOpen, onClose, car }: RentModalProps) => {
  const [user] = useAuthState(auth);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRent = async () => {
    if (!user) {
      setError('Please sign in to rent a car');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const rental = {
        carId: car.id!,
        userId: user.uid,
        startDate: Timestamp.fromDate(startDate),
        endDate: Timestamp.fromDate(endDate),
        totalPrice: calculateRentalPrice(car.specs.price, startDate, endDate),
        status: 'pending' as const,
        paymentStatus: 'pending' as const
      };

      await createRental(rental);
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create rental');
    } finally {
      setIsLoading(false);
    }
  };

/*  function setShowCarDetails(arg0: boolean): void {
    throw new Error('Function not implemented.');
  }*/

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
<<<<<<< Updated upstream
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CarIcon className="h-6 w-6" />
            Rent {carName}
          </DialogTitle>
          <DialogDescription>
            Please fill out the form below to rent the vehicle. All fields are required.
          </DialogDescription>
          <Button 
            variant="default"
            className="mt-2 h-8 text-sm"
            onClick={() => onClose()}
          >
            View Car Details
          </Button>
=======
          <DialogTitle>Rent {car.name}</DialogTitle>
>>>>>>> Stashed changes
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Select Dates</h4>
            <div className="grid gap-4">
<<<<<<< Updated upstream
              <div className="relative">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-4 text-left"
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-4 text-left"
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+48 573-206-149"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-4 text-left"
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <div className="relative">
                  <Input
                    id="address"
                    placeholder="Your address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-4 text-left"
                  />
                </div>
=======
              <div>
                <label className="text-sm text-muted-foreground">Start Date</label>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">End Date</label>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < (startDate || new Date())}
                  className="rounded-md border"
                />
>>>>>>> Stashed changes
              </div>
            </div>
          </div>

<<<<<<< Updated upstream
          {/* Rental Period */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Rental Period</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      disabled={(date) =>
                        date < new Date() || (endDate ? date > endDate : false)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={(date) =>
                        date < (startDate || new Date())
                      }
                    />
                  </PopoverContent>
                </Popover>
=======
          {startDate && endDate && (
            <div className="space-y-2">
              <h4 className="font-medium">Rental Summary</h4>
              <div className="rounded-lg border p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span>{startDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date</span>
                  <span>{endDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total Price</span>
                  <span>${calculateRentalPrice(car.specs.price, startDate, endDate).toFixed(2)}</span>
                </div>
>>>>>>> Stashed changes
              </div>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleRent} disabled={!startDate || !endDate || isLoading}>
            {isLoading ? 'Creating rental...' : 'Rent Now'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentModal; 