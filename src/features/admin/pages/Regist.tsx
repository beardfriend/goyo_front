import {
  Box,
  Button,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch
} from '@chakra-ui/react';
import styled from '@emotion/styled/macro';
import { setFontsize, setFullMode } from '@Features/common/slices/CommonSlice';
import GoyoAPI from '@Shared/api/goyo';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';

function Regist() {
  const goyo = new GoyoAPI();
  const firstRenderRef = useRef(true);
  const [cookies] = useCookies(['key']);

  const dispatch = useDispatch();

  const [noaddedList, setList] = useState<any>([]);
  const [total, setTotal] = useState(0);
  const [param, setParams] = useState({
    pageNum: 1,
    key: '',
    isRegist: false,
    siGunGu: '',
    ContainMeditation: false,
    BeforeTenMin: true
  });
  const [addLIst, setAdministrations] = useState<any>([]);

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

  function ChangeRegist(e) {
    if (e === '1') {
      setParams({ ...param, isRegist: true, pageNum: 1 });
    }
    if (e === '2') {
      setParams({ ...param, isRegist: false, pageNum: 1 });
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

  function ChangeBeforeTenMin(e) {
    if (e === '1') {
      setParams({ ...param, BeforeTenMin: true, pageNum: 1 });
    }
    if (e === '2') {
      setParams({ ...param, BeforeTenMin: false, pageNum: 1 });
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

  function ClickYogaName(e) {
    // e.target.value
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
        <RadioGroup onChange={ChangeRegist} value={param.isRegist ? '1' : '2'}>
          <Stack direction='row'>
            <Radio value='2'>등록 안 된 것</Radio>
            <Radio value='1'>태그 등록한 것만 보기</Radio>
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
        <RadioGroup
          onChange={ChangeBeforeTenMin}
          value={param.BeforeTenMin ? '1' : '2'}
        >
          <Stack direction='row'>
            <Radio value='1'>태그 등록해도 10분간 등록 안된 칸에 표시</Radio>
            <Radio value='2'>실시간으로 제외</Radio>
          </Stack>
        </RadioGroup>

        <div>
          <Heading>{total}</Heading>
          {noaddedList.map((data: any) => {
            return (
              <Box key={data.id}>
                <Button
                  fontSize='1rem'
                  w='100%'
                  marginTop='1rem'
                  onClick={ClickYogaName}
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
      <AddZoneContainer>hello</AddZoneContainer>

      <IframeContainer>
        <iframe src='https://m.place.naver.com/place/1264884214/home?entry=pll' />
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
