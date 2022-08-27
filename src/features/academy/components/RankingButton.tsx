import { Button } from '@chakra-ui/react';

interface IRankingButton {
  children: React.ReactNode;
}

function RankingButton({ children, ...props }: IRankingButton) {
  return (
    <Button
      size='xs'
      color='white'
      border='1px'
      fontWeight='500'
      background='#252933'
      {...props}
    >
      {children}
    </Button>
  );
}

export default RankingButton;
