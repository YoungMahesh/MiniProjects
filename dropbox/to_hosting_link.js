const inputArea = document.getElementById("inputArea")
const outputArea = document.getElementById("outputArea")

/*
   Dropbox_share_link
   Achived when "Share" -> "Copy Link" clicked

   https://www.dropbox.com/s/jez49hjxyanr5mi/GITANJALI%202%20PREM.mp4?dl=0
*/

const RgxDropbox1 = /^https:\/\/www.dropbox.com\/(.+)dl=0$/
const RgxDropboxReplace1 = /\/\/www./
const RgxDropboxReplace2 = /\?dl=0/

const modifyDropboxLink = (rawLink) => {
   const link1 = rawLink.replace(RgxDropboxReplace1, "//dl.")
   const link2 = link1.replace(RgxDropboxReplace2, "")
   return link2
}

function modifyLink(rawLink) {
   let modifiedLink
   if (RgxDropbox1.test(rawLink)) modifiedLink = modifyDropboxLink(rawLink)
   else modifiedLink = "Invalid Dropbox Link"
   return modifiedLink + "\n\n"
}

function convertToHostingLink() {
   const linksArr = inputArea.value.trim().split("\n")
   const links2Arr = []

   linksArr.map(link => {
      link = link.trim()
      links2Arr.push(modifyLink(link))
   })

   let links2Text = ""
   links2Arr.map(link2 => links2Text += link2)

   outputArea.value = links2Text
}


function copyText() {
   outputArea.select()
   document.execCommand("copy")
   alert("copied: " + outputArea.value)
}
