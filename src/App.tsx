<<<<<<< Updated upstream
import { useState, useEffect } from 'react';
import Header from './components/Header';
import CarCard from './components/CarCard';
import Carousel from './components/Carousel';
import CarDetailsModal from './components/CarDetailsModal';
import { 
  Car, 
  allCars} from './data';

const App: React.FC = () => {
  const [, setCars] = useState<Car[]>([]);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);

  useEffect(() => {
    setCars(allCars);
    setFilteredCars(allCars);
  }, []);

  const handleOpenModal = (car: Car): void => {
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { Car } from './utils/firebase-admin';
import Header from './components/Header';
import { ThemeProvider } from './components/theme-provider';
import { Suspense, useState, useEffect, memo } from "react";
import CarDetailsModal from "./components/CarDetailsModal";
import { getCarsFromFirestore } from './utils/firebase-admin';
import { getUserProfile } from './utils/auth';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RentalsPage from './pages/RentalsPage';
import { AuthProvider } from './contexts/AuthContext';

// Memoized Loading Spinner
const LoadingSpinner = memo(() => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
));
LoadingSpinner.displayName = 'LoadingSpinner';

const ProtectedRout = memo(({ children, requireAdmin = false } : { children: React.ReactNode, requireAdmin?: boolean }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setIsAdmin(profile?.role === 'admin');
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
      setCheckingAdmin(false);
    };

// Memoized Protected Route
const ProtectedRoute = memo(({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setIsAdmin(profile?.role === 'admin');
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
        setCheckingAdmin(false);
      }
    };

    if (requireAdmin) {
      checkAdminStatus();
    } else {
      setCheckingAdmin(false);
    }
  }, [user, requireAdmin]);

  if (loading || (requireAdmin && checkingAdmin)) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
});
ProtectedRoute.displayName = 'ProtectedRoute';

function App() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchCars = async () => {
      try {
        const carsData = await getCarsFromFirestore();
        if (mounted) {
          setCars(carsData);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          console.error('Error fetching cars:', error);
        }
      }
    };
  })

  // Fetch cars only when needed
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchCars = async () => {
      try {
        const carsData = await getCarsFromFirestore();
        if (mounted) {
          setCars(carsData);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          console.error('Error fetching cars:', error);
          setLoading(false);
        }
      }
    };

    fetchCars();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const handleOpenModal = (car: Car) => {
>>>>>>> Stashed changes
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
<<<<<<< Updated upstream
    <div className="min-h-screen bg-background">
      <Header allCars={filteredCars} onCarSelect={handleOpenModal} />
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Carousel Section */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Most Rented Cars</h2>
          <Carousel cars={filteredCars} onCarSelect={handleOpenModal} />
        </section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Recommended Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onSelect={() => handleOpenModal(car)}
            />
          ))}
        </div>
      </main>

      {selectedCar && (
        <CarDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          car={selectedCar}
        />
      )}
    </div>
=======
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Header allCars={cars} onCarSelect={handleOpenModal} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-rentals"
                element={
                  <ProtectedRoute>
                    <RentalsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>

        {selectedCar && (
          <CarDetailsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            car={selectedCar}
          />
        )}
      </ThemeProvider>
    </AuthProvider>
>>>>>>> Stashed changes
  );
};

export default memo(App);