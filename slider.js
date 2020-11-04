window.onload = function(){
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
    
    let dotChild = []
    
    let num = document.querySelector('.slider').children[0].children.length
    let dataIndex = 'data-index'
    
    for(let i=0;i < num;i++){
        let child = dom.div({
            class: i == 0 ? 'dot active' : 'dot',
            [dataIndex]: i
        })
        dotChild.push(child)
    }
    
    let el = dom.div({class:'dots'},...dotChild)
    
    let $slider = document.querySelector('.slider');
    
    $slider.appendChild(el)
    el.addEventListener('click',function(e){
        if(e.target.className.match('dots')){
            return
        }
        let index = parseInt(e.target.getAttribute('data-index'))
        document.querySelector('.slider .dots .dot.active').classList.remove('active')
        e.target.classList.add('active')
        document.querySelector('.slider ul').style.left =  -index * 100 + '%'
    })
}