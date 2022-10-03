import parse from 'html-react-parser';
import { useState } from 'react';

export default function ProductTabs({ product }) {
  const [current, setCurrent] = useState(0);

  return (
    <div className='contain row'>
      <Tabs
        tabs={product?.productFields?.tabs}
        current={current}
        setCurrent={setCurrent}
      />
      <Content
        description={product.description}
        current={current}
        tabs={product?.productFields?.tabs}
      />
    </div>
  );
}

const Content = ({ description, current, tabs }) => {
  if (current === 0) {
    return (
      <div className='pt-10 prose'>
        {description
          ? parse(description)
          : 'Product description is currently missing.'}
      </div>
    );
  } else {
    return (
      <div className='pt-10 prose'>{parse(tabs[current - 1].content)}</div>
    );
  }
};
const Tabs = ({ tabs, current, setCurrent }) => {
  const activeTabClasses = `text-brand-red !border-brand-red border-b-4`;
  return (
    <ul className={`grid grid-cols-2 md:grid-cols-4`}>
      <li
        className={`flex items-center justify-center border-b-2 border-black ${
          current === 0 && activeTabClasses
        }`}
      >
        <button
          onClick={() => setCurrent(0)}
          className='p-2 text-sm font-bold md:p-4 md:text-xl'
        >
          Description
        </button>
      </li>
      {tabs?.map((tab, index) => {
        return (
          <li
            className={`flex items-center justify-center border-b-2 border-black ${
              current === index + 1 ? activeTabClasses : null
            }`}
            key={tab.heading}
          >
            <button
              onClick={() => setCurrent(index + 1)}
              className='p-2 text-sm font-bold md:p-4 md:text-xl'
            >
              {tab.heading}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
