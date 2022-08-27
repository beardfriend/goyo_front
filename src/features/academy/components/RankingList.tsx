import { Box, Flex, Text } from '@chakra-ui/react';
import styled from '@emotion/styled/macro';
import mq from '@Libs/theme/mediaQuery';
import { IAcademySlice } from '../slices/AcademyListPageState';
import RankingButton from './RankingButton';

interface IRankingList {
  datas: IAcademySlice['ranking']['responseData'];
}

function RankingList({ datas }: IRankingList) {
  return (
    <Container mt='1.5rem'>
      <Title fontSize='1.2rem' fontWeight='500'>
        👓 많이 검색한 내역이에요 👓
      </Title>
      <Flex mt='0.2rem' gap='0.5rem' ml='1rem'>
        {datas.map((data) => {
          return <RankingButton key={data.id}>{data.name}</RankingButton>;
        })}
      </Flex>
    </Container>
  );
}

export default RankingList;

const Container = styled(Box)``;

const Title = styled(Text)`
  margin-left: 1rem;
  ${mq[0]} {
    font-weight: 500;
    font-size: 0.8rem;
  }
`;
