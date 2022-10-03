import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function useBreadcrumbs() {
  const router = useRouter();
  const [crumbs, setCrumbs] = useState<string[] | []>();

  useEffect(() => {
    let s: string[] = router.asPath.split('/').filter((slug) => slug);

    setCrumbs(s);
  }, [router.asPath]);

  return {
    crumbs,
  };
}
