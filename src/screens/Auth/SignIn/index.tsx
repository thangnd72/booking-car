import React from 'react';
import styles from './styles';
import { Box, FastImg } from '@/components';

const SignIn: React.FC = () => {
  return (
    <Box>
      <FastImg
        pictureStyle={styles.img}
        uri={
          'https://blog.topcv.vn/wp-content/uploads/2021/07/sk2uEvents_Page_Header_2903ed9c-40c1-4f6c-9a69-70bb8415295b.jpg'
        }
      />
    </Box>
  );
};
export default SignIn;
