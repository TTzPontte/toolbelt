const puppeteer = require('puppeteer');

const content = `<html>
<head>
  <title>Serasa Experian Personal Report</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <h1>Personal Information</h1>
    <div class="row">
      <div class="col-md-4">
        <img src="https://source.unsplash.com/featured/?placeholder" class="img-fluid rounded" alt="Profile Picture">
      </div>
      <div class="col-md-8">
        <h2>Name: John Doe</h2>
        <p>Document Number: 123.456.789-00</p>
        <p>Date of Birth: <i class="bi bi-calendar"></i> 01/01/1990</p>
        <p>Mother's Name: Jane Doe</p>
        <p>Contact Information: <i class="bi bi-phone"></i> 123-456-7890</p>
        <p>Address: <i class="bi bi-house"></i> 123 Main St, City, State, Country</p>
      </div>
    </div>
    <hr>
    <h1>Credit Score</h1>
    <div class="row">
      <div class="col-md-6">
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <p>Score Model: HFIN</p>
        <p>Default Rate: 5%</p>
      </div>
    </div>
    <hr>
    <h1>Negative Financial Data</h1>
    <ul class="nav nav-tabs" id="negativeDataTabs" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pefin-tab" data-bs-toggle="tab" data-bs-target="#pefin" type="button" role="tab" aria-controls="pefin" aria-selected="true">PEFIN</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="refin-tab" data-bs-toggle="tab" data-bs-target="#refin" type="button" role="tab" aria-controls="refin" aria-selected="false">REFIN</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="notary-tab" data-bs-toggle="tab" data-bs-target="#notary" type="button" role="tab" aria-controls="notary" aria-selected="false">Notary</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="check-tab" data-bs-toggle="tab" data-bs-target="#check" type="button" role="tab" aria-controls="check" aria-selected="false">Check</button>
      </li>
    </ul>
    <div class="tab-content" id="negativeDataContent">
      <div class="tab-pane fade show active" id="pefin" role="tabpanel" aria-labelledby="pefin-tab">
        <h2>PEFIN</h2>
        <p>Count: 10</p>
        <p>Balance: $10,000</p>
        <!-- Bar graph or pie chart to represent the amount -->
      </div>
      <div class="tab-pane fade" id="refin" role="tabpanel" aria-labelledby="refin-tab">
        <h2>REFIN</h2>
        <p>Count: 5</p>
        <p>Balance: $5,000</p>
        <!-- Bar graph or pie chart to represent the amount -->
      </div>
      <div class="tab-pane fade" id="notary" role="tabpanel" aria-labelledby="notary-tab">
        <h2>Notary</h2>
        <p>Count: 3</p>
        <p>Balance: $2,000</p>
        <!-- Bar graph or pie chart to represent the amount -->
      </div>
      <div class="tab-pane fade" id="check" role="tabpanel" aria-labelledby="check-tab">
        <h2>Check</h2>
        <p>Count: 2</p>
        <p>Balance: $1,000</p>
        <!-- Bar graph or pie chart to represent the amount -->
      </div>
    </div>
    <hr>
    <h1>Inquiry History</h1>
    <!-- Visual timeline representing the inquiry history -->
    <hr>
    <h1>Stolen Documents</h1>
    <p><i class="bi bi-exclamation-triangle-fill"></i> Alert: Stolen Document</p>
    <ul>
      <li>Date: 01/01/2022</li>
      <li>Document Type: Passport</li>
      <li>Issuing Authority: XYZ</li>
    </ul>
    <hr>
    <h1>Partnership Details</h1>
    <div class="row">
      <div class="col-md-6">
        <!-- Pie chart representing the percentage of participation -->
      </div>
      <div class="col-md-6">
        <ul>
          <li>Company Name: ABC Corp</li>
          <li>Business Document: 123456</li>
          <li>Participation Percentage: 50%</li>
        </ul>
        <ul>
          <li>Company Name: XYZ Inc</li>
          <li>Business Document: 789012</li>
          <li>Participation Percentage: 30%</li>
        </ul>
        <!-- Repeat for other companies -->
      </div>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
</body>
</html>`; // Replace with your HTML content



(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('about:blank');
    await page.setContent(content);
    await page.setViewport({ width: 1200, height: 1800 }); // Adjust based on your content

    const tabSelectors = ['#pefin-tab', '#refin-tab', '#notary-tab', '#check-tab'];

    for (const [index, selector] of tabSelectors.entries()) {
        await page.click(selector);
        await page.waitForTimeout(500); // Wait for tab content to render
        await page.pdf({ path: `tab${index + 1}.pdf`, format: 'A4' });
    }

    await browser.close();
})();
