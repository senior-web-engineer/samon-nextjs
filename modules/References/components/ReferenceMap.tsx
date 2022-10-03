import { useEffect, useRef } from 'react';

import Link from 'next/link';
import { Loader } from '@googlemaps/js-api-loader';
import { useState } from 'react';
import { track_load } from '@lib/lf';
import { useCookieConsentState } from '@lib/context/cookieConsent';

const ReferenceMap = ({ items }) => {
  var google, map;
  const [referenceIndex, setReferenceIndex] = useState(null);

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
      initMarkers();
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const initMarkers = () => {
    let markers = [];
    if (map) {
      const bounds = new google.maps.LatLngBounds();

      markers = items.map((item) => {
        return new google.maps.Marker({
          position: {
            lat: item.referenceFields.information.address.latitude,
            lng: item.referenceFields.information.address.longitude,
          },
          map: map,
        });
      });
      markers.forEach((marker, index) => {
        bounds.extend(marker.getPosition());
        marker.addListener('click', () => {
          setReferenceIndex(index);
          map.setZoom(8);
          map.setCenter(marker.getPosition());
        });
      });
      map.setCenter(bounds.getCenter());
      const isSmall = window.innerWidth < 600 ? true : false;
      map.setZoom(isSmall ? 1 : 3);
      map.fitBounds(bounds.getCenter());
    } else {
    }
  };

  useEffect(() => {
    initMap();
  }, [items]);

  const cookieConsentState = useCookieConsentState()
  return (
    <div className='contain relative h-[60vh]'>
      <div className='w-full h-full' ref={mapsRef} />

      {referenceIndex !== null && items[referenceIndex] && (
        <div className='absolute z-10 p-5 text-white bg-black w-[94%] md:w-[320px] top-2 left-2'>
          <button className='absolute z-[99] block w-6 h-6 text-white cursor-pointer fill-current top-5 right-5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-6 h-6 text-white fill-current'
              onClick={() => setReferenceIndex(null)}
            >
              <path d='M0 0h24v24H0V0z' fill='none' />
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z' />
            </svg>
          </button>
          <div className='space-y-4'>
            <h4>{items[referenceIndex].title}</h4>
            <div className='text-sm'>
              <strong className='uppercase'>Application</strong>
              <p>
                {
                  items[referenceIndex].referenceFields.information
                    .application[0].title
                }
              </p>
            </div>
            <div className='text-sm'>
              <strong className='uppercase'>Solution</strong>
              <p>
                {items[referenceIndex].referenceFields.information.solution}
              </p>
            </div>
            <div className='text-sm'>
              <strong className='uppercase'>Customer value</strong>
              <p>
                {
                  items[referenceIndex].referenceFields.information
                    .customerValue
                }
              </p>
            </div>
            <div className='text-sm'>
              <strong className='uppercase'>Location</strong>
              <p>location</p>
            </div>
            <div className='text-sm'>
              <strong className='uppercase'>Year in operation</strong>
              <p>
                {
                  items[referenceIndex].referenceFields.information
                    .yearInOperation
                }
              </p>
            </div>
            <Link href={`/references/${items[referenceIndex].slug}`}>
              <a onClick={() => cookieConsentState?.lf ? track_load(`http://www.leadforensics.com/references/${items[referenceIndex].slug}`, `Read more`) : ''} className='inline-block px-4 py-2 uppercase rounded-full font-display bg-brand-red'>
                Read more
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default ReferenceMap;
