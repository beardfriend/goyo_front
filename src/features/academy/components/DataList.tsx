import * as React from 'react';
import styled from '@emotion/styled/macro';
import { IAcademySlice } from '../slices/AcademyListPageState';
import mq from '@Libs/theme/mediaQuery';

interface IDataList {
  data: IAcademySlice['list']['responseData'];
}

function DataList({ data }: IDataList) {
  return (
    <>
      {data.map((data) => {
        const { id, thumbUrl, name, phoneNum, commonAddress, yogaSorts } = data;
        let x =
          'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482930.jpg';

        return (
          <ListContainer key={id}>
            <ImageBox>
              <Image src={thumbUrl ? thumbUrl : x} alt={name} />
            </ImageBox>
            <TextBox>
              <Title>{name}</Title>
              <Address>{commonAddress}</Address>
              <PhoneNum>{phoneNum}</PhoneNum>
              <HashTagBox>
                {yogaSorts.map((data, index) => {
                  return <HasTag key={index}> #{data.name}</HasTag>;
                })}
              </HashTagBox>
            </TextBox>
          </ListContainer>
        );
      })}
    </>
  );
}

export default DataList;

export const ListContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.6rem 0 1.6rem 1.2rem;
  width: 100%;
  height: 20rem;
  border: 1px solid #c2c2c2;
  border-radius: 2rem;
`;

const ImageBox = styled.div`
  margin: auto 0;
  min-width: 20rem;
  ${mq[0]} {
    min-width: 10rem;
  }
`;

const Image = styled.img`
  width: 20rem;
  height: 12rem;
`;

const TextBox = styled.div`
  margin: auto 0;
  width: 100%;
`;

const Title = styled.h1`
  ${mq[0]} {
    font-size: 2rem;
  }
  font-size: 2.5rem;
  font-weight: 700;
`;

const Address = styled.p`
  ${mq[0]} {
    font-size: 1.2rem;
  }
  margin-top: 1.5rem;
  font-size: 1.5rem;
  font-weight: 300;
`;

const PhoneNum = styled.p`
  ${mq[0]} {
    font-size: 1.2rem;
  }
  font-size: 1.5rem;
  font-weight: 300;
`;

const HashTagBox = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const HasTag = styled.p`
  ${mq[0]} {
    font-size: 1.2rem;
  }
  font-size: 1.5rem;
  font-weight: 700;
`;
