import { createContext, useEffect, useState } from 'react';

import store from 'store';

interface ILocation {
  country: string;
  country_code: string;
  region: string;
  city: string;
  continent: string;
}

export const LocationContext = createContext<Partial<ILocation>>({});

const useLocation = () => {
  const [userCountry, setUserCountry] = useState(
    store.get('locationData') || null
  );
  const getCountry = async () => {
    const res = await fetch(
      `https://api.ipstack.com/check?access_key=${process.env.NEXT_PUBLIC_IP_STACK_KEY}`
    );
    if (res.status !== 200) {
      console.log('LOCATION RES', res);
      return;
    }
    const data = await res.json();
    if (data) {
      const obj = {
        country: data.country_name,
        country_code: data.country_code,
        city: data.city,
        region: data.region_name,
        continent: data.continent_name,
      };
      store.set('locationData', obj);
      setUserCountry(obj);
    }
  };
  useEffect(() => {
    if (!userCountry) {
      getCountry();
    }
  }, []);
  return { ...userCountry };
};

const LocationProvider = ({ children }) => {
  const location = useLocation();
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};
export default LocationProvider;
