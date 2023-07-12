import { Bars } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Bars
      height="50"
      width="50"
      color="#000000"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass={'Loader'}
      visible={true}
    />
  );
};
