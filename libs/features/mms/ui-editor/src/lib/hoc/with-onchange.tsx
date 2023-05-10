import { ComponentType, ChangeEvent } from 'react';

type WithOnChangeProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

//TODO: context changes goes here
export const withOnChange = <P extends object>(WrappedComponent: ComponentType<P & WithOnChangeProps>) => {
  return (props: P) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      console.log('onChange event:', event.target.value);
    };

    return <WrappedComponent {...props} onChange={handleChange} />;
  };
};
