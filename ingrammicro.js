const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const csvWriter = require('csv-write-stream')
const Datastore = require('nedb-promises')
const {fetch, request} = require("./fetch")

const db = {
  products: Datastore.create('./db/products.db'),
}

const unique = (value, index, self) => self.indexOf(value) === index

const headers = {
  "accept": `text/plain, */*; q=0.01`,
  "accept-encoding": `gzip, deflate`,
  "accept-language": `en-US;q=0.9,en;q=0.8`,
  "cache-control": `no-cache`,
  "content-type": `application/x-www-form-urlencoded; charset=UTF-8`,
  "cookie": `akacd_ApacCloudletFeatures=3822602790~rv=99~id=2303dbcfd0998932da9bba3d423c6954; ASP.NET_SessionId=f0qjof2eykrutydki04lwkhp; ENDEAVOUR_USER_CULTURE_COOKIE=en-SG; RecentlySearchedKeywords_Guest=348913|d2luZG93cyBzZXJ2ZXI=,348911|cGhvbmU=,348909|MzFQNDRQQQ==,348902|VTI0MjJI,348900|TDEz,348896|ZXBzb24=,348861|aHAgNzZh,348844|RkI1MDNHWUJL,348837|TjlLNzZBQQ==,348834|NGM2YTRwYQ==; __RequestVerificationToken_L1NpdGU1=s0iAzWE7tX3og5CXjlZkL3UcKChHtrg336fsQDADIm2lC_8_To1e-xCEkP_ix45k4S4SjZtLgIym3W3EHn5yeqFiMUs1; IMOnlineDockerStickySessionCookie=be1c2f9d-b531-40ed-86cb-e24987dc6e8f; at_check=true; AMCVS_A35C256C5B8D27B30A495EEA%40AdobeOrg=1; DefaultSearchView=SearchView=2; fm=Search%20Results; IMOnlineOktaAuthCookie=Mxe8szXFHPAkE81Y3FPbh6NDcLKmr8dEAm8bGGckDC91c6eToo_bIE8h_qtHvJvnlwzjtVvoXKT9wq7MCb6p1l7VmK3BnCKEFTUBceCLGV4vyxaEDipS93NWAR5Cjj00U69PZ71C7U0gInu5-hnTWHVqcTJNS-GT6MP3KqWLc915xgpm075scEfbpaB5hOmGo7dm9XaL_Xb0oI3YzTOAwdU__EsE7Uuf7x8L2qdMfT1OY7pg9poIaBJeOtmMFF_tXyDAPxVVfd1DndInc8cnx0wF8gSmUU5J8H-FEI86ZGMdbd-Ay8aGdH_z7siyo_-mgIOpigfHFEeRyo9FoJpjyU36XRUos05ZgTk92hIjrJ9eMIxRzX69okW1oJu_uJukrJMYtTFYHCbUeeLNvsAtrIT_fMu_eaUAt6ARDTyJ9_DsG-ujVkQUKpDiJbFoY2vdNi4_EpzV9s5ecvs7jDcQX4ELFD-ZpDawgBrxIwGPHwZxxjnDzDBBMlNeel1YXZ04azFvw7sOfev3fJpDtmiFGwg2LagCWBqIgdecmZhzRd6EI0r-3zei_ZNEVc2g5ad1OzGXNmU4-jBFhaJFq38iJ6ZYPCpwrb5syhpfQp9X-6kubvX5_S_aR0uTKcrtbnPWuVS7whzwrd6YpaUOOvdmuxLI5-qMd89xiAmIIKsFgaefv1QNgiODWqbELcShpavz7Otj13x-rNoAd5XbOP8uIcQxUwKBDb6mEztRYh9aADil0ekZAWorA73RyQUWPz0EV_8YNRvAU3qK63esP3no0VLSR5Efu0vRjRW6YD7SPR6XMKqA5hpk2XMLys7bKj-TLw2ho2FuMJDrHu36GU_3F_dOd4aFhZKuq_4SeftRQ0pHnSFvjHcBq9UNf65ecVfipdDopnjE1pMBo07MdvjFQVohOk692Fa4kuVyjor70VBrtwkqZs9TP_tQKyw5ck6aIUJFQXCVWRDkZjkV7WHYYhpFzOYsb47YPN6AJs3AXFU_QCLGY59QOh2Dbx5b5StjsNOZi3il0uRsbmhb5XPx5s7-vur8mAnZ0ofG9ql0ZXcFKr0Kdf_Uvs0SWTdhSuWXndAvJujvWUu8rjcadJ7CsZIDQjZJck0QV31WzX4Lsl-M-9UerkjGXXQ9nSLhqtLnEWw5RlqSgss3LLUGnyarSN4J5ZN9TaWGpoXLDuXNS9AgmOmr7ahQUrKg2Qjx5jWcAZ4Beh52Ub_lv5mzDK-n617k7LDIwwq2LyY9cFAQOpuXpDq9CcP3U8ZXtlfnQTEDQOCtpBTSaWBaEki7m37ZUwcumchWtg_mG27_uZ_rRlOdN0UCJzbwK8F_syZhnhicy-PF8DcPMfDBF5f2agFKlIYxMw4G2MNDeLjb1pY_gynqGm9d7MYxK9RP8k7VouqrRO8dJNDciWDAtSHuOANCfYkKoBof0Zfqq4VPPSNpwqcNiK84Vw1XMe8ZaKT3qGYZwBmP6aFy4nw_OW7St97L2d-utzpWStgYbOlBLkgbdFiJ6tiJ9xXTgnyopMG5lUAdpBCQs1jNCpb6mMAYBUFVCj6uIpItlSA2MvzQ7bwSuEUmdRdqyI4qYO7nvZWWFvRB5StHDViNXgk2d2GyczNd0VbyFNn9Iwqlv0ytVNTtx-EbV-Gmj6zKAUcsipxisJ5sUscf7sA-zsNIxyGTfsZEw8lv30GiCpHpucHknBdQHn03SP0_jg2sZW6Tf835_5bnob6VEjjfgoMPm_Py8cn-J-m-4waD5GEcKQEhX4H2sopebph5bz3ZPif_CyGQI43VopJv5qSz1n0qhP1iO7F9CaYrE3EJByjHbgvTinAywmi8F-CPNrZ_YNqwbloXBXWO4G2NVmm-A-Ez2CnE-t8dBARqr0_-76tMZFgGEbi8MpXuDGCXadFWUDz3KtSB4X7OG4pChUxlHPnJOK2_2prjtRKE5kMzkZ7cJ1ST8hN3VAj5_hg_1G6e8o41jXaAESDjrYhF30VMBTBPzorecmk_XD4IcdN5JQGcXJyjTzfVLEmO2nubdWx9RJ0NBUteedzTW7uMUNClknMhOsmqrS_oDrQNCXq0Kd1Zq3O0I15SC3HpcrvGVVFn6wgEHJaUp7BQ_4T-ic9KIAoCod9XglSMy-Mcvfo; Login=LoginSuccess; ResellerCurrency=SGD; IMGlobalWebAuthCookie=D21FB2AA21ABB3866F36EE182975CAD03BD87C1698DB508A71F12E41CABDC2A3E0EE3F36673A3E56592F8609B3ACB501BA7D17186B3A94BD8B9579240B9FBE2F235CA975DAF740EC7F45AE42234026461729CD005C2A51092CD9ABD17CD35D5B0024D4589DC8A55589813BFB9E34DB369044D3BB008A933B26575CE9E107FDC06C4FC248D5C1B9D94ED46A71DC5D5E6C2ED36164783158749216EF289788FA67CD68BFC2C66444A759B34AF9D8921CE5A85CCA2F0B379A1E0C73C648E2EB818549C8A6A98801EAB2501E051919E796953C2FB06C8CD33E9FA7C0D0361F41D77FCC967F6DE3E400EBA305169B0769A251DFD4E959A61BD7FA807DFFD8B256BDB315DC7F475EF87169FF5A318FD759960FB9961DDCE23209B5B50D1B90C9DBE472BD8D5B6D52B02232014BC396341A071359D3091C4576F8D1C85699BEA2ECB8589514550951E412A825833409F30B65B518DCF6C6F76AD10E563E60560F99674B79E667A8C8DE7AE2F470D7CB2FD8381F1C943DA721880398FA1D3DCA2B659147731DFA94F1A5F9B39523EECE4074613DA9F7357A; __CSCookie_Auth=eypNR0OQxr2A0f9A/AOgLN1d5PSvGp+Q4P5bUoyNlJ+WFBvZGmDicXMdVL2GVsyFQtaRHkRs1R0I4qDZyw/ljn17Tr4f2aaTn33zs0lbiXU=; __CSUserNameCookie=3URyKlX1otkI2oRqDzKPTQ==; __CSResIdCookie=6rLe36/laPSRi8n9i5JwGQ==; __UserDateCookie=b3zQdMauGbNMIPQvXcjrRb2RpRuVPfL1iExDQEEtXl8=; RecentlySearchedKeywords_{cebb071c-9fe2-4784-9235-6a3174011f4d}=; AdobeTargetUserCookie=true; RecentlyViewedProducts{cebb071c-9fe2-4784-9235-6a3174011f4d}=A001-000000000005227682,A001-000000000005227706,A001-000000000001000196; ingrammicro.com=14b5a3d92f6f29f587be2a73949f1880a9008a18ecd59c3cc1d9b5e38d72189613799929; SameSite=None; RecentlyViewedProductsGuest=A001-000000000005227682,A001-000000000005281872; AMCV_A35C256C5B8D27B30A495EEA%40AdobeOrg=-2121179033%7CMCIDTS%7C19046%7CMCMID%7C81539999025367503271103710562735337211%7CMCOPTOUT-1645498856s%7CNONE%7CvVersion%7C5.3.0; mbox=PC#a2de7110dda1417299560cc38474dbb3.38_0#1708736457|session#24938268d7064a99816000b7f900ca0a#1645493517; ADRUM_BTa=R:72|g:b8436a02-1df5-45b0-abc8-29b6cbadb0ad|n:ingrammicro_6949b2b4-d030-44a0-8dbe-d99293826527`,
  "origin": `https://sg.ingrammicro.com`,
  "pragma": `no-cache`,
  "referer": `https://sg.ingrammicro.com/site/productdetail?id=A001-000000000005227682`,
  "sec-ch-ua": `" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"`,
  "sec-ch-ua-mobile": `?0`,
  "sec-ch-ua-platform": `"Windows"`,
  "sec-fetch-dest": `empty`,
  "sec-fetch-mode": `cors`,
  "sec-fetch-site": `same-origin`,
  "user-agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36`,
  // "x-requested-with": `XMLHttpRequest`,
}

