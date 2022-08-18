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
import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import {
  adminRegistState,
  DELETE_YOGASORTS,
  GET_ADMINISTRATION,
  GET_DETAIL,
  GET_LIST,
  POST_YOGASORTS,
  setAcademyId,
  setDeleteParams,
  setGetListParams,
  setIframeUrl,
  setInputValue
} from '../slices/RegistPageSlice';

function Regist() {
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

  function Reset() {
    dispatch(GET_LIST(state.getListParams));
    dispatch(setInputValue(''));
    dispatch(setDeleteParams(0));
  }

  function onChangeRegistRadio(e) {
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

  function onChangeMeditation(e) {
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

  function onChangeSigunGu(e) {
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

  function handleYogaDetailClick(e: any, naver_id) {
    e.preventDefault();
    dispatch(setAcademyId(Number(e.currentTarget.value)));
    dispatch(GET_DETAIL(Number(e.target.value)));
    dispatch(setIframeUrl(`https://m.place.naver.com/place/${naver_id}/home`));
  }

  function handlePostSubmit() {
    if (state.inputValue.length <= 1) {
      toast({
        description: '글자수 키우세요.',
        status: 'warning'
      });
      return;
    }
    let value = [] as { naverPlaceId: number; name: string }[];
    const splited = state.inputValue.split(',');
    splited.forEach((data: any) => {
      value = [...value, { naverPlaceId: state.academy.id, name: data }];
    });

    dispatch(
      POST_YOGASORTS({
        value: value,
        key: state.getListParams.key
      })
    )
      .unwrap()
      .then(() => {
        dispatch(GET_DETAIL(state.academy.id));
        toast({
          description: '성공적으로 등록됐습니다.',
          status: 'success'
        });
        Reset();
      })
      .catch(() => {
        toast({
          description: '실패',
          status: 'error'
        });
      });
  }

  function handleDeleteSubmit() {
    const list = state.deleteParams.join(',');
    dispatch(DELETE_YOGASORTS({ idList: list, key: state.getListParams.key }))
      .unwrap()
      .then(() => {
        dispatch(GET_DETAIL(state.academy.id));
        toast({
          description: '성공적으로 삭제했습니다.',
          status: 'success'
        });
        Reset();
      })
      .catch((err) => {
        if (err.status === 404) {
          toast({
            description: '태그를 선택해주세요',
            status: 'error'
          });
          return;
        }
        toast({
          description: '삭제에 실패했습니다.',
          status: 'error'
        });
      });
  }

  useEffect(() => {
    if (firstRenderRef.current) {
      //디바이스 사이즈 세팅
      dispatch(setFontsize('20px'));
      dispatch(setFullMode(true));
      // 파라미터 세팅
      dispatch(setGetListParams({ ...state.getListParams, key: cookies.key }));
      dispatch(GET_ADMINISTRATION());
      firstRenderRef.current = false;
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
        <Select placeholder='Select option' onChange={onChangeSigunGu}>
          {state.administrations?.map((data: any, index) => {
            return (
              <option key={index} value={data['si_gun_gu']}>
                {data['si_gun_gu']}
              </option>
            );
          })}
        </Select>
        <RadioGroup
          onChange={onChangeRegistRadio}
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
          onChange={onChangeMeditation}
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
                  onClick={(e) => handleYogaDetailClick(e, data.naver_id)}
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
              value={state.inputValue}
              onChange={(e) => dispatch(setInputValue(e.target.value))}
            />
            <Button
              w='40%'
              onClick={handlePostSubmit}
              colorScheme='pink'
              isLoading={state.loading.post}
            >
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
                    dispatch(
                      setInputValue(
                        state.inputValue === ''
                          ? data.name
                          : state.inputValue + ',' + data.name
                      )
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
                        state.deleteParams.includes(data.id) ? 'blue' : 'gray'
                      }
                      onClick={() => dispatch(setDeleteParams(data.id))}
                    >
                      {data.name}
                    </Tag>
                  );
                })
              )}
            </Flex>
            <Button onClick={handleDeleteSubmit} mt='2rem' colorScheme='pink'>
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
