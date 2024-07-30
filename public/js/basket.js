const COUNT_PER_PAGE = 50

let datas = []

async function getRequest() {
  const getResponse = await fetch('/api/live', {
    method: 'get',
  })
  const getJson = await getResponse.json()
  return getJson
}

function rankConvert(value) {
  if (value == 1) return '<div style="display: flex; justify-content: center;"><img class="rank" src="/1.png" width="24px"></div>'
  else if (value == 2) return '<div style="display: flex; justify-content: center;"><img class="rank" src="/2.png" width="24px"></div>'
  else if (value == 3) return '<div style="display: flex; justify-content: center;"><img class="rank" src="/3.png" width="24px"></div>'
  else return '<span style="color: white;"><b>' + value + '</b></span>'
}

function competitionColor(value) {
  if (value >= 4) return 'red'
  if (value >= 3) return '#ff7070'
  else if (value >= 2) return 'orange'
  else if (value >= 1) return 'yellow'
  else return '#00ff00'
}

const setPageButtons = (pageNumber) => {
  let number_tag = ''

  for (let i = 1; i <= Math.ceil(datas['data'].length / COUNT_PER_PAGE); i++) {
    if (i == pageNumber) {
      number_tag += `<div style="display: inline-block; cursor: pointer; width: 30px; margin: 5px; color: yellow; font-weight: bold; border: 2px solid white; border-radius: 50%;" onclick="setPageOf(${i})"> ${i} </div>`
    } else {
      number_tag += `<div style="display: inline-block; cursor: pointer; width: 30px; margin: 5px; color: white; border: 2px solid white; border-radius: 50%;" onclick="setPageOf(${i})"> ${i} </div>`
    }
  }

  document.getElementById('number-button-wrapper').innerHTML = number_tag
}

const setPageOf = (pageNumber) => {
  let tbody_tag = ''

  document.getElementById('time').innerHTML = '갱신 날짜: ' + datas['time']

  setPageButtons(pageNumber)

  for (
    let i = COUNT_PER_PAGE * (pageNumber - 1) + 1;
    i <= COUNT_PER_PAGE * (pageNumber - 1) + COUNT_PER_PAGE && i <= datas['data'].length;
    i++
  ) {
    competition = parseFloat(datas['data'][i - 1]['경쟁률']).toFixed(2)
    tbody_tag += `
    <tr>
      <td align="center" style="border-right-width: 1px" nowrap>${rankConvert(i)}</td>
      <td nowrap><span style="color: #5f6062;">${datas['data'][i - 1]['강좌번호']}</span></td>
      <td nowrap><span style="color: #5f6062;">${datas['data'][i - 1]['학부(과)']}</span></td>
      <td nowrap><strong><span style="color: white;">${datas['data'][i - 1]['강좌명']}</span></strong></td>
      <td nowrap><span style="color: #5f6062;">${datas['data'][i - 1]['교수명']}</span></td>
      <td nowrap><span style="color: white;">${datas['data'][i - 1]['제한인원']}</span></td>
      <td nowrap><span style="color: white;">${datas['data'][i - 1]['장바구니']}</span></td>
      <td align="center" nowrap><b><span style="color: ${competitionColor(competition)};">${competition}:1</span></b></td>
    </tr>
    `
  }

  document.getElementById('info').innerHTML = tbody_tag
}

getRequest().then((data) => {
  data['data'].sort((a, b) => b['경쟁률'] - a['경쟁률'])
  datas = data
  setPageOf(1)
})
