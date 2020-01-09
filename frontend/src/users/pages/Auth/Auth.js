import React from 'react';

import './Auth.css';

import { useForm } from '../../shared/hooks/form-hook';

import Input from '../../../shared/components/FormElements/Input/Input'
import Button from '../../../shared/components/FormElements/Button/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/components/util/validators';

const Auth = () => {

  return (
  <h1 className="authentication__header">Login? Sign In?</h1>
  <form>

  <Input />
    <Input />
    <Button type="submit">
      LogIn
    </Button>

  </form>
  )
};

export default Auth;
