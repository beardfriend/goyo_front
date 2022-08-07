import * as React from 'react';
import styled from '@emotion/styled';

interface IDataList {
  imageUrl: string;
  imageAlt: string;
  title: string;
  address: string;
  phoneNum: string;
  hashTags: { [key: string]: any }[];
}

function DataList({
  imageUrl,
  imageAlt,
  title,
  address,
  phoneNum,
  hashTags
}: IDataList) {
  return (
    <ListContainer>
      <Image src={imageUrl} alt={imageAlt} />
      <TextBox>
        <Title>{title}</Title>
        <Address>{address}</Address>
        <PhoneNum>{phoneNum}</PhoneNum>
        <HashTagBox>
          {hashTags.map((data: any) => {
            return <HasTag>{data.name}</HasTag>;
          })}
        </HashTagBox>
      </TextBox>
    </ListContainer>
  );
}

export default DataList;

const ListContainer = styled.div`
  display: flex;
  padding: 3.2rem 0 0 1.2rem;
  width: 100%;
  height: 18rem;
`;

const Image = styled.img``;

const TextBox = styled.div``;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Address = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
`;

const PhoneNum = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
`;

const HashTagBox = styled.div``;

const HasTag = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;
