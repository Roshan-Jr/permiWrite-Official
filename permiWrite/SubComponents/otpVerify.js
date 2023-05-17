import {
    getHash,
    startOtpListener,
    useOtpVerify,
  } from 'react-native-otp-verify';

  // You can use the startListener and stopListener to manually trigger listeners again.
// optionally pass numberOfDigits if you want to extract otp
const { hash, otp, message, timeoutError, stopListener, startListener } = useOtpVerify({numberOfDigits: 4});    

// using methods
useEffect(() => {
    getHash().then(hash => {
      // use this hash in the message.
    }).catch(console.log);
  
    startOtpListener(message => {
      // extract the otp using regex e.g. the below regex extracts 4 digit otp from message
      const otp = /(\d{4})/g.exec(message)[1];
      setOtp(otp);
    });
    return () => removeListener();
  }, []);