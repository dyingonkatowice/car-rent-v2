import { ModeToggle } from './ModeToggle';
import SearchBox from './SearchBox';
import { useState } from 'react';
interface HeaderProps {
  allCars: any[];
  onCarSelect: (car: any) => void;
}

const Header = ({ allCars, onCarSelect }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo -  LEFT */}
        <div className="w-[200px]">
          <h1 className="text-xl font-bold hover:scale-105 transition-all duration-300">Rent-A-Car</h1>
        </div>

        {/* Search - MIDDLE */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-4 max-w-3xl">
          <div className="w-full max-w-3xl">
            <SearchBox cars={allCars} onCarSelect={onCarSelect} />
          </div>
        </div>

        {/* Mode Toggle - RIGHT */}
        <div className="w-[200px] flex justify-end">
          <ModeToggle />
          
          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden p-2 ml-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed md:hidden inset-0 z-50">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <div className="fixed inset-y-0 right-0 w-[300px] bg-background shadow-lg flex flex-col h-full z-[51]">
              <div className="p-4 border-b flex items-center justify-between shrink-0">
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              </div>
              <br />
              <h1 className="text-xl text-center font-bold">All Cars</h1>
              {/* Cars List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-2">
                  {allCars.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => {
                        onCarSelect(car);
                        setMobileMenuOpen(false);
                      }}
                      className="w-full p-3 flex items-center gap-3 hover:bg-accent rounded-lg transition-colors"
                    >
                      <img 
                        src={car.imageUrl} 
                        alt={car.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="text-left">
                        <div className="font-medium">{car.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {car.specs.price}/day
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;