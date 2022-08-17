import { useAppDispatch } from '@Apps/store';
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
import { useSelector } from 'react-redux';
import {
  adminRegistState,
  GET_ADMINISTRATION,
  GET_DETAIL,
  GET_LIST,
  setAcademyId,
  setGetListParams,
  setIframeUrl
} from '../slices/RegistPageSlice';

function Regist() {
  const goyo = new GoyoAPI();
  const dispatch = useAppDispatch();
  const state = useSelector(adminRegistState);
  const toast = useToast();
  const firstRenderRef = useRef(true);
  const [cookies] = useCookies(['key']);

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

  const [deleteGroup, setDeleteGroup] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');

  function Reset() {
    state.acadmies = [];
  }

  async function PostYogaSorts(data, key) {
    try {
      const res = await goyo.PostYogaSorts(data, key);

      if (res.status === 201) {
        toast({
          description: '성공적으로 등록됐습니다.',
          status: 'success'
        });
        dispatch(GET_DETAIL(state.academyId));

        setInputValue('');
      }
    } catch (err) {
      if (state.academy.id === undefined) {
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

  async function DeleteYoga(idList) {
    try {
      const res = await goyo.DeleteYogaSorts(idList, state.getListParams.key);

      if (res.status === 200) {
        toast({
          description: '성공적으로 삭제.',
          status: 'success'
        });
        dispatch(GET_DETAIL(state.academyId));
        setInputValue('');
      }
    } catch (err) {
      toast({
        description: '삭제 실패',
        status: 'error'
      });
    }
  }

  function ChangeRegist(e) {
    if (e === '1') {
      dispatch(
        setGetListParams({ ...state.getListParams, status: '', pageNum: 1 })
      );
    }
    if (e === '2') {
      dispatch(
        setGetListParams({
          ...state.getListParams,
          status: 'NonRegist',
          pageNum: 1
        })
      );
    }
    if (e === '3') {
      dispatch(
        setGetListParams({
          ...state.getListParams,
          status: 'Regist',
          pageNum: 1
        })
      );
    }
    Reset();
  }

  function ChangeMeditation(e) {
    if (e === '1') {
      dispatch(
        setGetListParams({
          ...state.getListParams,
          containMeditation: false,
          pageNum: 1
        })
      );
    }
    if (e === '2') {
      dispatch(
        setGetListParams({
          ...state.getListParams,
          containMeditation: true,
          pageNum: 1
        })
      );
    }
    Reset();
  }

  function changeSigunGu(e) {
    dispatch(
      setGetListParams({
        ...state.getListParams,
        siGunGu: e.target.value,
        pageNum: 1
      })
    );

    Reset();
  }

  function More() {
    dispatch(
      setGetListParams({
        ...state.getListParams,
        pageNum: state.getListParams.pageNum + 1
      })
    );
  }

  function ClickYogaName(e: any, naver_id) {
    e.preventDefault();
    dispatch(setAcademyId(Number(e.currentTarget.value)));
    dispatch(GET_DETAIL(Number(e.target.value)));
    dispatch(setIframeUrl(`https://m.place.naver.com/place/${naver_id}/home`));
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
      value = [...value, { naverPlaceId: state.academy.id, name: data }];
    });

    PostYogaSorts({ value: value }, state.getListParams.key);
  }

  function ClickTag(id) {
    if (deleteGroup.includes(id)) {
      const newData = deleteGroup.filter((data) => data !== id);
      setDeleteGroup(newData);
    } else {
      setDeleteGroup((group: any) => [...group, id]);
    }
    console.log(deleteGroup);
  }

  function DeleteYogaSorts() {
    const list = deleteGroup.join(',');
    DeleteYoga(list);
  }

  useEffect(() => {
    if (firstRenderRef.current) {
      dispatch(setGetListParams({ ...state.getListParams, key: cookies.key }));
      firstRenderRef.current = false;
      dispatch(setFontsize('20px'));
      dispatch(setFullMode(true));
      dispatch(GET_ADMINISTRATION());
      return;
    }
    if (state.getListParams.key === '') {
      return;
    }
    dispatch(GET_LIST(state.getListParams));
  }, [state.getListParams]);

  return (
    <Container>
      <NoAddedList>
        <Select placeholder='Select option' onChange={changeSigunGu}>
          {state.administrations?.map((data: any, index) => {
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
            state.getListParams.status === 'Regist'
              ? '3'
              : state.getListParams.status === 'NonRegist'
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
          value={state.getListParams.containMeditation ? '2' : '1'}
        >
          <Stack direction='row'>
            <Radio value='1'>요가원만 보기</Radio>
            <Radio value='2'>전체보기</Radio>
          </Stack>
        </RadioGroup>

        <div>
          <Heading>{state.total}</Heading>
          {state.acadmies.map((data: any) => {
            return (
              <Box key={data.id}>
                <Button
                  fontSize='1rem'
                  border={data.is_regist && '1px solid red'}
                  isActive={state.academyId === data.id}
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
            <Button w='40%' onClick={Submit} colorScheme='pink'>
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

          <Heading>{state.academy?.name}</Heading>
          <Heading>등록된 태그</Heading>
          <Flex flexDir='column'>
            <Flex flexWrap='wrap'>
              {state.academy.yogaSorts.length === 0 ? (
                <Tag>태그없음</Tag>
              ) : (
                state.academy.yogaSorts?.map((data) => {
                  return (
                    <Tag
                      w='5rem'
                      style={{
                        cursor: 'pointer'
                      }}
                      colorScheme={
                        deleteGroup.includes(data.id) ? 'blue' : 'gray'
                      }
                      onClick={() => ClickTag(data.id)}
                    >
                      {data.name}
                    </Tag>
                  );
                })
              )}
            </Flex>
            <Button onClick={DeleteYogaSorts} mt='2rem' colorScheme='pink'>
              선택된 태그 삭제하기
            </Button>
          </Flex>
        </div>
      </AddZoneContainer>

      <IframeContainer>
        <iframe src={state.iframeUrl} title='naverplace' />
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
