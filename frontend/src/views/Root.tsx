import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const Container = styled.div`
  padding: 40px;
  background-color: #f2f2f2;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Submit = styled.input`
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LabelFlex = styled.div`
  display: flex;
  margin-top: ${(props: { first?: number }) => (props.first ? 4 : 40)}px;
`;

const DividerContent = styled.span`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  line-height: 22px;
  font-size: 14px;
  outline: 0;

  margin: 0;
  padding: 0;
  border: 0;
  width: 100%;
  font-weight: inherit;
  font-style: inherit;
  font-family: inherit;
  vertical-align: baseline;

  cursor: default;
  text-align: center;
  color: #72767d;

  &::before {
    right: 100%;
    margin-right: 8px;
    content: '';
    background-color: #72767d;
    height: 1px;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
  }

  &::after {
    left: 100%;
    margin-left: 8px;
    content: '';
    background-color: #72767d;
    height: 1px;
    -webkit-box-flex: 1;
    flex: 1 1 auto;
  }
`;

const Label = (props: { first?: number; value: string }) => (
  <LabelFlex first={props.first}>
    <DividerContent>{props.value}</DividerContent>
  </LabelFlex>
);

const Root = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState('');

  const onJoin = () => {
    navigate(`/watch/${value}`);
  }

  const onCreate = () => {
    navigate(`/share`);
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  }

  return <form onSubmit={(e) => e.preventDefault()}>
    <Flex>
      <Container>
        <Label first={1} value='Watch someone' />
        <Input value={value} onChange={handleChange} />
        <Submit type='button' value='Watch' onClick={onJoin} />
        <Label value='Or share your screen' />
        <Submit type='button' value='Share' onClick={onCreate} />
      </Container>
    </Flex>
  </form>

}

export default Root;
