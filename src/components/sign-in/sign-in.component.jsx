import React from 'react';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      passwork: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const {email, password} = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({email:'',password: ''});
    } catch (error) {
      console.log(error);
      
    }

    this.setState({email: '', password: ''});
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            name='email'
            label='email'
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />

          <FormInput
            type='password'
            name='password'
            label='password'
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign In </CustomButton>
            <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
              {' '}
              Sign In with Google{' '}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
