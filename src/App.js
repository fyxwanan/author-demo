import React, {Component} from 'react';
import './App.css';

const ObjectList =
    [{id: 1, name: '橘子'},
    {id: 2, name: '苹果'},
    {id: 3, name: '香蕉'},
    {id: 4, name: '菠萝'}];

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {
        this.getBoxIds();
    }

    /**
     *  1. 在React生命周期函数中执行函数
     *  2. 获取每个块的正文内容初始距离浏览器边框的距离 offsetTop
     */
    getBoxIds = () => {
        // 正文板块绑定的id数组
        const linkIds = [];
        let name = '';
        ObjectList.forEach((item, index) => {
            const top = document.getElementById(`${item.id}`);
            if (top) {
                name = item.id;
                linkIds.push({ key: item.id, offsetTop: top.getBoundingClientRect().top});
            }
        })
        this.setState({ linkIds });
    };


    // 这是滚动方法
    scrollToAnchor = (anchorName) => {
        if (anchorName || anchorName === 0) {
            // 找到锚点
            const anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView({
                    block: 'start',
                    behavior: 'smooth',
                });
            }
        }
    };

    /**
     *  activeLink   -- 高亮的类名，属性在css中自行设置
     *  linkIds    --  锚点对应div id集合的数组
     *  this.scrollRef.scrollTop  滚动条滚动的距离
     */
    onScrollEvent() {
        const { linkIds } = this.state;
        linkIds.forEach((item, index) => {
            if (this.scrollRef.scrollTop > item.offsetTop) {
                document.getElementById(`link-${item.key}`).classList.add('activeLink');
                linkIds.forEach((k, v) => {
                    if (item.key !== k.key) {
                        document.getElementById(`link-${k.key}`).classList.remove('activeLink');
                    }
                });
            }
        });
    }

  render() {
      const contentOptions = [];
      const LinkOptions = [];
      ObjectList.forEach((item) => {
          LinkOptions.push(<div id={`link-${item.id}`} className="link-content" onClick={this.scrollToAnchor.bind(this, item.id)}>{item.name}</div>)
          contentOptions.push(
              <div className="content-child">
                  <span id={`${item.id}`}>{item.name}</span>
                  <div style={{ width: '100%', height: 500, border: 'solid 1px red' }}>
                      我是内容，我是内容
                  </div>
              </div>
          )
      });

      return (
          <div className="App">
              <div
                  id="know-detail-body"
                  onScrollCapture={() => this.onScrollEvent()}
                  style={{ height: 1000, overflowY: 'scroll' }}
                  ref={(c) => {
                      this.scrollRef = c;
                  }}
              >
                  <div className="content">
                      <div id="content-div">
                          {contentOptions}
                          <div style={{ width: '100%', height: 500, border: 'solid 1px red' }}>
                            我是其他内容
                            我是评论
                            我是大帅比
                            给个star吧 哈哈
                          </div>
                      </div>
                  </div>

                  <div className="anchor-link-body" id="know-link-anchor">
                      <div className="link-content-link">
                          <span />
                      </div>
                      <div id="link-contentKey">
                          {LinkOptions}
                      </div>
                  </div>

              </div>
          </div>
      );
  }
}

export default App;
