import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import Menu from './components/menu';

const menu_items = [
    {
      name: "台北",
      has_child: false,
      url: "https://www.wikipedia.com"
    },
    {
      name: "台中",
      has_child: true,
      children: [
        {
          name: "大里",
          has_child: false,
          url: "https://www.wikipedia.com"
        },
        {
          name: "南區",
          has_child: true,
          children: [
            {
              name: "中興大學",
              has_child: false,
              url: "https://www.wikipedia.com"
            }
          ]
        }
      ]
    },
    {
      name: "高雄",
      has_child: true,
      children: [
        {
          name: "楠梓區",
          has_child: true,
          children: [
            {
              name: "中興大學",
              has_child: false,
              url: "https://www.wikipedia.com"
            }
          ]
        },
        {
          name: "左營區",
          has_child: true,
          children: [
            {
              name: "中興大學",
              has_child: false,
              url: "https://www.wikipedia.com"
            }
          ]
        }
      ]
    }
  ];

ReactDOM.render(<Menu data={menu_items}/>, document.getElementById('root'));
