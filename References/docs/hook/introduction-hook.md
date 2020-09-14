## Introducing Hooks

Hook가 React 버전 16.8에 새로 추가되었습니다. Hook를 이용하여 Class를 작성할 필요 없이 상태 값과 여러 React의 기능을 사용할 수 있습니다.

```jsx
    import React, { useState } from 'react';
    
    function Example() {
      // "count"라는 새로운 상태 값을 정의합니다.
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
*** 
### Motivation

Hook는 5년 동안 우리가 React에서 수만 개의 컴포넌트들을 유지하고 작성하는데 만났던 표면상 연결되지 않은 넓고 다양한 문제들을 해결했습니다

React를 배우는 중이든, 매일 사용하든, 심지어 비슷한 컴포넌트 모델과 함께 다른 라이브러리를 선호하든지 간에, 이러한 문제 중 일부를 인식할 수도 있습니다.

#### It’s hard to reuse stateful logic between components

React doesn’t offer a way to “attach” reusable behavior to a component (for example, connecting it to a store). 

만약 이전부터 React를 사용해왔다면, 이것을 해결하기 위해 render props 그리고 고차 컴포넌트와 같은 패턴에 익숙할 것입니다. 그러나 이런 패턴을 사용할 때 컴포넌트를 재구성해야 하며 코드를 추적하기 어렵게 만듭니다. 

<p style="font-weight: bold;">
     If you look at a typical React application in React DevTools, you will likely find a “wrapper hell” of components surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions.
</p>

With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy. 

#### Complex components become hard to understand

우리는 때론 간단하게 시작했지만 유지하기 힘든 상태 관련 로직들과 사이드 이펙트가 있는 컴포넌트들을 유지해야합니다. 각 생명주기 메서드는 자주 관련 없는 로직이 섞여 있습니다. 예를 들어, 컴포넌트들은 componentDidMount 그리고 componentDidUpdate로 데이터를 가져오는 것을 수행할 수도 있습니다. 그러나, 같은 componentDidMount 메서드라도 이벤트 리스너를 설정하는 것과 같은 관계없는 일부 로직이 포함될 수도 있으며, componentWillUnmount에서 cleanup을 수행하기도 합니다. 함께 변경되는 상호 관련 코드는 분리되지만 이와 연관 없는 코드들은 단일 메서드로 결합합니다. 이로 인해 버그가 쉽게 발생하고 무결성을 너무나 쉽게 해칩니다.

In many cases it’s not possible to break these components into smaller ones because the stateful logic is all over the place. It’s also difficult to test them. This is one of the reasons many people prefer to combine React with a separate state management library. However, that often introduces too much abstraction, requires you to jump between different files, and makes reusing components more difficult.

이것을 해결하기 위해, 생명주기 메서드를 기반으로 쪼개는 데 초점을 맞추기 보다는, Hook를 통해 로직에 기반을 둔 작은 함수로 컴포넌트를 나눌 수 있습니다. (구독 설정 및 데이터를 불러오는 것과 같은 로직) 조금 더 예측 가능하도록 하기 위해 리듀서를 활용해 컴포넌트의 지역 상태 값을 관리하도록 할 수 있습니다.


#### Classes confuse both people and machines

Class은 사람과 기계를 혼동시킵니다.
Class가 코드의 재사용성과 코드 구성을 좀 더 어렵게 만들 뿐만 아니라, React를 배우는데 큰 진입장벽이라는 것을 알게 되었습니다. Javascript에서 어떻게 this가 작동하는지 알아야만 했고, 대부분의 다른 언어와는 다르게 작동합니다. 이벤트 핸들러가 등록되는 방법을 기억해야만 합니다. 불안정한 문법 제안들이 없다면, 코드는 매우 장황해집니다. 사람들은 props, state, 그리고 top-down 데이터 흐름을 완벽하게 이해할 수 있지만, 여전히 Class는 쉽지 않습니다. React 안에서의 함수와 Class 컴포넌트들을 구별하고 각 요소를 언제 사용하는지는 숙련된 React 개발자 사이에서도 의견이 일치하지 않습니다.

이러한 문제를 해결하기 위해, Hook는 Class없이 React 기능들을 사용하는 방법을 알려줍니다. 개념적으로 React 컴포넌트는 항상 함수에 더 가깝습니다. Hook는 React의 정신을 희생하지 않고 함수를 받아들입니다. Hook는 명령형 코드로 해결책을 찾을 수 있게 해주며 복잡한 함수형 또는 반응형 프로그래밍 기술을 배우도록 요구하지 않습니다.








