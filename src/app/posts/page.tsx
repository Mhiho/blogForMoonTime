'use client';

import { useSelectedLayoutSegments } from 'next/navigation';

const ExampleClientComponent = () => {
  const segments = useSelectedLayoutSegments('/');
  console.log(segments);
  return (
    <>
      <h1>lista</h1>
      <ul>
        {segments.map((segment, index) => (
          <li key={index}>{segment}</li>
        ))}
      </ul>
    </>
  );
};
export default ExampleClientComponent;
