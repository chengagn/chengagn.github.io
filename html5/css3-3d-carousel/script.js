import React, { useState } from 'https://cdn.skypack.dev/react';
import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'https://cdn.skypack.dev/react-icons/ti';

const CARDS = 10;
const MAX_VISIBILITY = 3;

const Card = ({ title, content }) => /*#__PURE__*/
React.createElement("div", { className: "card" }, /*#__PURE__*/
React.createElement("h2", null, title), /*#__PURE__*/
React.createElement("p", null, content));



const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return /*#__PURE__*/(
    React.createElement("div", { className: "carousel" },
    active > 0 && /*#__PURE__*/React.createElement("button", { className: "nav left", onClick: () => setActive(i => i - 1) }, /*#__PURE__*/React.createElement(TiChevronLeftOutline, null)),
    React.Children.map(children, (child, i) => /*#__PURE__*/
    React.createElement("div", { className: "card-container", style: {
        '--active': i === active ? 1 : 0,
        '--offset': (active - i) / 3,
        '--abs-offset': Math.abs(active - i) / 3,
        'pointer-events': active === i ? 'auto' : 'none',
        'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
        'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block' } },

    child)),


    active < count - 1 && /*#__PURE__*/React.createElement("button", { className: "nav right", onClick: () => setActive(i => i + 1) }, /*#__PURE__*/React.createElement(TiChevronRightOutline, null))));


};

const App = () => /*#__PURE__*/
React.createElement("div", { className: "app" }, /*#__PURE__*/
React.createElement(Carousel, null,
[...new Array(CARDS)].map((_, i) => /*#__PURE__*/
React.createElement(Card, { title: 'Card ' + (i + 1), content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." }))));





ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.body);