import * as React from 'react';
import styled from 'styled-components';

const StyledTextField = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 8px;
  border-radius: 4px;
  border-style: solid;
  border-color: var(--primary-color);
  border-width: 2px;
`;

const TextFieldText = styled.span`
  padding: 8px;
`;

const StyledTag = styled.span`
  display: inline-block;
  padding: 8px;
  width: 40px;
  background-color: var(--primary-color);
  color: white;
`;

const TextFieldButton = styled.span`
  display: inline-block;
  padding: 8px;
  width: 40px;
  cursor: pointer;
  background-color: var(--secondary-color);
  color: white;
`;

type TextFieldProps = {
  value: string;
  tag?: string;
  copy?: boolean;
  onCopy?: () => void;
};

export default class CopyTextField extends React.Component<TextFieldProps> {
  onCopy(e: any) {
    const ta = document.createElement('textarea');
    ta.innerText = this.props.value;
    ta.style.position = 'absolute';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();

    if (this.props.onCopy) {
      this.props.onCopy();
    }
  }

  render() {
    const tag = this.props.tag ? <StyledTag>{this.props.tag}</StyledTag> : null;
    const copy = this.props.copy ? (
      <TextFieldButton onClick={(e) => this.onCopy(e)}>Copy</TextFieldButton>
    ) : null;
    return (
      <StyledTextField>
        <div>
          {tag}
          <TextFieldText>{this.props.value}</TextFieldText>
        </div>
        {copy}
      </StyledTextField>
    );
  }
}
