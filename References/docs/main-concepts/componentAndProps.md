## Components and Props
    컴포넌트를 통해 UI를 재사용 가능한 개별적인 여러 조각으로 나누고, 각 조각을 개별적으로 살펴볼 수 있습니다. 
    
    이 페이지에서는 컴포넌트의 개념을 소개합니다. 자세한 내용은 API References에서 확인할 수 있습니다.
    
    React.Component

개념적으로 컴포넌트는 JavaScript 함수와 유사합니다. 

“props”라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환합니다.

***
#### 함수 컴포넌트와 클래스 컴포넌트

컴포넌트를 정의하는 가장 간단한 방법은 JavaScript 함수를 작성하는 것입니다.

```jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
```

이 함수는 데이터를 가진 하나의 “props” (props는 속성을 나타내는 데이터입니다) 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트입니다. 

이러한 컴포넌트는 JavaScript 함수이기 때문에 말 그대로 “함수 컴포넌트”라고 호칭합니다.

또한 ES6 class를 사용하여 컴포넌트를 정의할 수 있습니다.

```jsx
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
```

React의 관점에서 볼 때 위 두 가지 유형의 컴포넌트는 동일합니다.

class는 함수형보다 몇 가지 추가 기능이 있다. (상태관리, Lifecycle)

When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

```jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    
    const element = <Welcome name="Sara" />;
    ReactDOM.render(
      element,
      document.getElementById('root')
    );
```

주의: 컴포넌트의 이름은 항상 대문자로 시작합니다.

***
#### 컴포넌트 합성

Components can refer to other components in their output. 

이는 모든 세부 단계에서 동일한 추상 컴포넌트를 사용할 수 있음을 의미합니다. React 앱에서는 버튼, 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현됩니다.

```jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    
    function App() {
      return (
        <div>
          <Welcome name="Sara" />
          <Welcome name="Cahal" />
          <Welcome name="Edite" />
        </div>
      );
    }
    
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
```

***
#### Extracting Components

Don’t be afraid to split components into smaller components.

```jsx
    function Comment(props) {
      return (
        <div className="Comment">
          <div className="UserInfo">
            <img className="Avatar"
              src={props.author.avatarUrl}
              alt={props.author.name}
            />
            <div className="UserInfo-name">
              {props.author.name}
            </div>
          </div>
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
```

이 컴포넌트는 author(객체), text(문자열) 및 date(날짜)를 props로 받은 후 소셜 미디어 웹 사이트의 코멘트를 나타냅니다.

이 컴포넌트는 구성요소들이 모두 중첩 구조로 이루어져 있어서 변경하기 어려울 수 있으며, 각 구성요소를 개별적으로 재사용하기도 힘듭니다. 이 컴포넌트에서 몇 가지 컴포넌트를 추출하겠습니다.

먼저 Avatar를 추출하겠습니다.

```jsx
    function Avatar(props) {
      return (
        <img className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
        />
      );
    }
```

The Avatar doesn’t need to know that it is being rendered inside a Comment. This is why we have given its prop a more generic name:

이제 Comment 가 살짝 단순해졌습니다.

```jsx
    function Comment(props) {
      return (
        <div className="Comment">
          <div className="UserInfo">
            <Avatar user={props.author} />
            <div className="UserInfo-name">
              {props.author.name}
            </div>
          </div>
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
```

다음으로 Avatar 옆에 사용자의 이름을 렌더링하는 UserInfo 컴포넌트를 추출하겠습니다.

```jsx
    function UserInfo(props) {
      return (
        <div className="UserInfo">
          <Avatar user={props.user} />
          <div className="UserInfo-name">
            {props.user.name}
          </div>
        </div>
      );
    }
```

Comment 가 더욱 단순해졌습니다.

```jsx
    function Comment(props) {
      return (
        <div className="Comment">
          <UserInfo user={props.author} />
          <div className="Comment-text">
            {props.text}
          </div>
          <div className="Comment-date">
            {formatDate(props.date)}
          </div>
        </div>
      );
    }
```

처음에는 컴포넌트를 추출하는 작업이 지루해 보일 수 있습니다. 하지만 재사용 가능한 컴포넌트를 만들어 놓는 것은 더 큰 앱에서 작업할 때 두각을 나타냅니다. UI 일부가 여러 번 사용되거나 (Button, Panel, Avatar), UI 일부가 자체적으로 복잡한 (App, FeedStory, Comment) 경우에는 별도의 컴포넌트로 만드는 게 좋습니다.

***
#### props는 읽기 전용입니다.

함수 컴포넌트나 클래스 컴포넌트 모두 컴포넌트의 자체 props를 수정해서는 안 됩니다. 다음 sum 함수를 살펴봅시다.

```jsx
    function sum(a, b) {
      return a + b;
    }
```

이런 함수들은 순수 함수라고 호칭합니다. 입력값을 바꾸려 하지 않고 항상 동일한 입력값에 대해 동일한 결과를 반환하기 때문입니다.

반면에 다음 함수는 자신의 입력값을 변경하기 때문에 순수 함수가 아닙니다.

```jsx
    function withdraw(account, amount) {
      account.total -= amount;
    }
```

모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 순수 함수처럼 동작해야 합니다.

















