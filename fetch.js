// const puppeteer = require('puppeteer')

const request = require('superagent');
require('superagent-proxy')(request);

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

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
async function fetch2(url, config = { headers }, agent = request) {
  let response
  let { body, headers } = config
  try {
    let promise = body ? agent.post(url) : agent.get(url)
    if (url.match('captchacn')) {
      promise.responseType('blob')
    }
    response = await promise
      // .proxy('http://localhost:8888')
      .send(body)
      .set(headers)
  } catch (e) {
    debugger
  }

  return response?.text || response?.body
}

async function fetch(url, config = { headers }, agent = request){
  let r
  while(!r){
    console.log(url)
    r = await fetch2(url, config, agent).catch(e => {
      console.log(e?.message)
    })
  }
  return r
}


module.exports = {fetch, request}