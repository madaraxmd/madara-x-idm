function addUrlPrompt() {
    let url = prompt("Enter URL to download (File or YouTube):", "https://");
    if(url) {
        document.getElementById('urlInput').value = url;
        startDownloadEngine();
    }
}

function btnAction(actionName) {
    alert("Madara X IDM Action: " + actionName + " executed successfully.");
}

function startDownloadEngine() {
    let urlInput = document.getElementById('urlInput');
    let url = urlInput.value.trim();

    if(url === "") {
        alert("Please enter a valid URL in the Address box first!");
        return;
    }

    let fileName = "Madara_Download_File.dat";
    let fileIcon = "fa-file-arrow-down";

    if(url.includes("youtube.com") || url.includes("youtu.be")) {
        fileName = "YouTube_Video_Stream_1080p.mp4";
        fileIcon = "fa-file-video";
    } else {
        let parts = url.split('/');
        let lastPart = parts[parts.length - 1];
        if(lastPart && lastPart.includes('.')) {
            fileName = lastPart.split('?')[0];
        }
        if(fileName.endsWith('.zip')) fileIcon = "fa-file-zipper";
        else if(fileName.endsWith('.mp4')) fileIcon = "fa-file-video";
        else if(fileName.endsWith('.mp3')) fileIcon = "fa-file-audio";
    }

    let tableBody = document.getElementById('downloadTableBody');
    let newRow = document.createElement('tr');
    
    let progress = 0;
    let uniqueId = Date.now();
    
    newRow.innerHTML = `
        <td><i class="fa-solid ${fileIcon}" style="color: #ff1a1a;"></i> ${fileName}</td>
        <td>35.4 MB</td>
        <td class="status-downloading" id="status-${uniqueId}">Connecting (16 Threads)...</td>
        <td id="speed-${uniqueId}">14.5 MB/s</td>
    `;
    
    tableBody.insertBefore(newRow, tableBody.firstChild);
    urlInput.value = "";

    let downloadInterval = setInterval(() => {
        progress += 10;
        let statusEl = document.getElementById(`status-${uniqueId}`);
        let speedEl = document.getElementById(`speed-${uniqueId}`);
        
        if(progress <= 100) {
            if(statusEl) statusEl.innerText = `Downloading (${progress}% - 16/16 parts)`;
            if(speedEl) speedEl.innerText = (12 + Math.random() * 8).toFixed(1) + " MB/s (Turbo)";
        } else {
            if(statusEl) {
                statusEl.innerText = "Complete (16/16)";
                statusEl.className = "status-complete";
            }
            if(speedEl) speedEl.innerText = "--";
            clearInterval(downloadInterval);
        }
    }, 250);

    alert("Madara X IDM started turbo download with 16 split connections!");
}

function closeApp() {
    if(confirm("Do you want to close Madara X IDM?")) {
        alert("Application closed.");
    }
}