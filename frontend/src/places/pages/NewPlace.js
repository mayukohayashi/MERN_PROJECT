import React from 'react';

import Input from '../../shared/components/FormElements/Input';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input type="text" label="Title" />
    </form>
  );
};

export default NewPlace;
