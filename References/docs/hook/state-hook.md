## Using the State Hook

```jsx
    import React, { useState } from 'react';
    
    function Example() {
      // 새로운 state 변수를 선언하고, count라 부르겠습니다.
      const [count, setCount] = useState(0);
    
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
```

### Equivalent Class Example

If you used classes in React before, this code should look familiar:


```jsx
    class Example extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          count: 0
        };
      }
    
      render() {
        return (
          <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>
              Click me
            </button>
          </div>
        );
      }
    }
```

위 코드에서 state는 { count: 0 }이며 사용자가 this.setState()를 호출하는 버튼을 클릭했을 때 state.count를 증가시킵니다. 위의 클래스 예시를 해당 페이지에서 계속 사용할 예정입니다.

***

### Hooks and Function Components

As a reminder, function components in React look like this:

```jsx
    const Example = (props) => {
      // You can use Hooks here!
      return <div />;
    }
```

***

### What’s a Hook?

React의 useState Hook을 사용해봅시다!

```jsx
    import React, { useState } from 'react';
    
    function Example() {
      // ...
    }
```

Hook이란? Hook은 특별한 함수입니다. 예를 들어 useState는 state를 함수 컴포넌트 안에서 사용할 수 있게 해줍니다. 다른 Hook들은 나중에 살펴봅시다!

언제 Hook을 사용할까? 함수 컴포넌트를 사용하던 중 state를 추가하고 싶을 때 클래스 컴포넌트로 바꾸곤 했을 겁니다. 하지만 이제 함수 컴포넌트 안에서 Hook을 이용하여 state를 사용할 수 있습니다.

***
### Declaring a State Variable

클래스를 사용할 때, constructor 안에서 this.state를 { count: 0 }로 설정함으로써 count를 0으로 초기화했습니다.


```jsx
    class Example extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          count: 0
        };
    }
```

함수 컴포넌트는 this를 가질 수 없기 때문에 this.state를 할당하거나 읽을 수 없습니다. 대신, useState Hook을 직접 컴포넌트에 호출합니다.


```jsx
    import React, { useState } from 'react';
    
    function Example() {
      // 새로운 state 변수를 선언하고, 이것을 count라 부르겠습니다.
      const [count, setCount] = useState(0);
```

useState를 호출하는 것은 무엇을 하는 걸까요? “state 변수”를 선언할 수 있습니다. 위에 선언한 변수는 count라고 부르지만 banana처럼 아무 이름으로 지어도 됩니다. useState는 클래스 컴포넌트의 this.state가 제공하는 기능과 똑같습니다. 일반적으로 일반 변수는 함수가 끝날 때 사라지지만, state 변수는 React에 의해 사라지지 않습니다.

useState의 인자로 무엇을 넘겨주어야 할까요? useState()Hook의 인자로 넘겨주는 값은 state의 초기 값입니다. 함수 컴포넌트의 state는 클래스와 달리 객체일 필요는 없고, 숫자 타입과 문자 타입을 가질 수 있습니다. 위의 예시는 사용자가 버튼을 얼마나 많이 클릭했는지 알기를 원하므로 0을 해당 state의 초기 값으로 선언했습니다.

useState는 무엇을 반환할까요? state 변수, 해당 변수를 갱신할 수 있는 함수 이 두 가지 쌍을 반환합니다. 이것이 바로 const [count, setCount] = useState()라고 쓰는 이유입니다. 클래스 컴포넌트의 this.state.count와 this.setState와 유사합니다. 

***
### Reading State

클래스 컴포넌트는 count를 보여주기 위해 this.state.count를 사용합니다.

```jsx
      <p>You clicked {this.state.count} times</p>
```

반면 함수 컴포넌트는 count를 직접 사용할 수 있습니다.

```jsx
     <p>You clicked {count} times</p>
```

***
### Updating State

In a class, we need to call this.setState() to update the count state:


```jsx
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        Click me
      </button>
```

반면 함수 컴포넌트는 setCount와 count 변수를 가지고 있으므로 this를 호출하지 않아도 됩니다.

```jsx
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
```




