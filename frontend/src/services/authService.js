import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export const authService = {
  sendOtp: async (phoneNumber) => {
    try {
      const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      }, auth);

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifier
      );

      return confirmationResult;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  },

  verifyOtp: async (confirmationResult, otp) => {
    try {
      const result = await confirmationResult.confirm(otp);
      return result.user;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },
};
