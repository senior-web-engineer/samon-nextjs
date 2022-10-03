import Link from 'next/link';
import parse from 'html-react-parser';
interface TextBlockProps {
  data: any;
}

const TextBlock = ({ data }: TextBlockProps) => {
  //(data.settings);
  const setOrientation = () => {
    switch (data.settings.orientation) {
      case 'Left':
        return 'text-left';
      case 'Center':
        return 'text-center';
      case 'Right':
        return 'text-right';
    }
  };
  const color = () => {
    switch (data.settings.color) {
      case 'Light':
        return 'text-white';
      case 'Dark':
        return 'text-black';
    }
  };
  return (
    <div className={`parsed w-full ${color()} ${setOrientation()}`}>
      {data?.text &&
        parse(data.text, {
          replace: (domNode: any) => {
            if (domNode.name === 'a') {
              if (
                domNode.attribs.href &&
                !domNode.attribs.href.includes('samon.se/')
              ) {
                domNode.attribs.target = '_blank';
              }
            }
          },
        })}
    </div>
  );
};

export default TextBlock;
