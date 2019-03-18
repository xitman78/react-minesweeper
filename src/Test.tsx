import * as React from 'react';

export interface TestProps {
  
}
 
export interface TestState {
  
}
 
class Test extends React.Component<TestProps, TestState> {
  constructor(props: TestProps) {
    super(props);
    this.state = { };
  }
  render() { 
    return (<div>This is me</div>);
  }
}
 
export default Test;