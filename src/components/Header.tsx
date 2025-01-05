import { ModeToggle } from './ModeToggle';
import SearchBox from './SearchBox';

interface HeaderProps {
  allCars: Array<{
    id: number;
    name: string;
    year: number;
    transmission: string;
    imageUrl: string;
    specs: {
      engine: string;
      power: string;
      acceleration: string;
      fuelType: string;
      seating: string;
      price: string;
      description: string;
    };
  }>;
  onCarSelect: (car: HeaderProps['allCars'][0]) => void;
}

const Header = ({ allCars, onCarSelect }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-[1400px] mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center w-[200px]">
          <a href="/" className="text-xl font-bold">
            Rent-A-Car
          </a>
        </div>
        
        <div className="flex-1 flex justify-center max-w-3xl mx-auto px-4">
          <SearchBox cars={allCars} onCarSelect={onCarSelect} />
        </div>
        
        <div className="flex items-center justify-end w-[200px]">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;