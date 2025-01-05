import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Car as CarIcon, CreditCard, Mail, Phone, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
  carName: string;
}

const RentModal = ({ isOpen, onClose, carName }: RentModalProps) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...formData,
      startDate,
      endDate,
      carName
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <CarIcon className="h-6 w-6" />
            Rent {carName}
          </DialogTitle>
          <DialogDescription>
            Please fill out the form below to rent the vehicle. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid gap-4">
              <div className="relative">
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Avni Guzen"
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
                    placeholder="guzenavni@gmail.com"
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
            </div>
          </div>

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
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Information</h3>
            <div className="grid gap-4">
              <div className="relative">
                <Label htmlFor="cardNumber" className="text-sm font-medium flex items-center gap-2 mb-1.5">
                  <CreditCard className="h-4 w-4" />
                  Card Number
                </Label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="4532 0159 8736 4526"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full pl-4 text-left"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-sm font-medium mb-1.5 block">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full pl-4 text-left"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-sm font-medium mb-1.5 block">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    required
                    maxLength={3}
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    className="w-full pl-4 text-left"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Complete Reservation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RentModal; 