let csvs = {}
function save(item, fn = 'output.csv') {
  if (csvs[fn] === undefined) {
    csvs[fn] = csvWriter()
    csvs[fn].pipe(fs.createWriteStream(fn))
  }
  csvs[fn].write(item)
}

let _visited = new Set()


function visited(str) {
  if(_visited.has(str)) return true
  _visited.add(str)
  return false
}

let agent = request.agent()

async function doUrl(url){
  if(visited(url)){
    // debugger
    return
  }
  let record = await db.products.findOne({url})
  if(record){
    //   //
//   await update("floors", "x", {foo: "baz"})
//   let r = await db.floors.find({})

    // debugger
    save(record)
    return

  }
  let response = {data: await fetch(url, {headers}, agent)}

  // fs.writeFileSync('x.html', response.data)
  if(!response.data){
    debugger
    return
  }
  let $ = cheerio.load(response.data)
  let match = response.data.match(/var viewmodel =(\{.*\})/)
  if(!match){
    debugger

  } else {
    let data = JSON.parse(match[1])
    let { description, stockStatus, sku, vpn, title, vendor } = data.productDetail || {}
    let { dealerPrice, hasStock, availableQuantity } = data.priceAndStock || {}

    let item = {
      url,
      dealerPrice,
      title,
      description,
      hasStock,
      availableQuantity,
      stockStatus,
      sku,
      vpn,
      vendor,
    }

    let rguid = $('#RequestGuid').attr('value')
    url = `https://sg.ingrammicro.com/Site/ProductDetail/GetProductSpecification?requestGuid=${rguid}`
    // console.log(url)
    // response = await axios.get(url)
    let images = $('img[src*=images],img[src*=prodpictures]').get().map(a => $(a).attr('src')).filter( unique ).join(', ')
    let pdfs = ""

    response = {data: await fetch(url, {headers}, agent)}
    if(response.data !== ""){
      $ = cheerio.load(response.data)
      pdfs = $('a[href*="pdf"]').get().map(a => $(a).attr('href')).join(', ')
      // debugger
    }
    // let specs = (data.productDetail.basicSpecifications || []).reduce((acc, spec) => {
    //   for(let o of spec.productSpecifications){
    //     acc[o.key.replace(/\W+/g, '_')] = o.value
    //   }
    //   return acc
    // }, {})
    if(!images){
      debugger
    }
    let vendor_data = JSON.stringify(data.productDetail)
    item = {...item, vendor_data, images, pdfs}
    save(item)
    await db.products.insert(item)
  }
}

