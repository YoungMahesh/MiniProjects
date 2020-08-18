const inputArea = document.getElementById('inputArea')
const outputArea = document.getElementById('outputArea')

/*
   Google_drive_link1
   Aachieved when "Get sharable link" clicked

   Google_drive_link2
   Achieved when "+Share" -> "Copy Link" clicked

   Onedrive_embed_link
   Achieved when "Embed" clicked

   Dropbox_share_link
   Achived when "Share" -> "Copy Link" clicked

   Github_file_link
   Go to github file such as image, pdf, etc. -> copy URL link

   https://drive.google.com/open?id=1HodWz7IC-hsTuOSg6x69JgCt0VITQQX7
   https://drive.google.com/file/d/1HodWz7IC-hsTuOSg6x69JgCt0VITQQX7/view?usp=sharing
   <iframe src="https://onedrive.live.com/embed?cid=BCE5C2112236947D&resid=BCE5C2112236947D%214404&authkey=APJHCBpQqww40sc" width="320" height="180" frameborder="0" scrolling="no" allowfullscreen></iframe>
   https://www.dropbox.com/s/jez49hjxyanr5mi/GITANJALI%202%20PREM.mp4?dl=0
   https://github.com/YoungMahesh/files-hosting/blob/master/window1.jpg
*/

const RgxGoogledrive = /^https:\/\/drive.google.com\/file\/d\/(.+)\/view\?usp=sharing$/
const RgxOnedrive1 = /^<iframe src="(.+)" width="\d+"(.+)<\/iframe>$/
const RgxOnedrive1_1 = /embed/
const RgxDropbox1 = /^https:\/\/www.dropbox.com\/(.+)dl=0$/
const RgxDropboxReplace1 = /dl=0/
const RgxDropboxReplace2 = /\/\/www./
const RgxDropboxReplace3 = /\?dl=0/
const RgxGithub1 = /^https:\/\/github.com/

const modifyGDriveLink = (rawLink2) => {
	const downloadLink = rawLink2.replace(
		RgxGoogledrive,
		(_, fileId) => 'https://drive.google.com/uc?export=download&id=' + fileId
	)
	const hostingLink = rawLink2.replace(
		RgxGoogledrive,
		(_, fileId) => 'https://drive.google.com/uc?export=view&id=' + fileId
	)
	return downloadLink + '\n' + hostingLink
}

const modifyOnedriveLink = (rawLink) => {
	let embedL = rawLink.replace(RgxOnedrive1, (_, embedLink) => embedLink)
	return embedL.replace(RgxOnedrive1_1, 'download')
}

const modifyDropboxLink = (rawLink) => {
	const downloadLink = rawLink.replace(RgxDropboxReplace1, 'dl=1')
	const hostingLink = rawLink
		.replace(RgxDropboxReplace2, '//dl.')
		.replace(RgxDropboxReplace3, '')
	return downloadLink + '\n' + hostingLink
}

const modifyGithubLink = (rawLink) => {
	return rawLink + '?raw=true'
}

function modifyLink(rawLink) {
	let modifiedLink
	if (RgxGoogledrive.test(rawLink)) modifiedLink = modifyGDriveLink(rawLink)
	else if (RgxOnedrive1.test(rawLink))
		modifiedLink = modifyOnedriveLink(rawLink)
	else if (RgxDropbox1.test(rawLink)) modifiedLink = modifyDropboxLink(rawLink)
	else if (RgxGithub1.test(rawLink)) modifiedLink = modifyGithubLink(rawLink)
	else modifiedLink = 'Invalid Drive Link'
	return modifiedLink + '\n\n'
}

function convertToDownloadLink() {
	const linksArr = inputArea.value.trim().split('\n')
	const links2Arr = []

	linksArr.map((link) => {
		link = link.trim()
		links2Arr.push(modifyLink(link))
	})

	let links2Text = ''
	links2Arr.map((link2) => (links2Text += link2))

	outputArea.value = links2Text
}

function copyText() {
	outputArea.select()
	document.execCommand('copy')
	alert('copied: ' + outputArea.value)
}
