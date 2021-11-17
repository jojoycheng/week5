let data
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
.then(function(res){
  console.log(res)
  data = res.data.data
  init()
})

// initailize
const ticketCardArea = document.querySelector('.ticketCard-area')

let init = () => {
  let str = ''
  data.forEach(function (item, index) {
    let content = `
    <li class="ticketCard">
      <div class="ticketCard-img">
            <a href="#">
              <img src=${item.imgUrl} alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">${item.price}</span>
              </p>
            </div>
          </div>
    </li>
`
    str += content
  })
  ticketCardArea.innerHTML = str
}

// filiter
const regionSearch = document.querySelector('.regionSearch')
const searchResultText = document.querySelector('#searchResult-text')

regionSearch.addEventListener('change', e => {
  if (e.target.value === '全部地區') {
    init()
    searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`
    return
  }
  let str = ''
  let num = 0
  data.forEach((item, index) => {
    if (e.target.value === item.area) {
      let content = `
    <li class="ticketCard">
      <div class="ticketCard-img">
            <a href="#">
              <img src=${item.imgUrl} alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">${item.price}</span>
              </p>
            </div>
          </div>
    </li>
`
      str += content
      num += 1
    }
  })
  ticketCardArea.innerHTML = str
  searchResultText.textContent = `本次搜尋共 ${num} 筆資料`
})

// addTicket
const addTicketBtn = document.querySelector('.addTicket-btn')

addTicketBtn.addEventListener('click', () =>{
  const ticketName = document.querySelector('#ticketName')
  const ticketImgUrl = document.querySelector('#ticketImgUrl')
  const ticketRegion = document.querySelector('#ticketRegion')
  const ticketPrice = document.querySelector('#ticketPrice')
  const ticketNum = document.querySelector('#ticketNum')
  const ticketRate = document.querySelector('#ticketRate')
  const ticketDescription = document.querySelector('#ticketDescription')

  const obj = {
    "id": data.length,
    "name": ticketName.value,
    "imgUrl": ticketImgUrl.value,
    "area": ticketRegion.value,
    "description": ticketDescription.value,
    "group": Number(ticketNum.value),
    "price": Number(ticketPrice.value),
    "rate": Number(ticketRate.value)
  }
  
  // 更新資料與畫面
  data.push(obj)
  init()
  searchResultText.textContent = `本次搜尋共 ${data.length} 筆資料`

  // 清空表單
  const form = document.querySelector('.addTicket-form')
  form.reset()

})

