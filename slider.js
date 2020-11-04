const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  }
});

class XPSlider{
  constructor(args){
    this.className = args.className
    this.interVal = null
    this.time = args.time ? args.time : 2000
    this.currentIndex = 0,
    this.len = 0
  }
  init(){
    let $el = this.append()
    this.listen($el)
    this.autoMove()
  }
  append(){
    let dotChild = []
    this.len = document.querySelector(this.className).children[0].children.length
    let dataIndex = 'data-index'
    for(let i=0;i < this.len;i++){
        let child = dom.div({
            class: i == 0 ? 'dot active' : 'dot',
            [dataIndex]: i
        })
        dotChild.push(child)
    }
    let el = dom.div({class:'dots'},...dotChild)
    document.querySelector(this.className).appendChild(el)
    return el
  }
  listen($dom){
    $dom.addEventListener('click',(e) => {
      if(e.target.className.match('dots')){
        return
      }
      clearInterval(this.interVal)
      let index = parseInt(e.target.getAttribute('data-index'))
      this.move(index)
      this.autoMove()
    })
  }
  autoMove(){
    this.interVal = setInterval(()=>{
      let index = this.currentIndex + 1
      this.move(index)
    },this.time)
  }
  move(index){
    if(index > this.len-1){
      index = 0
    }
    document.querySelector(`${this.className} .dots .dot.active`).classList.remove('active')
    document.querySelectorAll(`${this.className} .dots .dot`)[index].classList.add('active')
    document.querySelector(this.className).children[0].style.left =  -index * 100 + '%'
    this.currentIndex = index
  }
}


