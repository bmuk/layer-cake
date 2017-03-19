const search = (query, pageToken = "") => {
  let searchOptions = {
    q: query,
    part: "snippet"
  }
  if (pageToken !== "") {
    searchOptions.pageToken = pageToken
  }
  return window.gapi.youtube.search.list(searchOptions)
          .then(response => response.result)
}

function* pageTurner(query, searchResult, pagesLeft) {
  if (searchResult.nextPageToken && pagesLeft > 0) {
    yield search(query, searchResult.nextPageToken).then(searchResult => {
      return searchResult.items
    })
    yield* pageTurner(query, searchResult, pagesLeft - 1)
  }
}

const find = (query, pages = 1, onPageLoad = page => console.dir(page)) => {
  search(query).then(firstPage => {
    onPageLoad(firstPage.items)
    for (let page of pageTurner(query, firstPage, pages - 1)) {
      page.then(nextPage => onPageLoad(nextPage))
    }
  })
}

export { find }
