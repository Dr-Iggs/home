fetch("imageinfo.csv")
  .then(response => response.text())
  .then(csvText => {
    images = parseCSV(csvText);
    displayimages(images);
    images.length
    makefilters(images.length);
  })
  .catch(err => {
    console.error("Failed to load visuals.csv", err);
    //window.location.reload();
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

function makefilters(totalimages) {

  const filterList = ['R','Python','GenArt','Geospatial','MUSA','Excel','BusinessAnalytics','Journalism','LDS'
  ];
  let html = `<button data-filter='All'>All (${totalimages})</button>`;
  filterList.forEach(filterClass => {
    let classCount = document.querySelectorAll(`.${filterClass}`).length;
    html += `
    <button data-filter="${filterClass}">${filterClass} (${classCount})</button>
    `;
  });
  html += "<span> </span>";
  filters.innerHTML = html;

  // Get all items
  const items = Array.from(document.querySelectorAll('.item'));

  // Get all filter buttons
  const buttons = document.querySelectorAll('#filters button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      items.forEach(item => {
        if (filter === 'All' || item.classList.contains(filter)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
};