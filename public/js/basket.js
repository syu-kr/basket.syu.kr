function competitionColor(value) {
  if (value >= 3) return 'red'
  else if (value >= 2) return 'orange'
  else if (value >= 1) return 'yellow'
  else return 'green'
}
async function getRequest() {
  const getResponse = await fetch('/api/basket', {
    method: 'get',
  })
  const getJson = await getResponse.json()
  return getJson
}
getRequest().then((data) => {
  let tbody_tag = ''
  data['data'].sort((a, b) => b['경쟁률'] - a['경쟁률'])
  let rank = 0
  for (info of data['data']) {
    rank += 1
    competition = parseFloat(info['경쟁률']).toFixed(3)
    tbody_tag += `
    <tr>
      <td nowrap><span style="color: white;">${rank}</span></td>
      <td nowrap><span style="color: #5f6062;">${info['학부(과)']}</span></td>
      <td nowrap><strong><span style="color: white;">${info['강좌명']}</span></strong></td>
      <td nowrap><span style="color: #5f6062;">${info['교수명']}</span></td>
      <td align="right" nowrap><span style="color: white;">${info['제한인원']}</span></td>
      <td align="right" nowrap><span style="color: white;">${info['장바구니']}</span></td>
      <td align="center" nowrap><b><span style="color: ${competitionColor(competition)};">${competition}</span></b></td>
    </tr>
    `
  }
  let table_tag = `
  <div class="table-responsive">
    <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col" nowrap>순위</th>
          <th scope="col" nowrap>학부(과)</th>
          <th scope="col" nowrap>강좌명</th>
          <th scope="col" nowrap>교수명</th>
          <th style="text-align: right" scope="col" nowrap>제한인원</th>
          <th style="text-align: right" scope="col" nowrap>장바구니</th>
          <th style="text-align: center" scope="col" nowrap>경쟁률</th>
        </tr>
      </thead>
      <tbody>
        ${tbody_tag}
      </tbody>
    </table>
  </div>
  `
  // document.getElementById('time').innerHTML = data['time'] + ' 에 갱신되었습니다.'
  document.getElementById('info').innerHTML = table_tag
})
