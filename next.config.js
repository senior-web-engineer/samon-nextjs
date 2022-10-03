module.exports = {
  images: {
    domains: ['samon-cms.h.capacedev.se', 'media.samon.se'],
  },

  // webpack: (config, { dev, isServer }) => {
  //   // Replace React with Preact only in client production build
  //   if (!dev && !isServer) {
  //     Object.assign(config.resolve.alias, {
  //       react: 'preact/compat',
  //       'react-dom/test-utils': 'preact/test-utils',
  //       'react-dom': 'preact/compat',
  //     });
  //   }

  //   return config;
  // },
  async redirects() {
    return [
      {
        source: '/samon-employs-pekka-relander-as-senior-sales-manager',
        destination: '/news/samon-employs-pekka-relander-as-senior-sales-manager',
        permanent: true,
      },
      {
        source: '/chillventa-2022',
        destination: '/event/chillventa-2022',
        permanent: true,
      },
      {
        source: '/marine-guideline-gas-detection',
        destination: '/white-paper/marine-guideline-gas-detection',
        permanent: true,
      },
      {
        source: '/samon-is-a-great-place-to-work',
        destination: '/news/samon-is-a-great-place-to-work',
        permanent: true,
      },
      {
        source: '/samon-employs-johanna-sepulveda-fajardo-as-business-development-director-spain',
        destination: '/news/samon-employs-johanna-sepulveda-fajardo-as-business-development-director-spain',
        permanent: true,
      },
      {
        source: '/samon-acquiring-iso9001-certification',
        destination: '/news/samon-acquiring-iso9001-certification',
        permanent: true,
      },
      {
        source: '/introducing-the-samon-and-wilhelmsen-ships-service-collaboration',
        destination: '/news/introducing-the-samon-and-wilhelmsen-ships-service-collaboration',
        permanent: true,
      },
      {
        source: '/samon-employs-doru-ciobotea-as-solution-sales',
        destination: '/news/samon-employs-doru-ciobotea-as-solution-sales',
        permanent: true,
      },
      {
        source: '/samon-employes-simon-tagerud-as-rd-engineer',
        destination: '/news/samon-employes-simon-tagerud-as-rd-engineer',
        permanent: true,
      },
      {
        source: '/samon-employs-johan-ringstrom-as-a-service-technician',
        destination: '/news/samon-employs-johan-ringstrom-as-a-service-technician',
        permanent: true,
      },
      {
        source: '/samon-ab-press-release-new-ceo',
        destination: '/news/samon-ab-press-release-new-ceo',
        permanent: true,
      },
      {
        source: '/samon-employs-marwan-chamoun-as-market-manager-for-france',
        destination: '/news/samon-employs-marwan-chamoun-as-market-manager-for-france',
        permanent: true,
      },
      {
        source: '/press-release-alder-ab-acquires-samon-ab',
        destination: '/news/press-release-alder-ab-acquires-samon-ab',
        permanent: true,
      },
    ];
  },
};
