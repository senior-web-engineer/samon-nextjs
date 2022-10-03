import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

interface useSparepartsFilterProps {}

const useSparepartsFilter = (init: any[]) => {
  const router = useRouter();
  const query = JSON.stringify(router.query);
  const { modelID } = JSON.parse(query);
  const [parts, setParts] = useState<any[]>(init);
  const [skus, setSkus] = useState([]);
  const [modelNum, setModelNum] = useState<string>(modelID || '');

  useEffect(() => {
    setModelNum(modelID);
  }, [modelID]);
  useEffect(() => {
    let a = [];
    const skus = parts.forEach((item) => {
      const modelNumAttr = item?.attributes?.edges?.filter(({ node }) => {
        return node.name === 'Compatible with';
      });
      const modelNums =
        (modelNumAttr?.length > 0 && modelNumAttr[0].node.options) || [];
      modelNums?.forEach((num) => {
        if (!a.includes(num)) {
          a.push(num);
        }
      });
    });

    setSkus(a);
  }, []);
  useEffect(() => {
    if (modelNum) {
      let a = [...init];
      let n: any[] = a.filter((item) => {
        //(item.attributes.edges);
        const attributes = item.attributes.edges;
        const match = attributes.some(({ node }) =>
          node.options.includes(modelNum)
        );
        return match;
      });
      setParts(n);
    } else {
      setParts(init);
    }
  }, [modelNum]);
  const updateModelNumber = (value) => {
    setModelNum(value);
  };
  return { parts, skus, modelNum, updateModelNumber };
};

export default useSparepartsFilter;
