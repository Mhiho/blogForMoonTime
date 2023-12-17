/** @type {import('next').NextConfig} */
module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: '/',
        destination:
          'https://ec2-3-67-12-119.eu-central-1.compute.amazonaws.com',
      },
    ];
  };
  return {
    rewrites,
  };
};
