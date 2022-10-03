import { useEffect, useRef } from 'react';

import Link from 'next/link';
import { Loader } from '@googlemaps/js-api-loader';
import { useState } from 'react';

const DistributorMap = ({ items }) => {
  var google, map;
  const [distributorIndex, setDistributorIndex] = useState(null);
  const mapsRef = useRef(null);

  const initMap = async () => {
    try {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        language: 'en',
        region: 'US',
      });
      google = await loader.load();
      //Retrieve center

      const mapOptions = {
        mapId: 'dde43a5612931bb4',
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 4,
      };

      map = new google.maps.Map(mapsRef.current, mapOptions);

      initMarkers(map);
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const initMarkers = (map) => {
    let markers = [];
    if (map) {
      const bounds = new google.maps.LatLngBounds();
      markers = items.map((item) => {
        return new google.maps.Marker({
          position: {
            lat: item.distributorFields.information.address.latitude,
            lng: item.distributorFields.information.address.longitude,
          },
          map: map,
        });
      });
      markers.forEach((marker, index) => {
        bounds.extend(marker.getPosition());
        marker.addListener('click', () => {
          setDistributorIndex(index);
          map.setCenter(marker.getPosition());
          map.setZoom(8);
        });
      });
      map.setCenter(bounds.getCenter());
      const isSmall = window.innerWidth < 600 ? true : false;
      map.setZoom(isSmall ? 1 : 2);
      map.fitBounds(bounds.getCenter());
    } else {
    }
  };

  useEffect(() => {
    initMap();
  }, [items]);

  return (
    <div className='contain relative h-[60vh]'>
      <div className='w-full h-full' ref={mapsRef} />

      {distributorIndex !== null && items[distributorIndex] && (
        <div className='absolute z-10 p-5 text-white bg-black w-[320px] top-2 left-2'>
          <button className='absolute z-[99] block w-6 h-6 text-white cursor-pointer fill-current top-5 right-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-6 h-6 text-white fill-current'
              onClick={() => setDistributorIndex(null)}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
            </svg>
          </button>
          <div className='space-y-4'>
            <h4>{items[distributorIndex].title}</h4>
            <div className='text-sm'>
              <strong className='uppercase'>Contact</strong>

              <div>
                <p>
                  {
                    items[
                      distributorIndex
                    ].distributorFields.information.website.split('/')[2]
                  }
                </p>
                <p>
                  {items[distributorIndex].distributorFields.information.phone}
                </p>
                <p>
                  {items[distributorIndex].distributorFields.information.email}
                </p>
              </div>
            </div>

            <div className='text-sm'>
              <strong className='uppercase'>Location</strong>
              <p>
                {
                  items[distributorIndex].distributorFields.information.address
                    .streetAddress
                }
              </p>
            </div>
            {/* <div className='text-sm'>
              <strong className='uppercase'>Year in operation</strong>
              <p>
                {new Date().getFullYear() -
                  items[distributorIndex].distributorFields.information
                    .yearinoperation}
              </p>
            </div> */}
            {items[distributorIndex].distributorFields.information
              .productUrl ? (
              <a
                target='_blank'
                href={
                  items[distributorIndex].distributorFields.information
                    .productUrl
                }
                rel='noreferrer'
                className='inline-block px-4 py-2 uppercase rounded-full font-display bg-brand-red'
              >
                Visit website
              </a>
            ) : items[distributorIndex].distributorFields.information
                .website ? (
              <a
                target='_blank'
                href={
                  items[distributorIndex].distributorFields.information.website
                }
                rel='noreferrer'
                className='inline-block px-4 py-2 uppercase rounded-full font-display bg-brand-red'
              >
                Visit website
              </a>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
export default DistributorMap;
