const url = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&%20placement.visible=true&placement.available=true&placement.rec-count=6&%20placement.name=Below%20Article%20Thumbnails&%20placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

async function getWidgetData() {
    const data = await (await fetch(url)).json()
    return data
}

async function getIpInfo() {
    const data = await (await fetch('http://ip-api.com/json')).json()
    return data
}

getWidgetData()
    .then(data => {
        renderAds(data)
    })
    .catch(error => console.log('error: ', error))

function renderAds(data) {
    const adsContainer = document.getElementsByClassName('ads_container')[0]
  
    data.list.forEach((item, i) => {
        let itemContainer = document.createElement('div')
        let destinationUrl = `${item.url}`
        let itemTitle = `${item.name}`

        let img = document.createElement('img')
        img.src = `${item.thumbnail[0].url}`
        img.height = "300"
        img.alt = `Image for ${item.categories[0] ? item.categories[0] : 'an'} advertisement`
        let hrefImg = document.createElement('a')
        hrefImg.title = itemTitle
        hrefImg.target = "_blank"
        hrefImg.href = destinationUrl
        hrefImg.appendChild(img)

        let titleSpan = document.createElement('span')
        titleSpan.classList.add('title', 'ellipses')
        let title = document.createTextNode(`${item.name}`)
        titleSpan.appendChild(title)
        let hrefTitle = document.createElement('a')
        hrefTitle.title = itemTitle
        hrefTitle.target = "_blank"
        hrefTitle.href = destinationUrl
        hrefTitle.appendChild(titleSpan)
        
        let brandSpan = document.createElement('span')
        brandSpan.classList.add('branding')
        let brand = document.createTextNode(`${item.branding}`)
        brandSpan.appendChild(brand)
        let hrefBrand = document.createElement('a')
        hrefBrand.title = itemTitle
        hrefBrand.target = "_blank"
        hrefBrand.href = destinationUrl
        hrefBrand.appendChild(brandSpan)
        
        itemContainer.appendChild(hrefImg)
        itemContainer.appendChild(hrefTitle)
        itemContainer.appendChild(hrefBrand)
        
        adsContainer.appendChild(itemContainer)
    })
} 

getIpInfo()
    .then(data => {
        formatHeaderLang(data)
    })
    .catch(error => console.log('error: ', error))

function formatHeaderLang(ipInfo) {
    const { country } = ipInfo
    const header = document.querySelector('span.widget_header')
    if (country.toLowerCase() !== 'united states') {
        header.innerHTML = 'Tu Peux Aimer'
    } else {
        header.innerHTML = 'You May Like'
    }
}
