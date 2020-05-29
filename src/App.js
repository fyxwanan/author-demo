import React, {Component} from 'react';
import './App.css';

const ObjectList =
    [{id: 1, name: '橘子'},
    {id: 2, name: '苹果'},
    {id: 3, name: '香蕉'},
    {id: 4, name: '菠萝'}];


    // 时间戳
function dateToTimestamp (time, language = 'zh_CN') {
	console.log('a ===> 1')
  // 刚刚、几分钟前、几小时前、几天前、几周前、（超一周后且当年）月日-时分、年月日-时分
  const now = new Date().getTime();
  const { userAgent } = navigator;
  // const last = new Date(knowledgeInfo.lastUpdateDate).getTime();
  let last = '';
  if ('msSaveOrOpenBlob' in navigator) { // 判断是ie的浏览器，调用ie文件下载的方法
    if (time) {
      last = new Date(Date.parse(time.replace(/-/g, '/')));
    }
  } else if (userAgent.indexOf('Safari') > -1 || userAgent.indexOf('iPhone') > - 1) {
    if (time) {
      last = new Date(Date.parse(time.replace(/-/g, '/')));
    }
  } else {
    last = new Date(time).getTime();
  }
  // const subtract = (now - last) / (1000 * 60 * 60);  // 这是时间差毫小时
  const subtract = (now - last); // 这是时间差毫小时
  document.write('userAgent === ===>' + userAgent);
  document.write('<br>');
  document.write('time ===>' + time);
  document.write('<br>');
  document.write('last ===>' + last);
  document.write('<br>');
  document.write('now ===>' + now);
  document.write('<br>');
  document.write('subtract ===>' + subtract);
  document.write('<br>');

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const halfamonth = day * 15;
  const month = day * 30;

  const yearC = subtract / (month * 12);
  const monthC = subtract / month;
  const weekC = subtract / (7 * day);
  const dayC = subtract / day;
  const hourC = subtract / hour;
  const minC = subtract / minute;

  const t = time.split(' ');
  const yy = t[0].split('-')[0];
  const mm = t[0].split('-')[1];
  const dd = t[0].split('-')[2];
  const hh = t[1].split(':')[0];
  const mmm = t[1].split(':')[1];
  if (language === 'zh_CN') {
    if (yearC >= 1) {
      // return KnowledgeSearchStore.language['create.year.before'].replace('${}', parseInt(yearC, 10));
      return `${yy}-${mm}-${dd} ${hh}:${mmm}`; // 年月日-时分
    } if (monthC >= 1) {
      return `${mm}-${dd} ${hh}:${mmm}`; // 当年的 月日-时分
    } if (weekC >= 1) {
      return `${parseInt(weekC, 10)}周前`; // 几周
    } if (dayC >= 1) {
      return `${parseInt(dayC, 10)}天前`; // 几天
    } if (hourC >= 1) {
      return `${parseInt(hourC, 10)}小时前`; // 小时
    } if (minC >= 1) {
      return `${parseInt(minC, 10)}分钟前`; // 分钟
    }
    return '刚刚';
  } else {
    if (yearC >= 1) {
      // return KnowledgeSearchStore.language['create.year.before'].replace('${}', parseInt(yearC, 10));
      return `${yy}-${mm}-${dd} ${hh}:${mmm}`; // 年月日-时分
    } if (monthC >= 1) {
      return `${mm}-${dd} ${hh}:${mmm}`; // 当年的 月日-时分
    } if (weekC >= 1) {
      return `${parseInt(weekC, 10)} week ago`; // 几周
    } if (dayC >= 1) {
      return `${parseInt(dayC, 10)} days ago`; // 几天
    } if (hourC >= 1) {
      return `${parseInt(hourC, 10)} hours ago`; // 小时
    } if (minC >= 1) {
      return `${parseInt(minC, 10)} minutes ago`; // 分钟
    }
    return 'just';
  }
};

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {
        this.getBoxIds();
        const b = dateToTimestamp('2020-05-22 18:16:51');
        document.write(b);
    }

    /**
     *  1. 在React生命周期函数中执行函数
     *  2. 获取每个块的正文内容初始距离浏览器边框的距离 offsetTop
     */
    getBoxIds = () => {
        // 正文板块绑定的id数组
        const linkIds = [];
        ObjectList.forEach((item, index) => {
            const top = document.getElementById(`${item.id}`);
            if (top) {
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
