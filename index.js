// Notes:
// - I'm not a big fan of semi-colons if they're not totally necessary so I usually leave them out in my JS but I'd of course use them if the company or client requires them
// - For some reason the getIpInfo function, which determines what language the header is, works locally but not on jsbin
// - I'm targeting all elements by class since it looks like there could be multiple widgets on one page

const url = 'https://api.taboola.com/1.2/json/apitestaccount/recommendations.get?app.type=web&app.apikey=7be65fc78e52c11727793f68b06d782cff9ede3c&source.id=%2Fdigiday-publishing-summit%2F&source.url=https%3A%2F%2Fblog.taboola.com%2Fdigiday-publishing-summit%2F&source.type=text&placement.organic-type=mix&%20placement.visible=true&placement.available=true&placement.rec-count=6&%20placement.name=Below%20Article%20Thumbnails&%20placement.thumbnail.width=640&placement.thumbnail.height=480&user.session=init'

async function getWidgetData() {
    let data = await (await fetch(url)).json()
    return data
}

async function getIpInfo() {
    let data = await (await fetch('https://ip-api.com/json')).json()
    console.log('getIpInfo data: ', data)
    return data
}

getWidgetData()
    .then(data => {
        renderAds(data)
    })
    .catch(error => console.log(error))

function renderAds(data) {
    const adsContainer = document.getElementsByClassName('ads_container')[0]
    
    data.list.forEach((item, i) => {
        let itemContainer = document.createElement('div')
        let title = item.name
        let category = item.categories[0]
        let destinationUrl = item.url

        // TODO: Figure out how to make this DRY so the <a> code isn't being repeated
        const itemHtml = `
            <a 
                href=${destinationUrl}
                title=${title}
                target="_blank"
            >
                <img 
                    height="300"
                    alt="Image for ${category ? category : 'an'} advertisement"
                    src=${item.thumbnail[0].url}
                />
            </a>

            <a 
                href=${destinationUrl}
                title=${title}
                target="_blank"
            >
                <span class="title ellipses">${title}</branding>
            </a>

            <a 
                href=${destinationUrl}
                title=${title}
                target="_blank"
            >
                <span class="branding">
                    ${item.branding} ${category ? `| (${category})` : ''}
                </span>
            </a>

        `
        itemContainer.innerHTML += itemHtml
        
        adsContainer.appendChild(itemContainer)
    })
} 

getIpInfo()
    .then(data => {
        console.log('ip data: ', data)
        formatHeaderLang(data)
    })
    .catch(error => console.log(error))

function formatHeaderLang(ipInfo) {
    const { country } = ipInfo
    const header = document.getElementsByClassName('header_span')[0]
    if (country.toLowerCase() !== 'united states') {
        header.innerHTML = 'Tu Peux Aimer'
    } else {
        header.innerHTML = 'Around the Web'
    }
}

