import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tag,
  useToast
} from '@chakra-ui/react';
import styled from '@emotion/styled/macro';
import { setFontsize, setFullMode } from '@Features/common/slices/CommonSlice';
import GoyoAPI from '@Shared/api/goyo';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

function Regist() {
  const goyo = new GoyoAPI();
  const toast = useToast();
  const firstRenderRef = useRef(true);
  const [cookies] = useCookies(['key']);

  const dispatch = useDispatch();

  const recommand = [
    {
      id: 1,
      name: '아쉬탕가'
    },
    {
      id: 2,
      name: '하타'
    },
    {
      id: 3,
      name: '빈야사'
    }
  ];
  const [detail, setDetail] = useState<any>({});
  const [noaddedList, setList] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [nowId, setNowId] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [param, setParams] = useState({
    pageNum: 1,
    key: '',
    status: '',
    siGunGu: '',
    ContainMeditation: false
  });
  const [addLIst, setAdministrations] = useState<any>([]);
  const [iframeUrl, setIframeUrl] = useState('');
  async function noAddedListFetch() {
    param.key = cookies.key as string;

    const res = await goyo.GetAdminAcademies(param);
    if (noaddedList.length === 0) {
      setList([...res.data.result.list]);
      setTotal(res.data.result.total);
      return;
    }
    if (param.pageNum === 1) {
      setList([...res.data.result.list]);
    } else {
      for (let i = 0; i < res.data.result.list.length; i++) {
        setList((prev) => [...prev, res.data.result.list[i]]);
      }
    }

    setTotal(res.data.result.total);
  }

  function Reset() {
    setList([]);
  }

  async function administration() {
    const res = await goyo.GetAdminiStrations();

    setAdministrations([...res.data.result.list]);
  }

  async function getDetail(id) {
    const res = await goyo.GetDetail(id);
    setDetail(res.data.result);
  }
  async function PostYogaSorts(data, key) {
    try {
      const res = await goyo.PostYogaSorts(data, key);

      if (res.status === 201) {
        toast({
          description: '성공적으로 등록됐습니다.',
          status: 'success'
        });
        getDetail(detail.id);
        setInputValue('');
      }
    } catch (err) {
      if (detail.id === undefined) {
        toast({
          description: '왼쪽에 학원을 클릭하세요',
          status: 'error'
        });
        return;
      }
      toast({
        description: '등록 실패',
        status: 'error'
      });
    }
  }

  function ChangeRegist(e) {
    if (e === '1') {
      setParams({ ...param, status: '', pageNum: 1 });
    }
    if (e === '2') {
      setParams({ ...param, status: 'NonRegist', pageNum: 1 });
    }
    if (e === '3') {
      setParams({ ...param, status: 'Regist', pageNum: 1 });
    }
    Reset();
  }

  function ChangeMeditation(e) {
    if (e === '1') {
      setParams({ ...param, ContainMeditation: false, pageNum: 1 });
    }
    if (e === '2') {
      setParams({ ...param, ContainMeditation: true, pageNum: 1 });
    }
    Reset();
  }

  function changeSigunGu(e) {
    setParams({ ...param, siGunGu: e.target.value, pageNum: 1 });
    Reset();
  }

  function More() {
    setParams({ ...param, pageNum: param.pageNum + 1 });
  }

  function ClickYogaName(e, naver_id) {
    getDetail(e.currentTarget.value);
    console.log(e.target.value);
    setNowId(e.target.value);
    setIframeUrl(`https://m.place.naver.com/place/${naver_id}/home`);
  }

  function Submit() {
    if (inputValue.length <= 1) {
      toast({
        description: '글자수 키우세요.',
        status: 'warning'
      });
      return;
    }
    let value = [] as {}[];
    const splited = inputValue.split(',');
    splited.forEach((data: any) => {
      value = [...value, { naverPlaceId: detail.id, name: data }];
    });

    PostYogaSorts({ value: value }, param.key);
  }

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      dispatch(setFontsize('20px'));
      dispatch(setFullMode(true));
      administration();
      noAddedListFetch();
      return;
    }
    noAddedListFetch();
    console.log(detail);
  }, [param]);

  return (
    <Container>
      <NoAddedList>
        <Select placeholder='Select option' onChange={changeSigunGu}>
          {addLIst?.map((data: any, index) => {
            return (
              <option key={index} value={data['si_gun_gu']}>
                {data['si_gun_gu']}
              </option>
            );
          })}
        </Select>
        <RadioGroup
          onChange={ChangeRegist}
          value={
            param.status === 'Regist'
              ? '3'
              : param.status === 'NonRegist'
              ? '2'
              : '1'
          }
        >
          <Stack direction='row'>
            <Radio value='1'>All</Radio>
            <Radio value='2'>등록 NO</Radio>
            <Radio value='3'>등록 YES</Radio>
          </Stack>
        </RadioGroup>

        <RadioGroup
          onChange={ChangeMeditation}
          value={param.ContainMeditation ? '2' : '1'}
        >
          <Stack direction='row'>
            <Radio value='1'>요가원만 보기</Radio>
            <Radio value='2'>전체보기</Radio>
          </Stack>
        </RadioGroup>

        <div>
          <Heading>{total}</Heading>
          {noaddedList.map((data: any) => {
            return (
              <Box key={data.id}>
                <Button
                  fontSize='1rem'
                  border={data.is_regist && '1px solid red'}
                  isActive={Number(nowId) === data.id}
                  w='100%'
                  marginTop='1rem'
                  value={data.id}
                  onClick={(e) => ClickYogaName(e, data.naver_id)}
                >
                  {data.name}
                </Button>
              </Box>
            );
          })}
        </div>
        <Flex justifyContent='center' marginTop='1rem'>
          <Button bg='red' color='white' onClick={More}>
            더보기
          </Button>
        </Flex>
      </NoAddedList>
      <AddZoneContainer>
        <div>
          <Flex marginTop='1rem' padding='0 1rem'>
            <Input
              placeholder='Basic usage'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button w='40%' onClick={Submit}>
              등럭
            </Button>
          </Flex>
          <Flex marginTop='1rem' padding='0 1rem'>
            {recommand.map((data: any) => {
              return (
                <Tag
                  mr='1rem'
                  key={data.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    setInputValue(
                      inputValue === ''
                        ? data.name
                        : inputValue + ',' + data.name
                    )
                  }
                >
                  {data.name}
                </Tag>
              );
            })}
          </Flex>

          <Heading>{detail?.name}</Heading>
          <Heading>등록된 태그</Heading>
          {detail?.yogaSorts?.length === 0 ? (
            <Tag>태그없음</Tag>
          ) : (
            detail?.yogaSorts?.map((data: any) => {
              return <Tag>{data.name}</Tag>;
            })
          )}
        </div>
      </AddZoneContainer>

      <IframeContainer>
        <iframe src={iframeUrl} />
      </IframeContainer>
    </Container>
  );
}

export default Regist;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const NoAddedList = styled.div`
  min-height: 100vh;
  overflow-y: scroll;
`;

const IframeContainer = styled.div`
  iframe {
    width: 100%;
    min-height: 100vh;
  }
  min-height: 100vh;
  overflow-y: scroll;
`;

const AddZoneContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;
