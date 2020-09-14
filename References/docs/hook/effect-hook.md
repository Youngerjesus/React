## Using the Effect Hook

Effect Hook을 사용하면 함수 컴포넌트에서 side effect를 수행할 수 있습니다.

```jsx
    import React, { useState, useEffect } from 'react';
    
    function Example() {
      const [count, setCount] = useState(0);
    
      // componentDidMount, componentDidUpdate와 같은 방식으로
      useEffect(() => {
        // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
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

위의 코드는 이전 페이지의 카운터 예시를 바탕으로 하지만, 문서의 타이틀을 클릭 횟수가 포함된 문장으로 표현할 수 있도록 새로운 기능을 더했습니다.

데이터 가져오기, 구독(subscription) 설정하기, 수동으로 리액트 컴포넌트의 DOM을 수정하는 것까지 이 모든 것이 side effects입니다. 이런 기능들(operations)을 side effect(혹은 effect)라 부르는 것이 익숙하지 않을 수도 있지만, 아마도 이전에 만들었던 컴포넌트에서 위의 기능들을 구현해보았을 것입니다.

***

### Effects Without Cleanup

리액트가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우가 있습니다. 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리(clean-up)가 필요 없는 경우들입니다. 

이러한 예들은 실행 이후 신경 쓸 것이 없기 때문입니다. 

#### Example Using Classes

리액트의 class 컴포넌트에서 render 메서드 그 자체는 side effect를 발생시키지 않습니다. 이때는 아직 이른 시기로서 이러한 effect를 수행하는 것은 리액트가 DOM을 업데이트하고 난 이후입니다.

리액트 class에서 side effect를 componentDidMount와 componentDidUpdate에 두는 것이 바로 이 때문입니다. 예시로 돌아와서 리액트가 DOM을 바꾸고 난 뒤 문서 타이틀을 업데이트하는 리액트 counter 클래스 컴포넌트를 봅시다.

```jsx
    class Example extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          count: 0
        };
      }
    
      componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
      }
      componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
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

위 코드에서 class 안의 두 개의 생명주기 메서드에 같은 코드가 중복되는 것에 주의합시다

이는 컴포넌트가 이제 막 마운트된 단계인지 아니면 업데이트되는 것인지에 상관없이 같은 side effect를 수행해야 하기 때문입니다. 개념적으로 렌더링 이후에는 항상 같은 코드가 수행되기를 바라는 것이죠. 하지만 리액트 클래스 컴포넌트는 그러한 메서드를 가지고 있지 않습니다. 함수를 별개의 메서드로 뽑아낸다고 해도 여전히 두 장소에서 함수를 불러내야 합니다.

#### Example Using Hook

아래의 코드는 위에서 이미 보았던 것이지만 이번에는 좀 더 자세히 살펴보겠습니다.

```jsx
    import React, { useState, useEffect } from 'react';
    
    function Example() {
      const [count, setCount] = useState(0);
    
      useEffect(() => {
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

effect에서 함수를 반환하는 이유는 무엇일까요? 이는 effect를 위한 추가적인 정리(clean-up) 메커니즘입니다. 모든 effect는 정리를 위한 함수를 반환할 수 있습니다. 이 점이 구독(subscription)의 추가와 제거를 위한 로직을 가까이 묶어둘 수 있게 합니다. 구독(subscription)의 추가와 제거가 모두 하나의 effect를 구성하는 것입니다.

리액트가 effect를 정리(clean-up)하는 시점은 정확히 언제일까요? 리액트는 컴포넌트가 마운트 해제되는 때에 정리(clean-up)를 실행합니다. 하지만 위의 예시에서 보았듯이 effect는 한번이 아니라 렌더링이 실행되는 때마다 실행됩니다. 리액트가 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect 또한 정리하는 이유가 바로 이 때문입니다. 

effect에서 반드시 유명함수(named function)를 반환해야 하는 것은 아닙니다. 목적을 분명히 하기 위해 정리(clean-up)라고 부르고 있지만 화살표 함수를 반환하거나 다른 이름으로 불러도 무방합니다.


***
### Summary

useEffect가 컴포넌트의 렌더링 이후에 다양한 side effects를 표현할 수 있음을 위에서 배웠습니다. effect에 정리(clean-up)가 필요한 경우에는 함수를 반환합니다.


```jsx
      useEffect(() => {
        function handleStatusChange(status) {
          setIsOnline(status.isOnline);
        }
    
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      });
```

정리(clean-up)가 필요없는 경우에는 어떤 것도 반환하지 않습니다.
    
```jsx
      useEffect(() => {
        document.title = `You clicked ${count} times`;
      });
```

***

### Tips for Using Effects

팁: 관심사를 구분하려고 한다면 Multiple Effect를 사용합니다

```jsx
    class FriendStatusWithCounter extends React.Component {
      constructor(props) {
        super(props);
        this.state = { count: 0, isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
      }
    
      componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
        ChatAPI.subscribeToFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }
    
      componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
      }
    
      componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
          this.props.friend.id,
          this.handleStatusChange
        );
      }
    
      handleStatusChange(status) {
        this.setState({
          isOnline: status.isOnline
        });
      }
```

document.title을 설정하는 로직이 componentDidMount와 componentDidUpdate에 나누어져 있습니다. 구독(subscription)로직 또한 componentDidMount와 componentWillUnmount에 나누어져 있네요. componentDidMount가 두 가지의 작업을 위한 코드를 모두 가지고 있습니다.

Hook을 이용하여 이 문제를 어떻게 해결할 수 있을까요? State Hook을 여러 번 사용할 수 있는 것처럼 effect 또한 여러 번 사용할 수 있습니다.

```jsx
    function FriendStatusWithCounter(props) {
      const [count, setCount] = useState(0);
      useEffect(() => {
        document.title = `You clicked ${count} times`;
      });
    
      const [isOnline, setIsOnline] = useState(null);
      useEffect(() => {
        function handleStatusChange(status) {
          setIsOnline(status.isOnline);
        }
    
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      });
      // ...
    }
```


