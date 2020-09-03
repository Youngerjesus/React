## Handling Events
    React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사합니다. 
    몇 가지 문법 차이는 다음과 같습니다.
    
    React의 이벤트는 소문자 대신 캐멀 케이스(camelCase)를 사용합니다.
    JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달합니다.

예를 들어, HTML은 다음과 같습니다.

```jsx
    button onclick="activateLasers()">
      Activate Lasers
    </button>
```

React에서는 약간 다릅니다.

```jsx
    <button onClick={activateLasers}>
      Activate Lasers
    </button>
```

Another difference is that you cannot return false to prevent default behavior in React. You must call preventDefault explicitly.
For example, with plain HTML, to prevent the default link behavior of opening a new page, you can write

```jsx
    <a href="#" onclick="console.log('The link was clicked.'); return false">
      Click me
    </a>
```

React에서는 다음과 같이 작성할 수 있습니다.

```jsx
    function ActionLink() {
      function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked.');
      }
    
      return (
        <a href="#" onClick={handleClick}>
          Click me
        </a>
      );
    }
```

Here, e is a synthetic event. React defines these synthetic events according to the W3C spec, so you don’t need to worry about cross-browser compatibility.
React events do not work exactly the same as native events. See the SyntheticEvent reference guide to learn more.

React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 addEventListener를 호출할 필요가 없습니다. 대신, 엘리먼트가 처음 렌더링될 때 리스너를 제공하면 됩니다.

ES6 클래스를 사용하여 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것입니다. 예를 들어, 다음 Toggle 컴포넌트는 사용자가 “ON”과 “OFF” 상태를 토글 할 수 있는 버튼을 렌더링합니다.

```jsx
    class Toggle extends React.Component {
      constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
    
        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        this.handleClick = this.handleClick.bind(this);
      }
    
      handleClick() {
        this.setState(state => ({
          isToggleOn: !state.isToggleOn
        }));
      }
    
      render() {
        return (
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </button>
        );
      }
    }
    
    ReactDOM.render(
      <Toggle />,
      document.getElementById('root')
    );
```

JSX 콜백 안에서 this의 의미에 대해 주의해야 합니다. JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않습니다. 


