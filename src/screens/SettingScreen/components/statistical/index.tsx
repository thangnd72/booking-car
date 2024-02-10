import { PresentIcon } from '@/assets/icons';
import { Box, Button, TextField } from '@/components';
import theme from '@/helpers/theme';

export const Statistical: React.FC = () => {
  const options = [
    {
      title: 'Công nợ',
      icon: <PresentIcon />,
    },
    {
      title: 'Tích điểm',
      icon: <PresentIcon />,
    },
    {
      title: 'Ví xu',
      icon: <PresentIcon />,
    },
  ];
  return (
    <Box direction='row' between pv={16}>
      {options.map((entry, index) => (
        <Button key={index} direction='row' middle gap={8}>
          {entry.icon}
          <Box middle>
            <TextField size={14} color={theme.colors.textColor}>
              {entry.title}
            </TextField>
            <TextField size={12} color={theme.colors.darkOneColor} mt={4}>
              0
            </TextField>
          </Box>
        </Button>
      ))}
    </Box>
  );
};