// let browser, page
  ; (async () => {
    // await doUrl("https://sg.ingrammicro.com/site/productdetail?id=A001-000000000005227682")

    for(let i=1;i<9999;i++){


      let response = await axios({
        method: "post",
        url: "https://sg.ingrammicro.com/Site/Search/DoSearch",
        data: `Mode=12&Term=${i}&DeselectedTerm=&State=&Range=&SortMode=0&RecordPerPage=16&PageLayout=0&SortResultBy=&Page=0&PageZoneSearchState=&IsSimilarPopupPage=false&IsCrossSellPopupPage=false&IsCrossSellPopupWarrantyPage=false&CurrentCrossSellPage=0&CurrentCrossSellSkus=&ExchangeRate=&OffSet=0&TechSpecDataForHash=`,
        headers: {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          // "cookie": `IMOnlineDockerStickySessionCookie=caf0ba10-f4a6-46a7-a476-f7960b1ac498; AdobeTargetUserCookie=true; ingrammicro.com=14b5a3d92f6f29f587be2a73949f1880a9008a18ecd59c3cc1d9b5e38d72189613799929; akacd_ApacCloudletFeatures=3822694330~rv=3~id=b852397ff9362aa87a3c6a78ae923523; ASP.NET_SessionId=uhetnzlddr513mts4xoxmcem; ENDEAVOUR_USER_CULTURE_COOKIE=en-SG; __RequestVerificationToken_L1NpdGU1=G5P9tTEdjltro7zZGxA5ebwQZpuczt5Wv5gtZMEatrs4II2IIRIgBwMBW5FyJhwiDkdu0jZBio9KUMX1J56hUPBZjGU1; at_check=true; AMCVS_A35C256C5B8D27B30A495EEA%40AdobeOrg=1; AMCV_A35C256C5B8D27B30A495EEA%40AdobeOrg=-2121179033%7CMCIDTS%7C19043%7CMCMID%7C40068435499537009033795480642234941086%7CMCAAMLH-1645846333%7C3%7CMCAAMB-1645846333%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1645248733s%7CNONE%7CvVersion%7C5.3.0; bm_mi=8FF377994FAF1FA4F36A9766FAE2E3CA~4m3HyL5h871DnMOMNglg8WsNRVC4cOyNaZTKHdnqytmuaGCsuRLFYv9eWkTfQt6Lq4pm8pmJbzgSY2ZZ+lWfhNiQKm1uBp1j+UgryOZqGvcSX616EBJHCJP4I85jtcOcvSOtlpx6gUpGN7PqZ3g+tGfSEwYZ5UQI2zMIwZ30Q4GNdisqP5yEYUU06e5xN7EEhUkyc/g66dSz4putr7x0fKdvL4fVIRYjCRud4t3BXRd5OKuw+tQ4aWKLOfZmRhrYfDWu04tsdA4KKCnMxHevLU3Sbs/q+AaA6+TTNbYEFUw=; s_imdlv_s=First%20Visit; s_cc=true; ak_bmsc=7DCE4B8C4EA137F943CEC6D7F8A8746C~000000000000000000000000000000~YAAQJ7eKyhMHtdh+AQAAXpkJEA4+XAcmLJ9j3ZpK7Qj/BOFuX3NBVul1oWI0PDr6GD95qmacAXIVEyRyhGHd3wFFypI4gKVmM01yrGeAcRuTsLrfTlSKS7gDiEw0RBaUWqUjWbC1uMhcVf7t3/QLNwjj2Lihyx8cRyDHMgvgeyRNNXHbTXAe2ipZ+xwUzmYoPO2SskKDVbz4+WnQrt1dgH8CJVZm4erEwAUL7taV4JSCGyBvj46boivTdpaADo/Tr3GjipG7Q+heaaLLv4IKLyGPShXjnXvCgzhCJh/IWuo1L1Dc2ukdGzwD00ifFVa1bVTN1BqHqqy2cl1WKliblTeYPImT1qkAB8KKkK0RcWRYu37VLXgQMicDQhMD3cKnKKzAckbBMI5aG+YXOVuD+YSgl5AolGEZjGmpEgh6oYEnyKhz5DDYC4WP; RecentlySearchedKeywords_Guest=350307|MlRCIDIuNSIgdXNiIGhhcmQgZHJpdmU=,350300|Y29tbW9uIGludGVyZmFjZQ==,350299|dHY=,350295|dGhpbg==,350279|QXN1cyB6MTM=,350278|QXN1cyBmbG93IHoxMw==,350277|QXN1cyBneg==,350276|QXN1cw==,350273|RDRORVNPLTI2NjYtNEc=,350271|bTkycA==; mbox=session#20c5f29745b348c1940ee30f3f469ec2#1645243410|PC#20c5f29745b348c1940ee30f3f469ec2.38_0#1708486350; lp=SG|Store|Home; cp=SG|Store|Search%20Results; DefaultSearchView=SearchView=2; fm=Search%20Results; bm_sv=12E4453A505B93E7B558DDEE66963D21~3yul5Sh5AreMzletg9KzxNoySmgZ1kwi+HF2PGdWkMFTY4GUBMBm7H4jBWMok4wr7Rp2DKH+0ENMgXQKoH3n+lW6RAdIQbOtaGVyIu1Klc5H66MqSdgcgVGJnmp5C0p+f427gEbterIQYnDqiINwrZ/b+ook4pozJG6SyrCouUM=; RT="z=1&dm=sg.ingrammicro.com&si=8aa76362-9ceb-4c88-9d9c-dab9b33a3ce9&ss=kztabu59&sl=2&tt=6ul&bcn=%2F%2F684d0d49.akstat.io%2F&ld=ejc&nu=zln1qr6&cl=6vxa"; s_imdlv=1645241852552; s_nr=1645241852553-New; s_sq=ingrammicroglobalecomprod%3D%2526c.%2526a.%2526activitymap.%2526page%253DSG%25257CStore%25257CSearch%252520Results%2526link%253DSG%25257CStore%25257CSearch%252520Results%25257CpageView%2526region%253Dsearch-paging-container%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c%2526pid%253DSG%25257CStore%25257CSearch%252520Results%2526pidt%253D1%2526oid%253Dhttps%25253A%25252F%25252Fsg.ingrammicro.com%25252FSite%25252FSearch%252523365%2526ot%253DA`,
          "origin": "https://sg.ingrammicro.com",
          "referer": "https://sg.ingrammicro.com/Site/Search",
          "sec-ch-ua": `" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"`,
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": `"Windows"`,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36",
          "x-requested-with": "XMLHttpReque",
        }
      })
      let $ = cheerio.load(response.data)
      let as = $('.product-name a[data-displaysku]').get()
      for(let a of as){
        let url = new URL($(a).attr('href'), 'https://sg.ingrammicro.com/').href
        console.log(url)
        await doUrl(url)
      }
      if(as.length < 16) break
    }

  })()
