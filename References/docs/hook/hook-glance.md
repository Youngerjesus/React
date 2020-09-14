## Hooks at a Glance

Hook은 하위 호환성을 가지고 있습니다. 이 문서는 React에 경험이 있는 사용자를 대상으로 Hook에 대해 간략히 소개합니다. 이 문서는 빠르게 진행됩니다.

***

### 📌 State Hook

버튼을 클릭하면 값이 증가하는 간단한 카운터 예시가 여기 있습니다.

```jsx
    import React, { useState } from 'react';
    
    function Example() {
      // "count"라는 새 상태 변수를 선언합니다
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

Here, useState is a Hook (we’ll talk about what this means in a moment). We call it inside a function component to add some local state to it. React will preserve this state between re-renders. useState returns a pair: the current state value and a function that lets you update it.

You can call this function from an event handler or somewhere else. It’s similar to this.setState in a class, except it doesn’t merge the old and new state together.

useState는 인자로 초기 state 값을 하나 받습니다. 카운터는 0부터 시작하기 때문에 위 예시에서는 초기값으로 0을 넣어준 것입니다. this.state와는 달리 setState Hook의 state는 객체일 필요가 없습니다. 물론 원한다면 그렇게도 가능하지만요. 이 초기값은 첫 번째 렌더링에만 딱 한번 사용됩니다.


### Declaring multiple state variables

You can use the State Hook more than once in a single component:

```jsx
    function ExampleWithManyStates() {
      // Declare multiple state variables!
      const [age, setAge] = useState(42);
      const [fruit, setFruit] = useState('banana');
      const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
      // ...
    }
```

The array destructuring syntax lets us give different names to the state variables we declared by calling useState. These names aren’t a part of the useState API. Instead, React assumes that if you call useState many times, you do it in the same order during every render. We’ll come back to why this works and when this is useful later.

### But what is a Hook?

Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)“할 수 있게 해주는 함수입니다. Hook은 class 안에서는 동작하지 않습니다. 대신 class 없이 React를 사용할 수 있게 해주는 것입니다.

### ⚡️ Effect Hook

React 컴포넌트 안에서 데이터를 가져오거나 구독하고, DOM을 직접 조작하는 작업을 이전에도 종종 해보셨을 것입니다. 우리는 이런 모든 동작을 “side effects”(또는 짧게 “effects”)라고 합니다. 왜냐하면 이것은 다른 컴포넌트에 영향을 줄 수도 있고, 렌더링 과정에서는 구현할 수 없는 작업이기 때문입니다

Effect Hook, 즉 useEffect는 함수 컴포넌트 내에서 이런 side effects를 수행할 수 있게 해줍니다. React class의 componentDidMount 나 componentDidUpdate, componentWillUnmount와 같은 목적으로 제공되지만, 하나의 API로 통합된 것입니다. 

예를 들어, 이 예시는 React가 DOM을 업데이트한 뒤에 문서의 타이틀을 바꾸는 컴포넌트입니다.


```jsx
    import React, { useState, useEffect } from 'react';
    
    function Example() {
      const [count, setCount] = useState(0);
    
      // componentDidMount, componentDidUpdate와 비슷합니다
      useEffect(() => {
        // 브라우저 API를 이용해 문서의 타이틀을 업데이트합니다
        document.title = `You clicked ${count} times`;
      });
    
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

useEffect를 사용하면, React는 DOM을 바꾼 뒤에 “effect” 함수를 실행할 것입니다. Effects는 컴포넌트 안에 선언되어있기 때문에 props와 state에 접근할 수 있습니다. 기본적으로 React는 매 렌더링 이후에 effects를 실행합니다. 첫 번째 렌더링도 포함해서요. 

### ✌️ Hook 사용 규칙

Hook은 그냥 JavaScript 함수이지만, 두 가지 규칙을 준수해야 합니다.

최상위(at the top level)에서만 Hook을 호출해야 합니다. 반복문, 조건문, 중첩된 함수 내에서 Hook을 실행하지 마세요.

React 함수 컴포넌트 내에서만 Hook을 호출해야 합니다. 일반 JavaScript 함수에서는 Hook을 호출해서는 안 됩니다. (Hook을 호출할 수 있는 곳이 딱 한 군데 더 있습니다. 바로 직접 작성한 custom Hook 내입니다. 이것에 대해서는 나중에 알아보겠습니다.)








