fetch("imageinfo.csv")
  .then(response => response.text())
  .then(csvText => {
    images = parseCSV(csvText);
    displayimages(images);
  })
  .catch(err => {
    console.error("Failed to load visuals.csv", err);
    window.location.reload();
  });

function parseCSV(csvText) {
  const lines = csvText.trim().split("\n");
  const headers = lines.shift().split(",");

  return lines.map(line => {
    const values = line.split(",");
    const obj = {};

    headers.forEach((header, i) => {
      const key = header.trim();
      let value = values[i].trim();

      obj[key] = value;
    });

    return obj;
  });
}


function displayimages(imagelist) {
    let html = "";

    imagelist.forEach(row => {
    const hasLink = row.link && row.link.trim() !== "";

    const content = `
        <img src="Images/${row.filepath}" alt="Image" >
        <div class="overlay">${row.description}</div>
    `;

    html += `
        <div class="item ${row.tags}" id="plot${row.id}">
        ${hasLink 
            ? `<a href="${row.link}">${content}</a>` 
            : content
        }
        </div>
    `;
    });

    container.innerHTML = html;
}
